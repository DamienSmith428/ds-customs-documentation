/* ==========================================================================
   DS CUSTOMS — shop page script
   Edit PRODUCTS below to add / remove / update what shows in the shop grid.
   Nothing else in this file needs to change when you add a product.
   ========================================================================== */

// ---- EDIT ME: your links --------------------------------------------------
const DISCORD_URL = "https://discord.gg/your-invite";
const TEBEX_BASE_URL = "https://ds-customs.tebex.io"; // your Tebex storefront root

// ---- EDIT ME: your products -------------------------------------------------
// package: the Tebex package path/slug appended to TEBEX_BASE_URL, e.g. "/package/1234567"
// docs: the id of a matching folder under /docs (leave "" if there's no doc page yet)
const PRODUCTS = [
  {
    id: "vehicle-customs",
    name: "Vehicle Customs",
    summary: "Full paint, wrap, and performance customization menu for player-owned shops.",
    price: "$18.00",
    stamp: "Best seller",
    package: "/package/vehicle-customs",
    docs: "vehicle-customs"
  },
  {
    id: "dealership-mlo",
    name: "Dealership MLO Pack",
    summary: "Three showroom interiors with test-drive zones and finance NPC scripting.",
    price: "$24.00",
    stamp: "New",
    package: "/package/dealership-mlo",
    docs: ""
  },
  {
    id: "livery-manager",
    name: "Livery Manager",
    summary: "Upload and manage custom liveries per vehicle model with in-game preview.",
    price: "$12.00",
    stamp: "",
    package: "/package/livery-manager",
    docs: ""
  }
];

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p) => {
    const stampHtml = p.stamp
      ? `<span class="stamp cyan">${p.stamp}</span>`
      : `<span class="stamp">In stock</span>`;
    return `
      <a class="card" href="${TEBEX_BASE_URL}${p.package}" target="_blank" rel="noopener">
        <div class="card-top"><span>SKU · ${p.id}</span>${stampHtml}</div>
        <h3>${p.name}</h3>
        <p>${p.summary}</p>
        <div class="card-foot">
          <span class="price">${p.price}</span>
          <span class="go">Buy on Tebex →</span>
        </div>
      </a>
    `;
  }).join("");
}

function wireDiscordLinks() {
  ["discordCard", "discordFooterLink"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = DISCORD_URL;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });
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
  renderProducts();
  wireDiscordLinks();
  wireMobileNav();
  setFooterYear();
});
