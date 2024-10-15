import Vue from 'vue'
import VueRouter from 'vue-router'
import firstView from '../views/firstView.vue'
import axisHelperAndController from '../views/axisHelperAndController.vue'
import position from '@/views/position.vue'
import scaleAndRotation from '@/views/scaleAndRotation.vue'
import adaptiveWindow from '@/views/adaptiveWindow.vue'
import lilguiController from '@/views/lilguiController.vue'
import bufferGeometry from '@/views/bufferGeometry.vue'
import groupMaterial from '@/views/groupMaterial.vue'
import textureload from '@/views/textureload.vue'
import gltfloadAndFog from '@/views/gltfloadAndFog.vue'
import raycaster from '@/views/raycaster.vue'

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
  },
  {
    path: '/bufferGeometry',
    name: 'bufferGeometry',
    component: bufferGeometry
  },
  {
    path: '/groupMaterial',
    name: 'groupMaterial',
    component: groupMaterial
  },
  {
    path: '/textureload',
    name: 'textureload',
    component: textureload
  },
  {
    path: '/gltfloadAndFog',
    name: 'gltfloadAndFog',
    component: gltfloadAndFog
  },
  {
    path: '/raycaster',
    name: 'raycaster',
    component: raycaster
  }
]

const router = new VueRouter({
  routes
})

export default router
