import * as THREE from 'three'

export default function Satellite(scene,camera,renderer){
    var geometry = new THREE.PlaneGeometry( 150, 150 );
    var texture=  new THREE.TextureLoader().load(require('../../../earthimages/halo.png'))
    var material = new THREE.MeshLambertMaterial( {
        map: texture, 
        transparent: true,
        side: THREE.DoubleSide, 
        depthWrite: false
    } );
    var mesh = new THREE.Mesh( geometry, material );

    var p1 = new THREE.Vector3( -70, 0, 0 );
    var p2 = new THREE.Vector3( 70, 0, 0 );
    const points = [ p1,p2];
    const geometry1 = new THREE.BufferGeometry().setFromPoints( points );
    var texture1=  new THREE.TextureLoader().load(require('../../../earthimages/smallEarth.png'))
    var material1 = new THREE.PointsMaterial( {
        map: texture1,
        transparent: true,
        side: THREE.DoubleSide, 
        size: 10, 
        depthWrite: false
    } );
    var earthPoints = new THREE.Points( geometry1, material1 );

    const groupHalo = new THREE.Group() 
    groupHalo.rotation.set( 1.9, 0.5, 1 );
    groupHalo.add( mesh );
    groupHalo.add( earthPoints );
    const animate = () => {
        renderer.render(scene, camera) 
        groupHalo.rotation.z += 0.01; 
        requestAnimationFrame(animate)  
    }
    animate()
    scene.add(groupHalo)    
}