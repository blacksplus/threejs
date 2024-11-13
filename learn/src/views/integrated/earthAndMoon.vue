<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import gsap from 'gsap'
    import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
    export default {
        name: "earthAndMoon",
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            const cssRender = new CSS2DRenderer()
            cssRender.setSize(window.innerWidth, window.innerHeight);
            cssRender.domElement.style.position = "absolute"
            cssRender.domElement.style.top = 0
            cssRender.domElement.style.left = 0
            document.body.appendChild(cssRender.domElement)
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            renderer.shadowMap.enabled = true


            //添加控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(0, 100, 500);

            const textureLoader = new THREE.TextureLoader()
            const earthTexture = textureLoader.load("/integrated/3dearth/earth_atmos_2048.jpg")
            const displaceTexture = textureLoader.load("/integrated/3dearth/earth4.jpg")
            const emissiveMap = textureLoader.load("/integrated/3dearth/earth_atmos_4096.jpg")
            const nomalTexture = textureLoader.load("/integrated/3dearth/earth_normal_2048.jpg")

            const moonTexture = textureLoader.load("/integrated/3dearth/moon_1024.jpg")

            const spotLight = new THREE.SpotLight(0xffffff, 100000, 10000, Math.PI / 4, 0.01)
            spotLight.position.set(-200, 0, 200)
            scene.add(spotLight)
            const Alight = new THREE.AmbientLight(0xffffff, 0.1);
            scene.add(Alight);

            const earthGeometry = new THREE.SphereGeometry(100, 64, 64)
            const earthMaterial = new THREE.MeshPhongMaterial({
                map: earthTexture,
                color: 0xeeeeff,
                // emissive: 0xffffff,
                // emissiveMap: emissiveMap,
                displacementMap: displaceTexture,
                displacementScale: 5,
                normalMap: nomalTexture,
            })
            
            const earth = new THREE.Mesh(earthGeometry, earthMaterial)
            const earthDiv = document.createElement("div")
            earthDiv.innerText = "Earth"
            earthDiv.className = "label"
            const earthLabel = new CSS2DObject(earthDiv)
            earthLabel.position.set(0, 110, 0)
            earth.add(earthLabel)
            earth.position.set(0,0,0)
            scene.add(earth)
            spotLight.target = earth
            spotLight.castShadow = true
            earth.castShadow = true
            earth.receiveShadow = true

            const moonGeomerty = new THREE.SphereGeometry(10, 64, 64)
            const moonMaterial = new THREE.MeshPhongMaterial({
                map: moonTexture,
            })
            const moon = new THREE.Mesh(moonGeomerty, moonMaterial)
            moon.castShadow = true
            moon.receiveShadow = true
            scene.add(moon)

            const time = {
                value: 0
            }
            gsap.to(time, {
                value: 1,
                duration: 10,
                repeat: -1,
                ease: "linear",
                onUpdate: () => {
                    moon.position.x = 250 * Math.cos(time.value * Math.PI * 2)
                    moon.position.z = 250 * Math.sin(time.value * Math.PI * 2)
                    earth.rotation.y = time.value * Math.PI * 4
                }
            })

            animation();
            function animation() {
                renderer.render(scene, camera);
                controls.update();
                cssRender.render(scene, camera);
                requestAnimationFrame(animation);
            }
        },
    }
</script>
<style>
    canvas {
        background-image: url(../../../public/integrated/3dearth/starts.jpg) !important;
        background-size: cover;
    }
    .label{
        font-size: 16px;
        color: white;
    }
</style>