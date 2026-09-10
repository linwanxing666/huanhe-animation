const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-sheet a");

function setMenu(open, restoreFocus = false) {
  if (!menuToggle || !mobileMenu) return;

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
  mobileMenu.hidden = !open;
  document.body.classList.toggle("menu-open", open);

  if (open) {
    mobileMenu.querySelector("a")?.focus({ preventScroll: true });
  } else if (restoreFocus) {
    menuToggle.focus({ preventScroll: true });
  }
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen, isOpen);
});

menuOverlay?.addEventListener("click", () => setMenu(false, true));
menuLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenu(false, true);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 720) setMenu(false);
});

const counters = [...document.querySelectorAll(".count")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function renderFinalValue(element) {
  const target = Number(element.dataset.target ?? 0);
  const decimals = Number(element.dataset.decimals ?? 0);
  element.textContent = target.toFixed(decimals);
}

function animateCounter(element, index) {
  if (element.dataset.counted === "true") return;
  element.dataset.counted = "true";

  if (reduceMotion.matches) {
    renderFinalValue(element);
    return;
  }

  const target = Number(element.dataset.target ?? 0);
  const decimals = Number(element.dataset.decimals ?? 0);
  const duration = 1500 + index * 80;
  const delay = 480 + index * 90;

  window.setTimeout(() => {
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = (target * eased).toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        renderFinalValue(element);
      }
    }

    requestAnimationFrame(frame);
  }, delay);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counters.forEach(animateCounter);
        observer.disconnect();
      });
    },
    { threshold: 0.25 },
  );

  const stats = document.querySelector(".stats");
  if (stats) observer.observe(stats);
} else {
  counters.forEach(animateCounter);
}
