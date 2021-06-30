<template>
  <div ref='threeDom' class="model" id='container' style="width:100%;height:100%;"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted} from 'vue'
import template from '../common/template'
import cloud from './cloud'
import RainDrop from './raindrop';


export default defineComponent({
  name: 'App',
  setup() {
  onMounted(()=>{
    const {scene,camera,renderer,init} =template()
    init()
    camera.rotation.x = 1.16
    camera.rotation.y = -0.12
    camera.rotation.z = 0.27
    
    const {addCloud,addLightning,initLight,addFog,animate}=cloud(scene,camera,renderer)
    addCloud()
    addFog()
    initLight()
    addLightning()
    animate()
    // 雨滴动画
    const {animates} =RainDrop(scene,camera,renderer)
    animates()
  })
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
