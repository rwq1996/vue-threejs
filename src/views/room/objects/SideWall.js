import * as THREE from 'three'

export default function SideWall(){
    const wallGeometry = drawShape()
    const wallMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xe5d890 
    })
    const wall = new THREE.Mesh( wallGeometry, wallMaterial )
    return {wall}
}

function drawShape () {
    const shape = new THREE.Shape()
    shape.moveTo(-400, 0)
    shape.lineTo(400, 0)
    shape.lineTo(400,400)
    shape.lineTo(0,500)
    shape.lineTo(-400,400)

    const extrudeSettings = { 
        depth: 8, 
        bevelEnabled: true, 
        bevelSegments: 2, 
        steps: 2, 
        bevelSize: 1, 
        bevelThickness: 1 
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    return geometry
}
