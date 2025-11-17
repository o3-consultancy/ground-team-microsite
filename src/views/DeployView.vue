<template>
  <div class="pb-20">
    <div class="bg-primary-blue text-white py-4 px-4 sticky top-0 z-10">
      <h2 class="text-xl font-bold">Deploy Containers</h2>
      <p class="text-sm opacity-80 mt-1">Deploy to households awaiting deployment</p>
    </div>

    <div class="px-4 py-6">
      <DeployForm />
    </div>
  </div>
</template>

<script setup>
import DeployForm from '../components/DeployForm.vue'
</script>
