// Preloader
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("preloader").classList.add("hide"), 900);
});

// Sticky header, active link, back-to-top
const header = document.getElementById("header");
const toTop = document.getElementById("toTop");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a:not(.btn)");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 60);
  toTop.classList.toggle("show-btn", y > 500);

  let current = "home";
  sections.forEach((sec) => {
    if (y >= sec.offsetTop - 160) current = sec.id;
  });
  navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  nav.classList.toggle("open");
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    nav.classList.remove("open");
  })
);

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("show"), (i % 3) * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => revealObserver.observe(el));

// Hero image tilt following the mouse (desktop only)
const heroVisual = document.getElementById("heroVisual");
if (heroVisual && window.matchMedia("(hover: hover)").matches) {
  document.getElementById("home").addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 16;
    const y = (e.clientY / window.innerHeight - 0.5) * 16;
    heroVisual.style.transform = "translate(" + x + "px," + y + "px)";
  });
}

/* ---------- Before / After slider ---------- */
const ba = document.getElementById("ba");
const baRange = document.getElementById("baRange");
const baBefore = ba.querySelector(".ba-img.before");

function setBaWidth() {
  // keep the "before" image the same size as the full frame
  baBefore.style.width = ba.offsetWidth + "px";
}
function setPos(v) {
  ba.style.setProperty("--pos", v + "%");
}
baRange.addEventListener("input", (e) => setPos(e.target.value));
window.addEventListener("resize", setBaWidth);
window.addEventListener("load", setBaWidth);
setBaWidth();
setPos(baRange.value);

// Small intro animation: slide once when the slider appears
const baObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      let v = 50, dir = 1, steps = 0;
      const t = setInterval(() => {
        v += dir * 1.2;
        if (v >= 70) dir = -1;
        if (v <= 30 && dir === -1) dir = 1;
        steps++;
        setPos(v);
        baRange.value = v;
        if (steps > 85 && Math.abs(v - 50) < 1.5) {
          clearInterval(t);
          setPos(50);
          baRange.value = 50;
        }
      }, 16);
      baObserver.unobserve(ba);
    });
  },
  { threshold: 0.5 }
);
baObserver.observe(ba);

/* ---------- Project filter ---------- */
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".proj");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    projects.forEach((p) => {
      const match = f === "all" || p.dataset.cat.includes(f);
      p.classList.toggle("hide", !match);
      if (match) {
        p.classList.remove("pop");
        void p.offsetWidth;
        p.classList.add("pop");
      }
    });
  });
});

/* ---------- Contact form -> WhatsApp ---------- */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const phone = document.getElementById("cPhone").value.trim();
  const service = document.getElementById("cService").value;
  const type = document.getElementById("cType").value;
  const msg = document.getElementById("cMsg").value.trim();
  const text =
    "Hello Arif Builders,\nName: " + name +
    "\nPhone: " + phone +
    "\nService: " + service +
    "\nProperty: " + type +
    "\nDetails: " + msg;
  window.open("https://wa.me/923337812005?text=" + encodeURIComponent(text), "_blank");
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();