<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    export default {
        name: "bufferGeometry",
        mounted() {
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
            const render = new THREE.WebGLRenderer()

            render.setSize(window.innerWidth, window.innerHeight)
            document.body.appendChild(render.domElement)

            const axesHelper = new THREE.AxesHelper(5)
            scene.add(axesHelper)

            const controls = new OrbitControls(camera, render.domElement)

            camera.position.z = 5;

            //创建几何体
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
            //位置0 数量 材质索引
            geometry.addGroup(0,3,0)
            geometry.addGroup(3,3,1)


            geometry.setIndex(new THREE.BufferAttribute(indices, 1))

            console.log(geometry)

            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                //只显示线框
                wireframe: true
            })
            const material1 = new THREE.MeshBasicMaterial({
                color: 0xff0000,
            })

            const plane = new THREE.Mesh(geometry, [material, material1])

            scene.add(plane)

            animate()

            function animate() {
                requestAnimationFrame(animate)
                render.render(scene, camera)
            }



    },
    }
</script>