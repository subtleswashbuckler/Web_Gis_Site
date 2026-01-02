/* =========================
   PARTICLE BACKGROUND
========================= */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
canvas.width = innerWidth;
canvas.height = innerHeight;

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

/* =========================
   CARD FLIP
========================= */
const card = document.getElementById("card");
let flipped = false;

function flipCard() {
  flipped = !flipped;
  card.style.transform = flipped ? "rotateY(180deg)" : "rotateY(0deg)";
}

/* =========================
   PASSWORD TOGGLE
========================= */
function togglePwd(id) {
  const el = document.getElementById(id);
  el.type = el.type === "password" ? "text" : "password";
}

/* =========================
   PASSWORD STRENGTH
========================= */
const pwd = document.getElementById("signupPwd");
const bar = document.getElementById("strengthBar");

pwd?.addEventListener("input", () => {
  let strength = 0;
  if (pwd.value.length > 6) strength++;
  if (/[A-Z]/.test(pwd.value)) strength++;
  if (/[0-9]/.test(pwd.value)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd.value)) strength++;

  bar.style.width = `${strength * 25}%`;
  bar.style.background =
    strength < 2 ? "red" :
    strength < 3 ? "orange" : "lime";
});

/* =========================
   AUTH LOGIC
========================= */
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  localStorage.setItem("auth", "true");
  window.location.href = "Index.html";
});

document.getElementById("signupForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Account created! Please login.");
  flipCard();
});

// Redirects and exposes auth helpers
function checkAuth() {
  try {
    if (localStorage.getItem('auth') !== 'true') {
      if (!location.pathname.endsWith('reg.html')) {
        location.replace('reg.html');
      }
    }
  } catch (err) {
    // if storage is unavailable, be permissive
    console.warn('checkAuth error', err);
  }
}

function logout() {
  try {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  } catch (err) {
    console.warn('logout error', err);
  }
  // Use replace so user cannot navigate back to an authenticated page
  location.replace('reg.html');
}

// Make functions available to inline handlers
window.checkAuth = checkAuth;
window.logout = logout;

function handleGoogleLogin(response) {
  const user = parseJwt(response.credential);

  localStorage.setItem("auth", "true");
  localStorage.setItem("user", JSON.stringify({
    name: user.name,
    email: user.email,
    provider: "Google"
  }));

  window.location.href = "../Index.html";
}

function parseJwt(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

document.querySelectorAll(".social").forEach(btn => {
  btn.addEventListener("click", () => {
    const provider = btn.classList.contains("google")
      ? "Google"
      : btn.classList.contains("facebook")
      ? "Facebook"
      : "Twitter";

    localStorage.setItem("auth", "true");
    localStorage.setItem("user", JSON.stringify({ provider }));

    window.location.href = "../gis/index.html";
  });
});

// Redirects and exposes auth helpers
function checkAuth() {
  try {
    if (localStorage.getItem('auth') !== 'true') {
      if (!location.pathname.endsWith('reg.html')) {
        location.replace('reg.html');
      }
    }
  } catch (err) {
    // if storage is unavailable, be permissive
    console.warn('checkAuth error', err);
  }
}

function logout() {
  try {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  } catch (err) {
    console.warn('logout error', err);
  }
  // Use replace so user cannot navigate back to an authenticated page
  location.replace('reg.html');
}

// Make functions available to inline handlers
window.checkAuth = checkAuth;
window.logout = logout;

function handleGoogleLogin(response) {
  const user = parseJwt(response.credential);

  localStorage.setItem("auth", "true");
  localStorage.setItem("user", JSON.stringify({
    name: user.name,
    email: user.email,
    provider: "Google"
  }));

  window.location.href = "Index.html";
}

function parseJwt(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

document.querySelectorAll(".social").forEach(btn => {
  btn.addEventListener("click", () => {
    const provider = btn.classList.contains("google")
      ? "Google"
      : btn.classList.contains("facebook")
      ? "Facebook"
      : "Twitter";

    localStorage.setItem("auth", "true");
    localStorage.setItem("user", JSON.stringify({ provider }));

    window.location.href = "Index.html";
  });
});
