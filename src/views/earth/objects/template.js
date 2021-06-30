import * as THREE from 'three'

export default function Template(){
    let renderer, camera, scene;
    
    /**
	 * @description 初始化场景
	 */
     scene = new THREE.Scene();
     scene.background = new THREE.Color( 0x020924 );
     scene.fog = new THREE.Fog( 0x020924, 200, 1000 );
    //  window.scene = scene;

     /**
	 * @description 初始化相机
	 */ 
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set( 5, - 20, 200 );
      camera.lookAt( 0, 3, 0 );
      // window.camera = camera;
      scene.add(camera)
    /**
	 * @description 初始化光
	 */
     const ambientLight = new THREE.AmbientLight( 0xcccccc, 1.1 );
     scene.add( ambientLight );
     var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
     directionalLight.position.set( 1, 0.1, 0 ).normalize();
     var directionalLight2 = new THREE.DirectionalLight( 0xff2ffff, 0.2 );
     directionalLight2.position.set( 1, 0.1, 0.1 ).normalize();
     scene.add( directionalLight );
     scene.add( directionalLight2 );
     var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.2 );
     hemiLight.position.set( 0, 1, 0 );
     scene.add( hemiLight );
     var directionalLight3 = new THREE.DirectionalLight( 0xffffff );
     directionalLight3.position.set( 1, 500, - 20 );
     directionalLight3.castShadow = true;
     directionalLight3.shadow.camera.top = 18;
     directionalLight3.shadow.camera.bottom = - 10;
     directionalLight3.shadow.camera.left = - 52;
     directionalLight3.shadow.camera.right = 12;
     scene.add(directionalLight3);
     /**
	 * @description 初始化渲染场景
	 */
      renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true  } );
      // renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize(window.innerWidth, window.innerHeight );
      document.body.appendChild(renderer.domElement)
      // renderer.clear();
      renderer.render( scene, camera );
    /**
	 * 窗口变动
	 **/
	function onWindowResize() {
		camera.aspect = innerWidth / innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( innerWidth, innerHeight );
		// renderer.clear();
		renderer.render( scene, camera );
	}
    window.addEventListener('resize', onWindowResize, false);
    return {scene,camera,renderer}
}