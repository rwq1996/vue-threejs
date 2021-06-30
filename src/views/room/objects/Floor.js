import * as THREE from 'three'

export default function Floor(){
    const floorGeometry = new THREE.PlaneGeometry( 800, 1000 )

    const floorTexture = new THREE.TextureLoader().load(require('../../../images/room/floor.png'))
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
	floorTexture.repeat.set( 25, 25 )
	floorTexture.anisotropy = 16
    const floorMaterial = new THREE.MeshLambertMaterial({ 
      map: floorTexture 
    })

    const floor = new THREE.Mesh( floorGeometry, floorMaterial )
    return {floor}
}