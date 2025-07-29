// ========================================
// THEME SWITCH & DARK MODE
// ========================================

let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

// Letters for scrambling animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Scramble text effect
 * @param {HTMLElement} element - The element to animate
 * @param {string} newText - The final text
 * @param {number} duration - Animation duration in ms
 */
function scrambleText(element, newText, duration = 1000) {
  const oldText = element.innerText;
  const maxLength = Math.max(oldText.length, newText.length);
  const frameRate = 30; // fps
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let frame = 0;

  const interval = setInterval(() => {
    let output = "";
    for (let i = 0; i < maxLength; i++) {
      if (i < newText.length && frame > totalFrames * (i / maxLength)) {
        output += newText[i];
      } else {
        output += letters[Math.floor(Math.random() * letters.length)];
      }
    }
    element.innerText = output;

    if (++frame >= totalFrames) {
      clearInterval(interval);
      element.innerText = newText;
    }
  }, 1000 / frameRate);
}

// Toggle dark mode
function enableDarkmode() {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
  animateThemeSwitch("Lights Off");
}

function disableDarkmode() {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
  animateThemeSwitch("Lights On");
}

// Animate theme switch button
function animateThemeSwitch(newText) {
  scrambleText(themeSwitch, newText, 1000);

  gsap.fromTo(themeSwitch, {
    backgroundColor: "#ffe680"
  }, {
    backgroundColor: "",
    duration: 0.5,
    ease: "power1.out"
  });
}

// Initialize based on stored preference
if (darkmode === "active") enableDarkmode();

// Event listener for toggle
themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode');
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});


// ========================================
// SUN RAY ROTATION ANIMATION
// ========================================
// gsap.to("#sunRays", {
//   rotate: 360,
//   transformOrigin: "50% 50%",
//   repeat: -1,
//   duration: 20,
//   ease: "linear"
// });
