<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
    //通过获取最边界的点来生成一个线宽盒
    export default {
        name: 'surroundBoxAndWorldMatrix',
        mounted() {
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
            const render = new THREE.WebGLRenderer()
            render.setSize(window.innerWidth, window.innerHeight)
            document.body.appendChild(render.domElement)

            camera.position.z = 5

            const controls = new OrbitControls(camera, render.domElement)

            const axesHelper = new THREE.AxesHelper(5)
            scene.add(axesHelper)

            animate()

            const loader = new GLTFLoader()
            loader.load("/material/gltf/ball/scene.gltf", (gltf) => {
                scene.add(gltf.scene)
                console.log(gltf.scene)
                //初始一个包围盒
                const box = new THREE.Box3()
                //如果是层级的gltf则需要遍历查找geometry
                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        const geometry = child.geometry;
                        // 计算包围盒
                        geometry.computeBoundingBox();
                        //几何体居中
                        // geometry.center()
                        // 获取包围盒
                        let personBox = geometry.boundingBox;
                        //加载的是局部坐标矩阵，要转成世界坐标矩阵才能达到想要的缩放等效果
                        child.updateWorldMatrix(true, true)
                        //更新包围盒
                        personBox.applyMatrix4(child.matrixWorld)
                        console.log(personBox);
                        // 显示包围盒
                        let boxHelper = new THREE.Box3Helper(personBox, 0xfff);
                        // scene.add(boxHelper);
                        //获取中心点
                        let center = personBox.getCenter(new THREE.Vector3())
                        console.log(center)
                        //多个包围盒可以合成一个
                        box.union(personBox)

                    }
                })
                let boxHelper = new THREE.Box3Helper(box, 0xfff);
                scene.add(boxHelper)
            })

            const RGBEloader = new RGBELoader()

            RGBEloader.load('/material/hdr/autumn_field_puresky_4k.hdr', (envMap) => {
                envMap.mapping = THREE.EquirectangularReflectionMapping

                // 设置场景的环境贴图
                scene.environment = envMap;
                // 设置场景的背景
                scene.background = envMap;

                console.log(scene)
            })
            function animate() {
                requestAnimationFrame(animate)
                render.render(scene, camera)
            }
        },
    }
</script>