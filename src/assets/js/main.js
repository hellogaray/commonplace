const infoToggle = document.getElementById('infoIcon');
const overlay = document.getElementById('overlay');
const overlayContent = document.querySelector('.overlay__content');

let isOpen = false;

// Initial GSAP state
gsap.set(overlay, { autoAlpha: 0, display: "flex" });
gsap.set(overlayContent, { y: -40, opacity: 0, scale: 0.95 });

// Function to open overlay
function openOverlay() {
  gsap.to(infoToggle, {
    duration: 0.2,
    scale: 0.8,
    autoAlpha: 0,
    onComplete: () => {
      infoToggle.textContent = 'close';
      gsap.to(infoToggle, { duration: 0.3, scale: 1, autoAlpha: 1, ease: "back.out(1.7)" });
    }
  });

  overlay.style.display = 'flex';
  gsap.to(overlay, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
  gsap.to(overlayContent, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" });
  gsap.from(".overlay__title, .overlay__info, .overlay__stack li", {
    opacity: 0,
    y: 20,
    stagger: 0.08,
    delay: 0.3,
    duration: 0.6,
    ease: "power2.out"
  });

  isOpen = true;
}

// Function to close overlay
function closeOverlay() {
  gsap.to(infoToggle, {
    duration: 0.2,
    scale: 0.8,
    autoAlpha: 0,
    onComplete: () => {
      infoToggle.textContent = 'info';
      gsap.to(infoToggle, { duration: 0.3, scale: 1, autoAlpha: 1, ease: "back.out(1.7)" });
    }
  });

  gsap.to(overlayContent, { y: -30, opacity: 0, scale: 0.95, duration: 0.5, ease: "power2.in" });
  gsap.to(overlay, { autoAlpha: 0, duration: 0.4, delay: 0.2, onComplete: () => overlay.style.display = 'none' });

  isOpen = false;
}

// Toggle overlay on button click
infoToggle.addEventListener('click', () => {
  if (!isOpen) {
    openOverlay();
  } else {
    closeOverlay();
  }
});

// Close overlay when clicking outside content
overlay.addEventListener('click', (e) => {
  if (e.target === overlay && isOpen) {
    closeOverlay();
  }
});

// Scramble effect
document.querySelectorAll(".scramble").forEach(el => {
  const originalText = el.textContent;
  el.addEventListener("mouseenter", () => {
    if (!gsap.isTweening(el)) {
      gsap.to(el, {
        duration: 1.2,
        scrambleText: {
          text: originalText,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>?",
          speed: 0.8
        }
      });
    }
  });
});
