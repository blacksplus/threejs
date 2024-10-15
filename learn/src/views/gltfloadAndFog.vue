<template>
  <div>
    <!-- -->
  </div>
</template>

<script>
        import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

export default {
    name: 'gltfloadAndFog',
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

            const loader = new GLTFLoader()

            loader.load("/material/gltf/ball/scene.gltf", (gltf) => {
                scene.add(gltf.scene)
            })

            const loader1 = new EXRLoader()
            // 创建一个PMREMGenerator以生成环境贴图
            var pmremGenerator = new THREE.PMREMGenerator(render);
            pmremGenerator.compileEquirectangularShader();

            loader1.load('/material/hdr/space/Space_Nebula_E.exr', (texture) => {
                // 通过PMREMGenerator处理texture生成环境贴图
                var envMap = pmremGenerator.fromEquirectangular(texture).texture;
                // 设置场景的环境贴图
                scene.environment = envMap;
                // 设置场景的背景
                scene.background = envMap;
                // 释放pmremGenerator的资源
                pmremGenerator.dispose();
            })


            //添加雾 颜色 开始距离 最远距离完全这个颜色
            scene.fog = new THREE.Fog(0x000000, 0.1, 50)

            animate()

            function animate() {
                requestAnimationFrame(animate)
                render.render(scene, camera)
            }
    },
}
</script>
