import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from "@/components/Main.vue";
import SingleColorPage from "@/components/SingleColorPage.vue";
import GroupColorsPage from "@/components/GroupColorsPage.vue";
import SingleErrorPage from "@/components/SingleErrorPage.vue";
import Login from "@/components/auth/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/color/:id',
    name: 'colorPage',
    component: SingleColorPage,
    props: true
  },
  {
    path: '/group/:id',
    name: 'colorGroup',
    component: GroupColorsPage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/404',
    name: 'pageNotFound',
    component: SingleErrorPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
