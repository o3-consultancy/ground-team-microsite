<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="close">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <!-- Header -->
        <div class="bg-primary-blue text-white py-4 px-6 flex items-center justify-between">
          <h2 class="text-xl font-bold">
            {{ step === 1 ? 'Verify Staff' : step === 2 ? 'Delivery Details' : 'Delivery Complete' }}
          </h2>
          <button @click="close" class="text-white/80 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Step 1: Staff Verification -->
        <div v-if="step === 1" class="p-6">
          <p class="text-sm text-neutral-dark2 mb-4">Enter the NF staff member's employee number to verify their identity.</p>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-neutral-dark1 mb-2">NF Staff Employee Number</label>
            <input
              v-model="employeeNumber"
              type="text"
              placeholder="e.g., 392200"
              class="input"
              @keyup.enter="verifyStaffMember"
            />
          </div>

          <div v-if="verificationError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p class="text-sm text-red-600">{{ verificationError }}</p>
          </div>

          <button
            @click="verifyStaffMember"
            :disabled="!employeeNumber || verifying"
            class="btn btn-primary w-full"
          >
            {{ verifying ? 'Verifying...' : 'Verify Staff' }}
          </button>
        </div>

        <!-- Step 2: Delivery Details -->
        <div v-if="step === 2" class="p-6">
          <div class="mb-4 p-3 bg-primary-green/10 rounded-xl">
            <p class="text-sm text-neutral-dark2">Staff verified:</p>
            <p class="font-semibold text-neutral-dark1">{{ staffName }}</p>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-neutral-dark1 mb-2">Truck Number *</label>
            <input
              v-model="truckNumber"
              type="text"
              placeholder="e.g., TRUCK-001"
              class="input"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-neutral-dark1 mb-2">Comments (Optional)</label>
            <textarea
              v-model="comments"
              rows="3"
              placeholder="Any additional notes about this delivery..."
              class="input resize-none"
            ></textarea>
          </div>

          <div v-if="pendingSummary" class="mb-4 p-3 bg-accent-aqua/10 rounded-xl">
            <p class="text-sm font-semibold text-neutral-dark1 mb-2">Pending Deliveries:</p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p class="text-neutral-dark2">Collections:</p>
                <p class="font-bold text-accent-aqua">{{ pendingSummary.pendingCollections || 0 }}</p>
              </div>
              <div>
                <p class="text-neutral-dark2">Total Volume:</p>
                <p class="font-bold text-accent-aqua">{{ pendingSummary.totalVolumeL || 0 }}L</p>
              </div>
            </div>
          </div>

          <div v-if="deliveryError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p class="text-sm text-red-600">{{ deliveryError }}</p>
          </div>

          <div class="flex gap-3">
            <button
              @click="step = 1"
              class="btn btn-secondary flex-1"
            >
              Back
            </button>
            <button
              @click="submitDelivery"
              :disabled="!truckNumber || submitting"
              class="btn btn-primary flex-1"
            >
              {{ submitting ? 'Submitting...' : 'Complete Delivery' }}
            </button>
          </div>
        </div>

        <!-- Step 3: Success -->
        <div v-if="step === 3" class="p-6 text-center">
          <div class="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 class="text-xl font-bold text-neutral-dark1 mb-2">Delivery Complete!</h3>
          <p class="text-sm text-neutral-dark2 mb-6">Your delivery has been successfully recorded.</p>

          <div v-if="deliveryResult" class="bg-neutral-card rounded-xl p-4 mb-6 text-left">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-neutral-dark2">Collections Delivered:</p>
                <p class="font-bold text-primary-blue">{{ deliveryResult.collectionsDelivered || 0 }}</p>
              </div>
              <div>
                <p class="text-neutral-dark2">Total Volume:</p>
                <p class="font-bold text-primary-blue">{{ deliveryResult.totalVolumeL || 0 }}L</p>
              </div>
              <div>
                <p class="text-neutral-dark2">UCO Collection ID:</p>
                <p class="font-semibold text-neutral-dark1 text-xs break-all">{{ deliveryResult.nfUcoCollectionId || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-neutral-dark2">Delivery ID:</p>
                <p class="font-semibold text-neutral-dark1 text-xs break-all">{{ deliveryResult.nfUcoDeliveryId || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <button
            @click="closeAndReset"
            class="btn btn-primary w-full"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { verifyStaff, completeDelivery, getPendingDeliverySummary } from '../services/api'
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])

// State
const step = ref(1)
const employeeNumber = ref('')
const staffId = ref(null)
const staffName = ref('')
const truckNumber = ref('')
const comments = ref('')
const pendingSummary = ref(null)
const deliveryResult = ref(null)

// Loading & errors
const verifying = ref(false)
const verificationError = ref('')
const submitting = ref(false)
const deliveryError = ref('')

// Watch for modal open to load pending summary
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    await loadPendingSummary()
  }
})

