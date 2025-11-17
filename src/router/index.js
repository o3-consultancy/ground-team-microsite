import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/adhoc',
    name: 'adhoc',
    component: () => import('../views/AdHocView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/deploy',
    name: 'deploy',
    component: () => import('../views/DeployView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/collections',
    name: 'collections',
    component: () => import('../views/CollectionsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/health',
    name: 'health',
    component: () => import('../views/Health.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import('../views/DeliveryView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('../views/Success.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Authentication guard
router.beforeEach((to, _from, next) => {
  const storedUser = localStorage.getItem('ground-team-user')
  const isAuthenticated = !!storedUser

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
