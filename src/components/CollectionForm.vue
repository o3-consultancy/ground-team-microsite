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
            {{ r.householdVilla || 'Unknown Villa' }}, {{ r.householdCommunity || 'Unknown Community' }} — Container: {{ r.containerSerial || r.containerId }}
          </option>
        </select>
      </div>
      <div class="flex items-end">
        <button class="btn btn-secondary w-full" @click="refresh">
          {{ refreshing ? "Loading..." : "Refresh" }}
        </button>
      </div>
    </div>

    <div v-if="selectedRequest" class="bg-neutral-card p-4 rounded-xl text-sm space-y-2">
      <div class="grid grid-cols-2 gap-2">
        <div>
          <p class="text-xs text-neutral-dark2">Villa Number</p>
          <p class="font-semibold text-neutral-dark1">{{ selectedRequest.householdVilla || 'Unknown' }}</p>
        </div>
        <div>
          <p class="text-xs text-neutral-dark2">Community</p>
          <p class="font-semibold text-neutral-dark1">{{ selectedRequest.householdCommunity || 'Unknown' }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div>
          <p class="text-xs text-neutral-dark2">Container Serial</p>
          <p class="font-semibold text-neutral-dark1">{{ selectedRequest.containerSerial || selectedRequest.containerId }}</p>
        </div>
        <div>
          <p class="text-xs text-neutral-dark2">Requested</p>
          <p class="font-semibold text-neutral-dark1">
            {{ selectedRequest.requestedAt ? new Date(selectedRequest.requestedAt).toLocaleDateString() : 'N/A' }}
          </p>
        </div>
      </div>

      <button
        v-if="householdLocation"
        @click="navigateToLocation"
        class="btn btn-secondary w-full mt-3"
      >
        <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Navigate To
      </button>
    </div>

    <div>
      <label class="label">Collected volume (L) *</label>
      <input
        class="input"
        type="number"
        step="0.1"
        v-model.number="volumeL"
        placeholder="e.g. 18.5"
      />
      <p class="text-xs text-neutral-dark2 mt-2">
        Weight will be automatically set to the same value as volume.
      </p>
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
import { ref, onMounted, watch } from "vue";
import { listCollectionRequests, performSwap, getHousehold } from "../services/api";
import { useAuth } from "../composables/useAuth";
import InlineQRScanner from "./InlineQRScanner.vue";

const { getUserId } = useAuth();

const requests = ref([]);
const selectedRequest = ref(null);
const volumeL = ref(null);
const newContainerId = ref("");
const loading = ref(false);
const refreshing = ref(false);
const error = ref("");
const ok = ref(false);
const householdLocation = ref(null);

// Watch for selectedRequest changes to fetch household location
watch(selectedRequest, async (newRequest) => {
  householdLocation.value = null;

  if (!newRequest?.householdId) return;

  try {
    const { data } = await getHousehold(newRequest.householdId);
    if (data?.location?.latitude && data?.location?.longitude) {
      householdLocation.value = {
        latitude: data.location.latitude,
        longitude: data.location.longitude
      };
    }
  } catch (e) {
    console.error("Failed to fetch household location:", e);
  }
});

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

  if (!selectedRequest.value || !volumeL.value || !newContainerId.value) {
    error.value = "Please fill all fields: select request, volume, and new container ID";
    return;
  }

  loading.value = true;

  try {
    // Weight is automatically set to the same value as volume
    const volume = Number(volumeL.value);

    await performSwap({
      requestId: selectedRequest.value.id,
      householdId: selectedRequest.value.householdId,
      removedContainerId: selectedRequest.value.containerId,
      installedContainerId: newContainerId.value,
      volumeL: volume,
      weightKg: volume,  // Set weight equal to volume
      performedBy: getUserId() || "unknown"
    });

    ok.value = true;

    // Reset form
    setTimeout(() => {
      ok.value = false;
    }, 3000);

    volumeL.value = null;
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

function navigateToLocation() {
  if (!householdLocation.value) return;

  const { latitude, longitude } = householdLocation.value;
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  // Open in new tab/window (works on both desktop and mobile)
  window.open(mapsUrl, '_blank');
}

onMounted(refresh);
</script>
