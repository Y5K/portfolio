document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const dots = document.querySelectorAll(".section-dots span");
  const navLinks = document.querySelectorAll(".nav-link");
  const toggle = document.getElementById("themeToggle");

  const setThemeIcon = () => {
    const icon = toggle?.querySelector("i");
    if (!icon) return;

    icon.className = document.body.classList.contains("dark")
      ? "bi bi-sun"
      : "bi bi-moon-stars";
  };

  const activateSection = section => {
    dots.forEach(dot => dot.classList.remove("active"));
    navLinks.forEach(link => link.classList.remove("active"));

    document
      .querySelector(`.section-dots span[data-target="#${section.id}"]`)
      ?.classList.add("active");

    document
      .querySelector(`.nav-link[href="#${section.id}"]`)
      ?.classList.add("active");
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        activateSection(entry.target);
      });
    },
    { threshold: 0.55 }
  );

  sections.forEach(section => observer.observe(section));

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      document
        .querySelector(dot.dataset.target)
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });

  if (toggle) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.classList.remove("dark", "light");
      document.body.classList.add(savedTheme);
    }

    setThemeIcon();

    toggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
      document.body.classList.remove("dark", "light");
      document.body.classList.add(nextTheme);
      localStorage.setItem("theme", nextTheme);
      setThemeIcon();
    });
  }
});
