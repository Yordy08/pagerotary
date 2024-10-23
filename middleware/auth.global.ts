import {useUserStore} from '~/store/main'

export default defineNuxtRouteMiddleware((to, from) => {
  // Check if running on client-side
    const store = useUserStore()

    const token = store.user

    
    // Only block access to the dashboard route if there's no token
    if (!token && to.path.startsWith('/dashboard')) {
      return navigateTo('/login')
    }
   
    // Prevent logged-in users from accessing the login page
    if (token && to.path === '/login') {
      return navigateTo('/dashboard')
    
  }
})