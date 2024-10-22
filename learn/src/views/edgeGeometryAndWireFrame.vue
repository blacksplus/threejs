<template>
  <div>
    <!-- -->
  </div>
</template>

<script>
     import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
export default {
    name: 'edgeGeometryAndWireFrame',
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

            animate()

            const loader = new GLTFLoader()
            loader.load("/material/gltf/ball/scene.gltf", (gltf) => {
                scene.add(gltf.scene)
                console.log(gltf.scene)
                //初始一个包围盒
                const box = new THREE.Box3()
                //如果是层级的gltf则需要遍历查找geometry
                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        const geometry = child.geometry;
                        //获取边缘geometry 组成物体的所有边缘面
                        // const edgeGeometry = new THREE.EdgesGeometry(geometry)
                        //线框geometry 组成物体的所有的三角面
                        const edgeGeometry = new THREE.WireframeGeometry(geometry)
                        //创建线段材质
                        const lineMaterial = new THREE.LineBasicMaterial({
                            color: 0xffffff
                        })
                        //创建线段
                        let edges = new THREE.LineSegments(edgeGeometry, lineMaterial)
                        scene.add(edges)
                    }
                })
            })

            const RGBEloader = new RGBELoader()

            RGBEloader.load('/material/hdr/autumn_field_puresky_4k.hdr', (envMap) => {
                envMap.mapping = THREE.EquirectangularReflectionMapping

                // 设置场景的环境贴图
                scene.environment = envMap;
                // 设置场景的背景
                scene.background = envMap;

                console.log(scene)
            })
            function animate() {
                requestAnimationFrame(animate)
                render.render(scene, camera)
            }
    },
}
</script>
