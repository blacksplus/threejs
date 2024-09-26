<template>
  <div>
    <!-- -->
  </div>
</template>

<script>
    import * as THREE from 'three';
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default {
  name: 'Position',
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
  created() {
    //
  },
  mounted() {
    //
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const render = new THREE.WebGLRenderer()
    render.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(render.domElement)

    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(1,1,1)
    const material1 = new THREE.MeshBasicMaterial({color: 0x00ff00})
    const material2 = new THREE.MeshBasicMaterial({color: 0xff0000})

    const ParentCube = new THREE.Mesh(geometry, material1)
    ParentCube.position.set(-3,0,0)
    scene.add(ParentCube)
    const cube = new THREE.Mesh(geometry, material2)
    cube.position.set(3,0,0)
    ParentCube.add(cube)
    

    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    const controller = new OrbitControls(camera, render.domElement);
    render.render(scene, camera)
    animation()
    function animation() {
      requestAnimationFrame(animation)
      render.render(scene, camera)
      controller.update()
    }

  },
  beforeDestroy() {
    //
  },
};
</script>
