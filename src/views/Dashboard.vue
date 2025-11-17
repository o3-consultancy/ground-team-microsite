<template>
  <div class="pb-20">
    <!-- Header -->
    <div class="bg-primary-blue text-white py-6 px-4">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold">HomeBase UCO</h1>
          <p class="text-sm opacity-80 mt-1">Ground Team Operations</p>
        </div>
        <img
          src="../assets/logo.png"
          alt="Logo"
          class="w-12 h-12 rounded-xl bg-white p-1"
        />
      </div>

      <div v-if="user" class="bg-white/10 rounded-xl p-3 mt-4 flex items-center justify-between">
        <div>
          <p class="text-sm opacity-80">Logged in as</p>
          <p class="font-semibold">{{ user.username }}</p>
        </div>
        <button
          @click="handleLogout"
          class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="px-4 py-6">
      <h2 class="text-lg font-semibold text-neutral-dark1 mb-4">Quick Actions</h2>

      <div class="grid grid-cols-2 gap-4">
        <router-link to="/adhoc" class="action-card">
          <div class="action-icon bg-primary-green/10 text-primary-green">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 class="font-semibold text-neutral-dark1 mt-3">Ad-hoc Signup</h3>
          <p class="text-xs text-neutral-dark2 mt-1">Create & deploy</p>
        </router-link>

        <router-link to="/deploy" class="action-card">
          <div class="action-icon bg-primary-blue/10 text-primary-blue">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="font-semibold text-neutral-dark1 mt-3">Deploy</h3>
          <p class="text-xs text-neutral-dark2 mt-1">To households</p>
        </router-link>

        <router-link to="/collections" class="action-card">
          <div class="action-icon bg-accent-aqua/10 text-accent-aqua">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 class="font-semibold text-neutral-dark1 mt-3">Collections</h3>
          <p class="text-xs text-neutral-dark2 mt-1">Collect & swap</p>
        </router-link>

        <router-link to="/delivery" class="action-card">
          <div class="action-icon bg-accent-coral/10 text-accent-coral">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>
          <h3 class="font-semibold text-neutral-dark1 mt-3">Delivery</h3>
          <p class="text-xs text-neutral-dark2 mt-1">Bulk delivery</p>
        </router-link>
      </div>

      <!-- Today's Summary -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold text-neutral-dark1 mb-4">Today's Summary</h2>

        <div v-if="statsLoading" class="card text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
          <p class="text-sm text-neutral-dark2 mt-2">Loading statistics...</p>
        </div>

        <div v-else-if="statsError" class="card">
          <div class="text-center py-4">
            <p class="text-sm text-red-600 mb-3">{{ statsError }}</p>
            <button @click="loadStats" class="btn btn-secondary">
              Try Again
            </button>
          </div>
        </div>

        <div v-else-if="stats" class="card">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold text-primary-blue">{{ stats.signups?.count || 0 }}</p>
              <p class="text-xs text-neutral-dark2 mt-1">Signups</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-primary-green">{{ stats.deployments?.count || 0 }}</p>
              <p class="text-xs text-neutral-dark2 mt-1">Deployments</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-accent-aqua">{{ stats.collections?.count || 0 }}</p>
              <p class="text-xs text-neutral-dark2 mt-1">Collections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { getTodayStats } from '../services/api'

const router = useRouter()
const { user, logout } = useAuth()

// Today's Stats
const stats = ref(null)
const statsLoading = ref(false)
const statsError = ref('')

async function loadStats() {
  if (!user.value?.userId) {
    return
  }

  statsLoading.value = true
  statsError.value = ''

  try {
    const { data } = await getTodayStats(user.value.userId, {
      timezone: 'Asia/Dubai'
    })

    stats.value = data.stats
  } catch (err) {
    console.error('Error loading today stats:', err)
    statsError.value = err.response?.data?.detail || err.message || 'Failed to load statistics'
  } finally {
    statsLoading.value = false
  }
}

function handleLogout() {
  logout()
  router.push('/login')
}

onMounted(() => {
  loadStats()
})
</script>

<style scoped>
.action-card {
  @apply bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow text-center;
}

.action-icon {
  @apply w-16 h-16 rounded-2xl flex items-center justify-center mx-auto;
}
</style>
