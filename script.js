/* ═══════════════════════════════════════════════════════════════════════════
   DS Customs — Docs Site  |  script.js
   Handles: manifest loading, sidebar active state, ToC scroll spy,
            back-to-top button, and sidebar injection on doc pages.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Helpers ──────────────────────────────────────────────────────────── */

  /** Resolve a path relative to the repo root regardless of current depth. */
  function rootPath(rel) {
    // Count how many directories deep we are from the root by checking the
    // number of slashes after the origin in the pathname.
    const depth = (location.pathname.match(/\//g) || []).length - 1;
    const prefix = depth > 1 ? '../'.repeat(depth - 1) : './';
    return prefix + rel;
  }

  /** Return the pathname stripped of trailing slash and index.html */
  function cleanPath(p) {
    return p.replace(/\/index\.html$/, '/').replace(/\/$/, '');
  }

  /* ── Fetch manifest and build the sidebar resource list ──────────────── */

  async function loadManifest() {
    try {
      const res  = await fetch(rootPath('manifest.json'));
      const data = await res.json();
      return data.resources || [];
    } catch (e) {
      console.warn('DS Docs: could not load manifest.json', e);
      return [];
    }
  }

  /* ── Sidebar: inject resource links ──────────────────────────────────── */

  function buildSidebar(resources) {
    const placeholder = document.getElementById('sidebar-resources');
    if (!placeholder) return;

    const current = cleanPath(location.pathname);

    resources.forEach(function (r) {
      const a = document.createElement('a');
      a.href      = rootPath(r.path);
      a.className = 'sidebar-link resource-link';
      a.textContent = r.name;

      // Mark active when the current page matches this resource's path
      const rPath = cleanPath('/' + r.path.replace(/^\.?\//, ''));
      if (current.endsWith(rPath.replace(/\.html$/, '')) ||
          current.endsWith(rPath)) {
        a.classList.add('active');
      }

      placeholder.appendChild(a);
    });
  }

  /* ── Sidebar: scroll-spy (highlight the nearest visible heading) ─────── */

  function initScrollSpy() {
    const tocLinks = Array.from(document.querySelectorAll('.sidebar .toc-link'));
    if (!tocLinks.length) return;

    const headings = tocLinks.map(function (a) {
      const id = a.getAttribute('href').replace('#', '');
      return document.getElementById(id);
    }).filter(Boolean);

    function onScroll() {
      let active = headings[0];
      headings.forEach(function (h) {
        if (h && window.scrollY + 80 >= h.offsetTop) active = h;
      });
      tocLinks.forEach(function (a) {
        const id = a.getAttribute('href').replace('#', '');
        a.classList.toggle('active', active && active.id === id);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Back-to-top button ───────────────────────────────────────────────── */

  function initBackTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Resource cards on index: load from manifest ─────────────────────── */

  function buildIndexCards(resources) {
    const grid = document.getElementById('resource-grid');
    if (!grid) return;

    if (!resources.length) {
      grid.innerHTML = '<p style="color:var(--muted);grid-column:1/-1">No resources found in manifest.json.</p>';
      return;
    }

    grid.innerHTML = '';
    resources.forEach(function (r) {
      const a = document.createElement('a');
      a.href      = r.path;
      a.className = 'resource-card';

      const tags = (r.tags || []).map(function (t) {
        const cls = ({ QBCore:'badge-green', FiveM:'badge-blue',
                       'qs-inventory':'badge-purple', 'ox_inventory':'badge-purple',
                       'qb-inventory':'badge-purple', Escrow:'badge-gray',
                       Free:'badge-orange' })[t] || 'badge-gray';
        return `<span class="badge ${cls}">${t}</span>`;
      }).join('');

      a.innerHTML = `
        <div class="card-name">${r.name}</div>
        <div class="card-desc">${r.description || ''}</div>
        ${tags ? `<div class="card-tags">${tags}</div>` : ''}
      `;
      grid.appendChild(a);
    });
  }

  /* ── Active sidebar link for sub-sections (ToC on doc pages) ─────────── */

  function buildDocToc() {
    const toc = document.getElementById('sidebar-toc');
    if (!toc) return;

    // Gather all h2/h3 with IDs in the main content
    const headings = Array.from(document.querySelectorAll('.content h2[id], .content h3[id]'));
    if (!headings.length) return;

    headings.forEach(function (h) {
      const a = document.createElement('a');
      a.href      = '#' + h.id;
      a.className = 'sidebar-link toc-link' + (h.tagName === 'H3' ? ' toc-sub' : '');
      a.style.paddingLeft = h.tagName === 'H3' ? '28px' : '20px';
      a.textContent = h.textContent.replace(/^[0-9]+ — /, '');
      toc.appendChild(a);
    });

    initScrollSpy();
  }

  /* ── Boot ─────────────────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', async function () {
    const resources = await loadManifest();

    buildSidebar(resources);
    buildIndexCards(resources);
    buildDocToc();
    initBackTop();
  });

})();
