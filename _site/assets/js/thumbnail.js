// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, Flip);


const isMobile = window.matchMedia("(max-width: 767px)").matches;

// ---------- Hover Effect on Thumbnails ----------
const thumbnails = document.querySelectorAll(".thumbnail");
thumbnails.forEach(el => {
  el.addEventListener("mouseenter", () => {
    gsap.to(el, {
      scale: 1.03,
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
      duration: 0.2,
      ease: "power2.out"
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(el, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.2,
      ease: "power2.inOut"
    });
  });
});

 // ---------- Scroll Animations ----------
gsap.utils.toArray(".thumbnail").forEach(thumbnail => {
  gsap.fromTo(
    thumbnail,
    { opacity: 0, y: 60, scale: 0.92, rotationX: 6, transformOrigin: "top center" },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 0.7,
      ease: "power4.out",
      scrollTrigger: {
        trigger: thumbnail,
        start: "top 90%",   // enters viewport from bottom
        end: "bottom 10%",  // leaves viewport at top
        scrub: true,
        toggleActions: "play none none reverse",
      }
    }
  );
});


// ---------- Filter  ----------
const filterButtons = document.querySelectorAll(".filter-by-rating");
const grid = document.getElementById("thumbnail-grid");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedRating = button.dataset.rating;

    // Remove active from all buttons, add to clicked one
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Capture initial state
    const state = Flip.getState(thumbnails);

    // Filter thumbnails
    thumbnails.forEach(thumb => {
      const thumbRating = thumb.dataset.rating;
      const shouldShow = selectedRating === "all" || thumbRating === selectedRating;
      thumb.style.display = shouldShow ? "inline-flex" : "none";
    });

    // Animate to new state
    Flip.from(state, {
      duration: 0.5,
      scale: true,
      ease: "power1.inOut",
      stagger: 0.02,
      absolute: true,
          onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: 1}),
    onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 1})

    });

  });
});
// ---------- Animation for Year Sorting ----------
const filterByRating = document.getElementById('filter-button');

if (!isMobile && filterByRating) {
  // Timeline paused by default
  const tl = gsap.timeline({ paused: true, reversed: true });

  tl.fromTo(
    ".filter-by-rating",
    { x: 20, autoAlpha: 0 },
    {
      x: 0,
      autoAlpha: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.1
    }
  );

  // Toggle timeline on button click
  filterByRating.addEventListener("click", () => {
    tl.reversed() ? tl.play() : tl.reverse();
    filterByRating.classList.toggle("active", !tl.reversed());
  });

  // Optional: add hover scale effect for filter buttons
  document.querySelectorAll(".filter-by-rating").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "power1.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.inOut" });
    });
  });
}
