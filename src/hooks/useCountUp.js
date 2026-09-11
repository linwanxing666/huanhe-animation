import { useEffect, useRef } from "react";

function renderFinalValue(element) {
  const target = Number(element.dataset.target ?? 0);
  const decimals = Number(element.dataset.decimals ?? 0);
  element.textContent = target.toFixed(decimals);
}

export function useCountUp() {
  const statsRef = useRef(null);

  useEffect(() => {
    const root = statsRef.current;
    if (!root) return undefined;

    const counters = [...root.querySelectorAll(".count")];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers = new Set();
    const frames = new Set();
    let observer;

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

      const timer = window.setTimeout(() => {
        timers.delete(timer);
        const start = performance.now();

        function frame(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = (target * eased).toFixed(decimals);

          if (progress < 1) {
            const frameId = requestAnimationFrame(frame);
            frames.add(frameId);
          } else {
            renderFinalValue(element);
          }
        }

        const frameId = requestAnimationFrame(frame);
        frames.add(frameId);
      }, delay);
      timers.add(timer);
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            counters.forEach(animateCounter);
            observer.disconnect();
          });
        },
        { threshold: 0.25 },
      );
      observer.observe(root);
    } else {
      counters.forEach(animateCounter);
    }

    return () => {
      observer?.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      frames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, []);

  return statsRef;
}
