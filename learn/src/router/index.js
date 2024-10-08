import Vue from 'vue'
import VueRouter from 'vue-router'
import firstView from '../views/firstView.vue'
import axisHelperAndController from '../views/axisHelperAndController.vue'
import position from '@/views/position.vue'
import scaleAndRotation from '@/views/scaleAndRotation.vue'
import adaptiveWindow from '@/views/adaptiveWindow.vue'
import lilguiController from '@/views/lilguiController.vue'

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
  },
  {
    path: '/axisHelperAndController',
    name: 'axisHelperAndController',
    component: axisHelperAndController
  },
  {
    path: '/position',
    name: 'position',
    component: position
  },
  {
    path: '/scaleAndRotation',
    name: 'scaleAndRotation',
    component: scaleAndRotation
  },
  {
    path: '/adaptiveWindow',
    name: 'adaptiveWindow',
    component: adaptiveWindow
  },
  {
    path: '/lilguiController',
    name: 'lilguiController',
    component: lilguiController
  }
]

const router = new VueRouter({
  routes
})

export default router
