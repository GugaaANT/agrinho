/* ============================================================
   AGRINHO 2026 – main.js
   Interações, animações e comportamentos do site
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- NAVBAR SCROLL ---------- */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ---------- HAMBURGER MENU ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    });
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    }
  });

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => {
          item.classList.remove("active-link");
          if (item.getAttribute("href") === `#${entry.target.id}`) {
            item.classList.add("active-link");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ---------- SCROLL REVEAL ---------- */
  const revealElements = document.querySelectorAll(
    ".card, .pilar, .fact-card, .section-header, .chat-window"
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`;
    revealObserver.observe(el);
  });

  // Adiciona a classe que ativa a animação
  const style = document.createElement("style");
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .nav-links a.active-link {
      background: var(--green-pale);
      color: var(--green-dark);
      font-weight: 600;
    }
    .hamburger.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  `;
  document.head.appendChild(style);

  /* ---------- SMOOTH SCROLL OFFSET (navbar fixa) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ---------- CONTADOR ANIMADO (hero stats) ---------- */
  // Pode ser expandido futuramente

  /* ---------- FAB TOOLTIP ---------- */
  const fab = document.getElementById("chatFab");
  let fabTooltipShown = false;

  setTimeout(() => {
    if (!fabTooltipShown) {
      fab.style.animation = "pulse 1s ease 3";
      fabTooltipShown = true;
    }
  }, 3000);

  const pulseStyle = document.createElement("style");
  pulseStyle.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08) translateY(-4px); }
    }
  `;
  document.head.appendChild(pulseStyle);

  /* ---------- YEAR FOOTER ---------- */
  const yearEl = document.querySelector(".footer-bottom p");
  if (yearEl) {
    const year = new Date().getFullYear();
    yearEl.textContent = `© ${year} Agrinho – Sistema FAEP/SENAR-PR. Projeto educacional.`;
  }

  console.log("🌱 Agrinho 2026 – Site carregado com sucesso!");
});
