/* Função que obtém o tema guardado no localStorage (ou o tema do sistema, se não houver nenhum guardado)
Tenta ler o valor do tema previamente guardado no navegador
Se existir um valor guardado ("light" ou "dark"), devolve-o
Caso contrário, usa a preferência do sistema operativo (modo escuro ou claro)
matchMedia devolve true se o utilizador preferir tema escuro */

export function getSavedThemeValue() {
  const saved = localStorage.getItem("themeValue");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/* Função que aplica um tema específico ("light" ou "dark") à página
Define o atributo data-theme no <html>, usado pelo DaisyUI/Tailwind para aplicar o tema
Guarda a escolha do utilizador no localStorage para ser lembrada no próximo carregamento */

export function applyThemeValue(themeValue) {
  document.documentElement.setAttribute("data-theme", themeValue);
  localStorage.setItem("themeValue", themeValue);
}

/* Função que alterna entre "light" e "dark"

Se o tema atual for "light", passa para "dark", e vice-versa
Aplica o novo tema imediatamente */

export function toggleThemeValue(currentValue) {
  const next = currentValue === "light" ? "dark" : "light";
  applyThemeValue(next);
  return next;
}
