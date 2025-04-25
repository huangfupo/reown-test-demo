import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EchartsView from '@/views/EchartsView.vue'
import Timeline from '@/views/Timeline.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/Echarts',
      name: 'echarts',
      component: EchartsView,
    },
    {
      path: '/Timeline',
      name: 'timeline',
      component: Timeline,
    },
    
  ],
})

export default router
