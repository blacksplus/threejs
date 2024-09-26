<template>
  <div>
    <!-- -->
  </div>
</template>

<script>
    import * as THREE from 'three';
    //添加摄像头控制器
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
export default {
    name: 'axisHelperAndController',
    mounted() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;
        //添加坐标辅助线
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        //添加控制器
        const controls = new OrbitControls(camera, renderer.domElement);
       
        //设置阻尼惯性
        controls.enableDamping = true;
        controls.dampingFactor = 0.01;

        //设置自动旋转
        controls.autoRotate = true;

        renderer.render(scene, camera);
        animation();
        function animation() {
            requestAnimationFrame(animation);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
            controls.update();
        }
    },
    methods: {
        
    },
}
</script>
