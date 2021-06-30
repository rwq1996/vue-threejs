import * as THREE from "three";
export default function template(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    const init = ()=>{
        // 相机设置
        //创建相机对象
        camera.position.copy(new THREE.Vector3(0, 0, 1)); //设置相机位置
        camera.lookAt(new THREE.Vector3(0,0,0)); //设置相机方向(指向的场景对象)

        // 创建渲染器对象
        renderer.setClearColor(new THREE.Color(0x000000)) //设置背景颜色
        renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染区域尺寸
        document.getElementById("container").appendChild(renderer.domElement); //body元素中插入canvas对象
        // document.body.appendChild(renderer.domElement)
        //执行渲染操作   指定场景、相机作为参数
        renderer.render(scene, camera);
    }
   return {scene,camera,renderer,init}
}