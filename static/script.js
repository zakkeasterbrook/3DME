console.log("Initializing script");

// Ensure THREE.js and OrbitControls are available
if (typeof THREE === 'undefined' || typeof THREE.OrbitControls === 'undefined') {
    console.error("THREE.js or OrbitControls not loaded");
    return;
}

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const container = document.getElementById('modelContainer');

// Ensure the container has some size
if (!container.clientWidth || !container.clientHeight) {
    container.style.width = '800px';
    container.style.height = '600px';
}

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true }); 

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0xaaaaaa); 
container.appendChild(renderer.domElement);

console.log("Added renderer to container");

const controls = new THREE.OrbitControls(camera, container);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

console.log("Added lights to scene");

camera.position.z = 50;

const loader = new THREE.GLTFLoader();
loader.load('/static/mike.glb', 
    (gltf) => {
        console.log("Successfully loaded GLB model", gltf);
        scene.add(gltf.scene);
        animate();
    }, 
    (xhr) => {
        console.log("Model " + (xhr.loaded / xhr.total * 100) + "% loaded");
    }, 
    (error) => {
        console.error("An error occurred while loading the GLB model:", error);
    }
);

console.log("Set up GLTFLoader");

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

console.log("Set up animation loop");
