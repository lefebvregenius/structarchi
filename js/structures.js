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
     NAVBAR SCROLL EFFECT
  =============================== */
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ===============================
     TITRE 3D MOUSE EFFECT
  =============================== */
  const title = document.querySelector(".title-3d");

  document.addEventListener("mousemove", (e) => {
    if (!title) return;

    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;

    title.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });

  /* ===============================
     PARTICULES PREMIUM (ULTRA LIGHT)
  =============================== */

  const canvas = document.createElement("canvas");
  canvas.id = "particles-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  /* ===============================
     RESIZE FIX
  =============================== */
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

});