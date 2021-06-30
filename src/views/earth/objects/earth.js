import * as THREE from 'three'

export default function Earth(scene,camera,renderer){
    var texture=  new THREE.TextureLoader().load(require('../../../earthimages/earth2.jpg'))
    var globeGgeometry = new THREE.SphereGeometry( 50, 100, 100 );
    var globeMaterial = new THREE.MeshBasicMaterial( { map: texture } );
    var globeMesh = new THREE.Mesh( globeGgeometry, globeMaterial );
    var textures = new THREE.TextureLoader().load( require('../../../earthimages/earth_aperture.png') );
    var spriteMaterial = new THREE.SpriteMaterial( {
        map: textures,
        transparent: true,
        opacity: 0.5,
        depthWrite: false
    } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set( 50 * 3, 50 * 3, 1 );
    const group = new THREE.Group() 
    group.rotation.set( 0.5, 2.9, 0.1 );
    group.add( sprite );
    group.add( globeMesh );
	scene.add( group );
    const animate = () => {
        renderer.render(scene, camera) 
        group.rotation.y += 0.002; 
        requestAnimationFrame(animate)  
    }
    animate()
    return {group}
}

