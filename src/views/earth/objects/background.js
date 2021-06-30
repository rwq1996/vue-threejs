import * as THREE from 'three'

export default function Background(scene,camera,renderer){
    // let lightness =0
    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();
    for (var i = 0; i < 10000; i ++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    positions.push( vertex.x, vertex.y, vertex.z );
    var color = new THREE.Color();
    color.setHSL( Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55 );
    colors.push( color.r, color.g, color.b );
    }
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    var texture=  new THREE.TextureLoader().load(require('../../../earthimages/rain-drop.png'))
    var starsMaterial = new THREE.PointsMaterial( {
        map: texture,
        size: 1,
        transparent: true,
        opacity: 1,
        vertexColors: true, //true：且该几何体的colors属性有值，则该粒子会舍弃第一个属性--color，而应用该几何体的colors属性的颜色
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      } );
      let stars = new THREE.Points( geometry, starsMaterial );
      stars.scale.set( 300, 300, 300 );
      const animate = () => {
        renderer.render(scene, camera) 
      //   for (let k = 0; k < stars.length; k++) {
      //     let star = stars[k];
      //     star.rotation.x += 0.01;
      //     star.rotation.y += 0.01;
      //     lightness > 100 ? lightness = 0 : lightness++;
      //     star.material.color = new THREE.Color("hsl(255, 100%, " + lightness + "%)");
      // }
    //   let x = camera.position.x;
    // let z = camera.position.z;
    // camera.position.x = x * Math.cos(0.01) + z * Math.sin(0.01);
    // camera.position.z = z * Math.cos(0.01) - x * Math.sin(0.01);
    // camera.lookAt(scene.position);
        // stars.rotation.x += 0.0001; 
        stars.rotation.y += 0.001; 
        // stars.rotation.z += 0.0001; 
        requestAnimationFrame(animate)  
    }
    animate()
      scene.add( stars );
}