import { ref, computed } from 'vue'
import { login as apiLogin } from '../services/api'

const user = ref(null)
const loading = ref(false)
const error = ref(null)

// Load user from localStorage on init
const storedUser = localStorage.getItem('ground-team-user')
if (storedUser) {
    try {
        user.value = JSON.parse(storedUser)
    } catch (e) {
        localStorage.removeItem('ground-team-user')
    }
}

export function useAuth() {
    const isAuthenticated = computed(() => !!user.value)

    async function login(username, password) {
        loading.value = true
        error.value = null

        try {
            const { data } = await apiLogin(username, password)

            if (data.ok && data.userId) {
                user.value = {
                    userId: data.userId,
                    username: data.username || username
                }
                localStorage.setItem('ground-team-user', JSON.stringify(user.value))
                return true
            } else {
                error.value = 'Login failed'
                return false
            }
        } catch (e) {
            error.value = e?.response?.data?.detail || 'Invalid credentials'
            return false
        } finally {
            loading.value = false
        }
    }

    function logout() {
        user.value = null
        localStorage.removeItem('ground-team-user')
    }

    function getCurrentUser() {
        return user.value
    }

    function getUserId() {
        return user.value?.userId || null
    }

    return {
        user: computed(() => user.value),
        isAuthenticated,
        loading: computed(() => loading.value),
        error: computed(() => error.value),
        login,
        logout,
        getCurrentUser,
        getUserId
    }
}
