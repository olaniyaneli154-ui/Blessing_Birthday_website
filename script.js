// SCROLL REVEAL ANIMATION
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}


// BIRTHDAY CAKE: TAP THE FLAME TO BLOW IT OUT
const candleFlame = document.getElementById("candleFlame");
const cakeMessage = document.getElementById("cakeMessage");
const blowInstruction = document.getElementById("blowInstruction");

if (candleFlame) {
  candleFlame.addEventListener("click", () => {
    if (candleFlame.classList.contains("blown")) return;

    candleFlame.classList.add("blown");

    cakeMessage.textContent = "Your wish is coming true, Blessing! ♡";
    blowInstruction.textContent = "Happy birthday, my best girl!";

    candleFlame.setAttribute("aria-label", "The candle has been blown out");
    candleFlame.disabled = true;
  });
}


// OPEN AND CLOSE THE PERSONAL LETTER
const openButton = document.getElementById("openLetter");
const letter = document.getElementById("letterText");

if (openButton && letter) {
  openButton.addEventListener("click", () => {
    const opening = letter.hidden;

    letter.hidden = !opening;
    openButton.setAttribute("aria-expanded", String(opening));

    openButton.textContent = opening
      ? "Close your letter ×"
      : "Open your letter ♡";
  });
}


// PHOTO GALLERY LIGHTBOX
const lightbox = document.getElementById("lightbox");
const largePhoto = document.getElementById("largePhoto");
const closeButton = document.getElementById("close");

document.querySelectorAll(".photo").forEach(photo => {
  photo.addEventListener("click", () => {
    const imageName = photo.dataset.img;

    largePhoto.src = imageName;
    largePhoto.alt = photo.querySelector("img").alt;

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  });
});

function closePhoto() {
  lightbox.classList.remove("open");
  largePhoto.src = "";
  document.body.style.overflow = "";
}

if (closeButton) {
  closeButton.addEventListener("click", closePhoto);
}

if (lightbox) {
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closePhoto();
    }
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closePhoto();
  }
});


// BIRTHDAY SURPRISE AND CONFETTI
const surpriseButton = document.getElementById("surprise");
const finalLine = document.getElementById("finalLine");

if (surpriseButton) {
  surpriseButton.addEventListener("click", () => {
    finalLine.textContent =
      "Blessing, never forget how loved, valued and wonderfully special you are. Happy birthday! ♡";

    confetti();
  });
}

function confetti() {
  const symbols = ["✦", "✿", "♡", "✧"];

  for (let i = 0; i < 36; i++) {
    const piece = document.createElement("span");

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    Object.assign(piece.style, {
      position: "fixed",
      left: Math.random() * 100 + "vw",
      top: "-30px",
      zIndex: 30,
      pointerEvents: "none",
      color: ["#c76f83", "#c6a36a", "#e8aeb8", "#fff"][i % 4],
      fontSize: 14 + Math.random() * 16 + "px",
      transition: "transform 2.2s ease-in, opacity 2.2s ease-in"
    });

    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform =
        `translate(${(Math.random() - 0.5) * 180}px, ${window.innerHeight + 80}px) rotate(${Math.random() * 700}deg)`;

      piece.style.opacity = "0";
    });

    setTimeout(() => piece.remove(), 2300);
  }
}
