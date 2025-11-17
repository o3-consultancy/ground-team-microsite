<template>
  <div class="card space-y-4">
    <h3 class="text-lg font-semibold text-primary-blue">Deploy Container to Household</h3>
    <p class="text-sm text-neutral-dark2">
      Deploy containers to households that are awaiting deployment
    </p>

    <div class="flex items-center gap-3">
      <button class="btn btn-secondary" @click="loadAwaitingDeployment">
        {{ loading ? "Loading..." : "Load Pending Deployments" }}
      </button>
    </div>

    <div v-if="error" class="text-sm text-accent-coral bg-accent-coral/10 p-3 rounded-xl">
      {{ error }}
    </div>

    <div v-if="rows.length" class="border rounded-xl overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-neutral-card">
          <tr>
            <th class="text-left p-3">Name</th>
            <th class="text-left p-3">Villa</th>
            <th class="text-left p-3">Community</th>
            <th class="text-left p-3">Address</th>
            <th class="text-left p-3">Container ID</th>
            <th class="text-left p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in rows" :key="s.id" class="border-t">
            <td class="p-3">{{ s.fullName }}</td>
            <td class="p-3">{{ s.villaNumber || '-' }}</td>
            <td class="p-3">{{ s.community || '-' }}</td>
            <td class="p-3">{{ s.addressText }}</td>
            <td class="p-3">
              <div class="flex gap-2">
                <input
                  class="input text-sm flex-1"
                  v-model.trim="containerMap[s.id]"
                  placeholder="container_123"
                />
                <button
                  type="button"
                  @click="openScanner(s.id)"
                  class="btn btn-secondary text-sm px-3"
                  title="Scan QR"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </td>
            <td class="p-3">
              <button
                class="btn btn-primary text-sm"
                @click="deploy(s)"
                :disabled="deploying[s.id]"
              >
                {{ deploying[s.id] ? "Deploying..." : "Deploy" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="!loading && searched" class="text-sm text-neutral-dark2 text-center py-8">
      No signups awaiting deployment
    </div>

    <!-- QR Scanner Modal -->
    <Teleport to="body">
      <div
        v-if="scanning"
        class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        @click.self="closeScanner"
      >
        <div class="bg-white rounded-2xl max-w-md w-full overflow-hidden">
          <div class="bg-primary-blue text-white p-4 flex items-center justify-between">
            <h3 class="font-bold">Scan Container QR Code</h3>
            <button @click="closeScanner" class="text-white hover:text-neutral-card">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-4">
            <div v-if="scanError" class="text-accent-coral text-sm mb-3 bg-accent-coral/10 p-3 rounded-xl">
              {{ scanError }}
            </div>

            <div v-if="scanSuccess" class="text-green-700 text-sm mb-3 bg-green-100 p-3 rounded-xl flex items-center gap-2">
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { listAwaitingDeployment, performDeployment } from "../services/api";
import { useAuth } from "../composables/useAuth";
import { BrowserMultiFormatReader } from "@zxing/browser";

const { getUserId } = useAuth();

const rows = ref([]);
const loading = ref(false);
const error = ref("");
const containerMap = ref({});
const deploying = reactive({});
const searched = ref(false);

// QR Scanner states
const scanning = ref(false);
const scanError = ref("");
const scanSuccess = ref(false);
const videoRef = ref(null);
const reader = ref(null);
const currentScanId = ref(null);

async function loadAwaitingDeployment() {
  loading.value = true;
  error.value = "";
  rows.value = [];
  searched.value = false;

  try {
    const { data } = await listAwaitingDeployment();
    rows.value = Array.isArray(data) ? data : (data?.items || []);
    searched.value = true;
  } catch (e) {
    error.value = e?.response?.data?.detail || "Failed to load signups";
  } finally {
    loading.value = false;
  }
}

async function deploy(signup) {
  const containerId = containerMap.value[signup.id];

  if (!containerId) {
    error.value = "Please enter a container ID";
    return;
  }

  // Check if signup has a household ID
  if (!signup.householdId && !signup.household?.id) {
    error.value = "This signup doesn't have a household assigned yet";
    return;
  }

  const householdId = signup.householdId || signup.household?.id;

  deploying[signup.id] = true;
  error.value = "";

  try {
    await performDeployment({
      householdId,
      containerId,
      performedBy: getUserId() || "unknown"
    });

    // Clear the container input
    containerMap.value[signup.id] = "";

    // Reload the list
    await loadAwaitingDeployment();
  } catch (e) {
    error.value = e?.response?.data?.detail || "Deployment failed";
  } finally {
    deploying[signup.id] = false;
  }
}

// QR Scanner functions
function extractContainerId(text) {
  try {
    const url = new URL(text);
    const containerId = url.searchParams.get('containerId');
    if (containerId) return containerId;
  } catch (e) {
    // Not a URL, return as-is
  }
  return text;
}

async function openScanner(signupId) {
  currentScanId.value = signupId;
  scanning.value = true;
  scanError.value = "";
  scanSuccess.value = false;

  try {
    if (!reader.value) {
      reader.value = new BrowserMultiFormatReader();
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    const controls = await reader.value.decodeFromVideoDevice(
      null,
      videoRef.value,
      (result, err) => {
        if (result) {
          const scannedText = result.getText();
          const containerId = extractContainerId(scannedText);

          containerMap.value[currentScanId.value] = containerId;
          scanSuccess.value = true;

          setTimeout(() => {
            closeScanner();
          }, 800);
        }
      }
    );

    videoRef.value._controls = controls;
  } catch (e) {
    scanError.value = "Camera error: " + (e?.message || e);
  }
}

function closeScanner() {
  try {
    videoRef.value?._controls?.stop();
  } catch {}
  scanning.value = false;
  scanSuccess.value = false;
  scanError.value = "";
  currentScanId.value = null;
}

onMounted(() => {
  loadAwaitingDeployment();
});

onBeforeUnmount(() => {
  closeScanner();
});
</script>
