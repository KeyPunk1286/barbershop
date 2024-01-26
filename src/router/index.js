import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { isAuthenticated } from './helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { require: false }
    },

    {
      path: '/entry',
      name: 'entry',
      component: HomeView,
      meta: { require: true },
      component: () => import('../views/EntryView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: HomeView,
      meta: { require: false },
      component: () => import('../views/LoginPage.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.meta.require && !isAuthenticated()) {
    return {
      name: 'login'
    }
  }
})

export default router
