import { ref } from 'vue'

export function useGeolocation() {
    const location = ref(null)
    const loading = ref(false)
    const error = ref(null)

    async function getCurrentLocation() {
        loading.value = true
        error.value = null
        location.value = null

        if (!navigator.geolocation) {
            error.value = 'Geolocation is not supported by your browser'
            loading.value = false
            return null
        }

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    location.value = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                    loading.value = false
                    resolve(location.value)
                },
                (err) => {
                    error.value = err.message || 'Unable to retrieve location'
                    loading.value = false
                    reject(err)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            )
        })
    }

    return {
        location,
        loading,
        error,
        getCurrentLocation
    }
}
