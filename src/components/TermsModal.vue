<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="close"
    >
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="bg-primary-blue text-white py-4 px-6 flex items-center justify-between flex-shrink-0">
          <h2 class="text-xl font-bold">Terms and Conditions for UCO Collection Services</h2>
          <button @click="close" class="text-white/80 hover:text-white transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="overflow-y-auto flex-1 p-6">
          <p class="text-neutral-dark2 mb-6">
            Please read these terms carefully before using our services.
          </p>

          <div class="space-y-6 text-neutral-dark1">
            <!-- Section 1 -->
            <div>
              <h3 class="text-xl font-semibold text-primary-blue mb-3">
                1. Service Overview
              </h3>
              <p class="text-neutral-dark2 leading-relaxed">
                Neutral Fuels Waste Management - Sole Proprietorship LLC ("Neutral Fuels") collects used cooking oil ("UCO") in the UAE to produce biodiesel. Neutral Fuels has agreed that it will provide Red Crescent with 0.35AED for every litre of oil collected from residential homes in Abu Dhabi.
              </p>
              <p class="text-neutral-dark2 leading-relaxed mt-3">
                These terms and conditions govern the Customer's use of Neutral Fuels' UCO collection services. By using our UCO collection services, Customers agree to comply with and be bound by these terms and conditions.
              </p>
            </div>

            <!-- Section 2 -->
            <div>
              <h3 class="text-xl font-semibold text-primary-blue mb-3">
                2. Provision of Containers for UCO Collection
              </h3>
              <p class="text-neutral-dark2 leading-relaxed">
                The containers provided for the collection of UCO are the property of Neutral Fuels and remain the property of Neutral Fuels whilst on the Customer's premises. These containers cannot be used for any other purpose other than for storing UCO which will be collected by Neutral Fuels.
              </p>
              <p class="text-neutral-dark2 leading-relaxed mt-3">
                Only UCO must be placed in the container provided. Customers must follow instructions provided by Neutral Fuels with regards storing the UCO in its containers. The UCO should not contain any water or food and must be purely cooking oil. If other substances are placed in the container, Neutral Fuels reserves the right to refuse collection from the Customer and will remove the container from the Customer's premises.
              </p>
              <p class="text-neutral-dark2 leading-relaxed mt-3">
                The Customer is responsible for the containers whilst on their premises. The Customer is responsible for any risks associated with the container being stored on their premises (including loss of the UCO) and the Customer hereby indemnifies Neutral Fuels against all third-party claims howsoever arising in relation to the storage of UCO in Neutral Fuels containers on their premises.
              </p>
            </div>

            <!-- Section 3 -->
            <div>
              <h3 class="text-xl font-semibold text-primary-blue mb-3">
                3. Collection and Pick-up
              </h3>
              <p class="text-neutral-dark2 leading-relaxed">
                Scheduled pickups will be conducted once per month. The customer will be informed of the time of collection by WhatsApp. Upon collection of the UCO, the customer will be provided with a replacement empty container.
              </p>
              <p class="text-neutral-dark2 leading-relaxed mt-3">
                To initiate the first collection, when the container is half full, the customer must scan the QR code provided by Neutral Fuels, and their property will be added to the once monthly collection for their area.
              </p>
            </div>

            <!-- Section 4 -->
            <div>
              <h3 class="text-xl font-semibold text-primary-blue mb-3">
                4. Privacy Policy
              </h3>
              <p class="text-neutral-dark2 leading-relaxed">
                Customers must provide a mobile phone number, address, email address to avail themselves of the UCO collection services. Neutral Fuels respects the privacy of its Customers. Personal information collected will only be used for the purpose of providing the UCO collection services and for meeting our obligations to Red Crescent. Customer information will be shared with Red Crescent but will not be shared with any other third parties without consent.
              </p>
            </div>

            <!-- Section 5 -->
            <div>
              <h3 class="text-xl font-semibold text-primary-blue mb-3">
                5. Cancellation of Services
              </h3>
              <p class="text-neutral-dark2 leading-relaxed">
                Neutral Fuels reserves the right to cancel a planned UCO collection, or to terminate the Customer's UCO collection services in its sole discretion.
              </p>
              <p class="text-neutral-dark2 leading-relaxed mt-3">
                If UCO Collection services are terminated, Neutral Fuels has the right to remove any UCO containers that the Customer has on its premises.
              </p>
            </div>

            <!-- Section 6 -->
            <div>
              <h3 class="text-xl font-semibold text-primary-blue mb-3">
                6. Unforeseen Circumstances
              </h3>
              <p class="text-neutral-dark2 leading-relaxed">
                Neutral Fuels is not responsible for any failure or delay in the performance of its obligations due to circumstances beyond its reasonable control, including but not limited to acts of God, war, terrorism, or natural disasters.
              </p>
            </div>

            <!-- Section 7 -->
            <div>
              <h3 class="text-xl font-semibold text-primary-blue mb-3">
                7. Changes to Terms and Conditions
              </h3>
              <p class="text-neutral-dark2 leading-relaxed">
                Neutral Fuels reserves the right to amend these terms and conditions at any time. Customers will be notified of any changes, and continued use of our services implies acceptance of the revised terms.
              </p>
            </div>

            <!-- Section 8 -->
            <div>
              <h3 class="text-xl font-semibold text-primary-blue mb-3">
                8. Governing Law
              </h3>
              <p class="text-neutral-dark2 leading-relaxed">
                These terms and conditions are governed by the laws of the United Arab Emirates (UAE), and any disputes will be subject to the exclusive jurisdiction of the Abu Dhabi courts.
              </p>
            </div>

            <!-- Footer -->
            <div class="mt-8 p-4 rounded-xl bg-accent-aqua/10 text-accent-midnight">
              <p class="text-neutral-dark2 leading-relaxed">
                By using Neutral Fuels' services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you have any questions, please contact us at
                <a href="mailto:info@neutralfuels.com" class="text-primary-blue hover:underline">info@neutralfuels.com</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Footer Button -->
        <div class="border-t border-neutral-card p-6 flex-shrink-0">
          <button @click="close" class="btn btn-primary w-full">
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

