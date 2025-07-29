const infoIconEl = document.getElementById('infoIcon');
const overlay = document.getElementById('overlay');
const infoIconClose = document.getElementById('infoIcon-close');
const overlayContent = document.querySelector('.overlay__content');
const scrambleText = document.querySelector('.scramble');

// Initial state
gsap.set(overlay, { autoAlpha: 0 });
gsap.set(overlayContent, { y: -40, opacity: 0, scale: 0.95 });
gsap.set(infoIconClose, { autoAlpha: 0, scale: 0.5, display: "inline-block" }); // ensure display

// Open Overlay
infoIconEl.addEventListener('click', () => {
  overlay.style.display = 'flex';

  gsap.to(overlay, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
  gsap.to(infoIconEl, { autoAlpha: 0, duration: 0.3 });
  gsap.to(infoIconClose, { autoAlpha: 1, scale: 1, delay: 0.3, duration: 0.5, ease: "back.out(1.7)" });

  gsap.fromTo(
    overlayContent,
    { y: -40, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" }
  );

  gsap.from(
    ".overlay__title, .overlay__info, .overlay__stack li",
    { opacity: 0, y: 20, stagger: 0.08, delay: 0.3, duration: 0.6, ease: "power2.out" }
  );
});

// Close Overlay
infoIconClose.addEventListener('click', () => {
  gsap.to(overlayContent, {
    y: -30,
    opacity: 0,
    scale: 0.95,
    duration: 0.5,
    ease: "power2.in"
  });

  gsap.to(overlay, {
    autoAlpha: 0,
    duration: 0.4,
    delay: 0.2,
    onComplete: () => overlay.style.display = 'none'
  });

  gsap.to(infoIconClose, { autoAlpha: 0, scale: 0.5, duration: 0.3 });
  gsap.to(infoIconEl, { autoAlpha: 1, delay: 0.3, duration: 0.5 });
});


// ---------- Scramble Effects for links ----------



document.querySelectorAll(".scramble").forEach(el => {
  const originalText = el.textContent; // store original text

  // Hover in
  el.addEventListener("mouseenter", () => {
    if (!gsap.isTweening(el)) {
      gsap.to(el, {
        duration: 1.5,
        scrambleText: {
          text: originalText,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>?",
          speed: 0.8,
        }
      });
    }
  });


});
