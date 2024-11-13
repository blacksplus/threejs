import Vue from 'vue';
import VueRouter from 'vue-router';
import firstView from '../views/firstView.vue';
import axisHelperAndController from '../views/axisHelperAndController.vue';
import position from '@/views/position.vue';
import scaleAndRotation from '@/views/scaleAndRotation.vue';
import adaptiveWindow from '@/views/adaptiveWindow.vue';
import lilguiController from '@/views/lilguiController.vue';
import bufferGeometry from '@/views/bufferGeometry.vue';
import groupMaterial from '@/views/groupMaterial.vue';
import textureload from '@/views/textureload.vue';
import gltfloadAndFog from '@/views/gltfloadAndFog.vue';
import raycaster from '@/views/raycaster.vue';
import tween from '@/views/tween.vue';
import uv from '@/views/uv.vue';
import normalVectors from '@/views/normalVectors.vue';
import translateRotationScale from '@/views/translateRotationScale.vue';
import surroundBoxAndWorldMatrix from '@/views/surroundBoxAndWorldMatrix.vue';
import edgeGeometryAndWireFrame from '@/views/edgeGeometryAndWireFrame.vue';
import directionLight from '@/views/directionLight.vue';
import spotLight from '@/views/spotLight.vue';
import pointLight from '@/views/pointLight.vue';

import christmas from '@/views/integrated/christmas.vue';
import car from '@/views/integrated/car.vue';
import robot from '@/views/integrated/robot.vue';
import room from '@/views/integrated/room.vue';
import web3d from '@/views/integrated/web3d.vue';
import earth3d from '@/views/integrated/earth3d.vue';
import earthAndMoon from '@/views/integrated/earthAndMoon.vue'
import font3d from '@/views/integrated/font3d.vue'
import playball from '@/views/integrated/playball.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/first',
  },
  {
    path: '/first',
    name: 'first',
    component: firstView,
  },
  {
    path: '/axisHelperAndController',
    name: 'axisHelperAndController',
    component: axisHelperAndController,
  },
  {
    path: '/position',
    name: 'position',
    component: position,
  },
  {
    path: '/scaleAndRotation',
    name: 'scaleAndRotation',
    component: scaleAndRotation,
  },
  {
    path: '/adaptiveWindow',
    name: 'adaptiveWindow',
    component: adaptiveWindow,
  },
  {
    path: '/lilguiController',
    name: 'lilguiController',
    component: lilguiController,
  },
  {
    path: '/bufferGeometry',
    name: 'bufferGeometry',
    component: bufferGeometry,
  },
  {
    path: '/groupMaterial',
    name: 'groupMaterial',
    component: groupMaterial,
  },
  {
    path: '/textureload',
    name: 'textureload',
    component: textureload,
  },
  {
    path: '/gltfloadAndFog',
    name: 'gltfloadAndFog',
    component: gltfloadAndFog,
  },
  {
    path: '/raycaster',
    name: 'raycaster',
    component: raycaster,
  },
  {
    path: '/tween',
    name: 'tween',
    component: tween,
  },
  ,
  {
    path: '/uv',
    name: 'uv',
    component: uv,
  },
  {
    path: '/normalVectors',
    name: 'normalVectors',
    component: normalVectors,
  },
  {
    path: '/translateRotationScale',
    name: 'translateRotationScale',
    component: translateRotationScale,
  },
  {
    path: '/surroundBoxAndWorldMatrix',
    name: 'surroundBoxAndWorldMatrix',
    component: surroundBoxAndWorldMatrix,
  },
  {
    path: '/edgeGeometryAndWireFrame',
    name: 'edgeGeometryAndWireFrame',
    component: edgeGeometryAndWireFrame,
  },
  {
    path: '/directionLight',
    name: 'directionLight',
    component: directionLight,
  },
  {
    path: '/spotLight',
    name: 'spotLight',
    component: spotLight,
  },
  {
    path: '/pointLight',
    name: 'pointLight',
    component: pointLight,
  },
  {
    path: '/integrated/christmas',
    name: 'christmas',
    component: christmas,
  },
  {
    path: '/integrated/car',
    name: 'car',
    component: car,
  },
  {
    path: '/integrated/robot',
    name: 'robot',
    component: robot,
  },
  {
    path: '/integrated/room',
    name: 'room',
    component: room,
  },
  {
    path: '/integrated/web3d',
    name: 'web3d',
    component: web3d,
  },
  {
    path: '/integrated/earth3d',
    name: 'earth3d',
    component: earth3d
  },
  {
    path: '/integrated/earthAndMoon',
    name: 'earthAndMoon',
    component: earthAndMoon
  },
  {
    path: '/integrated/font3d',
    name: 'font3d',
    component: font3d
  },
  {
    path: '/integrated/playball',
    name: 'playball',
    component: playball
  }
];

const router = new VueRouter({
  routes,
});

export default router;
