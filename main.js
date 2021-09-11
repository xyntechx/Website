import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

// Makes 3D background responsive to screen size changes
// after loading for the first time
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus #1
const geometry = new THREE.TorusGeometry(10, 3, 15, 150);
const material = new THREE.MeshStandardMaterial({
    color: 0xff7c1f,
    wireframe: true,
});

const torus = new THREE.Mesh(geometry, material);
torus.position.z = -20;

// Torus Knot #1
const geometry2 = new THREE.TorusKnotGeometry(5, 1, 100, 16);
const material2 = new THREE.MeshStandardMaterial({
    color: 0x067eed,
    wireframe: true,
});

const torusKnot = new THREE.Mesh(geometry2, material2);
torusKnot.position.z = 15;

// Torus #2
const geometry3 = new THREE.TorusGeometry(5, 1, 15, 100);
const material3 = new THREE.MeshStandardMaterial({
    color: 0x3ded87,
    wireframe: true,
});

const torus2 = new THREE.Mesh(geometry3, material3);
torus2.position.x = 10;
torus2.position.y = -5;
torus2.position.z = 30;

// Torus Knot #2
const geometry4 = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material4 = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    wireframe: true,
});

const torusKnot2 = new THREE.Mesh(geometry4, material4);
torusKnot2.position.x = 20;
torusKnot2.position.z = 70;

// Point Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff);

// Generates white spheres of random sizes and positions
const addStar = () => {
    const geometry = new THREE.SphereGeometry(Math.random() * 0.5, 30, 30);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(500));

    star.position.set(x, y, z);
    scene.add(star);
};

// Creates animation when camera is moved (i.e. during scrolling)
const animateScrolling = () => {
    const t = document.body.getBoundingClientRect().top;

    torus.rotation.x += 0.05;
    torusKnot.rotation.z += 0.05;
    torusKnot.rotation.x += 0.05;
    torus2.rotation.y += 0.05;
    torusKnot2.rotation.z += 0.05;

    camera.position.z = t * -0.02;
    camera.position.x = t * -0.01;
    camera.rotation.y = t * -0.001;
};

// Creates animation continuously
const animate = () => {
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
};

// Generates 300 stars
Array(300).fill().forEach(addStar);

scene.add(torus, torusKnot, torus2, torusKnot2, pointLight, ambientLight);

document.body.onscroll = animateScrolling;
animateScrolling();

animate();
