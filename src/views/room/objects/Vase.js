import * as THREE from "three";

export default function Vase(){
    const vaseGeometry = drawShape()
    const vaseMaterial = new THREE.MeshPhysicalMaterial( {
        color: 0xe5d1c4,
        metalness: 0.6,
        roughness: 0.2,
        reflectivity: 1,
        emissive: 0x517072
    } );
    const vase = new THREE.Mesh( vaseGeometry, vaseMaterial )
    return {vase}
}

function drawShape () {
    const shape = new THREE.Shape()
    shape.arc(0,0,8,0,2*Math.PI)

    const hollow = new THREE.Path()
    hollow.arc(0,0,7,0,2*Math.PI)
    shape.holes.push(hollow)

    const extrudeSettings = { 
        depth: 20, 
        bevelEnabled: true, 
        bevelSegments: 8, 
        steps: 2, 
        bevelSize: 1, 
        bevelThickness: 20
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    return geometry
}