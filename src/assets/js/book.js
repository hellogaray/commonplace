// Animate all items inside .book__info on page load
gsap.from(".book__info [data-animate]", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out"
});

// ---------- Floating Animation for Quotes ----------
gsap.utils.toArray(".book__quotes").forEach(book__quotes => {
  gsap.to(book__quotes, {
    y: "+=5",
    duration: 2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: Math.random() * 1.5 // optional: make it feel more organic
  });
});