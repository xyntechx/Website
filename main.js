import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

window.addEventListener( 'resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 15, 150);
const material = new THREE.MeshStandardMaterial({ color: 0xff7c1f, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const geometry2 = new THREE.TorusKnotGeometry(5, 1, 100, 16);
const material2 = new THREE.MeshStandardMaterial({ color: 0x067eed, wireframe: true });
const torusKnot = new THREE.Mesh(geometry2, material2);

scene.add(torusKnot);

torusKnot.position.x = -10;
torusKnot.position.y = 0;
torusKnot.position.z = 15;

const geometry3 = new THREE.TorusGeometry(5, 1, 15, 100);
const material3 = new THREE.MeshStandardMaterial({ color: 0x3ded87, wireframe: true });
const torus2 = new THREE.Mesh(geometry3, material3);

scene.add(torus2);

torus2.position.x = 0;
torus2.position.y = -5;
torus2.position.z = 25;

const geometry4 = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material4 = new THREE.MeshStandardMaterial({ color: 0xffff00, wireframe: true });
const torusKnot2 = new THREE.Mesh(geometry4, material4);

scene.add(torusKnot2);

torusKnot2.position.x = -12;
torusKnot2.position.y = 0;
torusKnot2.position.z = 50;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(Math.random()*0.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  torus.rotation.x += 0.05;

  torusKnot.rotation.z += 0.05;

  torus2.rotation.y += 0.05;

  torusKnot.rotation.x += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0003;
  camera.rotation.y = t * -0.0003;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  torusKnot.rotation.x += 0.02;
  torusKnot.rotation.y += 0.02;

  torus2.rotation.x += 0.03;
  torus2.rotation.z += 0.02;

  torusKnot2.rotation.y += 0.01;
  torusKnot2.rotation.z += 0.007;

  renderer.render(scene, camera);
}

animate();