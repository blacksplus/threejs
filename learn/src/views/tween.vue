<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'
    export default {
        name: 'tween',
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

            const ball = new THREE.Mesh(geometry,
                new THREE.MeshBasicMaterial({ color: 0xff0000 })
            )
            ball.position.x = 0
            scene.add(ball)

            const tween = new TWEEN.Tween(ball.position)
            tween.to({x: 5}, 1000)
            tween.start().repeat(Infinity).delay(3000).yoyo(true).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(() => {
                // console.log(ball.position)
            })

            const tween1 = new TWEEN.Tween(ball.position)
            tween1.to({y: 5}, 1000)
            tween1.repeat(Infinity).delay(3000).yoyo(true).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(() => {
                // console.log(ball.position)
            })

            animate()

            function animate() {

                requestAnimationFrame(animate)
                render.render(scene, camera)
                tween.update()
            }
        },
    }
</script>