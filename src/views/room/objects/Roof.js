import * as THREE from 'three'

export default function Roof(){
    const roofGeometry = new THREE.BoxGeometry( 500, 1300, 10 )

    const roofTexture = new THREE.TextureLoader().load(require('../../../images/room/roof.png'))
	roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping
	roofTexture.repeat.set( 2, 2 )
		// roofTexture.anisotropy = 16
    const materials = []
    const colorMaterial = new THREE.MeshLambertMaterial({ color: 'grey' })
    const textureMaterial = new THREE.MeshLambertMaterial({ map: roofTexture })
    for(let i=0; i<6; i++){
      materials.push(colorMaterial)
    }
    materials[5] = textureMaterial
    const roof = new THREE.Mesh( roofGeometry, materials )
    return {roof}
}