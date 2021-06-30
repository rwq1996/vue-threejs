import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export function addOrbitControls (camera, el) {
  const controls = new OrbitControls( camera, el );
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 2;
  controls.enablePan = true;
  return{controls }
}