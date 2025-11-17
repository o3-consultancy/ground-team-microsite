<template>
  <div class="pb-20">
    <!-- Header -->
    <div class="bg-primary-blue text-white py-4 px-4 sticky top-0 z-10">
      <h2 class="text-xl font-bold">Bulk Delivery</h2>
      <p class="text-sm opacity-80 mt-1">Complete deliveries to NF facility</p>
    </div>

    <div class="px-4 py-6">
      <!-- Pending Summary Card -->
      <div class="card mb-6">
        <h3 class="text-lg font-semibold text-neutral-dark1 mb-4">Pending Deliveries</h3>

        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
          <p class="text-sm text-neutral-dark2 mt-2">Loading...</p>
        </div>

        <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p class="text-sm text-red-600">{{ error }}</p>
          <button @click="loadSummary" class="btn btn-secondary mt-3 w-full">
            Retry
          </button>
        </div>

        <div v-else-if="summary">
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-accent-aqua/10 rounded-xl p-4 text-center">
              <p class="text-3xl font-bold text-accent-aqua">{{ summary.pendingCollections || 0 }}</p>
              <p class="text-sm text-neutral-dark2 mt-1">Collections Ready</p>
            </div>
            <div class="bg-primary-green/10 rounded-xl p-4 text-center">
              <p class="text-3xl font-bold text-primary-green">{{ summary.totalVolumeL || 0 }}L</p>
              <p class="text-sm text-neutral-dark2 mt-1">Total Volume</p>
            </div>
          </div>

          <div v-if="summary.totalWeightKg" class="mb-6">
            <div class="bg-neutral-card rounded-xl p-4 text-center">
              <p class="text-2xl font-bold text-primary-blue">{{ summary.totalWeightKg }}kg</p>
              <p class="text-sm text-neutral-dark2 mt-1">Total Weight</p>
            </div>
          </div>

          <button
            @click="openDeliveryModal"
            :disabled="!summary.pendingCollections || summary.pendingCollections === 0"
            class="btn btn-primary w-full"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Complete Delivery
          </button>

          <p v-if="!summary.pendingCollections || summary.pendingCollections === 0" class="text-sm text-neutral-dark2 text-center mt-3">
            No collections ready for delivery
          </p>
        </div>
      </div>

      <!-- Recent Deliveries -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-neutral-dark1">Recent Deliveries</h3>
          <button
            @click="loadHistory"
            class="text-primary-blue text-sm font-semibold hover:underline"
          >
            Refresh
          </button>
        </div>

        <div v-if="loadingHistory" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-blue"></div>
        </div>

        <div v-else-if="historyError" class="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p class="text-sm text-red-600">{{ historyError }}</p>
        </div>

        <div v-else-if="history.length === 0" class="text-center py-8">
          <p class="text-sm text-neutral-dark2">No delivery history found</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="delivery in history"
            :key="delivery.deliveryId"
            class="bg-neutral-card rounded-xl p-4"
          >
            <div class="flex items-start justify-between mb-2">
              <div>
                <p class="font-semibold text-neutral-dark1">{{ delivery.staffName }}</p>
                <p class="text-xs text-neutral-dark2">{{ delivery.truckNumber }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-primary-blue">{{ delivery.collectionsDelivered }} collections</p>
                <p class="text-xs text-neutral-dark2">{{ delivery.totalVolumeL }}L</p>
              </div>
            </div>
            <div class="text-xs text-neutral-dark2">
              <p>{{ formatDate(delivery.deliveredAt) }}</p>
              <p v-if="delivery.comments" class="mt-1 italic">{{ delivery.comments }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delivery Modal -->
    <DeliveryModal
      :is-open="showModal"
      @close="showModal = false"
      @success="handleDeliverySuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getPendingDeliverySummary, getDeliveryHistory } from '../services/api'
import { useAuth } from '../composables/useAuth'
import DeliveryModal from '../components/DeliveryModal.vue'

const { user } = useAuth()

// State
const summary = ref(null)
const loading = ref(false)
const error = ref('')

const history = ref([])
const loadingHistory = ref(false)
const historyError = ref('')

const showModal = ref(false)

onMounted(() => {
  loadSummary()
  loadHistory()
})

async function loadSummary() {
  loading.value = true
  error.value = ''

  try {
    const userId = user.value?.userId
    if (!userId) {
      throw new Error('User not authenticated')
    }

    const { data } = await getPendingDeliverySummary(userId)
    summary.value = data
  } catch (err) {
    error.value = err.response?.data?.detail || err.message || 'Failed to load pending deliveries'
  } finally {
    loading.value = false
  }
}

async function loadHistory() {
  loadingHistory.value = true
  historyError.value = ''

  try {
    const { data } = await getDeliveryHistory({ limit: 10 })
    history.value = data.deliveries || []
  } catch (err) {
    historyError.value = err.response?.data?.detail || err.message || 'Failed to load history'
  } finally {
    loadingHistory.value = false
  }
}

function openDeliveryModal() {
  showModal.value = true
}

function handleDeliverySuccess() {
  // Reload summary and history after successful delivery
  loadSummary()
  loadHistory()
}

function formatDate(dateString) {
  if (!dateString) return 'Unknown date'

  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}
</script>
