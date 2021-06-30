import * as THREE from "three";
export default function cloud(scene,camera,renderer){
    let clouds = []
    let lightnings = null
    const addCloud =  () => {
        clouds=[]
        for(let i = 0; i < 30; i++){
         var texture=  new THREE.TextureLoader().load(require('../../images/smoke.png'))
         const cloudGeo = new THREE.PlaneBufferGeometry(564, 300)
          const cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
          })
          var mesh = new THREE.Mesh(cloudGeo, cloudMaterial); //网格模型对象Mesh
          mesh.material.opacity = 0.6
          clouds.push(mesh)
          mesh.position.set(Math.random() * 1000 - 460, 600, Math.random() * 500 - 400)
          mesh.rotation.x = 1.16
          mesh.rotation.y = -0.12
          mesh.rotation.z = Math.random() * 360
          scene.add(mesh)
        }
   
     }
  
    const addLightning = () => {
      const lightning = new THREE.PointLight(0x062d89, 30, 500, 1.7)
      lightning.position.set(200, 300, 100)
      lightnings = lightning
      scene.add(lightning)
      return lightnings
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
          cloud.rotation.z -= 0.003
        })

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
    return{
        addCloud,
        addLightning,
        initLight,
        addFog,
        animate
    }
}