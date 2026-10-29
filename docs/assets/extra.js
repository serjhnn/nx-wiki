// Copy buttons on code blocks
document.querySelectorAll(".rst-content pre > code").forEach((code) => {
  const button = document.createElement("button");
  button.className = "copy-button";
  button.type = "button";
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(code.innerText);
    button.textContent = "Copied";
    setTimeout(() => (button.textContent = "Copy"), 1500);
  });
  code.parentElement.appendChild(button);
});

// Mermaid diagrams
if (window.mermaid) {
  mermaid.initialize({ startOnLoad: false, theme: "dark" });
  mermaid.run({ querySelector: ".mermaid" });
}
