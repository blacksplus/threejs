<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import gsap from 'gsap'
    export default {
        name: "earth3d",
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
            camera.position.set(0, 300, 500);

            const Alight = new THREE.AmbientLight(0xffffff, 1);
            scene.add(Alight);

            const textureLoader = new THREE.TextureLoader()

            const starsBackground = textureLoader.load("/integrated/3dearth/Stars_1K.jpg")
            starsBackground.mapping = THREE.EquirectangularReflectionMapping
            // scene.background = starsBackground
            // scene.environment = starsBackground
            scene.background = new THREE.Color(0x030311)

            const earthTexture1 = textureLoader.load("/integrated/3dearth/map.jpg")
            const lightTexture = textureLoader.load("/integrated/3dearth/earth.jpg")
            const glowTexture = textureLoader.load("/integrated/3dearth/glow.png")
            const innerGlowTexture = textureLoader.load("/integrated/3dearth/innerGlow.png")
            const lightPillarTexture = textureLoader.load("/integrated/3dearth/light_column.png")
            const circleTexture = textureLoader.load("/integrated/3dearth/label-old.png")
            const moonTexture = textureLoader.load("/integrated/3dearth/moon.jpg")
            const moonRingTexture = textureLoader.load("/integrated/3dearth/moon_ring.png")

            const sphere = new THREE.SphereGeometry(100, 36, 36)
            const lightSphereGeometry = new THREE.SphereGeometry(102, 36, 36)
            const lightPillarGeometry = new THREE.PlaneGeometry(6, 40)
            const circleGeometry = new THREE.PlaneGeometry(16, 16)
            const moonGeomerty = new THREE.SphereGeometry(20, 36, 36)
            const moonRingGeometry = new THREE.RingGeometry(300, 320, 64)




            const lightPillarMaterial = new THREE.MeshBasicMaterial({
                map: lightPillarTexture,
                color: 0xffffff,
                alphaMap: lightPillarTexture,
                transparent: true,
                depthWrite: true,
                depthTest: true,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide
            })

            
            const earthMaterail1 = new THREE.MeshBasicMaterial({
                map: earthTexture1,
                emissive: 0x030311,
                emissiveMap: earthTexture1
                // transparent: false

            })
            const lightMaterial = new THREE.MeshBasicMaterial({
                map: lightTexture,
                alphaMap: lightTexture,
                blending: THREE.AdditiveBlending,
                transparent: true,
                emissive: 0x030311,
                emissiveMap: lightTexture
            })
            const spriteMaterial = new THREE.SpriteMaterial({
                map: glowTexture,
                color: 0x4d76cf,
                transparent: true,
                depthWrite: false,
                depthTest: false,
                blending: THREE.AdditiveBlending,
            })
            const spriteMaterial1 = new THREE.SpriteMaterial({
                map: innerGlowTexture,
                color: 0x4d76cf,
                transparent: true,
                depthWrite: false,
                depthTest: false,
                blending: THREE.AdditiveBlending,
            })
            const circleMaterial = new THREE.MeshBasicMaterial({
                map: circleTexture,
                color: 0x4d76cf,
                transparent: true,
                depthWrite: true,
                depthTest: true,
                blending: THREE.AdditiveBlending,
            })
            const moonMaterial = new THREE.MeshBasicMaterial({
                map: moonTexture,
                emissive: 0xffffff,
                emissiveMap: moonTexture
            })
            const moonRingMaterial = new THREE.MeshBasicMaterial({
                map: moonRingTexture,
                // color: 0xcccccc,
                transparent: true,
                depthWrite: false,
                opacity: 0.5,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
            })

            const earth = new THREE.Mesh(sphere, earthMaterail1)
            const lightEarth = new THREE.Mesh(lightSphereGeometry, lightMaterial)
            const sprite = new THREE.Sprite(spriteMaterial)
            const sprite1 = new THREE.Sprite(spriteMaterial1)
            const lightPillar = new THREE.Mesh(lightPillarGeometry, lightPillarMaterial)
            lightPillar.add(lightPillar.clone().rotateY(Math.PI / 2))
            const circle  = new THREE.Mesh(circleGeometry, circleMaterial)
            const moon = new THREE.Mesh(moonGeomerty, moonMaterial)
            const moonRing = new THREE.Mesh(moonRingGeometry, moonRingMaterial)
            moonRing.rotation.x = -Math.PI / 2
            




            earth.position.set(0,0,0)
            lightEarth.position.set(0,0,0)
            sprite.position.set(0,0,0)
            sprite.scale.set(259,259,0)
            sprite1.position.set(0,0,0)
            sprite1.scale.set(259,259,0)
            circle.rotation.x = -Math.PI / 2
            circle.position.y = -20
            moon.position.set(310, 0, 0)
            moonRing.position.set(0,0,0)

            const lat = Math.random() * 180 - 90
            const lon = Math.random() * 360 - 180
            const position = lon2xyz(100, lon, lat)
            lightPillar.position.set(position.x, position.y, position.z)

            lightPillar.quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1 ,0),
                position.clone().normalize()
            )

            


            gsap.to(circle.scale, {
                duration: 1 + Math.random() * 0.5,
                x: 2,
                y: 2,
                z: 2,
                repeat: -1,
                delay: Math.random() * 0.5,
                yoyo: true,
                ease: "power2.inOut"
            })

            const time = {
                value: 0
            }
            gsap.to(time, {
                value: 1,
                duration: 10,
                repeat: -1,
                ease: "linear",
                onUpdate: () => {
                    moon.position.x = 310 * Math.cos(time.value * Math.PI * 2)
                    moon.position.z = 310 * Math.sin(time.value * Math.PI * 2)
                    moon.rotation.y = time.value * Math.PI * 4
                }
            })

            lightPillar.add(circle)
            scene.add(earth)
            scene.add(lightEarth)
            scene.add(sprite)
            scene.add(sprite1)
            scene.add(lightPillar)
            scene.add(moon)
            scene.add(moonRing)
            console.log(scene)
            console.log(moonRing)

            animation();
            function animation() {
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(animation);
            }

            function lon2xyz(R, longitude, latitude) {
                let lon = (longitude * Math.PI) / 180
               let lat = (latitude * Math.PI) / 180
                lon = -lon

                const x = R * Math.cos(lat) * Math.cos(lon)
                const y = R * Math.sin(lat)
                const z = R * Math.cos(lat) * Math.sin(lon)
                return new THREE.Vector3(x, y, z)
            }
        },
    }
</script>