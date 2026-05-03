// =======================
// 🔗 SMOOTH SCROLL
// =======================
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// =======================
// 🌙 THEME TOGGLE
// =======================
const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "🌙";
  }
});

// =======================
// ⌨️ TYPING EFFECT
// =======================
new Typed("#typing", {
  strings: ["Interactive Developer", "Creative Coder", "UI Innovator"],
  typeSpeed: 50,
  backSpeed: 25,
  loop: true
});

// =======================
// 🎯 SCROLL REVEAL
// =======================
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// =======================
// 🌌 OPTIMIZED STAR SYSTEM
// =======================
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const maxStars = 60;
let mouse = { x: null, y: null };

// INIT STARS
for (let i = 0; i < maxStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7
  });
}

// MOUSE MOVE
window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// CLICK EXPLOSION (LIMITED)
canvas.addEventListener("click", e => {
  for (let i = 0; i < 5; i++) {
    if (stars.length < maxStars + 20) {
      stars.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }
  }
});

// SHOOTING STAR (LIMITED)
setInterval(() => {
  if (stars.length < maxStars + 10) {
    stars.push({
      x: Math.random() * canvas.width,
      y: 0,
      vx: 3,
      vy: 3
    });
  }
}, 5000);

// ANIMATION LOOP
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];

    star.x += star.vx;
    star.y += star.vy;

    // Bounce
    if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

    // STAR COLOR (theme-based)
    const isLight = document.body.classList.contains("light-mode");

    ctx.beginPath();
    ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? "#ff0000" : "#38bdf8";
    ctx.fill();

    // CONNECTIONS (optimized)
    for (let j = i + 1; j < i + 15 && j < stars.length; j++) {
      let dx = star.x - stars[j].x;
      let dy = star.y - stars[j].y;
      let dist = dx * dx + dy * dy;

      if (dist < 10000) {
        ctx.strokeStyle = isLight
          ? "rgba(255,0,0,0.2)"
          : "rgba(56,189,248,0.15)";
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      }
    }

    // MOUSE INTERACTION
    if (mouse.x) {
      let dx = star.x - mouse.x;
      let dy = star.y - mouse.y;
      let dist = dx * dx + dy * dy;

      if (dist < 20000) {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

// RESIZE
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});