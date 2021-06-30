import * as THREE from 'three'
let status
let param
let door
export default function Door(){ 
    const group = new THREE.Group() 
    door = initDoor(status)
    group.add( initFrame() )
    group.add( door )
    return {door,group}
}

function initFrame () {
    const frameGeometry = drawShape()
    const frameMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x8d7159
    })
    const frame = new THREE.Mesh( frameGeometry, frameMaterial )
    return frame
}

function initDoor () {
    const doorGeometry = new THREE.BoxGeometry(100,210,4)
    const doorTexture = new THREE.TextureLoader().load(require('../../../images/room/wood.jpg'))
    const doorMaterial = new THREE.MeshLambertMaterial({ map: doorTexture })
    const door = new THREE.Mesh(doorGeometry, doorMaterial)
    param = {
        positionX : 60,
        positionZ: 0,
        rotationY: 0
      }
    door.position.set(param.positionX, 105, param.positionZ)
    door.rotation.y = param.rotationY
    status='closed'
    return door
}

function drawShape () {
    const shape = new THREE.Shape()
    shape.moveTo(0,0)
    shape.lineTo(0, 220)
    shape.lineTo(120, 220)
    shape.lineTo(120, 0)

    const door = new THREE.Path()
    door.moveTo(10,0)
    door.lineTo(10, 210)
    door.lineTo(110, 210)
    door.lineTo(110, 0)
    shape.holes.push(door)

    const extrudeSettings = { 
      depth: 8, 
      bevelEnabled: true, 
      bevelSegments: 2, 
      steps: 2, 
      bevelSize: 1, 
      bevelThickness: 6 
    };

    const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    return geometry
  }
  function onUpdate (door,param) {
    door.position.x = param.positionX
    door.position.z = param.positionZ
    door.rotation.y = param.rotationY
  }

 export  function animates(){
    if(status === 'closed'){
      param.positionX = 10
      param.positionZ = 50
      param.rotationY = -Math.PI/2
      status= 'open'
    }else{
      param.positionX = 60
      param.positionZ = 0
      param.rotationY = 0
      status= 'closed'
    }
    onUpdate(door,param)
  }