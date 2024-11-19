<template>
    <div>

    </div>
</template>
<script>
    import * as THREE from 'three';
    //添加摄像头控制器
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

    export default {
        name: "img2dTo3d",
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            // renderer.outputEncoding = THREE.sRGBEncoding;
            // console.log(renderer.outputEncoding, THREE.encode)
            console.log(renderer.outputColorSpace)
            renderer.outputColorSpace = THREE.LinearSRGBColorSpace
            

            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            camera.position.set(0, 5, 10);

            const textureLoader = new THREE.TextureLoader()

            const img = textureLoader.load("/integrated/3dimgTo2d/cat.jpg")
            const dept = textureLoader.load("/integrated/3dimgTo2d/cat_depth.jpg")
            
            const geometry = new THREE.PlaneGeometry(19.2, 12)
            const mouse = new THREE.Vector2()
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTexture: {value: img},
                    uDeptTexture: {value: dept},
                    uMouse: {value: mouse}
                },
                vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
                `,
                fragmentShader: `
                uniform sampler2D uTexture;
                uniform sampler2D uDeptTexture;
                uniform vec2 uMouse;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(uTexture, vUv);
                    vec4 dept = texture2D(uDeptTexture, vUv);
                    float x = vUv.x + dept.r * uMouse.x * 0.01;
                    float y = vUv.y + dept.r * uMouse.y * 0.01; 
                    gl_FragColor = texture2D(uTexture, vec2(x, y));;
                }
                `
            })
            const plane = new THREE.Mesh(geometry, material)
            plane.position.set(0,5,2)
            scene.add(plane)

            window.addEventListener("mousemove", (e) => {
                mouse.x = (e.offsetX / window.innerWidth) * 2 - 1
                mouse.y = -(e.offsetY / window.innerHeight) * 2 + 1
            })

            animation()
            function animation() {
                renderer.render(scene, camera);
                requestAnimationFrame(animation);
            }
        },
    }
</script>
<style>

</style>