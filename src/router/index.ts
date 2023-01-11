import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/animation',
      name: 'animation',
      component: () => import('@/views/AnimesPage.vue'),
    },

    {
      path: '/newdrama',
      name: 'NewDrama',
      component: () => import('@/views/NewDrama.vue'),
    },
    {
      path: '/hotdrama',
      name: 'HotDrama',
      component: () => import('@/views/HotDrama.vue'),
    },
    {
      path: '/filter',
      name: 'filter',
      component: () => import('@/views/FilterPage.vue'),
    },
    {
      path: '/dramalist/:dramaId',
      name: 'DramaList',
      component: () => import('@/views/DramaList.vue'),
      props: true,
    },
    {
      path: '/:weeklyanimes',
      name: 'WeeklyAnimes',
      component: () => import('@/views/WeeklyAnimes.vue'),
      props: true,
    },
    {
      path: '/mycollection/:userId',
      name: 'MyCollection',
      component: () => import('@/views/MyCollection.vue'),
      meta: { requireAuth: true },
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: () => import('@/views/SearchPage.vue'),
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/views/LoginPage.vue'),
    },

    {
      path: '/:domin(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

export default router
