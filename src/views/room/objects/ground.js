import * as THREE from "three";

export default function Ground(){
  const groundGeometry = new THREE.PlaneGeometry( 20000,20000 )
  const groundTexture = new THREE.TextureLoader().load(require('../../../images/room/grass.jpg'))
  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping
  groundTexture.repeat.set( 50, 50 )
  groundTexture.anisotropy = 16
  const groundMaterial = new THREE.MeshLambertMaterial({ 
    map: groundTexture 
  })

  const ground = new THREE.Mesh( groundGeometry, groundMaterial )
  return {ground}
}