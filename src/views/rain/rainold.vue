<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div ref='threeDom' class="model" id='container' style="width:100%;height:100%;"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted} from 'vue'
import * as THREE from "three";


export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    let instance = null
    let lightnings = null
    let clouds = []
    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    // var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    var camera = new THREE.PerspectiveCamera(45, k, 200, 1000);
    // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0, 1000);
    const init = ()=>{
      new THREE.TextureLoader().load(require('../../assets/images/smoke.png'),(textures)=>{
        const cloudGeo = new THREE.PlaneBufferGeometry(564, 300)
        const cloudMaterial = new THREE.MeshLambertMaterial({
          map: textures,
          transparent: true
        })
        var mesh = new THREE.Mesh(cloudGeo, cloudMaterial); //网格模型对象Mesh
        mesh.material.opacity = 0.6
        instance = mesh
        scene.add(mesh); //网格模型添加到场景中
        addCloud(cloudGeo,cloudMaterial)
      }) 
      
        // 相机设置
        //创建相机对象
        camera.position.copy(new THREE.Vector3(0, 0, 1)); //设置相机位置
        camera.lookAt(new THREE.Vector3(0,0,0)); //设置相机方向(指向的场景对象)

        // 创建渲染器对象
        renderer.setClearColor(new THREE.Color(0x000000)) 
        renderer.setSize(width, height);//设置渲染区域尺寸
        // renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        document.getElementById("container").appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        renderer.render(scene, camera);

        camera.rotation.x = 1.16
        camera.rotation.y = -0.12
        camera.rotation.z = 0.27
        addFog()
          //add light
        initLight()
        addLightning()

        animate()
    }
    const addCloud =  (cloudGeo,cloudMaterial) => {
      clouds=[]
      for(let i = 0; i < 30; i++){
        var meshs = new THREE.Mesh(cloudGeo, cloudMaterial); //网格模型对象Mesh
        meshs.material.opacity = 0.6
        instance = meshs
        clouds.push(instance)
        instance.position.set(Math.random() * 1000 - 460, 600, Math.random() * 500 - 400)
        instance.rotation.x = 1.16
        instance.rotation.y = -0.12
        instance.rotation.z = Math.random() * 360
        scene.add(instance)
      }
   }

  const addLightning = () => {
    const lightning = new THREE.PointLight(0x062d89, 30, 500, 1.7)
    lightning.position.set(200, 300, 100)
    lightnings = lightning
    scene.add(lightning)
  }

  const initLight = () => {
    const ambientLight = new THREE.AmbientLight(0x555555)
    scene.add(ambientLight)

    const directionLight = new THREE.DirectionalLight(0xffeedd)
    directionLight.position.set(0,0,1)
    scene.add(directionLight)
  }
  const addFog= ()=> {
    const fog = new THREE.FogExp2(0x1c1c2a, 0.002)
    renderer.setClearColor(fog.color)
  }
  const animate = () => {
    //cloud move
    clouds.forEach((cloud) => {
      // cloud.animate()
      cloud.rotation.z -= 0.003
    })
    
    //rain drop
    // this.rainDrop.animate()

    //lightning
    if(Math.random() > 0.93 || lightnings.power > 100){
      if(lightnings.power < 100){
        lightnings.position.set(
          Math.random() * 400,
          300 + Math.random() * 200,
          100
        )
      }
      lightnings.power = 50 + Math.random() * 500
    }
    
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  onMounted(()=>{
    init()
  })
  return{
    clouds,
    instance,
    lightnings,
    addFog,
    addCloud,
    init,
    addLightning,
    initLight,
    animate
  }
  },
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
