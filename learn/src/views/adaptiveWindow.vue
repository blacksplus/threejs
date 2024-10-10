<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    export default {
        name: 'AdaptiveWindow',
        data() {
            return {
                //
            };
        },
        mounted() {
            //
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            const axesHelper = new THREE.AxesHelper(5)
            scene.add(axesHelper)

            const controls = new OrbitControls(camera, renderer.domElement);

            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);


            camera.position.z = 5;

            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }

            window.addEventListener('resize', () => {
                //重置渲染器宽高比
                renderer.setSize(window.innerWidth, window.innerHeight);
                //更新相机宽高比
                camera.aspect = window.innerWidth / window.innerHeight;
                //更新投影矩阵
                camera.updateProjectionMatrix();
            })
            animate();
        },
    };
</script>