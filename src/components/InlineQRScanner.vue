<template>
  <!-- Camera Button -->
  <button
    type="button"
    @click="openScanner"
    class="btn btn-secondary flex items-center gap-2"
    :disabled="scanning"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    Scan
  </button>

  <!-- Modal Scanner -->
  <Teleport to="body">
    <div
      v-if="scanning"
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      @click.self="closeScanner"
    >
      <div class="bg-white rounded-2xl max-w-md w-full overflow-hidden">
        <!-- Header -->
        <div class="bg-primary-blue text-white p-4 flex items-center justify-between">
          <h3 class="font-bold">Scan Container QR Code</h3>
          <button @click="closeScanner" class="text-white hover:text-neutral-card">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Scanner -->
        <div class="p-4">
          <div v-if="error" class="text-accent-coral text-sm mb-3 bg-accent-coral/10 p-3 rounded-xl">
            {{ error }}
          </div>

          <div v-if="success" class="text-green-700 text-sm mb-3 bg-green-100 p-3 rounded-xl flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Container ID captured!
          </div>

          <video
            ref="videoRef"
            class="w-full rounded-xl bg-black aspect-square object-cover"
            autoplay
            muted
            playsinline
          ></video>

          <p class="text-xs text-neutral-dark2 mt-3 text-center">
            Point camera at container QR code
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { BrowserMultiFormatReader } from "@zxing/browser";

const emit = defineEmits(['scanned'])

const videoRef = ref(null);
const reader = ref(null);
const scanning = ref(false);
const error = ref("");
const success = ref(false);

function extractContainerId(text) {
  try {
    // Try to parse as URL
    const url = new URL(text);
    const containerId = url.searchParams.get('containerId');
    if (containerId) {
      return containerId;
    }
  } catch (e) {
    // Not a valid URL, might be just the container ID
  }

  // If it's not a URL or no containerId param, return the text as-is
  // (in case QR contains just the container ID)
  return text;
}

async function openScanner() {
  scanning.value = true;
  error.value = "";
  success.value = false;

  try {
    if (!reader.value) {
      reader.value = new BrowserMultiFormatReader();
    }

    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for modal to render

    const controls = await reader.value.decodeFromVideoDevice(
      null,
      videoRef.value,
      (result, err) => {
        if (result) {
          const scannedText = result.getText();
          const containerId = extractContainerId(scannedText);

          success.value = true;
          emit('scanned', containerId);

          // Close scanner after a brief delay
          setTimeout(() => {
            closeScanner();
          }, 800);
        }
      }
    );

    // Store controls for cleanup
    videoRef.value._controls = controls;
  } catch (e) {
    error.value = "Camera error: " + (e?.message || e);
  }
}

function closeScanner() {
  try {
    videoRef.value?._controls?.stop();
  } catch {}
  scanning.value = false;
  success.value = false;
  error.value = "";
}

onBeforeUnmount(() => {
  closeScanner();
});
</script>
