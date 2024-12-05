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
        name: 'cannon-es',
        data() {
            return {

            };
        },
        mounted() {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            //添加直射灯光
            const directionLight = new THREE.DirectionalLight(0xffffff, 2)
            //设置灯光位置
            directionLight.position.set(0, 20, 0)
            directionLight.castShadow = true
            scene.add(directionLight)

            //添加控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(0, 0, 8);

            //初始化物理世界
            const world = new CANNON.World()
            //设置重力
            world.gravity.set(0, -9.8, 0)
            //设置碰撞组可以规定哪些物体之间能碰撞，值必须是2的幂次方
            const GROUP1 = 1
            const GROUP2 = 2
            const GROUP3 = 4


            //物理世界的物体
            const worldMesh = []

            const PlaneGeometry = new THREE.BoxGeometry(16, 1, 16)
            const material = new THREE.MeshBasicMaterial({
                color: 0xffff00
            })
            const plane = new THREE.Mesh(PlaneGeometry, material)
            plane.position.set(0, 0, 0)
            plane.rotation.x = 0.1
            scene.add(plane)
            //真实物体材质
            const wBoxMaterial = new CANNON.Material("boxMaterial")
            wBoxMaterial.friction = 0.1
            wBoxMaterial.restitution = 1
            //创建物理世界的平面
            const wPlane = new CANNON.Body({
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(8, 0.5, 8)),
                position: new CANNON.Vec3(0, 0, 0),
                type: CANNON.Body.STATIC,
                material: wBoxMaterial,
                //设置为哪个组
                collisionFilterGroup: GROUP1,
                //设置可以和哪些组碰撞
                collisionFilterMask: GROUP2 | GROUP3
            })
            //刚体旋转
            wPlane.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), 0.1)
            world.addBody(wPlane)


            const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
            const box1 = new THREE.Mesh(boxGeometry, new THREE.MeshBasicMaterial({
                color: 0x0000ff
            }))
            // box1.rotation.x = 0.1 
            box1.position.y = 5
            scene.add(box1)

            const boxSlipperyMaterial = new CANNON.Material("boxSlipperyMaterial")
            const box = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
            boxSlipperyMaterial.friction = 0.005
            const wBox = new CANNON.Body({
                mass: 1,
                shape: box,
                position: new CANNON.Vec3(0, 5, 0),
                material: boxSlipperyMaterial,
                //设置为哪个组
                collisionFilterGroup: GROUP2,
                //设置可以和哪些组碰撞
                collisionFilterMask: GROUP1 | GROUP3
            })
            world.addBody(wBox)
            worldMesh.push({
                r: box1,
                w: wBox
            })

            //初始反弹材质
            const boxBouncyMaterial = new CANNON.Material("boxBouncyMaterial")
            boxBouncyMaterial.friction = 0.1
            //弹性
            boxBouncyMaterial.restitution = 1
            const wBox1 = new CANNON.Body({
                mass: 1,
                shape: box,
                position: new CANNON.Vec3(2, 5, 0),
                material: boxBouncyMaterial,
                //设置为哪个组
                collisionFilterGroup: GROUP2,
                //设置可以和哪些组碰撞
                collisionFilterMask: GROUP3
            })
            const box2 = new THREE.Mesh(boxGeometry, new THREE.MeshBasicMaterial({
                color: 0x00ffff
            }))
            // box1.rotation.x = 0.1 
            box2.position.y = 5
            box2.position.x = 2
            scene.add(box2)
            world.addBody(wBox1)
            worldMesh.push({
                r: box2,
                w: wBox1
            })

            //定义接触材质，即两个物体接触时的效果
            const boxMaterial3 = new CANNON.Material("boxMaterial")
            const box3 = new THREE.Mesh(boxGeometry, new THREE.MeshBasicMaterial({
                color: 0xf00ff0
            }))
            box3.position.y = 5
            box3.position.x = 4
            scene.add(box3)
            const contactMaterial = new CANNON.ContactMaterial(
                boxMaterial3,
                wBoxMaterial,
                {
                    friction: 0.01,
                    restitution: 0.5
                }
            )
            const wBox2 = new CANNON.Body({
                mass: 1,
                shape: box,
                position: new CANNON.Vec3(4, 5, 0),
                material: contactMaterial,
                //设置为哪个组
                collisionFilterGroup: GROUP2,
                //设置可以和哪些组碰撞
                collisionFilterMask: GROUP1 | GROUP3
            })
            //允许立方体休眠
            wBox2.allowSleep = true
            //速度为多少时休眠
            wBox2.sleepSpeedLimit = 0.1
            //速度达到时，设置多久进入休眠状态
            wBox2.sleepTimeLimit = 0.1
            world.addBody(wBox2)
            world.addContactMaterial(contactMaterial)
            worldMesh.push({
                r: box3,
                w: wBox2
            })
            wBox2.addEventListener("collide", (e) => {
                console.log("碰撞了：", e)
                console.log("撞击强度：", e.contact.getImpactVelocityAlongNormal())
            })


            wBox2.addEventListener("sleepy", (e) => {
                console.log("休眠：", e)
            })


            //创建两个球和一个圆柱体组成胶囊
            const capsuleBody = new CANNON.Body({
                mass: 1,
                position: new CANNON.Vec3(-2, 5, 0),
                material: contactMaterial,
                //设置为哪个组
                collisionFilterGroup: GROUP2,
                //设置可以和哪些组碰撞
                collisionFilterMask: GROUP1 | GROUP3
            })
            //创建球体几何
            const sphereShape = new CANNON.Sphere(0.5)
            //创建圆柱体
            const cylinderShape = new CANNON.Cylinder(0.5, 0.5, 1.5, 20)

            capsuleBody.addShape(sphereShape, new CANNON.Vec3(0, 0.75, 0))
            capsuleBody.addShape(cylinderShape, new CANNON.Vec3(0, 0, 0))
            capsuleBody.addShape(sphereShape, new CANNON.Vec3(0, -0.75, 0))
            world.addBody(capsuleBody)

            //创建显示的胶囊
            const shereGeometry = new THREE.SphereGeometry(0.5, 20, 20)
            const sphere1 = new THREE.Mesh(shereGeometry, new THREE.MeshBasicMaterial({
                color: 0xff00ff
            }))
            const sphere2 = new THREE.Mesh(shereGeometry, new THREE.MeshBasicMaterial({
                color: 0xff00ff
            }))
            const capsuleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 20)
            const capsule = new THREE.Mesh(capsuleGeometry, new THREE.MeshBasicMaterial({
                color: 0xffffff
            }))
            sphere1.position.set(0, 0.75, 0)
            sphere2.position.set(0, -0.75, 0)
            capsule.add(sphere1)
            capsule.add(sphere2)

            scene.add(capsule)

            worldMesh.push({
                r: capsule,
                w: capsuleBody
            })

            const loader = new GLTFLoader()
            loader.load("/material/gltf/ball/scene.gltf", (gltf) => {
                // console.log(gltf)
                // gltf.scene.position.set(-4, 5, 0)
                // gltf.scene.scale.set(0.15,0.15,0.15)
                // scene.add(gltf.scene)
                const model = gltf.scene.children[0].children[0].children[0].children[0].children[1]
                model.position.set(-4, 5, 0)
                model.scale.set(0.03, 0.03, 0.03)
                scene.add(model)
                const modelBody = new CANNON.Body({
                    mass: 1,
                    shape: new CANNON.Trimesh(
                        model.geometry.attributes.position.array,
                        model.geometry.index.array
                    ),
                    position: new CANNON.Vec3(-4, 5, 0),
                    material: contactMaterial,
                    //设置为哪个组
                    collisionFilterGroup: GROUP2,
                    //设置可以和哪些组碰撞
                    collisionFilterMask: GROUP1 | GROUP3
                })
                world.addBody(modelBody)
                worldMesh.push({
                    r: model,
                    w: modelBody
                })
            })

            const ball = new THREE.Mesh(shereGeometry, new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            }))
            scene.add(ball)
            const ballMaterial = new CANNON.Material("ballMaterial")
            ballMaterial.friction = 10000000
            const ballBody = new CANNON.Body({
                mass: 1,
                material: ballMaterial,
                shape: sphereShape,
                position: new CANNON.Vec3(6, 5, 0),
                //设置为哪个组
                collisionFilterGroup: GROUP3,
                //设置可以和哪些组碰撞
                collisionFilterMask: GROUP1 | GROUP2
            })
            world.addBody(ballBody)
            worldMesh.push({
                w: ballBody,
                r: ball
            })

            document.addEventListener("click", () => {
                console.log(1)
                //施加相对位置的力 力的向量 力的相对于球的位置
                // ballBody.applyForce(new CANNON.Vec3(-10, 0, 0), new CANNON.Vec3(0, 0.5, 0))
                //施加绝对位置的力 
                // ballBody.applyLocalForce(new CANNON.Vec3(-10, 0, 0), new CANNON.Vec3(0, 0.5, 0))

                //施加冲量 也有绝对位置
                // ballBody.applyImpulse(new CANNON.Vec3(0, 0, -10 * (1 / 60)), new CANNON.Vec3(0, 0.5, 0))

                //施加力矩
                ballBody.applyTorque(new CANNON.Vec3(0, 10, 0))

            })

            let clock = new THREE.Clock()
            animation()
            function animation() {
                let delta = clock.getDelta()
                // console.log(delta)
                //按照间隔世界更新物理世界
                world.step(1 / 60, delta)
                worldMesh.forEach(item => {
                    // console.log(item)
                    item.r.position.copy(item.w.position)
                    item.r.quaternion.copy(item.w.quaternion)
                    // console.log(item.w.position)
                })
                renderer.render(scene, camera);
                controls.update();
                requestAnimationFrame(animation);
            }
        },

        methods: {

        },
    };
</script>

<style lang="scss" scoped>

</style>