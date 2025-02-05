import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from '@/stores/usersStore'
import HomeView from '../views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import StatisticView from '@/views/StatisticView.vue'
import DietView from '@/views/DietView.vue'
import ActivityView from '@/views/ActivityView.vue'
import WelcomView from '@/views/WelcomView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import LogoutView from '@/views/LogoutView.vue'

const UNAUTHORUZED_ACSESS_ALLOWED = ['welcome', 'products', 'registration', 'login']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: StatisticView,
    },
    {
      path: '/diet',
      name: 'diet',
      component: DietView,
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: HomeView,
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    },
  ],
})

// redirect to welcome view if user is unauthorized or route name != login, registration, welcome
router.beforeEach((to, from) => {
  const userStore = useUsersStore()

  if (userStore.userIsAuthorized || UNAUTHORUZED_ACSESS_ALLOWED.includes(to.name)) {
    return true
  }

  return { name: 'welcome' }
})

export default router
