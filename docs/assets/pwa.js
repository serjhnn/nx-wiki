// Register the service worker that makes the site installable and readable
// offline. sw.js is generated at deploy time (scripts/build_sw.py), so it is
// missing during local previews and in the downloadable offline copy.
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  const url = new URL("../sw.js", document.currentScript.src);
  navigator.serviceWorker.register(url).catch(() => {});
}
