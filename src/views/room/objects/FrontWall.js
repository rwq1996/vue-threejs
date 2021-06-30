import * as THREE from 'three'

export default function FrontWall(){
    const wallGeometry = drawShape()
    const wallMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xe5d890 
    })
    const wall = new THREE.Mesh( wallGeometry, wallMaterial )
    return {wall}
}

function drawShape () {
    const shape = new THREE.Shape()
    shape.moveTo(-500, 0)
    shape.lineTo(500, 0)
    shape.lineTo(500,400)
    shape.lineTo(-500,400)

    const window = new THREE.Path()
    window.moveTo(100,100)
    window.lineTo(100,250)
    window.lineTo(300,250)
    window.lineTo(300,100)
    shape.holes.push(window)

    const door = new THREE.Path()
    door.moveTo(-330,30)
    door.lineTo(-330, 250)
    door.lineTo(-210, 250)
    door.lineTo(-210, 30)
    shape.holes.push(door)

    const extrudeSettings = { 
      depth: 8, 
      bevelEnabled: true, 
      bevelSegments: 2, 
      steps: 2, 
      bevelSize: 1, 
      bevelThickness: 5 
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    return geometry
  }