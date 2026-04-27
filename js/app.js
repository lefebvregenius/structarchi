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
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-10";
renderer.domElement.style.pointerEvents = "none";

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

// FADE IN IMAGES LAZY
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });
});
document.addEventListener("DOMContentLoaded", () => {

  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!burger || !mobileMenu) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // fermer au clic lien
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

});
// ===============================
// GESTION BACKGROUND INTELLIGENTE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // 📍 CAS 1 — PAGE IMAGE
  document.addEventListener("DOMContentLoaded", () => {

  if (document.body.classList.contains("image-page")) {

    const bg = document.querySelector(".lazy-bg");

    if (bg) {
      const img = bg.getAttribute("data-bg");

      bg.style.backgroundImage = `url(${img})`;
      bg.classList.add("loaded");
    }
  }

});

  // 📍 CAS 2 — PAGE VIDEO (works.html)
  if (document.body.classList.contains("video-page")) {

    const videos = [
     
      "assets/videos/architecture2.mp4",
     
    ];

    let currentVideo = 0;
    const videoElement = document.getElementById("bg-video");

    if (videoElement) {
      setInterval(() => {
        currentVideo = (currentVideo + 1) % videos.length;

        videoElement.src = videos[currentVideo];
        videoElement.load();
        videoElement.play();
      }, 10000);
    }
  }

});
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll <= 0) {
    navbar.style.top = "0";
    return;
  }

  if (currentScroll > lastScroll && currentScroll > 80) {
    // scroll down
    navbar.style.top = "-100px";
  } else {
    // scroll up
    navbar.style.top = "0";
  }

  lastScroll = currentScroll;
});
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});