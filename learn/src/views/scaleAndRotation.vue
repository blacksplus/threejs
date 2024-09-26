<template>
  <div>
    <!-- -->
  </div>
</template>

<script>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default {
    name: "scaleAndRotation",
    mounted() {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const render = new THREE.WebGLRenderer()
        render.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(render.domElement)
        camera.position.z = 5

        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)
        const controller = new OrbitControls(camera, render.domElement)

        const geometry = new THREE.BoxGeometry(1,1,1)
        const material1 = new THREE.MeshBasicMaterial({color: 0x00ff00})
        const material2 = new THREE.MeshBasicMaterial({color: 0xff0000})
        const parentCube = new THREE.Mesh(geometry, material1)
        const cube = new THREE.Mesh(geometry, material2)

        parentCube.position.set(-3,0,0)
        scene.add(parentCube)
        cube.position.set(3,0,0)
        parentCube.add(cube)

        //放大相应的坐标比例尺也会放大
        parentCube.scale.set(2,2,2)
        cube.scale.set(0.5,0.5,0.5)

        //旋转
        parentCube.rotation.x = (Math.PI / 4)
        cube.rotation.x = (Math.PI / 4)

        render.render(scene, camera)

        animation()
        function animation () {
            requestAnimationFrame(animation)
            render.render(scene, camera)
            controller.update()
        }
    },
}
</script>
