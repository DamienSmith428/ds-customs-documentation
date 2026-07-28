# DS Customs — GitHub Pages site

```
index.html          shop homepage
style.css            shared design system (used by every page, including docs)
script.js            shop page logic — edit the PRODUCTS array here
docs/
  index.html         docs homepage — renders a card per entry in docs-data.js, never edit for new docs
  docs.css            docs-only style overrides
  docs.js             renders the card grid, no edits needed
  docs-data.js         <- the ONLY file you edit to list a new doc page
  _template/
    index.html         copy this folder to start a new resource's docs
  vehicle-customs/
    index.html         real example doc page
```

## Adding documentation for a new resource

1. Copy `docs/_template` and rename the copy to your resource's id, e.g. `docs/livery-manager`.
2. Edit `docs/livery-manager/index.html` — fill in the overview, install steps, config, commands, and troubleshooting sections.
3. Open `docs/docs-data.js` and add one entry:

```js
{
  id: "livery-manager",   // must match the folder name
  title: "Livery Manager",
  summary: "Upload liveries, map them to models, and preview them in-game.",
  tag: "Script",
  version: "v1.0.0"
}
```

4. Commit and push. The card shows up on `docs/index.html` automatically — the homepage file itself is never touched.

## Adding a product to the shop

Open `script.js` and add an entry to the `PRODUCTS` array with the product's Tebex package path. The shop grid on `index.html` renders from that array, so the HTML never needs editing either.

## Before you publish

- Set `TEBEX_BASE_URL` and `DISCORD_URL` at the top of `script.js`.
- Update each product's `package` path to match its real Tebex package slug/ID.
- Replace the placeholder shop coordinates in each doc page's config sample with your real ones.

## Deploying

Push this folder to a GitHub repo and enable **Pages** in the repo settings (Settings → Pages → Deploy from branch → `main` / root). No build step is required — it's static HTML/CSS/JS.
