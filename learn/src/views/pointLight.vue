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
        name: "pointLight",
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

            const point = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 20, 20),
                new THREE.MeshBasicMaterial({
                    color: 0xff0000
                })
            )
            point.position.set(1,-1,5)
            scene.add(point)

            //光颜色 强度 光源发出的光最大距离 光线散射角度（锥形的边的夹角） 沿着光照距离的衰减量
            const pointLight = new THREE.PointLight(0xffffff, 10)
            pointLight.position.set(0, 0, 0)
            pointLight.castShadow = true
            //将光源与点关联
            point.add(pointLight)

            const clock = new THREE.Clock()


            const gui = new GUI()
            gui.add(ball.position, "x").min(0).max(10).step(0.1)
            //沿着光照距离的衰减量
            gui.add(pointLight, "decay").min(0).max(10).step(0.01)
            //光源发出的光最大距离
            gui.add(pointLight, "distance").min(0).max(100).step(0.01)


            //添加控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.z = 5;
            animation();
            function animation() {
                let time = clock.getElapsedTime()
                //使其周期旋转
                point.position.y = Math.sin(time) * 5
                point.position.x = Math.cos(time) * 5
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(animation);
            }
        },
    }
</script>