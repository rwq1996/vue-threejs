import * as THREE from "three";
  
  export default function RainDrop(scene,camera,renderer) {
      const texture = new THREE.TextureLoader().load(require('../../images/rain-drop.png'))
      const material = new THREE.PointsMaterial({
        size:0.8,
        map: texture,
        transparent: true,
      })
      const positions = []
  
      const drops = 8000
      const geom = new THREE.BufferGeometry()
      const velocityY = []
  
      for(let i = 0; i < drops; i++){
        positions.push( Math.random() * 400 - 200 )
        positions.push( Math.random() * 500 - 250 )
        positions.push( Math.random() * 400 - 200 )
        velocityY.push(0.5 + Math.random() / 2)
      }
      geom.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) )
      const instance = new THREE.Points(geom, material)
      scene.add(instance)
    //  instance.rotation.x = 0.5
    
  
    const animates = () => { 
      const positions = geom.attributes.position.array;
      for(let i=0; i<drops * 3; i+=3){ //change Y
        velocityY[i/3] += Math.random() * 0.05
        positions[ i + 1 ] -=  velocityY[i/3]
        if(positions[ i + 1 ] < -200){
          positions[ i + 1 ] =  200
          velocityY[i/3] = 0.5 + Math.random() / 2
        } 									
      }

      instance.rotation.y += 0.002
      geom.attributes.position.needsUpdate = true 
      requestAnimationFrame(animates)
      renderer.render(scene, camera)
    }
    return {animates}
  }

