<template>
    <div>
        <!-- -->
    </div>
</template>

<script>
    import * as THREE from 'three';
    //添加摄像头控制器
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
    export default {
        name: 'car',
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true
            document.body.appendChild(renderer.domElement);
             //曝光度
             renderer.toneMappingExposure = 1
            //物理特效光
            renderer.physicallyCorrectLights = true;
            //清除默认颜色
            renderer.setClearColor("#000")

            //添加网格地面
            const gridHelper = new THREE.GridHelper(10, 10)
            scene.add(gridHelper)

            scene.background = new THREE.Color("#ccc")
            scene.environment = new THREE.Color("#ccc")

             //添加控制器
             const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(0, 3 , 5);

            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath("/draco/")
            dracoLoader.setDecoderConfig({ type: 'js' })
            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)

            const spotLight = new THREE.SpotLight(0xffffff, 100, 100, Math.PI / 6, 0)
            spotLight.position.set(0,5,0)
            scene.add(spotLight)

            //创建物理材质
            const material1 = new THREE.MeshPhysicalMaterial({
                color: "#ff0000",
                //金属度
                metalness: 1,
                //粗糙度
                roughness: 0.5,
                //清漆
                clearcoat: 1,
                //清漆粗糙度
                clearcoatRoughness: 0.1
            })

            const material2 = new THREE.MeshPhysicalMaterial({
                color: "#ffffff",
                 //金属度
                 metalness: 0,
                //粗糙度
                roughness: 0.1,
                //完全通透
                transmission: 1.0,
                //透明
                transparent: true
            })

            const material3 = new THREE.MeshPhysicalMaterial({
                color: "#c1fe07",
                 //金属度
                 metalness: 0,
                //粗糙度
                roughness: 1,
            })

            gltfLoader.load("/material/glb/bmw01.glb", (gltf) => {
                scene.add(gltf.scene)
                // spotLight.target = gltf
                gltf.scene.traverse((child) => {
                    if(child.isMesh){
                        console.log(child)
                        if(child.name.includes("轮毂")){

                        }else if (child.name.includes("轮毂")){

                        }else if (child.name.includes("Mesh002")){
                            child.material = material1
                            
                        }else if (child.name.includes("引擎盖")){
                            child.material = material3
                        }else if (child.name.includes("前脸")){
                            
                        }else if (child.name.includes("挡风玻璃")){
                            child.material = material2
                        }
                    }
                })
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