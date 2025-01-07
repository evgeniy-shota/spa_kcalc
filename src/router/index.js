import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import StatisticView from '@/views/StatisticView.vue'
import DietView from '@/views/DietView.vue'
import ActivityView from '@/views/ActivityView.vue'
import WelcomView from '@/views/WelcomView.vue'

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
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: HomeView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomView,
    },
  ],
})

export default router
