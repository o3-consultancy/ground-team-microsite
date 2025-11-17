<template>
  <div class="space-y-6">
    <!-- Pending Deployments Card -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-primary-blue">My Deployment Tasks</h3>
          <p class="text-sm text-neutral-dark2 mt-1">
            Containers assigned to you by the OMS team
          </p>
        </div>
        <button
          class="btn btn-secondary"
          @click="loadDeployments"
          :disabled="loading"
        >
          {{ loading ? "Loading..." : "Refresh" }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
        <p class="text-sm text-neutral-dark2 mt-2">Loading deployment tasks...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-sm text-accent-coral bg-accent-coral/10 p-4 rounded-xl">
        <p class="font-semibold mb-2">Error loading deployments</p>
        <p>{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="pendingDeployments.length === 0" class="text-center py-12">
        <div class="w-16 h-16 bg-neutral-card rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-neutral-dark2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p class="text-neutral-dark1 font-semibold">No pending deployments</p>
        <p class="text-sm text-neutral-dark2 mt-1">All deployment tasks are completed!</p>
      </div>

      <!-- Deployments List -->
      <div v-else class="space-y-3">
        <div
          v-for="deployment in pendingDeployments"
          :key="deployment.id"
          class="border rounded-xl overflow-hidden"
          :class="{
            'border-blue-300 bg-blue-50/30': deployment.status === 'in_progress',
            'border-neutral-card': deployment.status === 'assigned'
          }"
        >
          <!-- Header -->
          <div class="bg-neutral-card p-4 flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-neutral-dark1">
                  {{ deployment.householdVilla || 'Unknown Villa' }}, {{ deployment.householdCommunity || 'Unknown Community' }}
                </h4>
                <span
                  class="text-xs font-semibold px-2 py-1 rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': deployment.status === 'assigned',
                    'bg-blue-100 text-blue-800': deployment.status === 'in_progress'
                  }"
                >
                  {{ deployment.status === 'in_progress' ? 'IN PROGRESS' : 'NEW' }}
                </span>
              </div>
              <p class="text-sm text-neutral-dark2">{{ deployment.householdAddress || 'No address' }}</p>
            </div>
          </div>

          <!-- Details -->
          <div class="p-4 space-y-3">
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p class="text-xs text-neutral-dark2">Task ID</p>
                <p class="font-mono text-xs text-neutral-dark1">{{ deployment.id }}</p>
              </div>
              <div>
                <p class="text-xs text-neutral-dark2">Assigned</p>
                <p class="font-semibold text-neutral-dark1">{{ formatDate(deployment.createdAt) }}</p>
              </div>
            </div>

            <!-- Container Input (only for in_progress) -->
            <div v-if="deployment.status === 'in_progress'">
              <label class="label">Container ID *</label>
              <div class="flex gap-2">
                <input
                  class="input flex-1"
                  v-model.trim="containerMap[deployment.id]"
                  placeholder="container_123"
                />
                <button
                  type="button"
                  @click="openScanner(deployment.id)"
                  class="btn btn-secondary px-3"
                  title="Scan QR"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2">
              <button
                v-if="deployment.status === 'assigned'"
                @click="startDeployment(deployment)"
                class="btn btn-primary flex-1"
                :disabled="actionLoading[deployment.id]"
              >
                {{ actionLoading[deployment.id] ? 'Starting...' : 'Start Deployment' }}
              </button>

              <button
                v-else-if="deployment.status === 'in_progress'"
                @click="completeDeployment(deployment)"
                class="btn btn-primary flex-1"
                :disabled="actionLoading[deployment.id] || !containerMap[deployment.id]"
              >
                {{ actionLoading[deployment.id] ? 'Completing...' : 'Complete Deployment' }}
              </button>

              <button
                @click="navigateToLocation(deployment)"
                class="btn btn-secondary"
                title="Navigate to location"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            <!-- Error message for this deployment -->
            <div v-if="deploymentErrors[deployment.id]" class="text-xs text-accent-coral bg-accent-coral/10 p-2 rounded-lg">
              {{ deploymentErrors[deployment.id] }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Completed Deployments History -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-primary-green">Deployment History</h3>
          <p class="text-sm text-neutral-dark2 mt-1">Your completed deployments</p>
        </div>
        <button
          class="text-primary-blue text-sm font-semibold hover:underline"
          @click="loadCompletedDeployments"
        >
          Refresh
        </button>
      </div>

      <div v-if="completedDeployments.length === 0" class="text-center py-8">
        <p class="text-sm text-neutral-dark2">No completed deployments yet</p>
      </div>

      <div v-else class="space-y-2">
        <div
          v-for="deployment in completedDeployments"
          :key="deployment.id"
          class="bg-neutral-card p-4 rounded-xl"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <p class="font-semibold text-neutral-dark1">
                {{ deployment.householdVilla }}, {{ deployment.householdCommunity }}
              </p>
              <p class="text-xs text-neutral-dark2 mt-1">{{ deployment.householdAddress }}</p>
              <div class="flex items-center gap-4 mt-2 text-xs">
                <span class="text-neutral-dark2">
                  <strong>Container:</strong> {{ deployment.containerId || deployment.installedContainerId || 'N/A' }}
                </span>
                <span class="text-neutral-dark2">
                  <strong>Completed:</strong> {{ formatDate(deployment.performedAt) }}
                </span>
              </div>
            </div>
            <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
              COMPLETED
            </span>
          </div>
        </div>
      </div>
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
import { listDeployments, performDeployment, updateDeploymentStatus } from "../services/api";
import { useAuth } from "../composables/useAuth";
import { BrowserMultiFormatReader } from "@zxing/browser";

const { user, getUserId } = useAuth();

const pendingDeployments = ref([]);
const completedDeployments = ref([]);
const loading = ref(false);
const error = ref("");
const containerMap = ref({});
const actionLoading = reactive({});
const deploymentErrors = reactive({});

// QR Scanner states
const scanning = ref(false);
const scanError = ref("");
const scanSuccess = ref(false);
const videoRef = ref(null);
const reader = ref(null);
const currentScanId = ref(null);

async function loadDeployments() {
  loading.value = true;
  error.value = "";
  pendingDeployments.value = [];

  try {
    const userId = user.value?.userId;
    if (!userId) {
      error.value = "User not authenticated";
      return;
    }

    const { data } = await listDeployments({
      assignedTo: userId,
      type: 'deployment_task',
      status: 'any',
      sortBy: 'createdAt',
      sortDir: 'asc',
      limit: 50
    });

    // Filter to only pending (assigned + in_progress)
    pendingDeployments.value = Array.isArray(data)
      ? data.filter(d => d.status !== 'completed')
      : [];

  } catch (e) {
    console.error('Error loading deployments:', e);
    error.value = e?.response?.data?.detail || e.message || "Failed to load deployment tasks";
  } finally {
    loading.value = false;
  }
}

async function loadCompletedDeployments() {
  try {
    const userId = user.value?.userId;
    if (!userId) return;

    // Fetch actual deployment records (not tasks) to get container ID and completion time
    const { data } = await listDeployments({
      performedBy: userId,  // Use performedBy instead of assignedTo for actual deployments
      type: 'deployment',   // Fetch actual deployments, not tasks
      sortBy: 'performedAt',
      sortDir: 'desc',
      limit: 20
    });

    completedDeployments.value = Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Error loading completed deployments:', e);
  }
}

async function startDeployment(deployment) {
  actionLoading[deployment.id] = true;
  deploymentErrors[deployment.id] = "";

  try {
    await updateDeploymentStatus(deployment.id, 'in_progress');

    // Reload to reflect status change
    await loadDeployments();
  } catch (e) {
    console.error('Error starting deployment:', e);
    deploymentErrors[deployment.id] = e?.response?.data?.detail || "Failed to start deployment";
  } finally {
    actionLoading[deployment.id] = false;
  }
}

async function completeDeployment(deployment) {
  const containerId = containerMap.value[deployment.id];

  if (!containerId) {
    deploymentErrors[deployment.id] = "Please enter or scan a container ID";
    return;
  }

  actionLoading[deployment.id] = true;
  deploymentErrors[deployment.id] = "";

  try {
    // Step 1: Perform the actual deployment
    await performDeployment({
      householdId: deployment.householdId,
      containerId: containerId,
      performedBy: getUserId() || "unknown"
    });

    // Step 2: Mark deployment task as completed
    await updateDeploymentStatus(deployment.id, 'completed');

    // Clear container input
    containerMap.value[deployment.id] = "";

    // Reload lists
    await Promise.all([
      loadDeployments(),
      loadCompletedDeployments()
    ]);

  } catch (e) {
    console.error('Error completing deployment:', e);
    deploymentErrors[deployment.id] = e?.response?.data?.detail || e.message || "Deployment failed";
  } finally {
    actionLoading[deployment.id] = false;
  }
}

function navigateToLocation(deployment) {
  const address = deployment.householdAddress ||
    `${deployment.householdVilla}, ${deployment.householdCommunity}`;

  const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
  window.open(mapsUrl, '_blank');
}

function formatDate(isoString) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
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

async function openScanner(deploymentId) {
  currentScanId.value = deploymentId;
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
  loadDeployments();
  loadCompletedDeployments();
});

onBeforeUnmount(() => {
  closeScanner();
});
</script>
