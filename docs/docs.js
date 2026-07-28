/* ==========================================================================
   DS CUSTOMS — docs homepage script
   Reads the DOCS array from docs-data.js and renders one card per entry.
   You should never need to edit this file when adding a new doc page —
   edit docs-data.js instead.
   ========================================================================== */

function renderDocs() {
  const grid = document.getElementById("docsGrid");
  if (!grid) return;

  if (!window.DOCS || DOCS.length === 0) {
    grid.innerHTML = `<div class="empty-state">No docs published yet. Add an entry to docs-data.js to get started.</div>`;
    return;
  }

  grid.innerHTML = DOCS.map((d) => `
    <a class="card" href="${d.id}/index.html">
      <div class="card-top"><span>${d.tag || "Guide"}</span><span class="stamp cyan">${d.version || ""}</span></div>
      <h3>${d.title}</h3>
      <p>${d.summary}</p>
      <div class="card-foot">
        <span class="price">Docs</span>
        <span class="go">Read guide →</span>
      </div>
    </a>
  `).join("");
}

function wireMobileNav() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("menuToggle");
  if (!header || !toggle) return;
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderDocs();
  wireMobileNav();
  setFooterYear();
});