async function loadPendingSummary() {
  try {
    const userId = user.value?.userId
    if (!userId) {
      console.error('User not authenticated')
      return
    }

    const { data } = await getPendingDeliverySummary(userId)
    pendingSummary.value = data
  } catch (error) {
    console.error('Failed to load pending summary:', error)
  }
}

async function verifyStaffMember() {
  if (!employeeNumber.value) return

  verifying.value = true
  verificationError.value = ''

  try {
    const { data } = await verifyStaff(employeeNumber.value)

    // API returns: { valid: true/false, staffId: 123, staffName: "Name", message: "..." }
    if (data.valid && data.staffId) {
      // CRITICAL: Store staffId (internal ID), NOT employeeNumber
      // employeeNumber (e.g., 392200) is user-facing
      // staffId (e.g., 123) is what UCO API uses internally
      staffId.value = data.staffId
      staffName.value = data.staffName

      console.log('Staff verified successfully:')
      console.log('  Employee Number (user input):', employeeNumber.value)
      console.log('  Staff ID (for API):', data.staffId)
      console.log('  Staff Name:', data.staffName)

      step.value = 2
    } else {
      verificationError.value = data.message || 'Staff verification failed'
    }
  } catch (error) {
    verificationError.value = error.response?.data?.detail || error.message || 'Verification failed'
  } finally {
    verifying.value = false
  }
}

async function submitDelivery() {
  if (!truckNumber.value) return

  submitting.value = true
  deliveryError.value = ''

  try {
    const userId = user.value?.userId
    if (!userId) {
      deliveryError.value = 'User not authenticated'
      submitting.value = false
      return
    }

    const payload = {
      staffId: staffId.value,  // CRITICAL: Using staffId (internal ID like 123), NOT employeeNumber
      staffName: staffName.value,
      truckNumber: truckNumber.value,
      assignedTo: userId
    }

    if (comments.value) {
      payload.comments = comments.value
    }

    console.log('Submitting delivery with payload:', {
      staffId: staffId.value,
      staffName: staffName.value,
      truckNumber: truckNumber.value,
      assignedTo: userId
    })

    const { data } = await completeDelivery(payload)

    // API returns: { success: true, ucoCollectionId, ucoDeliveryId, collectionsDelivered, totalVolume, message }
    if (data.success) {
      deliveryResult.value = {
        collectionsDelivered: data.collectionsDelivered,
        totalVolumeL: data.totalVolume,  // API returns totalVolume (not totalVolumeL)
        nfUcoCollectionId: data.ucoCollectionId,
        nfUcoDeliveryId: data.ucoDeliveryId
      }
      step.value = 3
      emit('success', data)
    } else {
      deliveryError.value = data.message || 'Delivery submission failed'
    }
  } catch (error) {
    deliveryError.value = error.response?.data?.detail || error.message || 'Delivery failed'
  } finally {
    submitting.value = false
  }
}

function close() {
  emit('close')
}

function closeAndReset() {
  // Reset all state
  step.value = 1
  employeeNumber.value = ''
  staffId.value = null
  staffName.value = ''
  truckNumber.value = ''
  comments.value = ''
  pendingSummary.value = null
  deliveryResult.value = null
  verificationError.value = ''
  deliveryError.value = ''

  emit('close')
}
</script>
