<template>
  <div></div>
</template>

<script setup>
import * as THREE from "three";
// 控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 载入模型的loader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// 解压缩加载器
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// 初始化3D场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
// 初始化相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let material;
// 加载模型
let dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco/");
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load("./model/newyear.glb", function (gltf) {
  console.log(gltf);

  let text = gltf.scene.children[0];

  scene.add(text);

  let geometry = text.geometry;
  const position = geometry.attributes.position;
  const vertexCount = position.count;
  const triangleCount = vertexCount / 3;

  const randomDirections = [];
  const randomStrengths = [];

  for (let i = 0; i < triangleCount; i++) {
    const dir = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    )
      .normalize()
      .toArray();

    console.log(dir);
    randomDirections.push(dir[0], dir[1], dir[2]);
    const str = Math.random();
    randomStrengths.push(str, str, str);
  }

  const randomDirectionsAttribute = new THREE.Float32BufferAttribute(
    new Float32Array(randomDirections),
    3
  );

  geometry.setAttribute("randomDirection", randomDirectionsAttribute);
  const randomStrengthsAttribute = new THREE.Float32BufferAttribute(
    new Float32Array(randomStrengths),
    1
  );
  geometry.setAttribute("randomStrength", randomStrengthsAttribute);

  // 定义着色器材质
  material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1 },
    },
    vertexShader: `
      attribute vec3 randomDirection;
      attribute float randomStrength;
      uniform float time;
      varying vec3 vPosition;

      void main() {
        vPosition = position;
        vec3 pos = position.xyz;
        pos += randomDirection * randomStrength * time;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      void main() {
        vec3 color = normalize(vPosition)*0.5+0.5;
        color.z = color.z*3.0;
        gl_FragColor = vec4(color,1.0);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
  });
  text.material = material;
});

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
let showText = false;
window.addEventListener("click", () => {
  showText = !showText;
});

// 渲染
let clock = new THREE.Clock();
let value = 0;
function animate() {
  let delta = clock.getDelta();
  // console.log(delta);
  if (material) {
    if (showText) {
      value -= delta;
      value = Math.max(value, 0);
      material.uniforms.time.value = value;
    } else {
      value += delta;
      value = Math.min(value, 1);
      material.uniforms.time.value = value;
    }
  }
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

canvas {
  width: 100vw;
  height: 100vh;
}
</style>
