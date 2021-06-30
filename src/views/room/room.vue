<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as THREE from 'three'
import Template from './objects/template'
import Base from './objects/base'
import Ground from './objects/ground'
import Ball from './objects/Ball'
import {addTable,addFlower} from './objects/Model'
import Vase from './objects/Vase'
import Floor from './objects/Floor'
import SideWall from './objects/SideWall'
import Box from './objects/Box'
import FrontWall from './objects/FrontWall'
import Roof from './objects/Roof'
import Window from './objects/Window'
import Door,{animates} from './objects/Door'
import {addOrbitControls} from './control/orbitControls'
import {Gui} from './tools/dat.gui'

export default defineComponent({
  setup() {
    const {scene,camera,renderer} =Template()
    const {setPosition,setRotation} =Base()
    const Controls = Gui()
    const AxesHelper = new THREE.AxesHelper( 700 )
    const {sphere} = Ball()
    const { group,door } =Door()
    const roof1 = Roof().roof
    const roof2 = Roof().roof
    const Window1 = Window().group
    const Window2 = Window().group
    let window1status = 'close'
    let window2status = 'close'

    // 添加ground
    const  addGroud = (scene)=>{
      const {ground}=Ground() 
      setPosition(ground,0, -2, 0)
      setRotation(ground,- Math.PI / 2, 0, 0)
      scene.add(ground)
    } 
    // 添加球
    const addBall = (scene)=>{ 
      setPosition(sphere,800, 20, -300)
      scene.add(sphere)
    }
    // 添加花瓶
    const addVase = (scene) =>{
      const {vase} = Vase()
      setPosition(vase,610,80,50)
      setRotation(vase,Math.PI/2,0,0)
      scene.add(vase)
    }
    // 添加地板
    const addFloor = (scene)=>{
      const {floor} = Floor()
      setPosition(floor,0,-1,0)
      setRotation(floor,-Math.PI/2,0,0)
      scene.add(floor)
    }
    // 添加墙
    const addWall = (scene)=>{
     const {wall} = FrontWall()
     setPosition(wall,400, 0, 0)
     setRotation(wall,0, Math.PI / 2, 0)
     scene.add(wall)

      const {box} = Box(1000,400,20)
      setPosition(box,-400, 199, 0)
      setRotation(box,0, - Math.PI / 2, 0)
      scene.add(box)

      const wall1=SideWall().wall
      setPosition(wall1,0,0,-500)
      scene.add(wall1)
      
      const wall2=SideWall().wall
      setPosition(wall2,0,0,492)
      scene.add(wall2)
    }
    // 添加房顶
    const addRoof = (scene)=>{
      
      setPosition(roof1,-241, 440, 0)
      setRotation(roof1,Math.PI / 2, Math.PI / 13, 0)
      scene.add(roof1)

      setPosition(roof2,241, 440, 0)
      setRotation(roof2,Math.PI / 2, -Math.PI / 13, 0)
      scene.add(roof2)
    }
    // 添加窗户
    const addWindow = (scene)=>{
      
      setPosition(Window1,408, 170, -150)
      setRotation(Window1,-Math.PI / 2, Math.PI / 2, 0)
      scene.add(Window1)
   
      setPosition(Window2,408,170, -250)
      setRotation(Window2,-Math.PI / 2, Math.PI / 2, 0)
     
      scene.add(Window2)
    }
    // 添加门
    const addDoor = (scene) =>{
      
      setPosition(group,408, 30, 210)
      setRotation(group,0, - Math.PI / 2, 0)
      scene.add(group)
    }
    // 动画
    const animate = () => {
      if(Controls.showAxes){
        scene.add( AxesHelper )
      }else{
        scene.remove( AxesHelper )
      }

      if(Controls.showRoof){
        scene.add( roof1 )
        scene.add( roof2 )
      }else{
        scene.remove( roof1 )
        scene.remove( roof2 )
      }

      requestAnimationFrame(animate)
      renderer.render(scene, camera)  
    }

      //  鼠标点击事件
   const onMouseDown = (event) => {  
      let vector = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      )
      vector = vector.unproject(camera)
      
      const raycaster = new THREE.Raycaster(
        camera.position,
        vector.sub(camera.position).normalize()
      )
      // 点击门的动画
      const intersects = raycaster.intersectObjects([door])
      if(intersects.length > 0){
        animates()
      }
      // 点击窗户的动画
      const intersect1 = raycaster.intersectObjects(Window1.children)
      if(intersect1.length>0){
        const animate1 = () =>{
          if(window1status=='close'){
            setPosition(Window1,458, 170, -110)
            setRotation(Window1,Math.PI * 2, 0, - Math.PI / 2)
            window1status='open'
          }else{
            setPosition(Window1,408, 170, -150)
            setRotation(Window1,-Math.PI / 2, Math.PI / 2, 0)
            window1status='close'
          }
          
        }
        animate1()
      }
      const intersect2 = raycaster.intersectObjects(Window2.children)
      if(intersect2.length>0){
        const animate1 = () =>{
          if(window2status=='close'){
            setPosition(Window2,458,170, -300)
            setRotation(Window2,-Math.PI * 2,0, -Math.PI / 2)
            window2status='open'
          }else{
            setPosition(Window2,408,170, -250)
            setRotation(Window2,-Math.PI / 2, Math.PI / 2, 0)
            window2status='close'
          }
          
        }
        animate1()
      }
      // 点击足球的动画
      const intersect3 = raycaster.intersectObjects([sphere])
      if(intersect3.length>0){
        setPosition(sphere,800+Math.random() * 100 - 20, 20, -300+Math.random() * 100 - 20)
      }
        
    }
      
    onMounted(()=>{  
      addBall(scene)
      addGroud(scene) 
      addTable(scene)
      addFlower(scene)
      addVase(scene)
      addFloor(scene)
      addWall(scene)
      addRoof(scene)
      addWindow(scene)
      addDoor(scene)

      addOrbitControls(camera,renderer.domElement)
     
      animate()
      window.addEventListener('click', onMouseDown)
    }) 

  },
})
</script>


<style>

</style>