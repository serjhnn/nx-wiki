# nx-wiki

A personal knowledge base: one place to collect everything I learn, from notes, how-tos and snippets to references and ideas.

📖 **Read it online: [serjhnn.github.io/nx-wiki](https://serjhnn.github.io/nx-wiki/)**

The wiki is published as a website, so the knowledge is easy to browse and search from anywhere.

## Goals

- **One home for knowledge.** Stop scattering notes across apps, bookmarks and chat histories.
- **Plain text first.** Write in Markdown, so notes stay readable, portable and easy to version with git.
- **Easy to find things.** Clear structure, cross-links between pages, and full-text search on the website.
- **Grows over time.** Small, frequent additions beat big rewrites.

## What goes in here

- **Notes**: things I learned, explained in my own words
- **How-tos**: step-by-step guides for tasks I don't want to figure out twice
- **Snippets**: useful commands, code fragments and configs
- **References**: cheat sheets, links and summaries of articles, books and courses
- **Ideas**: drafts, open questions and things to explore later

## Structure

```
nx-wiki/
├── README.md                  # this file
├── mkdocs.yml                 # site config: title, theme, navigation
├── requirements.txt           # Python dependencies
├── docs/                      # the knowledge itself, as Markdown pages
│   ├── index.md               # start page
│   ├── assets/style.css       # custom look: colors, fonts, headings
│   ├── assets/vendor/katex/   # bundled KaTeX for math rendering
│   ├── assets/icons/          # app icons
│   ├── manifest.webmanifest   # makes the site installable as an app
│   └── <topic>/               # one folder per topic area
├── overrides/main.html        # adds the app manifest and icons to every page
├── scripts/                   # generates the service worker at deploy time
├── app/                       # Android app (Capacitor) wrapping the offline copy
└── .github/workflows/         # deploy.yml publishes the site; android.yml builds the app
```

## Writing a page

1. Pick the topic folder under `docs/` (or create a new one).
2. Add a Markdown file with a short, descriptive name, e.g. `git-rebase.md`.
3. Start with a title and a one-line summary, then the content.
4. Add the page to the `nav` section of `mkdocs.yml`.
5. Link to related pages with relative links, e.g. `[Git basics](../git/basics.md)`.
6. Commit and push.

See `docs/getting-started/writing-pages.md` for a formatting cheat sheet (callouts, tabs, code blocks, diagrams, math).

## The website

The site is built with [Zensical](https://zensical.org/), the successor to Material for MkDocs, which reads its settings from `mkdocs.yml`. `docs/assets/style.css` gives it a warm, dark-first look inspired by Anthropic's documentation: cream-on-near-black colors, a clay-orange accent and serif headings (Source Serif 4, with Inter for body text). A light mode is available from the toggle in the header.

### Preview locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
zensical serve
```

Then open <http://127.0.0.1:8000>. The page reloads automatically when you save a file.

### Publishing

Every push to `main` runs the **Deploy site** GitHub Action, which builds the site and publishes it to GitHub Pages at <https://serjhnn.github.io/nx-wiki/>.

One-time setup: in the repository on GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

### Text size

The **A−** / **A+** buttons in the header scale the whole page (text, headings, code, tables and math) from 80% to 200%, independently of browser zoom. Tap the percentage to reset. The choice is saved per device (`docs/assets/zoom.js`; applied before the page renders by a snippet in `overrides/main.html`).

### Install as an app

The site is a Progressive Web App. In Chrome on Android, open the site and choose **⋮ → Install app** (or **Add to home screen**); on iPhone, use **Share → Add to Home Screen** in Safari. Desktop Chrome and Edge show an install icon in the address bar.

Once installed, the whole wiki is saved on the device and works without internet. When online, pages load fresh; each deploy bumps the cached copy to the new version.

How it works: `docs/manifest.webmanifest` describes the app, and `scripts/build_sw.py` runs after each build to generate `sw.js`, a service worker that precaches every page and asset (template in `scripts/sw.template.js`).

### Offline

The site doesn't depend on any external servers: KaTeX is bundled in `docs/assets/vendor/katex`, and the `privacy` plugin downloads the web fonts and Mermaid at build time and serves them from the site itself.

Each deploy also builds an offline copy (with the `offline` plugin, so it works when opened from disk) and publishes it as [nx-wiki-offline.zip](https://serjhnn.github.io/nx-wiki/nx-wiki-offline.zip). Unzip it and open `nx-wiki/index.html`.

To build the offline copy locally:

```bash
NX_OFFLINE=true NX_SITE_DIR=site-offline zensical build
```

### Android app

`app/` holds an Android app built with [Capacitor](https://capacitorjs.com/): a native shell with a full-screen WebView that shows the offline copy of the wiki, stored inside the app. `app/android/` is a regular Android Studio project.

The **Android app** GitHub Action (`.github/workflows/android.yml`) builds it:

- **On every push that changes `app/`**, or from **Actions → Android app → Run workflow**: builds the APK (and an `.aab` for Google Play), uploads them as the `nx-wiki-android` artifact, then installs the APK on an emulator and saves screenshots as `emulator-screenshots`.
- **On a version tag** (e.g. `git tag v1.0 && git push origin v1.0`): also publishes a GitHub Release with the APK. Open the release on the phone and tap the `.apk` to install or update.

The app's content is fixed at build time, so rebuild it (push a new tag) to get new pages into the app.

#### Signing key

Without a key, CI signs the APK with a throwaway debug key, so each build has to be uninstalled before the next one installs. To sign with your own key (needed for updates in place and for Google Play), create it once and keep a backup, because a lost key means users must reinstall:

```bash
keytool -genkeypair -v -keystore nx-wiki.keystore -alias nx-wiki -keyalg RSA -keysize 4096 -validity 10000
base64 -w0 nx-wiki.keystore      # copy the output
```

Then add four secrets under **Settings → Secrets and variables → Actions**: `NX_KEYSTORE_BASE64` (the base64 output), `NX_KEYSTORE_PASSWORD`, `NX_KEY_ALIAS` (`nx-wiki`) and `NX_KEY_PASSWORD`. Never commit the `.keystore` file (`.gitignore` blocks it).

#### Build locally

Needs Node.js, JDK 21 and the Android SDK (or Android Studio):

```bash
NX_OFFLINE=true NX_SITE_DIR=site-offline zensical build
cd app && npm ci && npx cap sync android
cd android && ./gradlew assembleRelease     # or: npx cap open android
```

## Status

🌱 Early days. The site is set up; the content is just getting started.
