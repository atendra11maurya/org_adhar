/**
 * AADHARSHILA Emblem Animation Module
 * Simulates 5 figures moving around a common centre resolving into the unified mark.
 * Symbolism: Individual growth -> Shared foundation.
 */

export function initEmblemAnimation() {
  const emblemContainers = document.querySelectorAll('.emblem-interactive');
  if (!emblemContainers.length) return;

  emblemContainers.forEach((container) => {
    const petals = container.querySelectorAll('.emblem-element');
    const centerCore = container.querySelector('.emblem-center-core');

    if (!petals.length) return;

    // Initial disassembled state
    petals.forEach((petal, i) => {
      const angle = (i * 72 * Math.PI) / 180;
      const distance = 18; // offset in px
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      petal.style.transform = `translate(${dx}px, ${dy}px) scale(0.85)`;
      petal.style.opacity = '0.3';
    });

    if (centerCore) {
      centerCore.style.transform = 'scale(0.5)';
      centerCore.style.opacity = '0.2';
    }

    // Sequence convergence (1.2s - 1.5s)
    setTimeout(() => {
      petals.forEach((petal, i) => {
        setTimeout(() => {
          petal.style.transition = 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease';
          petal.style.transform = 'translate(0px, 0px) scale(1)';
          petal.style.opacity = '1';
        }, i * 70);
      });

      if (centerCore) {
        setTimeout(() => {
          centerCore.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
          centerCore.style.transform = 'scale(1)';
          centerCore.style.opacity = '1';
        }, 350);
      }
    }, 200);
  });
}

export function highlightEmblemPillar(pillarIndex) {
  const petals = document.querySelectorAll('.threads-emblem-svg .emblem-element');
  if (!petals.length) return;

  petals.forEach((petal, index) => {
    if (index === pillarIndex) {
      petal.style.transform = 'scale(1.12)';
      petal.style.opacity = '1';
    } else {
      petal.style.transform = 'scale(0.96)';
      petal.style.opacity = '0.45';
    }
  });
}

export function resetEmblemPillars() {
  const petals = document.querySelectorAll('.threads-emblem-svg .emblem-element');
  petals.forEach((petal) => {
    petal.style.transform = 'scale(1)';
    petal.style.opacity = '1';
  });
}
