<script setup>
// 导入three
import * as THREE from "three";
// 导入OrbitControls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 导入FontLoader
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
// 导入TextGeometry
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// 创建场景
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  2000
);
// 设置相机位置
camera.position.set(0, 0, 800);
// 设置渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将渲染器添加到body中
document.body.appendChild(renderer.domElement);

// 添加环境纹理
const texture = new THREE.TextureLoader().load("./hdr/room.jpg");
texture.mapping = THREE.EquirectangularReflectionMapping;
scene.background = texture;
scene.backgroundBlurriness = 0.5;
scene.environment = texture;

// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 一帧帧渲染画面
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// 加载字体
const loader = new FontLoader();
loader.load("fonts/FangSong_Regular.json", (font) => {
  const geometry = new TextGeometry("老陈打码", {
    font: font, // 字体
    size: 80, // 字体大小
    height: 5, // 字体厚度
    curveSegments: 12, // 曲线分段数
    bevelEnabled: true, // 是否启用斜角
    bevelThickness: 10, // 斜角厚度
    bevelSize: 2, // 斜角大小
    bevelSegments: 5, // 斜角分段数
  });
  geometry.center();
  // 设置字体材质
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xeeeeff,
    roughness: 0,
    reflectivity: 1,
    thickness: 80,
    ior: 1.5,
    transmission: 1,
    side: THREE.DoubleSide,
    emissive: 0xffeeff,
    emissiveIntensity: 0.1,
  });
  // 创建字体
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});
</script>

<template>
  <div></div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

canvas {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
