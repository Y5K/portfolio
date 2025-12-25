document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const dots = document.querySelectorAll(".section-dots span");
  const navLinks = document.querySelectorAll(".nav-link");

  /* ================= SECTION VISIBILITY + DOTS ================= */
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          /* Dots */
          dots.forEach(dot => dot.classList.remove("active"));
          const activeDot = document.querySelector(
            `.section-dots span[data-target="#${entry.target.id}"]`
          );
          if (activeDot) activeDot.classList.add("active");
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach(section => sectionObserver.observe(section));

  /* ================= DOT SCROLL ================= */
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      document.querySelector(dot.dataset.target)
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ================= NAVBAR SCROLL HIGHLIGHT ================= */
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("active"));

          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );

          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach(section => navObserver.observe(section));

  /* ================= THEME TOGGLE ================= */
  const toggle = document.getElementById("themeToggle");

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");

      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.classList.remove("dark", "light");
      document.body.classList.add(savedTheme);
    }
  }
});
