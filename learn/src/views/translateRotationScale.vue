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
        name: "translateRotationScale",
        //threejs中geometry和物体都能进行位移旋转缩放，不同的是物体是通过geometry附加材质生成的，物体的位置信息是相对于geometry的位置，旋转，缩放同理
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

            const geometry = new THREE.BufferGeometry()
            //创建顶点数据
            const vertices = new Float32Array([
                -1.0 + 3, -1.0, 0.0,
                1.0 + 3, -1.0, 0.0,
                1.0 + 3, 1.0, 0.0,
                -1.0 + 3, 1.0, 0.0
            ])
            //创建顶点属性
            geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
            //创建顶点索引
            const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
            //创建索引属性
            geometry.setIndex(new THREE.BufferAttribute(indices, 1))
            const material = new THREE.MeshBasicMaterial({
                map: texture
            })
            //因为PlaneGeometry有uv属性可以直接贴上去
            const planeMesh = new THREE.Mesh(geometry, material)

            const uv = new Float32Array([
                0, 0, 1, 0, 1, 1, 0, 1
            ])
            geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
            console.log(geometry)
            console.log(planeMesh)

            planeMesh.position.x = 2

            scene.add(planeMesh)



            animate()

            function animate() {
                requestAnimationFrame(animate)
                render.render(scene, camera)
            }
        },
    }
</script>