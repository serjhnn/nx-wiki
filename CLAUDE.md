# CLAUDE.md

## Git workflow

- **Never push to `main` without explicit confirmation from the user.** Pushing to `main` publishes the site. Commit and push to the working branch, show the result (screenshots help), and wait for the user to say to publish.
- Approval for one push to `main` does not carry over to later changes; ask again each time.

## Project

nx-wiki is a personal knowledge base published at <https://serjhnn.github.io/nx-wiki/>.

- Built with [Zensical](https://zensical.org/), configured in `mkdocs.yml`. Pages are Markdown files in `docs/`; add new pages to `nav` in `mkdocs.yml`.
- Custom look: `docs/assets/style.css` (warm dark-first palette, clay accent, serif headings).
- Math: `$...$` / `$$...$$`, rendered with KaTeX bundled in `docs/assets/vendor/katex`.
- Offline: the `privacy` plugin self-hosts fonts and Mermaid; `NX_OFFLINE=true NX_SITE_DIR=site-offline zensical build` makes the file:// copy that CI zips as `nx-wiki-offline.zip`.
- PWA: `docs/manifest.webmanifest`, `overrides/main.html`, and `scripts/build_sw.py` (run after each build) generating `sw.js` from `scripts/sw.template.js`.
- Android app: Capacitor project in `app/` (`webDir` is `../site-offline`, the offline build, because Capacitor serves `index.html` for extensionless paths). `.github/workflows/android.yml` builds the APK, runs it on an emulator for screenshots, and publishes a release on `v*` tags. Signing comes from `NX_KEYSTORE_*` / `NX_KEY_*` secrets.
- Check changes with `zensical build --strict` before committing.
