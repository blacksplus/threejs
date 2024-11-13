<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three';
    //添加摄像头控制器
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    export default {
        name: "playBall",
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });

            //设置色调映射
            renderer.toneMapping = THREE.ACESFilmicToneMapping
            renderer.shadowMap.enabled = true
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            scene.background = new THREE.Color(0xffffff)

           //添加直射灯光
           const directionLight = new THREE.DirectionalLight(0xffffff, 2)
            //设置灯光位置
            directionLight.position.set(0, 20, 0)
            directionLight.castShadow = true
            scene.add(directionLight)

            //添加直射灯光
           const directionLight1 = new THREE.DirectionalLight(0xffffff, 1)
            //设置灯光位置
            directionLight1.position.set(0, 3, 30)
            directionLight1.castShadow = true
            scene.add(directionLight1)

             //添加直射灯光
           const directionLight2 = new THREE.DirectionalLight(0xffffff, 1)
            //设置灯光位置
            directionLight2.position.set(30, 3, 0)
            directionLight2.castShadow = true
            scene.add(directionLight2)


            //添加控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(6, 3, 0);

            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath("/draco/")
            dracoLoader.setDecoderConfig({ type: 'js' })
            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)
            gltfLoader.load("/integrated/playball/playground02.glb", (gltf) => {
                scene.add(gltf.scene)
                gltf.scene.traverse((child) => {
                    if(child.isMesh){
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                })
            })

            animation();
            function animation() {
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(animation);
            }
        },
    }
</script>