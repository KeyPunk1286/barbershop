import { useAuthStore } from '@/stores/auth'

export function isAuthenticated() {
  return useAuthStore().getUser
}
