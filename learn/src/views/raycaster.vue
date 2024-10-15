<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    export default {
        name: "raycaster",
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

            const geometry = new THREE.SphereGeometry(1, 32, 32)

            const ball1 = new THREE.Mesh(geometry, 
                new THREE.MeshBasicMaterial({color: 0xff0000})
            )
            ball1.position.x = -3
            scene.add(ball1)

            const ball2 = new THREE.Mesh(geometry, 
                new THREE.MeshBasicMaterial({color: 0x00ff00})
            )
            ball2.position.x = 0
            scene.add(ball2)

            const ball3 = new THREE.Mesh(geometry, 
                new THREE.MeshBasicMaterial({color: 0x0000ff})
            )
            ball3.position.x = 3
            scene.add(ball3)

            const raycaster = new THREE.Raycaster()
            const mouse = new THREE.Vector2()

            window.addEventListener("click", (e) => {
                //获取设计点
                mouse.x = (e.clientX / window.innerWidth) * 2 - 1
                mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
                //更新射线
                raycaster.setFromCamera(mouse, camera)
                //获取射线击中物体, 击中物体可以是scene.children，也可以指定数组
                const intersects = raycaster.intersectObjects([ball1,ball2,ball3]) 
                if(intersects.length > 0){
                    intersects[0].object.material.color.set(0xffffff)
                }
            })

            animate()

            function animate() {
                requestAnimationFrame(animate)
                render.render(scene, camera)
            }
        },
    }
</script>