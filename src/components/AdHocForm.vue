<template>
  <div class="card space-y-4">
    <h3 class="text-lg font-semibold text-primary-blue">
      Ad-hoc Signup + Deploy
    </h3>

    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="label">Full name *</label>
        <input
          class="input"
          v-model.trim="form.fullName"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label class="label">Phone *</label>
        <input
          class="input"
          v-model.trim="form.phone"
          placeholder="+97150000000"
        />
      </div>
      <div>
        <label class="label">Email</label>
        <input
          class="input"
          type="email"
          v-model.trim="form.email"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label class="label">Villa Number *</label>
        <input
          class="input"
          v-model.trim="form.villaNumber"
          placeholder="V12"
        />
      </div>
      <div>
        <label class="label">Community *</label>
        <input
          class="input"
          v-model.trim="form.community"
          placeholder="Al Falah 1A"
        />
      </div>
      <div>
        <label class="label">Address (text) *</label>
        <input
          class="input"
          v-model.trim="form.addressText"
          placeholder="Street X, Villa 12"
        />
      </div>

      <div>
        <label class="label">Latitude *</label>
        <div class="flex gap-2">
          <input
            class="input flex-1"
            v-model.number="form.location.latitude"
            placeholder="24.4462"
            :disabled="geoLoading"
          />
          <button
            class="btn btn-secondary"
            @click="captureLocation"
            :disabled="geoLoading"
            type="button"
          >
            {{ geoLoading ? "..." : "📍" }}
          </button>
        </div>
      </div>
      <div>
        <label class="label">Longitude *</label>
        <input
          class="input"
          v-model.number="form.location.longitude"
          placeholder="54.7169"
          :disabled="geoLoading"
        />
      </div>
      <div v-if="geoError" class="md:col-span-2 text-sm text-accent-coral">
        {{ geoError }}
      </div>

      <div class="md:col-span-2">
        <label class="label">Container ID to deploy *</label>
        <div class="flex gap-2">
          <input
            class="input flex-1"
            v-model.trim="containerId"
            placeholder="container_123"
          />
          <InlineQRScanner @scanned="(id) => containerId = id" />
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3 pt-2">
      <button class="btn btn-primary" :disabled="loading" @click="submit">
        {{ loading ? "Processing…" : "Create & Deploy" }}
      </button>
      <p class="text-sm text-accent-coral" v-if="error">{{ error }}</p>
      <p class="text-sm text-green-700" v-if="ok">Done! Signup created and container deployed.</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { adHocDeploy } from "../services/api";
import { useAuth } from "../composables/useAuth";
import { useGeolocation } from "../composables/useGeolocation";
import InlineQRScanner from "./InlineQRScanner.vue";

const { getUserId } = useAuth();
const { getCurrentLocation, loading: geoLoading, error: geoError } = useGeolocation();

const form = reactive({
  fullName: "",
  phone: "",
  email: "",
  villaNumber: "",
  community: "",
  addressText: "",
  location: { latitude: null, longitude: null },
});

const containerId = ref("");
const loading = ref(false);
const error = ref("");
const ok = ref(false);

async function captureLocation() {
  try {
    const location = await getCurrentLocation();
    if (location) {
      form.location.latitude = location.latitude;
      form.location.longitude = location.longitude;
    }
  } catch (e) {
    // Error is already set in useGeolocation
  }
}

async function submit() {
  error.value = "";
  ok.value = false;

  if (
    !form.fullName ||
    !form.phone ||
    !form.villaNumber ||
    !form.community ||
    !form.addressText ||
    !form.location.latitude ||
    !form.location.longitude ||
    !containerId.value
  ) {
    error.value = "Please fill all required fields (marked with *)";
    return;
  }

  loading.value = true;
  try {
    await adHocDeploy({
      fullName: form.fullName,
      phone: form.phone,
      email: form.email || undefined,
      villaNumber: form.villaNumber,
      community: form.community,
      addressText: form.addressText,
      location: form.location,
      containerId: containerId.value,
      performedBy: getUserId() || "unknown"
    });

    ok.value = true;

    // Reset form
    setTimeout(() => {
      ok.value = false;
    }, 3000);

    containerId.value = "";
    form.fullName = "";
    form.phone = "";
    form.email = "";
    form.villaNumber = "";
    form.community = "";
    form.addressText = "";
    form.location.latitude = null;
    form.location.longitude = null;
  } catch (e) {
    error.value = e?.response?.data?.detail || "Operation failed";
  } finally {
    loading.value = false;
  }
}
</script>
