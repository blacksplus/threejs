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
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
    import gsap from 'gsap'
    export default {
        name: "web3d",
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);


            //添加控制器
            // const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(0, 0, 8);

            //添加背景
            const texture = new THREE.TextureLoader().load("/integrated/3daviation/25s.jpg")
            texture.mapping = THREE.EquirectangularReflectionMapping
            scene.background = texture
            scene.environment = texture

            //添加灯光
            const light = new THREE.DirectionalLight(0xffffff, 1)
            light.position.set(0, 0, 1)
            scene.add(light)
            const light2 = new THREE.DirectionalLight(0xffffff, 0.5)
            light.position.set(0, 0, -1)
            scene.add(light2)
            const light3 = new THREE.DirectionalLight(0xffffff, 0.5)
            light.position.set(-1, 1, 1)
            scene.add(light3)

            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath("/draco/")
            dracoLoader.setDecoderConfig({ type: 'js' })
            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)

            gltfLoader.load("/integrated/3daviation/xz.glb", (gltf) => {
                const model = gltf.scene
                model.scale.set(0.1, 0.1, 0.1)
                model.position.set(3, 0, 0)
                scene.add(model)

                window.addEventListener("mousemove", (e) => {
                    const x = (e.clientX / window.innerWidth) * 2 - 1
                    const y = (e.clientY / window.innerHeight) * 2 - 1
                    const timeLine = new gsap.timeline()
                    timeLine.to(model.rotation, {
                        duration: 0.5,
                        x: y,
                        y: x
                    })
                })


            })

            gltfLoader.load("/integrated/3daviation/xq6.glb", (gltf) => {
                const model = gltf.scene
                model.scale.set(0.1, 0.1, 0.1)
                model.position.set(3, -9, 0)
                scene.add(model)

                window.addEventListener("mousemove", (e) => {
                    const x = (e.clientX / window.innerWidth) * 2 - 1
                    const y = (e.clientY / window.innerHeight) * 2 - 1
                    const timeLine = new gsap.timeline()
                    timeLine.to(model.rotation, {
                        duration: 0.5,
                        x: y,
                        y: x
                    })
                })


            })

            gltfLoader.load("/integrated/3daviation/gr75.glb", (gltf) => {
                const model = gltf.scene
                model.scale.set(0.8, 0.8, 0.8)
                model.position.set(3, -18, 0)
                scene.add(model)

                window.addEventListener("mousemove", (e) => {
                    const x = (e.clientX / window.innerWidth) * 2 - 1
                    const y = (e.clientY / window.innerHeight) * 2 - 1
                    const timeLine = new gsap.timeline()
                    timeLine.to(model.rotation, {
                        duration: 0.5,
                        x: y,
                        y: x
                    })
                })


            })

            // const timeLine3 = new gsap.timeline()
            gltfLoader.load("/integrated/3daviation/moon.glb", (gltf) => {
                const moon = gltf.scene.children[0]
                for (let i = 0; i < 10; i++) {
                    const moonInstance = new THREE.InstancedMesh(
                       moon.geometry,
                       moon.material,
                       100
                    )

                    for(let j = 0; j < 100; j++){
                        const x = Math.random() * 1000 - 500
                        const y = Math.random() * 1000 - 500
                        const z = Math.random() * 1000 - 500
                        const matrix = new THREE.Matrix4()
                        console.log(matrix)
                        let size = Math.random() * 20 - 10
                        matrix.makeScale(size, size, size)
                        matrix.makeTranslation(x, y, z)
                        moonInstance.setMatrixAt(j, matrix)
                    }
                    gsap.to(moonInstance.position, {
                        z: -1000,
                        repeat: -1,
                        duration: Math.random() * 10 + 2,
                        ease: "liner"
                    })
                    scene.add(moonInstance)
                }
            })

            let move = 0
            let timeLine1 = new gsap.timeline()
            window.addEventListener("keydown", (e) => {
                console.log(e)
                const key = e.key
                if (key == 'w') {
                    move++
                    if (move > 2) move = 2

                }
                if (key == 's') {
                    move--
                    if (move < 0) move = 0
                }

                timeLine1.to(camera.position, {
                    duration: 0.5,
                    y: move * -9
                })
            })




            animation();
            function animation() {
                renderer.render(scene, camera);
                // controls.update();
                requestAnimationFrame(animation);
            }
        },
    }
</script>