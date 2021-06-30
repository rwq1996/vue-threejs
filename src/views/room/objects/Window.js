import * as THREE from 'three'

export default function Window(){
    const frameGeometry = drawShape()
    const frameMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x5c5d5e
    })
    const frame = new THREE.Mesh( frameGeometry, frameMaterial )

    frame.position.set(170,-150,0)
    frame.rotation.z = Math.PI/2

    const windowGeometry = new THREE.BoxGeometry( 130, 90, 4 )
    const windowMaterial = new THREE.MeshPhysicalMaterial( {
      map: null,
      color: 0xcfcfcf,
      metalness: 0,
      roughness: 0,
      opacity: 0.45,
      transparent: true,
      envMapIntensity: 10,
      premultipliedAlpha: true
    } )
    const window = new THREE.Mesh( windowGeometry, windowMaterial )

    const group = new THREE.Group()
    group.add( frame )
    group.add( window )
    return {group}
}

function drawShape () {
    const shape = new THREE.Shape()
    shape.moveTo(100,100)
    shape.lineTo(100,250)
    shape.lineTo(200,250)
    shape.lineTo(200,100)
  
    const hole_1 = new THREE.Path()
    hole_1.moveTo(105,105)
    hole_1.lineTo(105,235)
    hole_1.lineTo(195,235)
    hole_1.lineTo(195,105)
    shape.holes.push(hole_1)
  
    const extrudeSettings = { 
      depth: 8, 
      bevelEnabled: true, 
      bevelSegments: 2, 
      steps: 2, 
      bevelSize: 1, 
      bevelThickness: 4 
    };
  
    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    return geometry
  }