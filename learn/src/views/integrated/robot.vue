<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three';
    //添加摄像头控制器
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    //导入反射平面
    import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
    export default {
        name: "robot",
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);


            //添加控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(0, 5 , 10);

            const HDRLoader = new RGBELoader()
            HDRLoader.load("/integrated/3drobot/sky12.hdr", (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping
                scene.background = texture
                scene.environment = texture
            })

            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath("/draco/")
            dracoLoader.setDecoderConfig({ type: 'js' })
            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)

            gltfLoader.load("/integrated/3drobot/robot.glb", (model) => {
                scene.add(model.scene)
            })

            //创建视频纹理
            const video = document.createElement("video")
            video.src = "/integrated/3drobot/zp2.mp4"
            video.loop = true
            video.muted = true
            video.play()

            const videoTexture = new THREE.VideoTexture(video)
            const videoPlaneGeo = new THREE.PlaneGeometry(16, 9)
            const videoMaterial = new THREE.MeshBasicMaterial({
                map: videoTexture,
                transparent: true,
                side: THREE.DoubleSide,
                alphaMap: videoTexture
            })
            const videoMesh = new THREE.Mesh(videoPlaneGeo, videoMaterial)
            videoMesh.rotation.x =  -Math.PI / 2
            scene.add(videoMesh)

            //设置反射平面
            const reflectPlaneGeo = new THREE.PlaneGeometry(100, 100)
            const reflectPlane = new Reflector(reflectPlaneGeo, {
                textureWidth: window.innerWidth,
                textureHeight: window.innerHeight,
                color: 0xffffff
            })
            reflectPlane.rotation.x =  -Math.PI / 2
            reflectPlane.position.y = -1
            scene.add(reflectPlane)

            animation();
            function animation() {
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(animation);
            }
        },
    }
</script>