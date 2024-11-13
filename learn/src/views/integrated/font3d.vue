<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three';
    //添加摄像头控制器
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    export default {
        name: "font3d",
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            scene.background = new THREE.Color(0xffffff)


            //添加控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(0, 0, 8);

            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath("/draco/")
            dracoLoader.setDecoderConfig({ type: 'js' })
            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)

            gltfLoader.load("/integrated/3dfont/newyear.glb", (gltf) => {
                scene.add(gltf.scene)
                const geometry = gltf.scene.children[0].geometry
                const position = geometry.attributes.position
                //顶点数量
                const vertexCount = position.count
                //三角形数量
                const triangleCount = vertexCount / 3
                //随机方向
                const randomDirction = []
                //随机强度
                const randomStrengths = []
                //方向
                for(let i = 0; i < triangleCount; i++){
                    const dirction = new THREE.Vector3(
                        Math.random() * 2 - 1,
                        Math.random() * 2 - 1,
                        Math.random() * 2 - 1,
                    )
                    //归一化
                    .normalize()
                    //转成数组
                    .toArray();
                    randomDirction.push(...dirction)
                    const str = Math.random()
                    randomStrengths.push(str, str, str)
                }
                const dirctionAttribute = new THREE.Float32BufferAttribute(
                    new Float32Array(randomDirction),
                    3
                )
                const strengthAttribute = new THREE.Float32BufferAttribute(
                    new Float32Array(randomStrengths),
                    1
                )
                geometry.setAttribute("randomDirction", dirctionAttribute)
                geometry.setAttribute("randomStrengths", strengthAttribute)

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        time: {value: 1.0}
                    },
                    vertexShader: `
                    attribute vec3 randomDirction;
                    attribute float randomStrengths;
                    uniform float time;
                    varying vec3 vPosition;

                    void main() {
                        vPosition = position;
                        vec3 pos = position.xyz;
                        pos += randomDirction * randomStrengths * time;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
                    }
                    `,
                    fragmentShader: `
                    varying vec3 vPosition;

                    void main() {
                        vec3 color = normalize(vPosition) * 0.5 + 0.5;
                        color.z = color.z * 3.0;
                        gl_FragColor = vec4(color, 1.0);
                    }
                    `,
                    side: THREE.DoubleSide,
                    transparent: true

                })
                gltf.scene.children[0].material = material
            })

            animation();
            function animation() {
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(animation);
            }
        },
    }
</script>