import Vue from 'vue'
import VueRouter from 'vue-router'
import firstView from '../views/firstView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/first'
  },
  {
    path: '/first',
    name: 'first',
    component: firstView
  }
]

const router = new VueRouter({
  routes
})

export default router
