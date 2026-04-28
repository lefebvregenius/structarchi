document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     BURGER MENU
  =============================== */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        burger.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });
  }

  /* ===============================
     GLOW TEXT (TON STYLE CONSERVÉ)
  =============================== */
  const text = document.querySelector(".glow-text");

  if (text) {
    setInterval(() => {
      text.style.textShadow = `
        0 0 ${Math.random()*20}px #00f0ff,
        0 0 ${Math.random()*40}px #00f0ff
      `;
    }, 500);
  }

  /* ===============================
     BACKGROUND IMAGE (AUTRES PAGES)
  =============================== */
  const bg = document.querySelector(".lazy-bg");

  if (bg) {
    const img = bg.getAttribute("data-bg");

    if (img) {
      bg.style.backgroundImage = `url(${img})`;
      bg.classList.add("loaded");
    }

    // slider premium
    const images = [
      "assets/images/luxe1.jpg",
      "assets/images/villaluxe1.jpg",
      "assets/images/villaluxe2.jpg",
      "assets/images/luxe2.jpg"
    ];

    let i = 0;

    setInterval(() => {
      i = (i + 1) % images.length;

      bg.style.opacity = "0";

      setTimeout(() => {
        bg.style.backgroundImage = `url(${images[i]})`;
        bg.style.opacity = "1";
      }, 500);

    }, 8000);
  }

  /* ===============================
     VIDEO PAGE (WORKS.HTML)
  =============================== */
  if (document.body.classList.contains("video-page")) {

    const video = document.getElementById("bg-video");

    if (video) {
      video.play();

      // effet léger dynamique
      setInterval(() => {
        video.style.filter = `brightness(${0.25 + Math.random()*0.1}) contrast(1.2)`;
      }, 4000);
    }
  }

  /* ===============================
     NAVBAR SCROLL PREMIUM
  =============================== */
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 80) {
      navbar.style.top = "-100px";
    } else {
      navbar.style.top = "0";
    }

    lastScroll = currentScroll;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ===============================
     FADE IMAGE LOAD
  =============================== */
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
  });

  /* ===============================
     THREE.JS (SAFE)
  =============================== */
  if (typeof THREE !== "undefined") {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.zIndex = "-10";
    renderer.domElement.style.pointerEvents = "none";

    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true
    });

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
  }

});