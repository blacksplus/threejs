<template>
  <div>
    <!-- -->
  </div>
</template>

<script>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
export default {
  name: 'lilguiController',
  data() {
    return {
      //
      
    };
  },
  mounted() {
    //
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const render = new THREE.WebGLRenderer()

    render.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(render.domElement)

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    const controls = new OrbitControls(camera, render.domElement)

    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00})

    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    camera.position.z = 5

    animation()

    const gui = new GUI()

    const opt = {
      color: "00ff00",
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0
    }

    gui.addColor(opt, 'color').onChange(value => {
      cube.material.color.set(value)
    })
    gui.add(opt, 'x',-5,5,0.1).name("position-x").onChange((value)=>{
      cube.position.x = value
    })
    gui.add(opt, 'y',-5,5,0.1).name("position-x").onChange((value)=>{
      cube.position.y = value
    })
    gui.add(opt, 'z',-5,5,0.1).name("position-x").onChange((value)=>{
      cube.position.z = value
    })

    gui.add(opt, 'rotationX',-3.14,3.14,0.01).name("rotationX").onChange((value)=>{
      cube.rotation.x = value
    })
    gui.add(opt, 'rotationY',-3.14,3.14,0.01).name("rotationY").onChange((value)=>{
      cube.rotation.y = value
    })

    function animation() {
      requestAnimationFrame(animation)
      render.render(scene, camera)
    }
  },
};
</script>
