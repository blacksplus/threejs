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
    import { Water } from 'three/examples/jsm/objects/Water2'

    import gsap from 'gsap'

    import Normal1 from '@/assets/Water_1_M_Normal.jpg'
    import Normal2 from '@/assets/Water_2_M_Normal.jpg'

    export default {
        name: 'christmas',
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true
            document.body.appendChild(renderer.domElement);

            //设置颜色编码才能开启色调
            renderer.outputColorSpace = THREE.LinearSRGBColorSpace
            //设置色调映射
            renderer.toneMapping = THREE.ACESFilmicToneMapping
            //曝光度
            renderer.toneMappingExposure = 1
            //物理特效光
            renderer.physicallyCorrectLights = true;


            //添加控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.z = 20;

            const clock = new THREE.Clock()

            const rgbloader = new RGBELoader()
            rgbloader.load('/integrated/first3dscene/textures/sky.hdr', (envMap) => {
                envMap.mapping = THREE.EquirectangularReflectionMapping

                // 设置场景的环境贴图
                scene.environment = envMap;
                // 设置场景的背景
                scene.background = envMap;

                // material.envMap = envMap
            })

            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath("/draco/")
            dracoLoader.setDecoderConfig({ type: 'js' })
            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)

            gltfLoader.load("/integrated/first3dscene/model/scene.glb", (gltf) => {
                scene.add(gltf.scene)
                gltf.scene.traverse((child) => {
                    if (child.name === 'Plane') {
                        child.visible = false
                    }
                    if (child.isMesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                })
            })

            // const Alight = new THREE.AmbientLight(0xffffff, 1);
            // scene.add(Alight);

            //添加平行光
            const light = new THREE.DirectionalLight(0xffffff, 1)
            light.position.set(0, 50, 0)
            light.castShadow = true
            scene.add(light)

            //添加点光源
            const pointGeometry = new THREE.SphereGeometry(0.1, 20, 20)
            const pointMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xffffff,
                emissiveIntensity: 10
            })
            const point = new THREE.Mesh(
                pointGeometry,
                pointMaterial
            )
            const pointLight = new THREE.PointLight(0xffffff, 10)
            pointLight.shadow.mapSize.set(2048, 2048)
            pointLight.shadow.radius = 20
            pointLight.castShadow = true
            point.add(pointLight)
            point.position.set(0.1, 2.4, 0)
            scene.add(point)

            const pointLights = new THREE.Group()
            for (let i = 0; i < 3; i++) {
                const pointGeometry = new THREE.SphereGeometry(0.2, 20, 20)
                const pointLight = new THREE.PointLight(0xffffff, 10)
                const point = new THREE.Mesh(
                    pointGeometry,
                    pointMaterial
                )
                point.position.set(
                    3 * Math.cos((i * Math.PI * 2) / 3),
                    Math.cos((i * Math.PI * 2) / 3),
                    3 * Math.sin((i * Math.PI * 2) / 3)
                )
                point.add(pointLight)
                pointLights.add(point)
            }
            pointLights.position.set(-8, 2.5, -1.5)
            scene.add(pointLights)



            //创建水面
            const waterGeometry = new THREE.CircleGeometry(300, 32)
            const water = new Water(waterGeometry, {
                textureWidth: 1024,
                textureHeight: 1024,
                normalMap0: new THREE.TextureLoader().load(Normal1),
                normalMap1: new THREE.TextureLoader().load(Normal2),
                scale: 100,
                flowDirction: new THREE.Vector2(1, 1),
                color: 0xeeeeff
            })

            scene.add(water)
            water.rotation.x = -Math.PI / 2
            water.position.y = -1

            //创建补间动画
            let options = {
                angle: 0
            }
            console.log(pointLights)
            gsap.to(options, {
                angle: Math.PI * 2,
                duration: 10,
                repeat: -1,
                ease: 'linear',
                onUpdate: () => {
                    pointLights.rotation.y = options.angle
                    for (let i = 0; i < pointLights.children.length; i++) {
                        const child = pointLights.children[i]
                        child.position.set(
                            3 * Math.cos((i * Math.PI * 2) / 3),
                            Math.cos((i * Math.PI * 2) / 3 + options.angle * 5),
                            3 * Math.sin((i * Math.PI * 2) / 3)
                        )
                    }
                }
            })

            //添加星星
            const startPositions = []
            const endPositions = []

            const starInstance = new THREE.InstancedMesh(
                new THREE.SphereGeometry(0.2, 20, 20),
                new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    emissive: 0xffffff,
                    emissiveIntensity: 10
                }), 100)

            for (let i = 0; i < 100; i++) {
                let x = Math.random() * 100 - 50
                let y = Math.random() * 100 + 10
                let z = Math.random() * 100 - 50

                startPositions.push(new THREE.Vector3(x, y, z))
                let matrix = new THREE.Matrix4()
                matrix.setPosition(x, y, z)
                starInstance.setMatrixAt(i, matrix)
            }

            scene.add(starInstance)

            //创建爱心路线
            const heartShape = new THREE.Shape()
            heartShape.moveTo(25, 25)
            heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0)
            heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35)
            heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95)
            heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35)
            heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0)
            heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25)
            for (let i = 0; i < 100; i++) {
                const point = heartShape.getPoint(i / 100)
                endPositions.push(new THREE.Vector3(point.x * 0.1, point.y * 0.1 + 5, 0))
            }
            //创建爱心动画
            function makeHeart() {
                const params = {
                    time: 0
                }
                gsap.to(params,
                    {
                        time: 1,
                        duration: 1,
                        onUpdate: () => {
                            for (let i = 0; i < 100; i++) {
                                const x = startPositions[i].x + (endPositions[i].x - startPositions[i].x) * params.time
                                const y = startPositions[i].y + (endPositions[i].y - startPositions[i].y) * params.time
                                const z = startPositions[i].z + (endPositions[i].z - startPositions[i].z) * params.time
                                let matrix = new THREE.Matrix4()
                                matrix.setPosition(x, y, z)
                                starInstance.setMatrixAt(i, matrix)
                            }
                            starInstance.instanceMatrix.needsUpdate = true
                        }
                    }
                )
            }
            function makeStars() {
                const params = {
                    time: 0
                }
                gsap.to(params,
                    {
                        time: 1,
                        duration: 1,
                        onUpdate: () => {
                            for (let i = 0; i < 100; i++) {
                                const x = endPositions[i].x + (startPositions[i].x - endPositions[i].x) * params.time
                                const y = endPositions[i].y + (startPositions[i].y - endPositions[i].y) * params.time
                                const z = endPositions[i].z + (startPositions[i].z - endPositions[i].z) * params.time
                                let matrix = new THREE.Matrix4()
                                matrix.setPosition(x, y, z)
                                starInstance.setMatrixAt(i, matrix)
                            }
                            starInstance.instanceMatrix.needsUpdate = true
                        }
                    }
                )
            }
            animation();
            function animation() {
                let time = clock.getElapsedTime()
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(animation);
            }

            let timeLine1 = gsap.timeline()
            let timeLine2 = gsap.timeline()
            function tranlateCamera(position, target) {
                timeLine1.to(camera.position, {
                    x: position.x,
                    y: position.y,
                    z: position.z,
                    duration: 1,
                    ease: 'power2.inOut'
                })
                timeLine2.to(controls.target, {
                    x: target.x,
                    y: target.y,
                    z: target.z,
                    duration: 1,
                    ease: 'power2.inOut'
                })
            }

            //相机移动

            let cameraPositions = [
                {
                    callback: () => {
                        makeStars()
                        tranlateCamera(
                        new THREE.Vector3(-3.23, 3, 4.06),
                        new THREE.Vector3(-8, 2, 0),
                    )
                    },
                },
                {
                    callback: () => tranlateCamera(
                        new THREE.Vector3(7, 0, 23),
                        new THREE.Vector3(0, 0, 0),
                    ),
                },
                {
                    callback: () => {
                    
                    tranlateCamera(
                        new THREE.Vector3(10, 3, 0),
                        new THREE.Vector3(5, 2, 0),
                    )},
                },
                {
                    callback: () => {
                        tranlateCamera(
                        new THREE.Vector3(-3.23, 3, 4.06),
                        new THREE.Vector3(-8, 2, 0),
                    )
                    },
                },
                {
                    callback: () => {
                    makeHeart()
                    tranlateCamera(
                        new THREE.Vector3(-20, 1.3, 6.6),
                        new THREE.Vector3(-8, 2, 0),
                    )},
                }
            ]
            let index = 0
            let isAnim = false
            window.addEventListener("wheel", (e) => {
                // if(e)
                // console.log(e)
                if (isAnim) return
                isAnim = true
                index++
                if (e.deltaY > 0) {

                    if (index >= cameraPositions.length) {
                        index = 0
                    }
                    cameraPositions[index].callback()
                    setTimeout(() => {
                        isAnim = false
                    }, 1000);
                }
            })
        },
    }
</script>