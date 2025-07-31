// Function to update the clock
function updateClock() {
  // Get current time in Tokyo (UTC +9)
  const now = new Date();
  const tokyoOffset = 9 * 60; // Tokyo is UTC+9
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const tokyoTime = new Date(utc + tokyoOffset * 60 * 1000);

  // Format hours, minutes, and seconds with leading zeros
  const hours = String(tokyoTime.getHours()).padStart(2, '0');
  const minutes = String(tokyoTime.getMinutes()).padStart(2, '0');
  const seconds = String(tokyoTime.getSeconds()).padStart(2, '0');

  // Display the time
  document.querySelector('.footer__clock').textContent = `${hours}:${minutes}:${seconds} 『佐賀市』`;
}

// Update the clock every second
setInterval(updateClock, 100);

// Initial call to set the clock immediately
updateClock();

// FLIP ANIMATION
// gsap.registerPlugin(Flip);

// const container1 = document.querySelector(".header__info-container-1"),
//       container2 = document.querySelector(".header__info-container-2"),
//       box = document.querySelector("#infoIcon");

// document.querySelector("#infoIcon").addEventListener("click", () => {
//   const state = Flip.getState(box, {props: "backgroundColor,borderRadius"});
  
//   box.classList.toggle("active");
//   if (box.parentElement === container1) {
//     container2.appendChild(box);
//   } else {
//     container1.appendChild(box);
//   }
  
// 	Flip.from(state, {
// 		duration: 1
// 	});
// });
