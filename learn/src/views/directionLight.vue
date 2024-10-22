<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three';
    //添加摄像头控制器
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    //环境光和平面光是不会出现阴影的，需要设置其它光源才会出现阴影，只有某些材质有阴影效果

    export default {
        name: 'directionLight',
        mounted() {
            //满足阴影的条件
            /*
            1. 材质对光照要有反应
            2. 设置渲染器开启阴影计算 renderer.shadowMap.enabled = true
            3. 设置光照投射阴影 directionLight.castShadow = true
            4. 设置物体可以投射阴影 sphere.castShadow = true
            5. 设置物体可以接收阴影 plane.receiveShadow = true
            */
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
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

            //添加直射灯光
            const directionLight = new THREE.DirectionalLight(0xffffff, 0.5)
            //设置灯光位置
            directionLight.position.set(20, 20, 20)
            directionLight.castShadow = true
            scene.add(directionLight)



            renderer.shadowMap.enabled = true
            //设置阴影贴图模糊度 阴影是一张一张贴图叠加起来，设置越小贴图越集中，越大越发散
            directionLight.shadow.radius = 20
            // 设置更高的阴影贴图分辨率
            // renderer.shadowMap.width = 2048;
            // renderer.shadowMap.height = 2048;
            directionLight.shadow.mapSize.set(2048, 2048)

            //正交相机（OrthographicCamera），无论物体距离相机距离远或者近，在最终渲染物体的大小都保持不变。
            //  光从光源出发到达圆会有一个立方体的空间 靠近相机那端为近端near
            // 设置的值都是以相机的位置为原点
            directionLight.shadow.camera.near = 0.5
            directionLight.shadow.camera.far = 500
            directionLight.shadow.camera.top = 5
            directionLight.shadow.camera.bottom = -5 
            directionLight.shadow.camera.left = -5
            directionLight.shadow.camera.right = 0.5

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