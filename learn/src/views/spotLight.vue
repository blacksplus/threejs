<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three';
    //添加摄像头控制器
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
    export default {
        //聚光灯就是锥形的光
        name: "spotLight",
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true
            document.body.appendChild(renderer.domElement);
            

            const geometrySphere = new THREE.SphereGeometry(1, 20, 20)
            const material = new THREE.MeshStandardMaterial()
            const ball = new THREE.Mesh(geometrySphere, material)
            ball.castShadow = true
            scene.add(ball)

            const geometryPlane = new THREE.PlaneGeometry(10, 10)
            const plane = new THREE.Mesh(geometryPlane, material)
            plane.receiveShadow = true
            scene.add(plane)
            plane.position.set(0, -1, 0)
            plane.rotation.x = -Math.PI / 2
            //光颜色 强度 光源发出的光最大距离 光线散射角度（锥形的边的夹角） 沿着光照距离的衰减量
            const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 0)
            spotLight.position.set(3,3,3)
            spotLight.castShadow = true
            scene.add(spotLight)

            //设置灯的目标
            spotLight.target = ball

            const gui = new GUI()
            gui.add(ball.position, "x").min(0).max(10).step(0.1)
            gui.add(spotLight, "angle").min(0).max(Math.PI / 2).step(0.01)
            //沿着光照距离的衰减量
            gui.add(spotLight, "decay").min(0).max(10).step(0.01)
            //光源发出的光最大距离
            gui.add(spotLight, "distance").min(0).max(100).step(0.01)
            //圆形光的衰减效果，从中心开始衰减
            gui.add(spotLight, "penumbra").min(0).max(100).step(0.01)

             //添加控制器
             const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.z = 5;
            animation();
            function animation() {
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(animation);
            }
        },
    }
</script>