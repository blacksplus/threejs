<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
        import * as THREE from 'three'
        import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
        import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
    export default {
        name: 'uv',
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

            const texture = new THREE.TextureLoader().load('/material/jpg/R-C.jpg')

            const plane = new THREE.PlaneGeometry(2, 2)
            console.log(plane)
            const material = new THREE.MeshBasicMaterial({
                map: texture
            })
            //因为PlaneGeometry有uv属性可以直接贴上去
            const planeMesh = new THREE.Mesh(plane, material)
            scene.add(planeMesh)

            const geometry = new THREE.BufferGeometry()
            //创建顶点数据
            const vertices = new Float32Array([
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0
            ])
            //创建顶点属性
            geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
            //创建顶点索引
            const indices = new Uint16Array([0,1,2,2,3,0])
            //创建索引属性
            geometry.setIndex(new THREE.BufferAttribute(indices, 1))

            const nouvPlane = new THREE.Mesh(geometry, material)
            nouvPlane.position.x = 5

            const uv = new Float32Array([
                0, 0, 1,0 ,1,1, 0, 1
            ])
            geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
            scene.add(nouvPlane)
            //通过计算得出法向量
            // geometry.computeVertexNormals()

            const normals = new Float32Array([
                0,0,1,
                0,0,1,
                0,0,1,
                0,0,1,
            ])
            geometry.setAttribute('normals', new THREE.BufferAttribute(normals, 3))

            const loader = new RGBELoader()
            console.log(material)

            loader.load('/material/hdr/autumn_field_puresky_4k.hdr', (envMap) => {
                envMap.mapping = THREE.EquirectangularReflectionMapping

                // 设置场景的环境贴图
                scene.environment = envMap;
                // 设置场景的背景
                scene.background = envMap;

                material.envMap = envMap
            })



            animate()

            function animate() {
                requestAnimationFrame(animate)
                render.render(scene, camera)
            }
        },
    }
</script>