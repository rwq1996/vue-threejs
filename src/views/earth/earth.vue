<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Template from './objects/template'
import Background from './objects/background'
import {addOrbitControls} from './control/orbitControls'
import Earth from './objects/earth'
import Satellite from './objects/satellite'

export default defineComponent({
    setup() {
     const {scene,camera,renderer} = Template()
      onMounted(()=>{
        Background(scene,camera,renderer)
        Earth(scene,camera,renderer)
        Satellite(scene,camera,renderer)
        addOrbitControls(camera,renderer.domElement)
      })  
    },
})
</script>


<style>

</style>