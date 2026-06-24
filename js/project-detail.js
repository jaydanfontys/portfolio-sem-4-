// Hero title parallax movement
document.addEventListener("mousemove", (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) / 40;
  const moveY = (e.clientY - window.innerHeight / 2) / 40;

  const title = document.getElementById("hero-title");

  if (title) {
    title.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
});

// Scroll reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-10");
      }
    });
  },
  {
    threshold: 0.1
  }
);

document.querySelectorAll(".glass, .container > div").forEach((el) => {
  el.classList.add("transition-all", "duration-1000", "opacity-0", "translate-y-10");
  observer.observe(el);
});