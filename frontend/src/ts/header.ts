import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let model: THREE.Group | null = null;
let isMouseDown = false;
let previousMouseX = 0;

export function initHeader(): void {
  const canvas = document.querySelector<HTMLCanvasElement>(".header-bg");
  if (!canvas) return;

  // Scene
  scene = new THREE.Scene();

  const canvasRect = canvas.getBoundingClientRect();

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    canvasRect.width / canvasRect.height,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas, 
    alpha: true,
    antialias: true,
  });
  renderer.setSize(canvasRect.width, canvasRect.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Add ambient light (soft fill)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add hemisphere light for natural sky/ground ambient
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // Main directional light (further away and higher)
  const light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(10, 20, 15);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  light.shadow.radius = 8;

  const shadowCamera = light.shadow.camera as THREE.OrthographicCamera;
  shadowCamera.left = -10;
  shadowCamera.right = 10;
  shadowCamera.top = 10;
  shadowCamera.bottom = -10;
  shadowCamera.near = 0.5;
  shadowCamera.far = 50;

  scene.add(light);

  // Ground plane for shadows
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

  // Load OBJ model with solid material
  const objLoader = new OBJLoader();
  objLoader.setPath("/static/app/docs/");
  objLoader.load("estilografica.obj", (object) => {
    model = object;
    
    // Create a solid opaque material
    const solidMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.3,
      roughness: 0.5,
      side: THREE.DoubleSide,  // Render both sides in case of flipped normals
      transparent: false,
      opacity: 1,
      depthWrite: true,
      depthTest: true,
    });
    
    // Apply solid material to all meshes and fix geometry for smooth shading
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = solidMaterial;
        
        // Merge vertices and recompute normals for smooth shading
        if (child.geometry) {
          child.geometry = BufferGeometryUtils.mergeVertices(child.geometry);
          child.geometry.computeVertexNormals();
        }
      }
    });

    // Position and scale the model (origin is at the pen tip)
    model.position.set(3, 0, 0);
    model.scale.set(0.5, 0.5, 0.5);

    scene.add(model);
  });

  // Event listeners
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", () => onResize(canvas));

  animate();
}

function onMouseDown(event: MouseEvent): void {
  isMouseDown = true;
  previousMouseX = event.clientX;
}

function onMouseUp(): void {
  isMouseDown = false;
}

function onMouseMove(event: MouseEvent): void {
  if (isMouseDown && model) {
    const deltaX = event.clientX - previousMouseX;
    model.rotation.y += deltaX * 0.01;
    previousMouseX = event.clientX;
  }
}

function onResize(canvas: HTMLCanvasElement): void {
  canvas.style.width = "";
  canvas.style.height = "";
  const canvasRect = canvas.getBoundingClientRect();
  camera.aspect = canvasRect.width / canvasRect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasRect.width, canvasRect.height);
}

function animate(): void {
  requestAnimationFrame(animate);
  
  // Continuous slow rotation
  if (model && !isMouseDown) {
    model.rotation.y += 0.003;
  }
  
  renderer.render(scene, camera);
}
