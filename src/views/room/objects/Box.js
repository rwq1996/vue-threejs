import * as THREE from 'three'

export default function Box(a,b,c){
    const boxGeometry = new THREE.BoxGeometry( a,b,c)

    const boxMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xe5d890 
    })

    const box = new THREE.Mesh( boxGeometry, boxMaterial )
    return {box}
}