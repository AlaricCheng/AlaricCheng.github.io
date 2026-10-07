// Set the theme before styles load to avoid flashing the wrong palette.
(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let savedTheme;
  try { savedTheme = localStorage.getItem("theme"); } catch { /* Storage can be disabled. */ }
  const isSavedTheme = () => savedTheme === "dark" || savedTheme === "light";

  function applyTheme(theme) {
    if (theme === "dark") root.dataset.theme = "dark";
    else root.removeAttribute("data-theme");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "dark" ? "#001f27" : "#f5f8f3";
    const button = document.querySelector(".theme-toggle");
    if (button) {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
      button.querySelector("i").className = `fa-solid fa-${theme === "dark" ? "moon" : "sun"}`;
    }
  }

  applyTheme(isSavedTheme() ? savedTheme : systemTheme.matches ? "dark" : "light");
  root.classList.add("js");
  systemTheme.addEventListener("change", () => {
    if (!isSavedTheme()) applyTheme(systemTheme.matches ? "dark" : "light");
  });

  document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.querySelector(".theme-toggle");
    const menuButton = document.querySelector(".menu-toggle");
    const followButton = document.querySelector(".follow-toggle");
    [themeButton, menuButton, followButton].forEach(button => { button.hidden = false; });
    applyTheme(root.dataset.theme === "dark" ? "dark" : "light");
    themeButton.addEventListener("click", () => {
      savedTheme = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", savedTheme); } catch { /* Keep the session preference. */ }
      applyTheme(savedTheme);
    });

    function setExpanded(button, expanded) {
      button.setAttribute("aria-expanded", String(expanded));
      document.getElementById(button.getAttribute("aria-controls")).classList.toggle("is-open", expanded);
      if (button === menuButton) button.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
    }
    [menuButton, followButton].forEach(button => {
      button.addEventListener("click", () => setExpanded(button, button.getAttribute("aria-expanded") !== "true"));
    });
    document.querySelectorAll(".navigation-links a").forEach(link => {
      link.addEventListener("click", () => setExpanded(menuButton, false));
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        [menuButton, followButton].forEach(button => {
          if (button.getAttribute("aria-expanded") === "true") {
            setExpanded(button, false);
            button.focus();
          }
        });
      }
    });
    document.addEventListener("click", event => {
      if (!event.target.closest(".navigation-controls")) setExpanded(menuButton, false);
      if (!event.target.closest(".author-profile")) setExpanded(followButton, false);
    });

    const header = document.querySelector(".masthead");
    const updateHeaderHeight = () => root.style.setProperty("--masthead-height", `${header.getBoundingClientRect().height}px`);
    new ResizeObserver(updateHeaderHeight).observe(header);
    updateHeaderHeight();
  });
})();
