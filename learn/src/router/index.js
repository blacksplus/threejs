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
import tween from '@/views/tween.vue'
import uv from '@/views/uv.vue'
import normalVectors from '@/views/normalVectors.vue'
import translateRotationScale from '@/views/translateRotationScale.vue'
import surroundBoxAndWorldMatrix from '@/views/surroundBoxAndWorldMatrix.vue'
import edgeGeometryAndWireFrame from '@/views/edgeGeometryAndWireFrame.vue'
import directionLight from '@/views/directionLight.vue'
import spotLight from '@/views/spotLight.vue'
import pointLight from '@/views/pointLight.vue'

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
  },
  {
    path: '/tween',
    name: 'tween',
    component: tween
  },
  ,
  {
    path: '/uv',
    name: 'uv',
    component: uv
  },
  {
    path: '/normalVectors',
    name: 'normalVectors',
    component: normalVectors
  },
  {
    path: '/translateRotationScale',
    name: 'translateRotationScale',
    component: translateRotationScale
  },
  {
    path: '/surroundBoxAndWorldMatrix',
    name: 'surroundBoxAndWorldMatrix',
    component: surroundBoxAndWorldMatrix
  },
  {
    path: '/edgeGeometryAndWireFrame',
    name: 'edgeGeometryAndWireFrame',
    component: edgeGeometryAndWireFrame
  },
  {
    path: '/directionLight',
    name: 'directionLight',
    component: directionLight
  },
  {
    path: '/spotLight',
    name: 'spotLight',
    component: spotLight
  },
  {
    path: '/pointLight',
    name: 'pointLight',
    component: pointLight
  }
]

const router = new VueRouter({
  routes
})

export default router
