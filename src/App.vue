<template>
  <div class="min-h-screen bg-neutral-canvas font-lato">
    <!-- Main Content -->
    <main class="min-h-screen">
      <router-view />
    </main>

    <!-- Bottom Navigation (only show when authenticated and not on login page) -->
    <BottomNav v-if="isAuthenticated && !isLoginPage" />

    <!-- Logout Button (floating, only on non-home pages) -->
    <button
      v-if="isAuthenticated && !isLoginPage && !isHomePage"
      @click="handleLogout"
      class="fixed top-4 right-4 z-40 bg-white text-primary-blue px-4 py-2 rounded-xl shadow-lg text-sm font-semibold hover:bg-neutral-card transition"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()
const router = useRouter()
const { isAuthenticated, logout } = useAuth()

const isLoginPage = computed(() => route.path === '/login')
const isHomePage = computed(() => route.path === '/')

function handleLogout() {
  logout()
  router.push('/login')
}
</script>
