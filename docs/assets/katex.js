// Render math written as $...$ or $$...$$ (pymdownx.arithmatex, generic mode)
document.querySelectorAll(".arithmatex").forEach((element) => {
  renderMathInElement(element, {
    delimiters: [
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    throwOnError: false,
  });
});
