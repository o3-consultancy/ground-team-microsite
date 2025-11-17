<template>
  <div class="card space-y-4">
    <h3 class="text-lg font-semibold text-primary-blue">Complete Collection</h3>
    <p class="text-sm text-neutral-dark2">
      Collect UCO and swap containers for households with pending requests
    </p>

    <div class="grid md:grid-cols-3 gap-3">
      <div class="md:col-span-2">
        <label class="label">Pending collection requests</label>
        <select class="input" v-model="selectedRequest">
          <option :value="null">— Select request —</option>
          <option v-for="r in requests" :key="r.id" :value="r">
            {{ r.householdId || 'Unknown' }} —
            {{ r.containerId || 'No container' }} —
            {{ r.status }}
          </option>
        </select>
      </div>
      <div class="flex items-end">
        <button class="btn btn-secondary w-full" @click="refresh">
          {{ refreshing ? "Loading..." : "Refresh" }}
        </button>
      </div>
    </div>

    <div v-if="selectedRequest" class="bg-neutral-card p-4 rounded-xl text-sm">
      <p><strong>Request ID:</strong> {{ selectedRequest.id }}</p>
      <p><strong>Household ID:</strong> {{ selectedRequest.householdId }}</p>
      <p><strong>Current Container:</strong> {{ selectedRequest.containerId }}</p>
      <p v-if="selectedRequest.requestedAt">
        <strong>Requested:</strong> {{ new Date(selectedRequest.requestedAt).toLocaleString() }}
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-3">
      <div>
        <label class="label">Collected volume (L) *</label>
        <input
          class="input"
          type="number"
          step="0.1"
          v-model.number="volumeL"
          placeholder="e.g. 18.5"
        />
      </div>
      <div>
        <label class="label">Collected weight (kg) *</label>
        <input
          class="input"
          type="number"
          step="0.1"
          v-model.number="weightKg"
          placeholder="e.g. 16.2"
        />
      </div>
    </div>

    <div>
      <label class="label">New empty container ID (for swap) *</label>
      <div class="flex gap-2">
        <input
          class="input flex-1"
          v-model.trim="newContainerId"
          placeholder="container_456"
        />
        <InlineQRScanner @scanned="(id) => newContainerId = id" />
      </div>
      <p class="text-xs text-neutral-dark2 mt-2">
        Tip: click the Scan button to capture container ID from QR code.
      </p>
    </div>

    <div class="flex items-center gap-3 pt-2">
      <button
        class="btn btn-primary"
        :disabled="loading || !selectedRequest"
        @click="complete"
      >
        {{ loading ? "Submitting…" : "Complete Collection & Swap" }}
      </button>
      <p class="text-sm text-accent-coral" v-if="error">{{ error }}</p>
      <p class="text-sm text-green-700" v-if="ok">Done! Collection completed and container swapped.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { listCollectionRequests, performSwap } from "../services/api";
import { useAuth } from "../composables/useAuth";
import InlineQRScanner from "./InlineQRScanner.vue";

const { getUserId } = useAuth();

const requests = ref([]);
const selectedRequest = ref(null);
const volumeL = ref(null);
const weightKg = ref(null);
const newContainerId = ref("");
const loading = ref(false);
const refreshing = ref(false);
const error = ref("");
const ok = ref(false);

async function refresh() {
  refreshing.value = true;
  error.value = "";

  try {
    const { data } = await listCollectionRequests({ status: "requested" });
    requests.value = Array.isArray(data) ? data : (data?.items || []);
  } catch (e) {
    error.value = e?.response?.data?.detail || "Failed to load requests";
  } finally {
    refreshing.value = false;
  }
}

async function complete() {
  error.value = "";
  ok.value = false;

  if (!selectedRequest.value || !volumeL.value || !weightKg.value || !newContainerId.value) {
    error.value = "Please fill all fields: select request, volume, weight, and new container ID";
    return;
  }

  loading.value = true;

  try {
    await performSwap({
      requestId: selectedRequest.value.id,
      householdId: selectedRequest.value.householdId,
      removedContainerId: selectedRequest.value.containerId,
      installedContainerId: newContainerId.value,
      volumeL: Number(volumeL.value),
      weightKg: Number(weightKg.value),
      performedBy: getUserId() || "unknown"
    });

    ok.value = true;

    // Reset form
    setTimeout(() => {
      ok.value = false;
    }, 3000);

    volumeL.value = null;
    weightKg.value = null;
    newContainerId.value = "";
    selectedRequest.value = null;

    // Refresh the list
    await refresh();
  } catch (e) {
    error.value = e?.response?.data?.detail || "Collection failed";
  } finally {
    loading.value = false;
  }
}

onMounted(refresh);
</script>
