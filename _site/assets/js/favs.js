// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, Flip);


const isMobile = window.matchMedia("(max-width: 767px)").matches;
const thumbnails = gsap.utils.toArray(".thumbnail");
const filterButtons = document.querySelectorAll(".filter-by-rating");
const filterByRatingButton = document.getElementById("filter-button");
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.getElementById('modal-close');

// ---------- Hover + 3D Tilt ----------
thumbnails.forEach(el => {
  // Hover 3D tilt
  el.addEventListener("mousemove", e => {
    const bounds = el.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    const rotateX = ((y - centerY) / centerY) * 2;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(el, {
      rotationX: -rotateX,
      rotationY: rotateY,
      scale: 1.04,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(el, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto"
    });
  });

  // Hover shadow & scale
  el.addEventListener("mouseenter", () => {
    gsap.to(el, {
      boxShadow: "0 20px 40px var(--color-shadow);",
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto"
    });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(el, {
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto"
    });
  });
});


// ---------- Hover Effect on Thumbnails ----------
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
function initScrollAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  thumbnails.forEach(thumbnail => {
    if (thumbnail.offsetParent === null) return; // Skip hidden elements

    const currentY = parseFloat(getComputedStyle(thumbnail).transform.split(',')[5]) || 0;

    gsap.fromTo(thumbnail,
      {
        opacity: 0,
        y: currentY + 60,
        scale: 0.92,
        rotationX: 6,
        rotationY: gsap.utils.random(-5, 5),
        transformPerspective: 800,
        transformOrigin: "top center",
      },
      {
        opacity: 1,
        y: currentY,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        ease: "power4.out",
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: thumbnail,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 0.5,
        }
      }
    );
  });
}

initScrollAnimations();


// ---------- Filter  ----------
const grid = document.getElementById("thumbnail-grid");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // const selectedRating = button.dataset.rating;

    // // Remove active from all buttons, add to clicked one
    // filterButtons.forEach(btn => btn.classList.remove('active'));
    // button.classList.add('active');

    // // Capture initial state
    // const state = Flip.getState(thumbnails);

    // // Filter thumbnails
    // thumbnails.forEach(thumb => {
    //   const thumbRating = thumb.dataset.rating;
    //   const shouldShow = selectedRating === "all" || thumbRating === selectedRating;
    //   thumb.style.display = shouldShow ? "inline-flex" : "none";
    // });

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

if (!isMobile) {
  // Create a timeline paused by default
  const tl = gsap.timeline({ paused: true, reversed: true });
  tl.to(".filter-by-rating", {
    x: -40,
    opacity: 1,
    display: "inline-block",
    duration: 0.6,
    ease: "back.inOut(1.7)",
    stagger: 0.1,

  });

  filterByRating.addEventListener("click", () => {
    // Play or reverse depending on current state
    tl.reversed() ? tl.play() : tl.reverse();
    filterByRating.classList.toggle("active", !tl.reversed());
  });
};

// ---------- Modal----------
document.querySelectorAll('.thumbnail-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const url = this.href;
    const thumbRect = this.getBoundingClientRect(); // thumbnail position/size

    // Reset modal styles for animation start
    modal.style.display = 'block';
    gsap.set(modal, { backgroundColor: 'rgba(0,0,0,0)' });
    gsap.set(modalContent, {
      position: 'fixed',
      top: thumbRect.top,
      left: thumbRect.left,
      width: thumbRect.width,
      height: thumbRect.height,
      opacity: 0
    });

    // Animate overlay and modal expanding
    gsap.to(modal, { backgroundColor: 'rgba(0,0,0,0.8)', duration: 0.3 });
    gsap.to(modalContent, {
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      width: '80%',
      height: '80%',
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    });

    modalBody.innerHTML = '<p>Loading...</p>';

    fetch(url)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('main') || doc.body;
        modalBody.innerHTML = content.innerHTML;
      })
      .catch(err => {
        modalBody.innerHTML = '<p>Error loading page.</p>';
        console.error(err);
      });
  });
});

closeBtn.addEventListener('click', () => {
  const activeThumb = document.querySelector('.thumbnail-link:focus, .thumbnail-link:hover'); 
  const thumbRect = activeThumb ? activeThumb.getBoundingClientRect() : { top: window.innerHeight/2, left: window.innerWidth/2, width: 0, height: 0 };

  // Animate modal shrinking back
  gsap.to(modalContent, {
    top: thumbRect.top,
    left: thumbRect.left,
    width: thumbRect.width,
    height: thumbRect.height,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.in',
    onComplete: () => {
      modal.style.display = 'none';
      modalBody.innerHTML = '';
    }
  });

  // Fade out overlay
  gsap.to(modal, { backgroundColor: 'var(--color-overlay-background)', duration: 0.3 });
});
