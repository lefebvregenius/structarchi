// Animation glow dynamique
const text = document.querySelector(".glow-text");

setInterval(() => {
  text.style.textShadow = `
    0 0 ${Math.random()*20}px #00f0ff,
    0 0 ${Math.random()*40}px #00f0ff
  `;
}, 500);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// STRUCTURE 3D (cube = bâtiment)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
// 🎬 ROTATION VIDÉO STRUCTARCHI
const videos = [
  "assets/videos/architecture1.mp4",
  "assets/videos/architecture2.mp4",
  "assets/videos/architecture3.mp4",
  "assets/videos/architecture4.mp4",
  "assets/videos/architecture5.mp4"
];

let currentVideo = 0;
const videoElement = document.getElementById("bg-video");

setInterval(() => {
  currentVideo = (currentVideo + 1) % videos.length;

  videoElement.src = videos[currentVideo];
  videoElement.load();
  videoElement.play();
}, 10000); // change toutes les 10 secondes
// FADE IN IMAGES LAZY
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });
});
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

/* fermer quand on clique */
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});
/* LAZY BACKGROUND IMAGE */
const lazyBg = document.querySelectorAll(".lazy-bg");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const bg = el.getAttribute("data-bg");

      el.style.backgroundImage = `url(${bg})`;
      el.classList.add("loaded");

      obs.unobserve(el);
    }
  });
});

lazyBg.forEach(el => observer.observe(el));