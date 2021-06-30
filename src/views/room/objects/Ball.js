import * as THREE from "three";

export default function Ball(){
    const sphereGeometry = new THREE.SphereGeometry(20, 32, 16)
    const sphereTexture = new THREE.TextureLoader().load(require('../../../images/room/soccer.jpg'))
    const sphereMaterial = new THREE.MeshLambertMaterial({ map: sphereTexture })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    return {sphere}
}