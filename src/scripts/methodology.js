/**
 * Growth Methodology Controller
 * Manages scroll sync and active states for Reflect -> Reframe -> Rebuild -> Sustain.
 */

export function initMethodologySequence() {
  const cards = document.querySelectorAll('.methodology-card');
  const indicatorItems = document.querySelectorAll('.step-indicator-item');

  if (!cards.length || !indicatorItems.length) return;

  function setActiveStep(index) {
    indicatorItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  // Click on indicators scrolls smoothly to corresponding card
  indicatorItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // IntersectionObserver for scroll activation
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target);
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.2
      }
    );

    cards.forEach((card) => observer.observe(card));
  }
}
