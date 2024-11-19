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
    import * as CANNON from 'cannon-es'
    export default {
        name: "playBall",
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });

            //设置色调映射
            renderer.toneMapping = THREE.ACESFilmicToneMapping
            renderer.shadowMap.enabled = true
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            scene.background = new THREE.Color(0xffffff)

           //添加直射灯光
           const directionLight = new THREE.DirectionalLight(0xffffff, 2)
            //设置灯光位置
            directionLight.position.set(0, 20, 0)
            directionLight.castShadow = true
            scene.add(directionLight)

            //添加直射灯光
           const directionLight1 = new THREE.DirectionalLight(0xffffff, 1)
            //设置灯光位置
            directionLight1.position.set(0, 3, 30)
            directionLight1.castShadow = true
            scene.add(directionLight1)

             //添加直射灯光
           const directionLight2 = new THREE.DirectionalLight(0xffffff, 1)
           //防止出现条纹
           directionLight2.shadow.bias = -0.00008
            //设置灯光位置
            directionLight2.position.set(30, 3, 0)
            directionLight2.castShadow = true
            scene.add(directionLight2)


            //添加控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(6, 3, 0);

            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath("/draco/")
            dracoLoader.setDecoderConfig({ type: 'js' })
            const gltfLoader = new GLTFLoader()
            gltfLoader.setDRACOLoader(dracoLoader)

            //初始化物理世界
            const world = new CANNON.World()
            //设置重力
            world.gravity.set(0, -9.8, 0)
            //初始化一个渲染球和物理球
            let ball,worldBall

            gltfLoader.load("/integrated/playball/playground02.glb", (gltf) => {
                scene.add(gltf.scene)
                gltf.scene.traverse((child) => {
                    if(child.isMesh && child.name.search(/Solid/) == -1){
                        child.castShadow = true
                        child.receiveShadow = true
                        //创建其它物体的刚体
                        const mesh = new CANNON.Trimesh(
                            child.geometry.attributes.position.array,
                            child.geometry.index.array
                        )
                        const worldMesh = new CANNON.Body({
                            mass: 0,
                            shape: mesh
                        })
                        //获取世界位置和旋转传给真实世界
                        worldMesh.position.copy(child.getWorldPosition(new THREE.Vector3()))
                        worldMesh.quaternion.copy(child.getWorldQuaternion(new THREE.Quaternion()))
                        world.addBody(worldMesh)
                    }
                    if(child.name == 'Soccer_Ball'){
                        ball = child
                        //创建球体
                        const ballSphere = new CANNON.Sphere(0.15)
                        //创建刚体
                        worldBall = new CANNON.Body({
                            mass: 1,
                            position: new CANNON.Vec3(0, 20, 0),
                            shape: ballSphere
                        })
                        //刚体添加到物理世界
                        world.addBody(worldBall)
                        //重置位置 速度 角速度
                        setTimeout(() => {
                            worldBall.position.set(0, 20, 0)
                            worldBall.velocity.set(0,0,0)
                            worldBall.angularVelocity.set(0,0,0)
                        }, 2000);
                    }
                })
            })
            let clock = new THREE.Clock()
            animation();
            window.addEventListener("click", () => {
                worldBall.applyForce(
                    new CANNON.Vec3(200 * (0.5 - Math.random()), 200 * (0.5 - Math.random()), 200 * (0.5 - Math.random()) ),
                    worldBall.position)
            })
            window.addEventListener("contextmenu", () => {
                worldBall.position.set(0,0,0)
                worldBall.velocity.set(0,0,0)
                worldBall.angularVelocity.set(0,0,0)
            })
            function animation() {
                let delta = clock.getDelta()
                //按照间隔世界更新物理世界
                world.step(delta)
                if(ball && worldBall){
                    ball.position.copy(worldBall.position)
                    ball.quaternion.copy(worldBall.quaternion)
                }
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(animation);
            }
        },
    }
</script>