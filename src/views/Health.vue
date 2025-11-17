<template>
  <div class="pb-20">
    <div class="bg-primary-blue text-white py-4 px-4 sticky top-0 z-10">
      <h2 class="text-xl font-bold">API Health Check</h2>
      <p class="text-sm opacity-80 mt-1">Test connection to HomeBase API</p>
    </div>

    <div class="px-4 py-6">
      <div class="card">
        <button class="btn btn-secondary w-full" @click="check">
          {{ loading ? 'Checking...' : 'Ping API' }}
        </button>

        <div v-if="out" class="mt-4">
          <h3 class="text-sm font-semibold text-neutral-dark1 mb-2">Response:</h3>
          <pre class="text-sm bg-neutral-card p-4 rounded-xl overflow-auto">{{ out }}</pre>
        </div>

        <div v-if="status" class="mt-4 flex items-center gap-2">
          <div :class="['w-3 h-3 rounded-full', status === 'ok' ? 'bg-green-500' : 'bg-red-500']"></div>
          <span class="text-sm font-medium">
            {{ status === 'ok' ? 'API is healthy' : 'API connection failed' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { checkHealth } from "../services/api";

const out = ref("");
const loading = ref(false);
const status = ref(null);

async function check() {
  loading.value = true;
  status.value = null;
  out.value = "";

  try {
    const { data } = await checkHealth();
    out.value = JSON.stringify(data, null, 2);
    status.value = data.ok ? 'ok' : 'error';
  } catch (e) {
    out.value = e?.response?.data?.detail || e?.message || "Error";
    status.value = 'error';
  } finally {
    loading.value = false;
  }
}
</script>
