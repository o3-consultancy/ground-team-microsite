<template>
  <section class="max-w-md mx-auto px-4 py-16">
    <div class="card">
      <div class="text-center mb-8">
        <img
          src="../assets/logo.png"
          alt="HomeBase Logo"
          class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white p-2 shadow-soft"
        />
        <h2 class="text-2xl font-bold text-primary-blue">Ground Team Login</h2>
        <p class="text-neutral-dark2 text-sm mt-2">
          Sign in to access deployments and collections
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="label">Username</label>
          <input
            class="input"
            v-model.trim="username"
            placeholder="Enter your username"
            required
            autocomplete="username"
          />
        </div>

        <div>
          <label class="label">Password</label>
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
            autocomplete="current-password"
          />
        </div>

        <div v-if="authError" class="text-sm text-accent-coral bg-accent-coral/10 p-3 rounded-xl">
          {{ authError }}
        </div>

        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="authLoading || !username || !password"
        >
          {{ authLoading ? "Signing in..." : "Sign In" }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login, loading: authLoading, error: authError } = useAuth()

const username = ref('')
const password = ref('')

async function handleLogin() {
  const success = await login(username.value, password.value)
  if (success) {
    router.push('/')
  }
}
</script>
