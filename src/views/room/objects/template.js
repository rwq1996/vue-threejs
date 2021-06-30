import * as THREE from "three";

export default function Template (){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    camera.position.copy(new THREE.Vector3(1000, 600, 1500)); //设置相机位置
    camera.lookAt(new THREE.Vector3(0,0,0)); //设置相机方向(指向的场景对象)
    scene.add(camera)
    scene.fog = new THREE.Fog( 0xcce0ff, 2500, 10000)

    scene.add( new THREE.AmbientLight( 0x666666 ) )
    const light = new THREE.DirectionalLight( 0xdfebff, 1 )
    light.position.set( 50, 200, 100 )
    light.castShadow = true
    scene.add( light )
    // 创建渲染器对象
    renderer.setClearColor(new THREE.Color(0xcce0ff)) //设置背景颜色
    renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染区域尺寸
    // document.getElementById("container").appendChild(renderer.domElement); //body元素中插入canvas对象
    document.body.appendChild(renderer.domElement)
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);

    return {scene,camera,renderer}
}