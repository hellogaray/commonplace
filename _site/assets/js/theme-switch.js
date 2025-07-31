  let darkmode = localStorage.getItem('darkmode');
  const themeSwitch = document.getElementById('theme-switch');

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function scrambleText(element, newText, duration = 1000) {
    let frame = 0;
    let interval;
    const oldText = element.innerText;
    const maxLength = Math.max(oldText.length, newText.length);
    const scrambleDuration = duration;
    const frameRate = 30; // frames per second
    const totalFrames = Math.round(scrambleDuration / (1000 / frameRate));

    interval = setInterval(() => {
      let output = "";
      for (let i = 0; i < maxLength; i++) {
        if (i < newText.length && frame > totalFrames * (i / maxLength)) {
          output += newText[i];
        } else {
          output += letters[Math.floor(Math.random() * letters.length)];
        }
      }
      element.innerText = output;

      frame++;
      if (frame >= totalFrames) {
        clearInterval(interval);
        element.innerText = newText;
      }
    }, 1000 / frameRate);
  }

  const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    animateThemeSwitch("Lights Off");
  };

  const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
    animateThemeSwitch("Lights On");
  };

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

  if (darkmode === "active") enableDarkmode();

  themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
  });
// ---------- Sun Ray Animation ----------
gsap.to("#sunRays", {
  rotate: 360,
  transformOrigin: "50% 50%",
  repeat: -1,
  duration: 20,
  ease: "linear"
});

