/* ==========================================================================
   Create Bastrop — Interactive Cultural Platform Controller
   ========================================================================== */

(function () {
  'use strict';

  const DATA = window.BASTROP_DATA;
  if (!DATA) return;

  const STORAGE_KEY = 'createbastrop_trail_v1';

  /* ------------------------------------------------------------------------
     Utility Helpers
     ------------------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------------------------
     Trail Pass State (localStorage persisted across all 6 pages)
     ------------------------------------------------------------------------ */
  function loadSavedItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (_) {
      // Ignore storage errors in private browsing
    }
    return [
      {
        id: 'spot:lost-pines-art-center',
        type: 'Cultural Space',
        title: 'Lost Pines Art Center',
        subtitle: '1204 Chestnut St · Galleries & Silo Glass Studio',
        href: 'studios.html#studios-explorer'
      }
    ];
  }

  let savedItems = loadSavedItems();

  function persistSavedItems() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
    } catch (_) {}
    syncSaveUI();
  }

  function isSaved(id) {
    return savedItems.some((item) => item.id === id);
  }

  function toggleSavedItem(item) {
    const exists = isSaved(item.id);
    if (exists) {
      savedItems = savedItems.filter((x) => x.id !== item.id);
      showToast(`Removed "${item.title}" from Trail Pass`);
    } else {
      savedItems = [...savedItems, item];
      showToast(`Added "${item.title}" to your Bastrop Trail Pass`);
    }
    persistSavedItems();
  }

  function removeSavedById(id) {
    savedItems = savedItems.filter((x) => x.id !== id);
    persistSavedItems();
  }

  /* ------------------------------------------------------------------------
     Shared Overlays: Trail Drawer, Universal Detail Modal, Submit Modal & Toast
     ------------------------------------------------------------------------ */
  let toastTimer = null;

  function ensureSharedOverlays() {
    if (document.getElementById('cb-shared-overlays')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'cb-shared-overlays';
    wrapper.innerHTML = `
      <!-- Slide-Over Bastrop Cultural Trail Pass Drawer -->
      <div class="drawer-backdrop" id="trail-drawer-backdrop" hidden>
        <aside class="trail-drawer" role="dialog" aria-modal="true" aria-labelledby="trail-drawer-title">
          <div class="drawer-header">
            <div>
              <span class="eyebrow" style="margin-bottom:0.35rem;">Personal Itinerary</span>
              <h2 id="trail-drawer-title" style="font-size:1.85rem;margin:0;">My Bastrop <em>Trail Pass</em></h2>
            </div>
            <button type="button" class="modal-close" id="trail-drawer-close" aria-label="Close Trail Pass">&times;</button>
          </div>
          <p style="font-size:0.88rem;color:var(--ink-700);margin:0.85rem 0 0;">
            Bookmark studios, First Friday stops, artworks, and performances as you explore Bastrop’s Cultural Arts District.
          </p>
          <div class="saved-list" id="trail-saved-list"></div>
          <div style="border-top:1px solid var(--border-subtle);padding-top:1rem;display:grid;gap:0.6rem;">
            <button type="button" class="btn btn-primary" id="trail-copy-btn">Copy Weekend Itinerary</button>
            <div style="display:flex;gap:0.6rem;">
              <button type="button" class="btn btn-outline btn-sm" style="flex:1;" id="trail-print-btn">Print Pass</button>
              <button type="button" class="btn btn-outline btn-sm" style="flex:1;" id="trail-clear-btn">Clear All</button>
            </div>
          </div>
        </aside>
      </div>

      <!-- Universal Detail Modal (Artwork Lightbox & Artist Profile) -->
      <div class="backdrop" id="detail-modal-backdrop" hidden>
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="detail-modal-title">
          <button type="button" class="modal-close" id="detail-modal-close" aria-label="Close dialog">&times;</button>
          <div id="detail-modal-content"></div>
        </div>
      </div>

      <!-- Submit Work / Collector Inquiry Modal -->
      <div class="backdrop" id="submit-modal-backdrop" hidden>
        <div class="modal-dialog" style="max-width:620px;" role="dialog" aria-modal="true" aria-labelledby="submit-modal-title">
          <button type="button" class="modal-close" id="submit-modal-close" aria-label="Close dialog">&times;</button>
          <span class="eyebrow" id="submit-modal-eyebrow">Connect with Create Bastrop</span>
          <h2 id="submit-modal-title" style="font-size:2.1rem;margin-bottom:0.4rem;">Share Your Work or Inquire</h2>
          <p style="color:var(--ink-700);font-size:0.93rem;margin:0 0 1rem;" id="submit-modal-desc">
            Are you a Bastrop County artist, studio, event host, or collector? Complete the details below to launch an email to <strong>hello@createbastrop.com</strong> or copy your formatted note.
          </p>
          <form id="submit-modal-form" class="form-grid">
            <div class="form-row-2">
              <div class="form-field">
                <label for="cb-form-name">Your Name</label>
                <input id="cb-form-name" name="name" type="text" required placeholder="e.g. Jordan Reyes">
              </div>
              <div class="form-field">
                <label for="cb-form-email">Your Email</label>
                <input id="cb-form-email" name="email" type="email" required placeholder="you@example.com">
              </div>
            </div>
            <div class="form-row-2">
              <div class="form-field">
                <label for="cb-form-type">Topic</label>
                <select id="cb-form-type" name="topic">
                  <option value="Artist / Portfolio Submission">Artist / Portfolio Submission</option>
                  <option value="Collector Artwork Inquiry">Collector Artwork Inquiry</option>
                  <option value="Submit a Bastrop Cultural Event">Submit a Bastrop Cultural Event</option>
                  <option value="List a Local Studio or Venue">List a Local Studio or Venue</option>
                  <option value="General Community Question">General Community Question</option>
                </select>
              </div>
              <div class="form-field">
                <label for="cb-form-link">Website or Instagram (Optional)</label>
                <input id="cb-form-link" name="link" type="text" placeholder="@handle or https://...">
              </div>
            </div>
            <div class="form-field">
              <label for="cb-form-subject">Reference / Work Title</label>
              <input id="cb-form-subject" name="subjectRef" type="text" placeholder="e.g. Studio listing, discipline, or piece title">
            </div>
            <div class="form-field">
              <label for="cb-form-message">Details</label>
              <textarea id="cb-form-message" name="message" rows="4" required placeholder="Tell us about your Bastrop studio, medium, event date, or the artwork you’re inquiring about..."></textarea>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
              <button type="submit" class="btn btn-primary">Send via Email App</button>
              <button type="button" class="btn btn-outline" id="cb-form-copy">Copy Formatted Message</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Floating Toast -->
      <div class="toast" id="cb-toast" role="status" aria-live="polite" hidden>
        <span id="cb-toast-text"></span>
        <button type="button" id="cb-toast-open-pass" style="color:#D69735;font-weight:700;text-decoration:underline;">Open Pass</button>
      </div>
    `;
    document.body.appendChild(wrapper);

    // Event bindings for overlays
    const drawerBackdrop = document.getElementById('trail-drawer-backdrop');
    const detailBackdrop = document.getElementById('detail-modal-backdrop');
    const submitBackdrop = document.getElementById('submit-modal-backdrop');

    document.getElementById('trail-drawer-close').addEventListener('click', closeTrailDrawer);
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeTrailDrawer();
    });

    document.getElementById('detail-modal-close').addEventListener('click', closeDetailModal);
    detailBackdrop.addEventListener('click', (e) => {
      if (e.target === detailBackdrop) closeDetailModal();
    });

    document.getElementById('submit-modal-close').addEventListener('click', closeSubmitModal);
    submitBackdrop.addEventListener('click', (e) => {
      if (e.target === submitBackdrop) closeSubmitModal();
    });

    document.getElementById('cb-toast-open-pass').addEventListener('click', () => {
      document.getElementById('cb-toast').hidden = true;
      openTrailDrawer();
    });

    document.getElementById('trail-clear-btn').addEventListener('click', () => {
      savedItems = [];
      persistSavedItems();
      showToast('Cleared your Trail Pass');
    });

    document.getElementById('trail-print-btn').addEventListener('click', () => {
      window.print();
    });

    document.getElementById('trail-copy-btn').addEventListener('click', () => {
      if (savedItems.length === 0) {
        showToast('Add at least one stop or artwork first');
        return;
      }
      const lines = [
        'MY BASTROP, TX ART & CULTURE TRAIL PASS',
        'Curated via Create Bastrop (https://createbastrop.com)',
        '----------------------------------------',
        ...savedItems.map((item, idx) => `${idx + 1}. [${item.type}] ${item.title} — ${item.subtitle}`)
      ];
      copyText(lines.join('\n'), 'Copied itinerary to clipboard!');
    });

    // Form submit & copy
    const submitForm = document.getElementById('submit-modal-form');
    function buildFormSummary() {
      const fd = new FormData(submitForm);
      const topic = fd.get('topic') || 'Create Bastrop Inquiry';
      const ref = fd.get('subjectRef') ? ` — ${fd.get('subjectRef')}` : '';
      const subject = `${topic}${ref}`;
      const body = [
        `Name: ${fd.get('name') || ''}`,
        `Email: ${fd.get('email') || ''}`,
        `Topic: ${topic}`,
        fd.get('link') ? `Website / Social: ${fd.get('link')}` : null,
        fd.get('subjectRef') ? `Reference: ${fd.get('subjectRef')}` : null,
        '',
        String(fd.get('message') || '')
      ]
        .filter((line) => line !== null)
        .join('\n');
      return { subject, body };
    }

    submitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const { subject, body } = buildFormSummary();
      window.location.href = `mailto:hello@createbastrop.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      closeSubmitModal();
      showToast('Opening your email client for hello@createbastrop.com');
    });

    document.getElementById('cb-form-copy').addEventListener('click', () => {
      const { subject, body } = buildFormSummary();
      copyText(`To: hello@createbastrop.com\nSubject: ${subject}\n\n${body}`, 'Copied message for hello@createbastrop.com!');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeTrailDrawer();
        closeDetailModal();
        closeSubmitModal();
        closeMobileNav();
      }
    });
  }

  function copyText(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(successMsg)).catch(() => showToast('Ready to share'));
    } else {
      showToast(successMsg);
    }
  }

  function showToast(message) {
    const toast = document.getElementById('cb-toast');
    const textEl = document.getElementById('cb-toast-text');
    if (!toast || !textEl) return;
    textEl.textContent = message;
    toast.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 3400);
  }

  function openTrailDrawer() {
    renderTrailDrawerList();
    const el = document.getElementById('trail-drawer-backdrop');
    if (el) {
      el.hidden = false;
      document.body.classList.add('modal-open');
    }
  }

  function closeTrailDrawer() {
    const el = document.getElementById('trail-drawer-backdrop');
    if (el && !el.hidden) {
      el.hidden = true;
      document.body.classList.remove('modal-open');
    }
  }

  function openDetailModal(html) {
    const backdrop = document.getElementById('detail-modal-backdrop');
    const content = document.getElementById('detail-modal-content');
    if (!backdrop || !content) return;
    content.innerHTML = html;
    backdrop.hidden = false;
    document.body.classList.add('modal-open');
    syncSaveUI();
  }

  function closeDetailModal() {
    const backdrop = document.getElementById('detail-modal-backdrop');
    if (backdrop && !backdrop.hidden) {
      backdrop.hidden = true;
      document.body.classList.remove('modal-open');
    }
  }

  function openSubmitModal(preset) {
    const backdrop = document.getElementById('submit-modal-backdrop');
    if (!backdrop) return;
    const typeSelect = document.getElementById('cb-form-type');
    const subjectInput = document.getElementById('cb-form-subject');
    const msgInput = document.getElementById('cb-form-message');

    if (preset && preset.topic && typeSelect) {
      typeSelect.value = preset.topic;
    }
    if (preset && preset.subjectRef !== undefined && subjectInput) {
      subjectInput.value = preset.subjectRef;
    }
    if (preset && preset.message && msgInput && !msgInput.value) {
      msgInput.value = preset.message;
    }
    backdrop.hidden = false;
    document.body.classList.add('modal-open');
  }

  function closeSubmitModal() {
    const backdrop = document.getElementById('submit-modal-backdrop');
    if (backdrop && !backdrop.hidden) {
      backdrop.hidden = true;
      document.body.classList.remove('modal-open');
    }
  }

  function renderTrailDrawerList() {
    const listEl = document.getElementById('trail-saved-list');
    if (!listEl) return;

    if (savedItems.length === 0) {
      listEl.innerHTML = `
        <div class="empty-results" style="padding:2rem 1rem;">
          <p style="margin:0 0 0.75rem;font-weight:600;">Your Bastrop Trail Pass is empty.</p>
          <p style="margin:0 0 1rem;font-size:0.86rem;color:var(--ink-500);">
            Save studios, First Friday events, local artists, or collection pieces as you browse.
          </p>
          <a href="studios.html" class="btn btn-outline btn-sm">Explore Bastrop Spaces</a>
        </div>
      `;
      return;
    }

    listEl.innerHTML = savedItems
      .map(
        (item) => `
        <div class="saved-item">
          <div>
            <div class="saved-item-type">${escapeHtml(item.type)}</div>
            <a href="${escapeHtml(item.href || 'index.html')}" class="saved-item-title">${escapeHtml(item.title)}</a>
            <div class="saved-item-sub">${escapeHtml(item.subtitle)}</div>
          </div>
          <button type="button" class="btn-sm" data-remove-saved="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.title)}" style="color:var(--ink-500);font-size:1.1rem;">&times;</button>
        </div>
      `
      )
      .join('');
  }

  function syncSaveUI() {
    document.querySelectorAll('[data-trail-count]').forEach((el) => {
      el.textContent = String(savedItems.length);
    });

    document.querySelectorAll('[data-save-id]').forEach((btn) => {
      const id = btn.getAttribute('data-save-id');
      const saved = isSaved(id);
      btn.classList.toggle('is-saved', saved);
      btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
      btn.textContent = saved ? '✓ In Trail Pass' : '+ Trail Pass';
    });

    renderTrailDrawerList();
  }

  /* ------------------------------------------------------------------------
     Header Mobile Menu & Delegated Global Click Handlers
     ------------------------------------------------------------------------ */
  function closeMobileNav() {
    const nav = document.getElementById('primary-nav');
    const toggle = document.getElementById('menu-toggle');
    if (nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  }

  function bindGlobalActions() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    document.addEventListener('click', (e) => {
      const openPassBtn = e.target.closest('[data-open-pass]');
      if (openPassBtn) {
        e.preventDefault();
        openTrailDrawer();
        return;
      }

      const openSubmitBtn = e.target.closest('[data-open-submit]');
      if (openSubmitBtn) {
        e.preventDefault();
        closeDetailModal();
        openSubmitModal({
          topic: openSubmitBtn.getAttribute('data-submit-topic') || 'Artist / Portfolio Submission',
          subjectRef: openSubmitBtn.getAttribute('data-submit-ref') || ''
        });
        return;
      }

      const saveBtn = e.target.closest('[data-save-id]');
      if (saveBtn) {
        e.preventDefault();
        toggleSavedItem({
          id: saveBtn.getAttribute('data-save-id'),
          type: saveBtn.getAttribute('data-save-type') || 'Saved Stop',
          title: saveBtn.getAttribute('data-save-title') || 'Bastrop Highlight',
          subtitle: saveBtn.getAttribute('data-save-sub') || 'Bastrop Cultural District',
          href: saveBtn.getAttribute('data-save-href') || 'index.html'
        });
        return;
      }

      const removeBtn = e.target.closest('[data-remove-saved]');
      if (removeBtn) {
        removeSavedById(removeBtn.getAttribute('data-remove-saved'));
        return;
      }

      const inspectArtBtn = e.target.closest('[data-inspect-art]');
      if (inspectArtBtn) {
        e.preventDefault();
        const artId = inspectArtBtn.getAttribute('data-inspect-art');
        const art = DATA.artworks.find((a) => a.id === artId);
        if (art) showArtworkModal(art);
        return;
      }

      const inspectArtistBtn = e.target.closest('[data-inspect-artist]');
      if (inspectArtistBtn) {
        e.preventDefault();
        const artistId = inspectArtistBtn.getAttribute('data-inspect-artist');
        const artist = DATA.artists.find((a) => a.id === artistId);
        if (artist) showArtistModal(artist);
        return;
      }

      const icsBtn = e.target.closest('[data-ics-id]');
      if (icsBtn) {
        e.preventDefault();
        const ev = DATA.events.find((x) => x.id === icsBtn.getAttribute('data-ics-id'));
        if (ev) downloadEventICS(ev);
        return;
      }

      const focusSpotBtn = e.target.closest('[data-focus-spot]');
      if (focusSpotBtn) {
        const spotId = focusSpotBtn.getAttribute('data-focus-spot');
        if (selectMapSpot(spotId)) {
          e.preventDefault();
          const mapRoot = document.getElementById('district-map-root');
          if (mapRoot) mapRoot.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     Modals for Artwork Lightbox & Artist Profile
     ------------------------------------------------------------------------ */
  function showArtworkModal(art) {
    const saveKey = `art:${art.id}`;
    const swatches = (art.palette || [])
      .map((hex) => `<span class="swatch" style="background:${escapeHtml(hex)}" title="${escapeHtml(hex)}"></span>`)
      .join('');

    openDetailModal(`
      <div class="modal-art-grid">
        <div>
          <div class="art-plate" style="aspect-ratio:4/3;">
            ${DATA.getArtworkPlate(art.id)}
          </div>
          <div class="palette-swatches" aria-label="Artwork pigment palette">${swatches}</div>
          <div style="font-family:var(--font-mono);font-size:0.74rem;color:var(--ink-500);">
            ${escapeHtml(art.catalogNo)} &bull; ${escapeHtml(art.dimensions)} &bull; ${escapeHtml(art.year)}
          </div>
        </div>
        <div>
          <span class="spot-category-tag">${escapeHtml(art.medium)}</span>
          <h2 id="detail-modal-title" style="font-size:2rem;margin-bottom:0.25rem;">${escapeHtml(art.title)}</h2>
          <p style="margin:0 0 0.9rem;font-weight:600;color:var(--terracotta);">
            by <button type="button" data-inspect-artist="${escapeHtml(art.artistId)}" style="text-decoration:underline;color:inherit;padding:0;">${escapeHtml(art.artistName)}</button>
          </p>
          <p style="font-size:0.9rem;color:var(--ink-500);margin:0 0 0.85rem;">
            <strong>Materials:</strong> ${escapeHtml(art.materials)}<br>
            <strong>Where to View:</strong> ${escapeHtml(art.locationNote)}
          </p>
          <p style="font-size:0.95rem;color:var(--ink-700);margin:0 0 1rem;">${escapeHtml(art.story)}</p>
          <div style="padding:0.85rem 1rem;background:var(--bg-sand);border-radius:var(--radius-sm);display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem;">
            <span style="font-family:var(--font-mono);font-size:0.78rem;">${escapeHtml(art.availability)}</span>
            <strong style="font-family:var(--font-mono);font-size:1.05rem;color:var(--pine-deep);">${escapeHtml(art.price)}</strong>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.65rem;">
            <button type="button" class="btn btn-primary btn-sm"
              data-open-submit
              data-submit-topic="Collector Artwork Inquiry"
              data-submit-ref="${escapeHtml(art.title)} (${escapeHtml(art.catalogNo)})">
              Inquire About Piece
            </button>
            <button type="button" class="save-btn"
              data-save-id="${escapeHtml(saveKey)}"
              data-save-type="Collection Piece"
              data-save-title="${escapeHtml(art.title)}"
              data-save-sub="${escapeHtml(art.artistName)} · ${escapeHtml(art.price)}"
              data-save-href="collection.html">
              + Trail Pass
            </button>
          </div>
        </div>
      </div>
    `);
  }

  function showArtistModal(artist) {
    const linkedWorks = DATA.artworks.filter((w) => w.artistId === artist.id);
    const saveKey = `artist:${artist.id}`;

    const worksHtml = linkedWorks.length
      ? `
        <div style="margin-top:1.4rem;padding-top:1.2rem;border-top:1px solid var(--border-subtle);">
          <h3 style="font-size:1.3rem;margin-bottom:0.75rem;">Works in the Create Bastrop Collection</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.9rem;">
            ${linkedWorks
              .map(
                (w) => `
              <button type="button" data-inspect-art="${escapeHtml(w.id)}" style="text-align:left;background:var(--bg-paper);border:1px solid var(--border-subtle);border-radius:10px;padding:0.65rem;">
                <div style="border-radius:6px;overflow:hidden;margin-bottom:0.5rem;">${DATA.getArtworkPlate(w.id)}</div>
                <strong style="display:block;font-size:0.92rem;">${escapeHtml(w.title)}</strong>
                <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--ink-500);">${escapeHtml(w.price)} · ${escapeHtml(w.availability)}</span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>
      `
      : '';

    openDetailModal(`
      <div>
        <span class="spot-category-tag">${escapeHtml(artist.discipline)}</span>
        <h2 id="detail-modal-title" style="font-size:2.2rem;margin-bottom:0.2rem;">${escapeHtml(artist.name)}</h2>
        <p style="font-family:var(--font-mono);font-size:0.78rem;color:var(--terracotta);margin:0 0 1rem;">
          ${escapeHtml(artist.studioName)} &bull; ${escapeHtml(artist.neighborhood)}
        </p>
        <blockquote class="artist-quote" style="font-size:1.2rem;margin-bottom:1rem;">“${escapeHtml(artist.quote)}”</blockquote>
        <p style="color:var(--ink-700);font-size:0.95rem;margin:0 0 1rem;">${escapeHtml(artist.fullBio)}</p>
        <div class="tag-row">
          ${artist.specialties.map((s) => `<span class="tag-chip">${escapeHtml(s)}</span>`).join('')}
          ${artist.commissionsOpen ? '<span class="tag-chip" style="background:var(--pine-soft);color:var(--pine-deep);font-weight:600;">Open for Commissions</span>' : ''}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.65rem;margin-top:1.1rem;">
          <button type="button" class="btn btn-primary btn-sm"
            data-open-submit
            data-submit-topic="Collector Artwork Inquiry"
            data-submit-ref="Studio / Commission Inquiry for ${escapeHtml(artist.name)}">
            Connect / Commission Inquiry
          </button>
          ${
            artist.website
              ? `<a href="${escapeHtml(artist.website)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Visit Studio Website ↗</a>`
              : ''
          }
          <button type="button" class="save-btn"
            data-save-id="${escapeHtml(saveKey)}"
            data-save-type="Bastrop Artist"
            data-save-title="${escapeHtml(artist.name)}"
            data-save-sub="${escapeHtml(artist.studioName)} · ${escapeHtml(artist.discipline)}"
            data-save-href="artists.html">
            + Trail Pass
          </button>
        </div>
        ${worksHtml}
      </div>
    `);
  }

  /* ------------------------------------------------------------------------
     Card Renderers
     ------------------------------------------------------------------------ */
  function renderArtworkCard(art) {
    const saveKey = `art:${art.id}`;
    return `
      <article class="art-card">
        <div class="art-frame" data-inspect-art="${escapeHtml(art.id)}" role="button" tabindex="0" aria-label="Inspect ${escapeHtml(art.title)}">
          <div class="art-plate">
            ${DATA.getArtworkPlate(art.id)}
            <span class="art-status-badge">${escapeHtml(art.availability)}</span>
          </div>
        </div>
        <div class="art-body">
          <div class="art-meta-top">
            <span>${escapeHtml(art.catalogNo)}</span>
            <span>${escapeHtml(art.medium)}</span>
          </div>
          <h3><a href="#inspect" data-inspect-art="${escapeHtml(art.id)}">${escapeHtml(art.title)}</a></h3>
          <div class="art-artist-line">${escapeHtml(art.artistName)}</div>
          <p class="art-excerpt">${escapeHtml(art.excerpt)}</p>
          <div class="art-footer">
            <span class="art-price">${escapeHtml(art.price)}</span>
            <div style="display:flex;gap:0.45rem;align-items:center;">
              <button type="button" class="btn btn-outline btn-sm" data-inspect-art="${escapeHtml(art.id)}">Details</button>
              <button type="button" class="save-btn"
                data-save-id="${escapeHtml(saveKey)}"
                data-save-type="Collection Piece"
                data-save-title="${escapeHtml(art.title)}"
                data-save-sub="${escapeHtml(art.artistName)} · ${escapeHtml(art.price)}"
                data-save-href="collection.html">+ Trail Pass</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderArtistCard(artist) {
    const saveKey = `artist:${artist.id}`;
    return `
      <article class="artist-card">
        <div class="artist-banner">${DATA.getArtistBanner(artist.bannerColors)}</div>
        <div class="artist-monogram" aria-hidden="true">${escapeHtml(artist.initials)}</div>
        <div class="artist-body">
          <div class="artist-discipline">${escapeHtml(artist.discipline)}</div>
          <h3><a href="#artist" data-inspect-artist="${escapeHtml(artist.id)}">${escapeHtml(artist.name)}</a></h3>
          <div class="artist-studio-line">${escapeHtml(artist.studioName)} &bull; ${escapeHtml(artist.neighborhood)}</div>
          <blockquote class="artist-quote">“${escapeHtml(artist.quote)}”</blockquote>
          <p class="artist-bio-short">${escapeHtml(artist.shortBio)}</p>
          <div class="tag-row">
            ${artist.specialties.map((s) => `<span class="tag-chip">${escapeHtml(s)}</span>`).join('')}
          </div>
          <div class="artist-actions">
            <button type="button" class="btn btn-outline btn-sm" data-inspect-artist="${escapeHtml(artist.id)}">View Profile</button>
            <button type="button" class="save-btn"
              data-save-id="${escapeHtml(saveKey)}"
              data-save-type="Bastrop Artist"
              data-save-title="${escapeHtml(artist.name)}"
              data-save-sub="${escapeHtml(artist.studioName)}"
              data-save-href="artists.html">+ Trail Pass</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderEventCard(ev) {
    const saveKey = `event:${ev.id}`;
    return `
      <article class="event-card">
        <div class="event-date-box" aria-label="${escapeHtml(ev.monthShort)} ${escapeHtml(ev.dayNum)}">
          <span class="event-month">${escapeHtml(ev.monthShort)}</span>
          <span class="event-day">${escapeHtml(ev.dayNum)}</span>
          <span class="event-dow">${escapeHtml(ev.dow)}</span>
        </div>
        <div>
          <div class="event-cat">${escapeHtml(ev.category)} &bull; ${escapeHtml(ev.cost)}</div>
          <h3>${escapeHtml(ev.title)}</h3>
          <div class="event-meta">${escapeHtml(ev.timeLabel)} &bull; ${escapeHtml(ev.venue)}</div>
          <p class="event-desc">${escapeHtml(ev.description)}</p>
          <div class="event-actions">
            <button type="button" class="btn btn-outline btn-sm" data-ics-id="${escapeHtml(ev.id)}">+ Calendar (.ics)</button>
            <button type="button" class="save-btn"
              data-save-id="${escapeHtml(saveKey)}"
              data-save-type="Cultural Event"
              data-save-title="${escapeHtml(ev.title)}"
              data-save-sub="${escapeHtml(ev.monthShort)} ${escapeHtml(ev.dayNum)} · ${escapeHtml(ev.venue)}"
              data-save-href="events.html">+ Trail Pass</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderStudioCard(spot) {
    const saveKey = `spot:${spot.id}`;
    return `
      <article class="studio-card" id="space-${escapeHtml(spot.id)}">
        <div class="studio-visual">
          ${DATA.getStudioVisual(spot)}
          <span class="studio-badge">Stop #${escapeHtml(spot.pinNumber)} &bull; ${escapeHtml(spot.category)}</span>
        </div>
        <div class="studio-body">
          <h3>${escapeHtml(spot.name)}</h3>
          <div class="studio-addr">${escapeHtml(spot.address)}</div>
          <p class="studio-desc">${escapeHtml(spot.description)}</p>
          <div class="studio-hours">
            <strong>Hours:</strong> ${escapeHtml(spot.hours)}<br>
            <strong>Local Tip:</strong> ${escapeHtml(spot.insiderTip)}
          </div>
          <div class="studio-footer">
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
              <a href="#district-map-root" class="btn btn-outline btn-sm" data-focus-spot="${escapeHtml(spot.id)}">Pin on Map</a>
              ${
                spot.website && !spot.website.includes('createbastrop.com')
                  ? `<a href="${escapeHtml(spot.website)}" target="_blank" rel="noopener" class="btn btn-pine btn-sm">Website ↗</a>`
                  : ''
              }
            </div>
            <button type="button" class="save-btn"
              data-save-id="${escapeHtml(saveKey)}"
              data-save-type="Cultural Space"
              data-save-title="${escapeHtml(spot.name)}"
              data-save-sub="${escapeHtml(spot.address)}"
              data-save-href="studios.html">+ Trail Pass</button>
          </div>
        </div>
      </article>
    `;
  }

  /* ------------------------------------------------------------------------
     Interactive Bastrop Cultural District SVG Map
     ------------------------------------------------------------------------ */
  let activeSpotId = DATA.landmarks[0].id;

  function selectMapSpot(spotId) {
    const found = DATA.landmarks.find((s) => s.id === spotId);
    if (!found) return false;
    activeSpotId = found.id;
    updateDistrictMapInspector();
    return true;
  }

  function initDistrictMap() {
    const root = document.getElementById('district-map-root');
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const paramSpot = params.get('spot');
    if (paramSpot && DATA.landmarks.some((s) => s.id === paramSpot)) {
      activeSpotId = paramSpot;
    }

    const pinsSvg = DATA.landmarks
      .map(
        (spot) => `
        <g class="map-pin" data-pin-id="${escapeHtml(spot.id)}" tabindex="0" role="button" aria-label="Stop ${spot.pinNumber}: ${escapeHtml(spot.name)}">
          <circle class="pin-bg" cx="${spot.mapX}" cy="${spot.mapY}" r="15"/>
          <text x="${spot.mapX}" y="${spot.mapY + 4}" text-anchor="middle" fill="#F4F0E4" font-family="DM Sans, sans-serif" font-size="11" font-weight="700">${spot.pinNumber}</text>
        </g>
      `
      )
      .join('');

    root.innerHTML = `
      <div class="district-explorer">
        <div class="map-stage">
          <div class="map-svg-wrap">
            <svg viewBox="0 0 660 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrated Cultural Map of Bastrop, Texas">
              <!-- Warm Limestone Land Base -->
              <rect width="660" height="340" fill="#EFE6D5"/>

              <!-- Lost Pines Forest Canopy Zone (East / Northeast) -->
              <path d="M470 0 L660 0 L660 205 Q555 190 495 135 Q460 85 470 0 Z" fill="#D5E3D9"/>
              <g fill="#4E7A61" opacity="0.55">
                <path d="M525 56 L533 34 L541 56 Z"/><path d="M545 64 L555 38 L565 64 Z"/>
                <path d="M604 72 L614 44 L624 72 Z"/><path d="M624 128 L634 102 L644 128 Z"/>
                <path d="M518 134 L527 110 L536 134 Z"/>
              </g>

              <!-- Fisherman's Park Greenbelt along River -->
              <path d="M95 150 Q165 160 190 260 L115 310 L75 215 Z" fill="#D5E3D9"/>

              <!-- Winding Colorado River -->
              <path d="M88 0 C118 78, 168 128, 152 212 C138 282, 86 308, 72 340" fill="none" stroke="#6FA3B5" stroke-width="44" stroke-linecap="round"/>
              <path d="M88 0 C118 78, 168 128, 152 212 C138 282, 86 308, 72 340" fill="none" stroke="#9BC4D2" stroke-width="2" stroke-dasharray="8 8"/>

              <!-- Major Bastrop Streets & Corridors -->
              <!-- Chestnut St / Hwy 95 / Loop 150 -->
              <line x1="150" y1="120" x2="640" y2="108" stroke="#C8BCAA" stroke-width="8"/>
              <!-- Hwy 71 Corridor South -->
              <line x1="0" y1="275" x2="660" y2="255" stroke="#D2B49C" stroke-width="11"/>
              <!-- Historic Main Street -->
              <line x1="258" y1="62" x2="268" y2="320" stroke="#F4F0E4" stroke-width="7"/>
              <!-- Water Street & Spring Street -->
              <line x1="208" y1="88" x2="216" y2="300" stroke="#F4F0E4" stroke-width="4.5"/>
              <line x1="205" y1="152" x2="415" y2="148" stroke="#F4F0E4" stroke-width="4.5"/>
              <line x1="205" y1="200" x2="425" y2="195" stroke="#F4F0E4" stroke-width="4.5"/>

              <!-- 1923 Old Iron Bridge Truss Graphic -->
              <line x1="122" y1="222" x2="198" y2="222" stroke="#984831" stroke-width="6"/>
              <line x1="126" y1="216" x2="194" y2="216" stroke="#F4F0E4" stroke-width="2" stroke-dasharray="4 3"/>

              <!-- Geographic Labels -->
              <text x="52" y="95" fill="#4B696B" font-family="Fraunces, serif" font-style="italic" font-size="16" font-weight="700" transform="rotate(72 52 95)">Colorado River</text>
              <text x="278" y="85" fill="#51634F" font-family="DM Sans, sans-serif" font-size="9.5" letter-spacing="1">MAIN ST HISTORIC DISTRICT</text>
              <text x="385" y="102" fill="#51634F" font-family="DM Sans, sans-serif" font-size="9.5" letter-spacing="1">CHESTNUT ST</text>
              <text x="498" y="48" fill="#3B503C" font-family="DM Sans, sans-serif" font-size="9.5" letter-spacing="1">LOST PINES FOREST</text>
              <text x="455" y="282" fill="#8C5E1A" font-family="DM Sans, sans-serif" font-size="9.5" letter-spacing="1">HWY 71 · FOUNDRY CORRIDOR</text>

              <!-- Interactive Pins -->
              ${pinsSvg}
            </svg>
          </div>
          <div class="map-legend">
            <span><strong>Click any numbered pin (1–8)</strong> to inspect Bastrop studios, stages &amp; landmarks</span>
            <span>30.1105° N, 97.3153° W</span>
          </div>
        </div>

        <div class="spot-inspector" id="spot-inspector-card" aria-live="polite"></div>
      </div>
    `;

    root.addEventListener('click', (e) => {
      const pin = e.target.closest('[data-pin-id]');
      if (pin) {
        selectMapSpot(pin.getAttribute('data-pin-id'));
        return;
      }
      const chip = e.target.closest('[data-chip-spot]');
      if (chip) {
        selectMapSpot(chip.getAttribute('data-chip-spot'));
      }
    });

    root.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const pin = e.target.closest('[data-pin-id]');
        if (pin) {
          e.preventDefault();
          selectMapSpot(pin.getAttribute('data-pin-id'));
        }
      }
    });

    updateDistrictMapInspector();
  }

  function updateDistrictMapInspector() {
    const inspector = document.getElementById('spot-inspector-card');
    if (!inspector) return;

    const spot = DATA.landmarks.find((s) => s.id === activeSpotId) || DATA.landmarks[0];
    const saveKey = `spot:${spot.id}`;

    document.querySelectorAll('.map-pin').forEach((pinEl) => {
      pinEl.classList.toggle('is-active', pinEl.getAttribute('data-pin-id') === spot.id);
    });

    const chips = DATA.landmarks
      .map(
        (s) => `
        <button type="button" class="spot-chip ${s.id === spot.id ? 'is-active' : ''}" data-chip-spot="${escapeHtml(s.id)}">
          ${s.pinNumber}. ${escapeHtml(s.shortTag)}
        </button>
      `
      )
      .join('');

    inspector.innerHTML = `
      <div>
        <span class="spot-category-tag">Stop #${spot.pinNumber} &bull; ${escapeHtml(spot.category)}</span>
        <h3>${escapeHtml(spot.name)}</h3>
        <div class="spot-address">${escapeHtml(spot.address)}</div>
        <p class="spot-desc">${escapeHtml(spot.description)}</p>
        <div class="spot-insider">
          <strong>Insider Tip:</strong> ${escapeHtml(spot.insiderTip)}
        </div>
        <p style="font-size:0.82rem;color:var(--ink-500);margin:0 0 1rem;">
          <strong>Hours:</strong> ${escapeHtml(spot.hours)}
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:0.6rem;align-items:center;">
          <button type="button" class="save-btn"
            data-save-id="${escapeHtml(saveKey)}"
            data-save-type="Cultural Space"
            data-save-title="${escapeHtml(spot.name)}"
            data-save-sub="${escapeHtml(spot.address)}"
            data-save-href="studios.html">+ Trail Pass</button>
          <a href="studios.html#space-${escapeHtml(spot.id)}" class="btn btn-outline btn-sm">Space Details →</a>
        </div>
      </div>
      <div class="spot-quick-list" aria-label="Jump to Cultural District stop">
        ${chips}
      </div>
    `;

    syncSaveUI();
  }

  /* ------------------------------------------------------------------------
     Page-Specific Initializers
     ------------------------------------------------------------------------ */
  function initHomePage() {
    const worksEl = document.getElementById('home-featured-works');
    if (worksEl) {
      worksEl.innerHTML = DATA.artworks.slice(0, 3).map(renderArtworkCard).join('');
    }

    const artistsEl = document.getElementById('home-featured-artists');
    if (artistsEl) {
      artistsEl.innerHTML = DATA.artists.slice(0, 3).map(renderArtistCard).join('');
    }

    const eventsEl = document.getElementById('home-upcoming-events');
    if (eventsEl) {
      eventsEl.innerHTML = DATA.events.slice(0, 4).map(renderEventCard).join('');
    }
  }

  function initCollectionPage() {
    const grid = document.getElementById('collection-grid');
    if (!grid) return;

    let activeMedium = 'All';
    let activeAvail = 'All';
    let sortMode = 'featured';
    let query = '';

    const meta = document.getElementById('collection-results-meta');
    const searchInput = document.getElementById('collection-search');
    const availSelect = document.getElementById('collection-avail');
    const sortSelect = document.getElementById('collection-sort');

    function render() {
      let list = DATA.artworks.filter((art) => {
        if (activeMedium !== 'All' && art.medium !== activeMedium) return false;
        if (activeAvail !== 'All' && art.availability !== activeAvail) return false;
        if (query) {
          const hay = `${art.title} ${art.artistName} ${art.materials} ${art.excerpt}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

      if (sortMode === 'price-asc') {
        list = [...list].sort((a, b) => a.priceValue - b.priceValue);
      } else if (sortMode === 'price-desc') {
        list = [...list].sort((a, b) => b.priceValue - a.priceValue);
      }

      if (meta) {
        meta.textContent = `Showing ${list.length} of ${DATA.artworks.length} cataloged Bastrop works`;
      }

      grid.innerHTML = list.length
        ? list.map(renderArtworkCard).join('')
        : `<div class="empty-results" style="grid-column:1/-1;"><p>No works match those filters yet. Try clearing your search or selecting “All”.</p></div>`;

      syncSaveUI();
    }

    document.querySelectorAll('[data-medium-pill]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeMedium = btn.getAttribute('data-medium-pill');
        document.querySelectorAll('[data-medium-pill]').forEach((b) => b.classList.toggle('is-active', b === btn));
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        query = e.target.value.trim().toLowerCase();
        render();
      });
    }
    if (availSelect) {
      availSelect.addEventListener('change', (e) => {
        activeAvail = e.target.value;
        render();
      });
    }
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        sortMode = e.target.value;
        render();
      });
    }

    render();
  }

  function initArtistsPage() {
    const grid = document.getElementById('artists-grid');
    if (!grid) return;

    let activeCat = 'All';
    let commissionsOnly = false;
    let query = '';

    const meta = document.getElementById('artists-results-meta');
    const searchInput = document.getElementById('artists-search');
    const commCheck = document.getElementById('artists-commissions-only');

    function render() {
      const list = DATA.artists.filter((a) => {
        if (activeCat !== 'All' && a.category !== activeCat) return false;
        if (commissionsOnly && !a.commissionsOpen) return false;
        if (query) {
          const hay = `${a.name} ${a.discipline} ${a.studioName} ${a.neighborhood} ${a.shortBio} ${a.specialties.join(' ')}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

      if (meta) {
        meta.textContent = `Showing ${list.length} of ${DATA.artists.length} Bastrop County artists & makers`;
      }

      grid.innerHTML = list.length
        ? list.map(renderArtistCard).join('')
        : `<div class="empty-results" style="grid-column:1/-1;"><p>No artists matched that filter. Try broadening your discipline or search terms.</p></div>`;

      syncSaveUI();
    }

    document.querySelectorAll('[data-artist-pill]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCat = btn.getAttribute('data-artist-pill');
        document.querySelectorAll('[data-artist-pill]').forEach((b) => b.classList.toggle('is-active', b === btn));
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        query = e.target.value.trim().toLowerCase();
        render();
      });
    }

    if (commCheck) {
      commCheck.addEventListener('change', (e) => {
        commissionsOnly = e.target.checked;
        render();
      });
    }

    render();

    const params = new URLSearchParams(window.location.search);
    const targetArtist = params.get('artist');
    if (targetArtist) {
      const found = DATA.artists.find((a) => a.id === targetArtist);
      if (found) showArtistModal(found);
    }
  }

  function initEventsPage() {
    const listEl = document.getElementById('events-grid');
    if (!listEl) return;

    let activeCat = 'All';
    let freeOnly = false;
    let query = '';

    const meta = document.getElementById('events-results-meta');
    const searchInput = document.getElementById('events-search');
    const freeCheck = document.getElementById('events-free-only');

    function render() {
      const filtered = DATA.events.filter((ev) => {
        if (activeCat !== 'All' && ev.category !== activeCat) return false;
        if (freeOnly && !ev.isFree) return false;
        if (query) {
          const hay = `${ev.title} ${ev.venue} ${ev.description} ${ev.monthShort}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

      if (meta) {
        meta.textContent = `Showing ${filtered.length} upcoming Bastrop cultural gatherings`;
      }

      listEl.innerHTML = filtered.length
        ? filtered.map(renderEventCard).join('')
        : `<div class="empty-results" style="grid-column:1/-1;"><p>No events match that filter. Reset filters to view the full seasonal lineup.</p></div>`;

      syncSaveUI();
    }

    document.querySelectorAll('[data-event-pill]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCat = btn.getAttribute('data-event-pill');
        document.querySelectorAll('[data-event-pill]').forEach((b) => b.classList.toggle('is-active', b === btn));
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        query = e.target.value.trim().toLowerCase();
        render();
      });
    }

    if (freeCheck) {
      freeCheck.addEventListener('change', (e) => {
        freeOnly = e.target.checked;
        render();
      });
    }

    render();
  }

  function initStudiosPage() {
    const grid = document.getElementById('studios-grid');
    if (!grid) return;

    let activeCat = 'All';
    let query = '';

    const meta = document.getElementById('studios-results-meta');
    const searchInput = document.getElementById('studios-search');

    function render() {
      const filtered = DATA.landmarks.filter((s) => {
        if (activeCat !== 'All' && s.category !== activeCat) return false;
        if (query) {
          const hay = `${s.name} ${s.address} ${s.description} ${s.shortTag}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

      if (meta) {
        meta.textContent = `Showing ${filtered.length} of ${DATA.landmarks.length} Bastrop studios, venues & cultural landmarks`;
      }

      grid.innerHTML = filtered.length
        ? filtered.map(renderStudioCard).join('')
        : `<div class="empty-results" style="grid-column:1/-1;"><p>No spaces match that filter.</p></div>`;

      syncSaveUI();
    }

    document.querySelectorAll('[data-studio-pill]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCat = btn.getAttribute('data-studio-pill');
        document.querySelectorAll('[data-studio-pill]').forEach((b) => b.classList.toggle('is-active', b === btn));
        render();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        query = e.target.value.trim().toLowerCase();
        render();
      });
    }

    render();
  }

  function initFaqAccordions() {
    document.querySelectorAll('[data-faq-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const panelId = btn.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        const icon = btn.querySelector('.faq-icon');
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (panel) panel.hidden = expanded;
        if (icon) icon.textContent = expanded ? '+' : '−';
      });
    });
  }

  /* ------------------------------------------------------------------------
     .ICS Calendar File Export for Bastrop Events
     ------------------------------------------------------------------------ */
  function downloadEventICS(ev) {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Create Bastrop//Bastrop TX Cultural Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${ev.id}@createbastrop.com`,
      `DTSTAMP:20261110T180000Z`,
      `DTSTART:${ev.isoStart}`,
      `DTEND:${ev.isoEnd}`,
      `SUMMARY:${ev.title}`,
      `LOCATION:${ev.venue}, Bastrop, TX`,
      `DESCRIPTION:${ev.description.replace(/\n/g, ' ')}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ev.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded calendar invite for "${ev.title}"`);
  }

  /* ------------------------------------------------------------------------
     Bootstrap
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    ensureSharedOverlays();
    bindGlobalActions();
    initDistrictMap();
    initHomePage();
    initCollectionPage();
    initArtistsPage();
    initEventsPage();
    initStudiosPage();
    initFaqAccordions();
    syncSaveUI();
  });
})();
