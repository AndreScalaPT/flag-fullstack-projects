export function getSavedThemeValue() {
  const saved = localStorage.getItem("themeValue");
  if (saved) return saved;
  // valor por defeito ("light") ou "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyThemeValue(themeValue) {
  document.documentElement.setAttribute("data-theme", themeValue);
  localStorage.setItem("themeValue", themeValue);
}

export function toggleThemeValue(currentValue) {
  const next = currentValue === "light" ? "dark" : "light";
  applyThemeValue(next);
  return next;
}
