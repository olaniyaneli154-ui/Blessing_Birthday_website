
"use strict";

// SCROLL REVEAL
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


// BIRTHDAY CANDLE: TAP TO BLOW IT OUT
const candleFlame = document.getElementById("candleFlame");
const cakeMessage = document.getElementById("cakeMessage");
const blowInstruction = document.getElementById("blowInstruction");

if (candleFlame) {
  function blowOutCandle() {
    if (candleFlame.classList.contains("blown")) return;

    candleFlame.classList.add("blown");

    if (cakeMessage) {
      cakeMessage.textContent = "Your wish is coming true, Blessing! ♡";
    }

    if (blowInstruction) {
      blowInstruction.textContent = "Happy birthday, my best girl!";
    }

    candleFlame.setAttribute("aria-label", "Candle blown out");
    candleFlame.disabled = true;
  }

  candleFlame.addEventListener("click", blowOutCandle);

  candleFlame.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      blowOutCandle();
    }
  });
}


// OPEN AND CLOSE THE LETTER
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


// PHOTO GALLERY
const lightbox = document.getElementById("lightbox");
const largePhoto = document.getElementById("largePhoto");
const closeButton = document.getElementById("close");

document.querySelectorAll(".photo").forEach(photo => {
  photo.addEventListener("click", () => {
    if (!lightbox || !largePhoto) return;

    largePhoto.src = photo.dataset.img;
    largePhoto.alt = photo.querySelector("img")?.alt || "Birthday memory";

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closePhoto() {
  if (!lightbox || !largePhoto) return;

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
  if (event.key === "Escape") {
    closePhoto();
  }
});


// BIRTHDAY SURPRISE
const surpriseButton = document.getElementById("surprise");
const finalLine = document.getElementById("finalLine");

if (surpriseButton && finalLine) {
  surpriseButton.addEventListener("click", () => {
    finalLine.textContent =
      "Blessing, never forget how loved, valued and wonderfully special you are. Happy birthday! ♡";

    confetti();
  });
}


// CONFETTI ANIMATION
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

