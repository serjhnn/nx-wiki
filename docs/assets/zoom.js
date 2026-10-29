// Text size control: A- / A+ buttons in the header that scale the whole page,
// independent of browser zoom. The choice is saved on this device and applied
// early on every page by a snippet in overrides/main.html.
(() => {
  const KEY = "nx-zoom";
  const LEVELS = [0.8, 0.9, 1, 1.1, 1.25, 1.4, 1.6, 1.8, 2];
  const root = document.documentElement;

  const icon = (arrow) =>
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="${arrow}M18 16V7M2 16l4.039-9.69a.5.5 0 0 1 .923 0L11 16M3.304 13h6.392"/></svg>`;

  let zoom = 1;
  try {
    const saved = parseFloat(localStorage.getItem(KEY));
    if (LEVELS.includes(saved)) zoom = saved;
  } catch {}

  const controls = document.createElement("div");
  controls.className = "md-header__option nx-zoom";
  controls.innerHTML = `
    <button type="button" class="md-header__button md-icon" data-step="-1" title="Smaller text" aria-label="Smaller text">${icon("m14 12 4 4 4-4")}</button>
    <button type="button" class="nx-zoom__reset" title="Reset text size" aria-label="Reset text size"></button>
    <button type="button" class="md-header__button md-icon" data-step="1" title="Larger text" aria-label="Larger text">${icon("m14 11 4-4 4 4")}</button>`;

  const smaller = controls.querySelector('[data-step="-1"]');
  const larger = controls.querySelector('[data-step="1"]');
  const reset = controls.querySelector(".nx-zoom__reset");

  function apply(value) {
    zoom = value;
    root.style.setProperty("--nx-zoom", zoom);
    try {
      if (zoom === 1) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, zoom);
    } catch {}
    const index = LEVELS.indexOf(zoom);
    smaller.disabled = index === 0;
    larger.disabled = index === LEVELS.length - 1;
    reset.textContent = `${Math.round(zoom * 100)}%`;
    reset.hidden = zoom === 1;
  }

  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled) return;
    if (button === reset) return apply(1);
    const index = LEVELS.indexOf(zoom) + Number(button.dataset.step);
    apply(LEVELS[Math.max(0, Math.min(LEVELS.length - 1, index))]);
  });

  const palette = document.querySelector('[data-md-component="palette"]');
  if (palette) palette.before(controls);
  else document.querySelector(".md-header__inner")?.append(controls);
  apply(zoom);
})();
