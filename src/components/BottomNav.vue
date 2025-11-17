<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-card shadow-lg z-50">
    <div class="flex justify-around items-center h-16">
      <router-link
        to="/"
        class="nav-item"
        :class="{ active: currentRoute === '/' }"
      >
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="nav-label">Home</span>
      </router-link>

      <router-link
        to="/adhoc"
        class="nav-item"
        :class="{ active: currentRoute === '/adhoc' }"
      >
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span class="nav-label">Ad-hoc</span>
      </router-link>

      <router-link
        to="/deploy"
        class="nav-item"
        :class="{ active: currentRoute === '/deploy' }"
      >
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span class="nav-label">Deploy</span>
      </router-link>

      <router-link
        to="/collections"
        class="nav-item"
        :class="{ active: currentRoute === '/collections' }"
      >
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <span class="nav-label">Collect</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.path)
</script>

<style scoped>
.nav-item {
  @apply flex flex-col items-center justify-center flex-1 py-2 text-neutral-dark2 transition-colors;
}

.nav-item.active {
  @apply text-primary-blue;
}

.nav-item:hover {
  @apply text-primary-blueTint;
}

.nav-icon {
  @apply w-6 h-6 mb-1;
}

.nav-label {
  @apply text-xs font-medium;
}

.nav-item.active .nav-icon {
  @apply stroke-[2.5];
}
</style>
