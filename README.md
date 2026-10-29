# nx-wiki

A personal knowledge base: one place to collect everything I learn, from notes, how-tos and snippets to references and ideas.

The plan is to publish it as a website so the knowledge is easy to browse and search from anywhere.

## Goals

- **One home for knowledge.** Stop scattering notes across apps, bookmarks and chat histories.
- **Plain text first.** Write in Markdown, so notes stay readable, portable and easy to version with git.
- **Easy to find things.** Clear structure, cross-links between pages, and search once it's a web page.
- **Grows over time.** Small, frequent additions beat big rewrites.

## What goes in here

- **Notes**: things I learned, explained in my own words
- **How-tos**: step-by-step guides for tasks I don't want to figure out twice
- **Snippets**: useful commands, code fragments and configs
- **References**: cheat sheets, links and summaries of articles, books and courses
- **Ideas**: drafts, open questions and things to explore later

## Planned structure

The layout will evolve, but roughly:

```
nx-wiki/
├── README.md       # this file
├── docs/           # the knowledge itself, as Markdown pages
│   ├── index.md    # start page / table of contents
│   └── <topic>/    # one folder per topic area
└── assets/         # images and other files referenced by pages
```

## Writing a page

1. Pick the topic folder under `docs/` (or create a new one).
2. Add a Markdown file with a short, descriptive name, e.g. `git-rebase.md`.
3. Start with a title and a one-line summary, then the content.
4. Link to related pages with relative links, e.g. `[Git basics](../git/basics.md)`.
5. Commit and push.

## Turning it into a web page

The site isn't set up yet. Options under consideration include static site generators that turn a folder of Markdown into a searchable website, such as [MkDocs](https://www.mkdocs.org/) (with Material theme), [Docusaurus](https://docusaurus.io/), [VitePress](https://vitepress.dev/) or [Docsify](https://docsify.js.org/), hosted for free on GitHub Pages.

This section will be updated once a tool is chosen, with instructions for previewing the site locally and deploying it.

## Status

🌱 Early days. The structure and tooling are still being figured out.
