// ===============================
// POPUP SYSTEM PREMIUM + DATA
// ===============================

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");
const closeBtn = document.querySelector(".close");

// Création image dynamique dans popup
let popupImage = document.createElement("img");
popupImage.classList.add("popup-image");
document.querySelector(".popup-content").appendChild(popupImage);

const data = {

  horizon: {
    title: "Résidence Horizon",
    color: "#00f0ff",
    image: "assets/images/luxe1.jpg",
    text: `
La Résidence Horizon incarne une approche architecturale contemporaine fondée sur une maîtrise rigoureuse des proportions, de la lumière et des flux spatiaux.

Ce projet repose sur une stratégie bioclimatique avancée, orientant chaque ouverture afin d’optimiser la lumière naturelle tout en contrôlant les apports thermiques. Les volumes sont organisés selon une logique horizontale qui favorise la continuité visuelle et la fluidité des déplacements.

La structure porteuse repose sur un système mixte poteaux-poutres permettant une grande liberté d’aménagement intérieur, tout en assurant une stabilité optimale face aux contraintes mécaniques.

Les matériaux utilisés offrent des performances thermiques élevées et participent à la durabilité globale du bâtiment. L’ensemble crée un espace à la fois fonctionnel, élégant et profondément ancré dans une vision moderne du luxe résidentiel.
`
  },

  nexus: {
    title: "Tour Nexus",
    color: "#ff3c3c",
    image: "assets/images/villaluxe1.jpg",
    text: `
La Tour Nexus représente une interprétation verticale de l’architecture moderne, combinant puissance structurelle et innovation technique.

Son noyau central en béton armé haute résistance assure la stabilité globale face aux efforts dynamiques, notamment le vent et les charges latérales. Ce noyau agit comme colonne vertébrale du bâtiment.

Les plateaux sont conçus selon une trame modulaire optimisée, permettant une grande flexibilité fonctionnelle et une adaptation aux besoins futurs.

L’enveloppe extérieure adopte un design futuriste intégrant des surfaces réfléchissantes et des éléments structurels visibles, renforçant l’identité visuelle du projet.

La Tour Nexus symbolise l’ambition, la verticalité et la maîtrise technique dans un contexte urbain exigeant.
`
  },

  eclipse: {
    title: "Villa Éclipse",
    color: "#9d00ff",
    image: "assets/images/villaluxe2.jpg",
    text: `
La Villa Éclipse est conçue comme une expérience immersive entre architecture et nature.

Les volumes asymétriques créent une dynamique visuelle forte, tandis que les ouvertures stratégiques jouent avec la lumière et les ombres naturelles.

La structure repose sur une combinaison de voiles porteurs et de portiques, permettant de dégager de larges espaces ouverts tout en garantissant une stabilité structurelle optimale.

Les matériaux sont choisis pour leur interaction avec l’environnement, créant une continuité visuelle entre intérieur et extérieur.

Ce projet incarne une architecture sensible, où esthétique, technique et nature fusionnent harmonieusement.
`
  },

  quantum: {
    title: "Complexe Quantum",
    color: "#00ff88",
    image: "assets/images/luxe2.jpg",
    text: `
Le Complexe Quantum est une infrastructure multifonctionnelle pensée pour l’adaptabilité et la performance.

Sa structure repose sur une trame régulière permettant une reconfiguration rapide des espaces en fonction des usages.

Les flux de circulation ont été étudiés afin d’optimiser les déplacements internes et améliorer l’efficacité globale du site.

Le projet intègre des systèmes énergétiques intelligents assurant une gestion optimisée des ressources.

Quantum représente une vision futuriste de l’architecture : flexible, intelligente et durable.
`
  }

};

// ===============================
// OPEN POPUP
// ===============================
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {

    const key = card.getAttribute("data-project");
    const project = data[key];

    if (!project) return;

    popupTitle.innerText = project.title;
    popupTitle.style.color = project.color;
    popupText.innerText = project.text;
    popupImage.src = project.image;

    popup.classList.add("active");
    document.body.style.overflow = "hidden";

  });
});

// ===============================
// CLOSE POPUP
// ===============================
closeBtn.addEventListener("click", closePopup);

popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopup();
});

function closePopup() {
  popup.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ===============================
// SMOOTH SCROLL PREMIUM (FIX)
// ===============================

let isScrolling = false;

window.addEventListener("wheel", (e) => {

  // ❌ ne bloque plus complètement le scroll
  if (popup.classList.contains("active")) return;

  if (!isScrolling) {
    isScrolling = true;

    const scrollAmount = e.deltaY * 0.9;

    window.scrollBy({
      top: scrollAmount,
      behavior: "smooth"
    });

    setTimeout(() => {
      isScrolling = false;
    }, 120); // contrôle fluidité
  }

}, { passive: true });


// ===============================
// SCROLL ULTRA FLUIDE (INERTIE)
// ===============================

let targetScroll = window.scrollY;
let currentScroll = window.scrollY;

function smoothScrollLoop() {
  currentScroll += (targetScroll - currentScroll) * 0.08;
  window.scrollTo(0, currentScroll);
  requestAnimationFrame(smoothScrollLoop);
}

window.addEventListener("wheel", (e) => {
  if (popup.classList.contains("active")) return;

  targetScroll += e.deltaY * 0.6;

  // limites page
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
});

smoothScrollLoop();

// ===============================
// PARALLAX BACKGROUND VIDEO
// ===============================

window.addEventListener("scroll", () => {
  const video = document.getElementById("bg-video");

  if (video) {
    video.style.transform = `scale(1.1) translateY(${window.scrollY * 0.1}px)`;
  }
});


// ===============================
// CARD HOVER EFFECT PREMIUM
// ===============================

document.querySelectorAll(".card").forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.transform = `
      perspective(1000px)
      rotateX(${(y - rect.height/2) / 15}deg)
      rotateY(${(x - rect.width/2) / -15}deg)
      scale(1.05)
    `;

  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });

});


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ===============================
// POPUP ENTRY ANIMATION
// ===============================

const observer = new MutationObserver(() => {
  if (popup.classList.contains("active")) {
    document.querySelector(".popup-content").style.animation = "popupFade 0.6s ease";
  }
});

observer.observe(popup, { attributes: true });
// ===============================
// SCROLL DANS POPUP (PREMIUM UX)
// ===============================

popup.addEventListener("wheel", (e) => {
  e.stopPropagation(); // empêche scroll page

  const content = document.querySelector(".popup-content");

  if (!content) return;

  content.scrollTop += e.deltaY * 0.6;
}, { passive: false });