<template>
  <div class="card">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-semibold text-primary-blue">Scan QR</h3>
      <button class="btn btn-secondary" @click="toggle">
        {{ running ? "Stop" : "Start" }} Scanner
      </button>
    </div>

    <div v-if="error" class="text-accent-coral text-sm mb-3">{{ error }}</div>

    <video
      ref="videoRef"
      class="w-full rounded-xl bg-black/10"
      autoplay
      muted
      playsinline
    ></video>

    <div class="mt-3 flex gap-2 items-center">
      <label class="label">Last code:</label>
      <span class="font-mono text-sm">{{ lastText || "—" }}</span>
      <button
        v-if="lastText"
        class="btn btn-primary ml-auto"
        @click="$emit('result', lastText)"
      >
        Use Code
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { BrowserMultiFormatReader } from "@zxing/browser";

const videoRef = ref(null);
const reader = ref(null);
const running = ref(false);
const error = ref("");
const lastText = ref("");

async function start() {
  error.value = "";
  try {
    if (!reader.value) reader.value = new BrowserMultiFormatReader();
    const controls = await reader.value.decodeFromVideoDevice(
      null,
      videoRef.value,
      (result, err) => {
        if (result) lastText.value = result.getText();
      }
    );
    running.value = true;
    // keep ref to stop later
    videoRef.value._controls = controls;
  } catch (e) {
    error.value = "Camera error: " + (e?.message || e);
  }
}

function stop() {
  try {
    videoRef.value?._controls?.stop();
  } catch {}
  running.value = false;
}

function toggle() {
  running.value ? stop() : start();
}

onMounted(() => {});
onBeforeUnmount(() => stop());
</script>
