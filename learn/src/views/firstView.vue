<template>
  <div>
    <!-- -->
  </div>
</template>

<script>
    import * as THREE from 'three';
export default {
  name: 'FirstView',
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
  created() {
    //
  },
  mounted() {
    //
    const scene = new THREE.Scene();
    //创建相机
    const camera = new THREE.PerspectiveCamera(
      45,//视角
      window.innerWidth/window.innerHeight,//相机看到的宽高比
      0.1,//最近能看到的
      1000//最远能看到的
    )

    //创建渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth,window.innerHeight)
    document.body.appendChild(renderer.domElement)

    //创建一个立方体
    const geometry = new THREE.BoxGeometry(1,1,1)
    //创建材质
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
    //创建网格
    const cube = new THREE.Mesh(geometry, material)

    //将网格添加到场景中
    scene.add(cube)
    //设置相机位置,默认0
    camera.position.z = 5

    //相机朝向,默认看向原点
    camera.lookAt(0,0,0)

    //渲染
    renderer.render(scene, camera)
    
    animation()

    //动画函数
    function animation() {
      requestAnimationFrame(animation)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }
  },
};
</script>
