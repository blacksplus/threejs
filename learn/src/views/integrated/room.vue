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
    export default {
        name: "room",
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
            camera.position.set(0, 0, 1);

            // const textureArr = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"]
            // const boxMaterials = []
            // const geometry = new THREE.BoxGeometry(10, 10, 10)

            // textureArr.map(item => {
            //     const texture = new THREE.TextureLoader().load(`/integrated/3droom/living/${item}.jpg`)
            //     boxMaterials.push(new THREE.MeshBasicMaterial({ map:texture, side: THREE.DoubleSide }))
            //     if(item === '4_u' || item === '4_d'){
            //         texture.rotation = -Math.PI
            //         texture.center = new THREE.Vector2(0.5, 0.5)
            //     }
            // })
            // const cube = new THREE.Mesh(geometry, boxMaterials)
            // cube.scale.set(1,1,-1)
            // scene.add(cube)

            const sphere = new THREE.SphereGeometry(5, 32, 32)
            const loader = new RGBELoader()
            loader.load("/integrated/3droom/hdr/ersisd-Merksem_Appartment_Living_4k.hdr", (texture) => {
                const material = new THREE.MeshBasicMaterial({ map: texture })
                const ball = new THREE.Mesh(sphere, material)
                ball.geometry.scale(1,1,-1)
                scene.add(ball)
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