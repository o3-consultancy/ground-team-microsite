<template>
  <div class="pb-20">
    <div class="bg-primary-blue text-white py-4 px-4 sticky top-0 z-10">
      <h2 class="text-xl font-bold">Complete Collections</h2>
      <p class="text-sm opacity-80 mt-1">Collect UCO and swap containers</p>
    </div>

    <div class="px-4 py-6">
      <CollectionForm />
    </div>
  </div>
</template>

<script setup>
import CollectionForm from '../components/CollectionForm.vue'
</script>
