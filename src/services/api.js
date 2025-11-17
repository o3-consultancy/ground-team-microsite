import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE, // https://homebase-api.neutralfuels.net/api
    timeout: 15000,
})

api.interceptors.request.use((config) => {
    const key = import.meta.env.VITE_API_KEY
    if (key) config.headers['x-api-key'] = key
    config.headers['Content-Type'] = 'application/json'
    return config
})

// Response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log errors in development
        if (import.meta.env.DEV) {
            console.error('API Error:', error.response?.data || error.message)
        }
        return Promise.reject(error)
    }
)

/** HEALTH */
export function checkHealth() {
    return api.get('/health')
}

/** AUTH */
export function login(username, password) {
    return api.post('/auth/login', { username, password })
}

/** USERS */
export function createUser(username, password) {
    return api.post('/users', { username, password })
}
export function listUsers(params = {}) {
    return api.get('/users', { params })
}
export function getUser(userId) {
    return api.get(`/users/${userId}`)
}
export function updateUser(userId, payload) {
    return api.patch(`/users/${userId}`, payload)
}
export function deleteUser(userId) {
    return api.delete(`/users/${userId}`)
}

/** SIGNUPS */
export function createSignup(payload) {
    return api.post('/signups', payload)
}
export function listSignups(params = {}) {
    return api.get('/signups', { params })
}
export function listAllSignups(params = {}) {
    return api.get('/signups/all', { params })
}
export function listAwaitingDeployment() {
    return api.get('/signups/awaiting-deployment')
}
export function batchAwaitingDeployment(signupIds) {
    return api.post('/signups/awaiting-deployment/batch', { signupIds })
}
export function adHocDeploy(payload) {
    // Creates signup + household + deployment in one operation
    return api.post('/signups/ad-hoc-deploy', payload)
}
export function batchUpdateSignupStatus(items) {
    return api.patch('/signups/status/batch', { items })
}

/** HOUSEHOLDS */
export function createHousehold(payload) {
    return api.post('/households', payload)
}
export function getHousehold(householdId) {
    return api.get(`/households/${householdId}`)
}
export function listHouseholds(params = {}) {
    return api.get('/households', { params })
}
export function getHouseholdHistory(householdId) {
    return api.get(`/households/${householdId}/history`)
}

/** CONTAINERS */
export function createContainer(payload) {
    return api.post('/containers', payload)
}
export function getContainer(containerId) {
    return api.get(`/containers/${containerId}`)
}
export function listContainers(params = {}) {
    return api.get('/containers', { params })
}
export function getContainerHistory(containerId) {
    return api.get(`/containers/${containerId}/history`)
}

/** DEPLOYMENTS */
export function performDeployment(payload) {
    // { householdId, containerId, performedBy }
    return api.post('/deployments/perform', payload)
}
export function assignDeploymentTask(payload) {
    // { householdId, assignedTo, notes? }
    return api.post('/deployments/assign', payload)
}
export function listDeployments(params = {}) {
    return api.get('/deployments', { params })
}
export function reassignDeployment(deploymentId, assignedTo) {
    return api.patch(`/deployments/${deploymentId}/assign`, { assignedTo })
}
export function updateDeploymentStatus(deploymentId, status) {
    return api.patch(`/deployments/${deploymentId}/status`, { status })
}
export function performSwap(payload) {
    // { requestId, householdId, removedContainerId, installedContainerId, volumeL, weightKg, performedBy }
    return api.post('/deployments/swap', payload)
}

/** COLLECTION REQUESTS */
export function createCollectionRequest(payload, sig = null) {
    const params = sig ? { sig } : {}
    return api.post('/collection-requests', payload, { params })
}
export function listCollectionRequests(params = {}) {
    return api.get('/collection-requests', { params })
}
export function checkPendingCollection(params = {}) {
    return api.get('/collection-requests/check-pending', { params })
}
export function assignCollectionRequest(requestId, assignedTo) {
    return api.patch(`/collection-requests/${requestId}/assign`, { assignedTo })
}
export function updateCollectionRequestStatus(requestId, payload) {
    return api.patch(`/collection-requests/${requestId}/status`, payload)
}
export function startManualCollection(payload) {
    return api.post('/collections/start-manual', payload)
}

/** COLLECTIONS SUMMARY */
export function listCollections(params = {}) {
    return api.get('/collections', { params })
}

/** QR */
export function signQR(containerId) {
    return api.get('/qr/sign', { params: { containerId } })
}
export function verifyQR(containerId, sig) {
    return api.get('/qr/verify', { params: { containerId, sig } })
}

export default api
