<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
// import Template from './objects/template'
// import Background from './objects/background'
// import {addOrbitControls} from './control/orbitControls'
// import Earth from './objects/earth'
// import Satellite from './objects/satellite'
import * as THREE from 'three'

export default defineComponent({
    setup() {
    //  const {scene,camera,renderer} = Template()
    // //  const { group } = Earth(scene)
    // //  const animate = () => {
    // //     renderer.render(scene, camera) 
    // //     // group.rotation.y -= 0.01; 
    // //     // addOrbitControls(camera,renderer.domElement).controls.update();
    // //     requestAnimationFrame(animate)
       
    // // }
    //   onMounted(()=>{
    //     Background(scene)
    //     Earth(scene,camera,renderer)
    //     // Satellite(scene)
    //     addOrbitControls(camera,renderer.domElement)
    //     // animate()
    //   })

     var renderer, camera, scene;//渲染器，相加，场景  
    var Earth, satellites = [];//地球，卫星（数组）  
  
    function initThree() {  
        // var dom = document.getElementById("box");  
  
        scene = new THREE.Scene();  
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);  
        // camera.position.set(0, 0, 400);//设置相机位置 
        camera.position.set( 5, - 20, 200 );
      camera.lookAt( 0, 3, 0 ); 
        renderer = new THREE.WebGLRenderer({  
            alpha: true,  
            antialias: true  
        });  
        renderer.setSize(window.innerWidth, window.innerHeight);//设置窗口尺寸  
        document.body.appendChild(renderer.domElement)  
  
        var sunTexture = THREE.ImageUtils.loadTexture(require('../../earthimages/earth2.jpg'), {}, function () {  
            renderer.render(scene, camera);  
        });  
  
        //地球  
        Earth = new THREE.Mesh(new THREE.SphereGeometry(50, 100, 100), new THREE.MeshBasicMaterial({  
            map: sunTexture  
        })); //材质设定  
  
        var satellite = new THREE.Sprite(new THREE.SpriteMaterial({  
            map: new THREE.CanvasTexture(generateSprite('196,233,255')),  
            blending: THREE.AdditiveBlending  
        }));  
        satellite.scale.x = satellite.scale.y = satellite.scale.z = 60;  
        scene.add(satellite);//添加发光,让地球有发光的样式  
        scene.add(Earth);  
  
        //添加卫星  
        satellites.push(initSatellite(5, 28, {x: -Math.PI * 0.35, y: Math.PI * 0.25, z: 0}, 0.021, scene));  
        satellites.push(initSatellite(5, 25, {x: -Math.PI * 0.35, y: -Math.PI * 0.2, z: 0}, 0.022, scene));  
        satellites.push(initSatellite(5, 29, {x: -Math.PI * 0.35, y: Math.PI * 0.05, z: 0}, 0.023, scene));  
  
        render();  
  
    }  
  
      
    // /**  
    //  * 返回一个卫星和轨道的组合体  
    //  * @param satelliteSize 卫星的大小  
    //  * @param satelliteRadius 卫星的旋转半径  
    //  * @param rotation 组合体的x,y,z三个方向的旋转角度  
    //  * @param speed 卫星运动速度  
    //  * @param scene 场景  
    //  * @returns {{satellite: THREE.Mesh, speed: *}} 卫星组合对象;速度  
    //  */  
    var initSatellite = function (satelliteSize, satelliteRadius, rotation, speed, scene) {  
  
        var track = new THREE.Mesh(new THREE.RingGeometry(satelliteRadius, satelliteRadius + 0.05, 50, 1), new THREE.MeshBasicMaterial());  
        var centerMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshLambertMaterial()); //材质设定  
        var satellite = new THREE.Sprite(new THREE.SpriteMaterial({  
            map: new THREE.CanvasTexture(generateSprite('196,233,255')),  
            blending: THREE.AdditiveBlending  
        }));  
        satellite.scale.x = satellite.scale.y = satellite.scale.z = satelliteSize;  
        satellite.position.set(satelliteRadius, 0, 0);  
  
        var pivotPoint = new THREE.Object3D();  
        pivotPoint.add(satellite);  
        pivotPoint.add(track);  
        centerMesh.add(pivotPoint);  
        centerMesh.rotation.set(rotation.x, rotation.y, rotation.z);  
        scene.add(centerMesh);  
        return {satellite: centerMesh, speed: speed};  
    };  
  
    // /**  
    //  * 实现发光星星  
    //  * @param color 颜色的r,g和b值,比如：“123,123,123”;  
    //  * @returns {Element} 返回canvas对象  
    //  */  
    var generateSprite = function (color) {  
        var canvas = document.createElement('canvas');  
        canvas.width = 16;  
        canvas.height = 16;  
        var context = canvas.getContext('2d');  
        var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);  
        gradient.addColorStop(0, 'rgba(' + color + ',1)');  
        gradient.addColorStop(0.2, 'rgba(' + color + ',1)');  
        gradient.addColorStop(0.4, 'rgba(' + color + ',.6)');  
        gradient.addColorStop(1, 'rgba(0,0,0,0)');  
        context.fillStyle = gradient;  
        context.fillRect(0, 0, canvas.width, canvas.height);  
        return canvas;  
    };  
      
  
    function render() {  
        renderer.render(scene, camera);  
        Earth.rotation.y -= 0.01;  
        for (var i = 0; i < satellites.length; i++) {  
            satellites[i].satellite.rotation.z -= satellites[i].speed;  
        }  
        requestAnimationFrame(render);  
    }  
    onMounted(()=>{
        initThree()
    })
      
    },
})
</script>


<style>

</style>