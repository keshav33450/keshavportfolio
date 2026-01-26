// ========== Loader ==========
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// ========== Mobile Menu ==========
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

// ========== Cursor Glow ==========
const cursorGlow = document.getElementById("cursorGlow");
window.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

// ========== Scroll Progress Bar ==========
const progressBar = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  if (!progressBar) return;
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / height) * 100;
  progressBar.style.width = scrolled + "%";
});

// ========== Floating Particles ==========
function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  for (let i = 0; i < 120; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.animationDelay = Math.random() * 8 + "s";
    p.style.animationDuration = Math.random() * 6 + 6 + "s";
    container.appendChild(p);
  }
}
createParticles();

// ========== Fade Up Reveal ==========
const fadeEls = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.transition = "0.9s ease";
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));

// ========== Skill Bar Animation ==========
const bars = document.querySelectorAll(".progress");
const skillsSection = document.getElementById("skills");

if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        bars.forEach((bar) => {
          const target = bar.dataset.target;
          if (!target) return;

          bar.style.width = target + "%";

          let count = 0;
          const interval = setInterval(() => {
            count++;
            bar.textContent = count + "%";
            if (count >= target) clearInterval(interval);
          }, 14);
        });

        skillObserver.disconnect();
      }
    });
  }, { threshold: 0.35 });

  skillObserver.observe(skillsSection);
}

// ========== Typing Effect ==========
const typedText = document.getElementById("typedText");
if (typedText) {
  const texts = [
    "Full-Stack Web Developer",
    "Spider-Man UI Designer 🕷️",
    "Open To Work 🚀",
    "Build • Design • Deploy"
  ];
  let i = 0, j = 0;
  let deleting = false;

  function typeLoop() {
    const current = texts[i];
    if (!deleting) {
      typedText.textContent = current.substring(0, j++);
      if (j > current.length) {
        deleting = true;
        setTimeout(typeLoop, 900);
        return;
      }
    } else {
      typedText.textContent = current.substring(0, j--);
      if (j < 0) {
        deleting = false;
        i = (i + 1) % texts.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 90);
  }
  typeLoop();
}

// ========== Modal Project Preview ==========
const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (!modal) return;

    modalImg.src = card.dataset.img;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;

    modalTags.innerHTML = "";
    card.dataset.tags.split(",").forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modal.classList.add("show");
  });
});

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });
}
