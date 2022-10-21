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
      path: '/newdrama',
      name: 'NewDrama',
      component: () => import('../views/NewDrama.vue'),
    },
    {
      path: '/hotdrama',
      name: 'HotDrama',
      component: () => import('../views/HotDrama.vue'),
    },
    {
      path: '/dramalist/:dramaId',
      name: 'DramaList',
      component: () => import('../views/DramaList.vue'),
      props: true,
    },
    {
      path: '/:domin(.*)*',
      name: 'NotFound',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
