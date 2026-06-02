/* ============================================
   Create Bastrop — Alpine.js Application
   ============================================ */

// Discipline taxonomy with assigned colors
const DISCIPLINES = [
  { id: 'painting', label: 'Painting', color: 'red' },
  { id: 'sculpture', label: 'Sculpture', color: 'orange' },
  { id: 'photography', label: 'Photography', color: 'cyan' },
  { id: 'music', label: 'Music', color: 'blue' },
  { id: 'poetry', label: 'Poetry', color: 'pink' },
  { id: 'dance', label: 'Dance', color: 'pink' },
  { id: 'theater', label: 'Theater', color: 'red' },
  { id: 'crafts', label: 'Crafts', color: 'orange' },
  { id: 'murals', label: 'Murals', color: 'green' },
  { id: 'digital', label: 'Digital', color: 'cyan' },
  { id: 'mixed-media', label: 'Mixed Media', color: 'orange' },
  { id: 'film', label: 'Film', color: 'blue' },
  { id: 'ceramics', label: 'Ceramics', color: 'orange' },
  { id: 'textile', label: 'Textile', color: 'pink' },
  { id: 'design', label: 'Design', color: 'cyan' },
];

// Color palette for generating placeholder backgrounds
const PLACEHOLDER_COLORS = [
  '#E63228', '#F28A1F', '#5BBD2B', '#29ABE2', '#D94F8A', '#2D3A8C',
];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// Stable djb2-style string hash (shared by the placeholder helpers)
function hashString(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getPlaceholderColor(id) {
  return PLACEHOLDER_COLORS[hashString(id) % PLACEHOLDER_COLORS.length];
}

// Gallery placeholder aspects
const GALLERY_ASPECTS = ['', 'landscape', 'square'];
function getPlaceholderAspect(id) {
  return GALLERY_ASPECTS[hashString(id) % GALLERY_ASPECTS.length];
}

// Today's date as YYYY-MM-DD in LOCAL time, so event partitioning matches
// the locally-parsed date chips (avoids a UTC-vs-local midnight boundary bug).
function todayLocalStr() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Only allow http/https URLs from JSON data to reach an href, so a
// malicious "javascript:" value can never become a clickable script link.
function safeUrl(u) {
  if (!u) return '#';
  try {
    const parsed = new URL(u, window.location.origin);
    return (parsed.protocol === 'https:' || parsed.protocol === 'http:') ? parsed.href : '#';
  } catch {
    return '#';
  }
}

// Emoji per discipline for placeholders
const DISCIPLINE_EMOJI = {
  painting: '\uD83C\uDFA8',
  sculpture: '\uD83E\uDDF1',
  photography: '\uD83D\uDCF7',
  music: '\uD83C\uDFB5',
  poetry: '\u270D\uFE0F',
  dance: '\uD83D\uDC83',
  theater: '\uD83C\uDFAD',
  crafts: '\u2702\uFE0F',
  murals: '\uD83D\uDD8C\uFE0F',
  digital: '\uD83D\uDCBB',
  'mixed-media': '\uD83C\uDFAD',
  film: '\uD83C\uDFAC',
  ceramics: '\uD83C\uDFFA',
  textile: '\uD83E\uDDF5',
};

// Format date for event cards
function formatEventDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {
    month: months[date.getMonth()],
    day: date.getDate(),
  };
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

// Main Alpine component
document.addEventListener('alpine:init', () => {
  Alpine.data('community', () => ({
    // Data
    artists: [],
    gallery: [],
    events: [],
    partners: [],
    disciplines: DISCIPLINES,

    // Filters
    artistFilter: 'all',
    galleryFilter: 'all',
    searchQuery: '',
    eventTab: 'upcoming',

    // Lightbox state
    lightboxOpen: false,
    lightboxIndex: 0,

    // Artist modal
    selectedArtist: null,

    // Mobile menu
    mobileMenuOpen: false,

    // Active nav section
    activeSection: '',

    // Loading
    loaded: false,
    loadError: '',

    // Initialize
    async init() {
      // Load each dataset independently so one missing/renamed file degrades
      // only its own section to an empty state instead of nuking the whole site.
      const sources = {
        artists: 'data/artists.json',
        gallery: 'data/gallery.json',
        events: 'data/events.json',
        partners: 'data/partners.json',
      };
      const keys = Object.keys(sources);
      const results = await Promise.allSettled(keys.map(k => fetchJson(sources[k])));

      let failures = 0;
      results.forEach((res, i) => {
        const key = keys[i];
        if (res.status === 'fulfilled' && Array.isArray(res.value)) {
          this[key] = res.value;
        } else {
          failures++;
          console.error(`Failed to load ${sources[key]}:`, res.reason || 'expected an array');
          this[key] = [];
        }
      });

      // Surface the global error banner only if EVERY dataset failed.
      if (failures === keys.length) {
        this.loadError = 'We could not load the community data right now. Please try again shortly.';
      }
      this.loaded = true;

      // Set up Intersection Observer for active nav
      this.$nextTick(() => this.setupNavObserver());

      // Set up scroll reveal animations
      this.$nextTick(() => this.setupScrollReveal());

      // Keyboard listeners for lightbox
      document.addEventListener('keydown', (e) => {
        if (!this.lightboxOpen) return;
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.prevLightbox();
        if (e.key === 'ArrowRight') this.nextLightbox();
      });

      // Close the mobile menu (and release the scroll lock) if the viewport
      // grows past the mobile breakpoint while the menu is open.
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && this.mobileMenuOpen) this.closeMobileMenu();
      });
    },

    // Single source of truth for the body scroll lock: it's on iff any
    // overlay is open. Replaces the four divergent ad-hoc guards.
    syncScrollLock() {
      document.body.classList.toggle(
        'modal-open',
        this.lightboxOpen || !!this.selectedArtist || this.mobileMenuOpen
      );
    },

    // --- Computed / Getters ---

    get filteredArtists() {
      let result = this.artists;
      if (this.artistFilter !== 'all') {
        result = result.filter(a => a.disciplines.includes(this.artistFilter));
      }
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase().trim();
        result = result.filter(a =>
          a.name.toLowerCase().includes(q) ||
          a.bio.toLowerCase().includes(q) ||
          a.disciplines.some(d => d.toLowerCase().includes(q))
        );
      }
      return result;
    },

    get filteredGallery() {
      if (this.galleryFilter === 'all') return this.gallery;
      return this.gallery.filter(g => g.discipline === this.galleryFilter);
    },

    get upcomingEvents() {
      const today = todayLocalStr();
      return this.events
        .filter(e => e.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date));
    },

    get pastEvents() {
      const today = todayLocalStr();
      return this.events
        .filter(e => e.date < today)
        .sort((a, b) => b.date.localeCompare(a.date));
    },

    get currentEvents() {
      return this.eventTab === 'upcoming' ? this.upcomingEvents : this.pastEvents;
    },

    get activeDisciplinesArtists() {
      const used = new Set();
      this.artists.forEach(a => a.disciplines.forEach(d => used.add(d)));
      return DISCIPLINES.filter(d => used.has(d.id));
    },

    get activeDisciplinesGallery() {
      const used = new Set(this.gallery.map(g => g.discipline));
      return DISCIPLINES.filter(d => used.has(d.id));
    },

    // --- Actions ---

    setArtistFilter(filter) {
      this.artistFilter = filter;
    },

    setGalleryFilter(filter) {
      this.galleryFilter = filter;
    },

    openArtist(artist) {
      this._lastFocused = document.activeElement;
      this.selectedArtist = artist;
      this.syncScrollLock();
      this.$nextTick(() => this.setupFocusTrap('.artist-modal-overlay'));
    },

    closeArtist() {
      this.selectedArtist = null;
      if (this._focusTrapHandler) {
        document.removeEventListener('keydown', this._focusTrapHandler);
        this._focusTrapHandler = null;
      }
      this.syncScrollLock();
      this.restoreFocus();
    },

    openLightbox(index) {
      this._lastFocused = document.activeElement;
      this.lightboxIndex = index;
      this.lightboxOpen = true;
      this.syncScrollLock();
      this.$nextTick(() => {
        this.setupFocusTrap('.lightbox');
        this.setupLightboxSwipe();
      });
    },

    closeLightbox() {
      this.lightboxOpen = false;
      if (this._focusTrapHandler) {
        document.removeEventListener('keydown', this._focusTrapHandler);
        this._focusTrapHandler = null;
      }
      this.teardownLightboxSwipe();
      this.syncScrollLock();
      this.restoreFocus();
    },

    // Return focus to whatever triggered the overlay (WCAG 2.4.3)
    restoreFocus() {
      const el = this._lastFocused;
      this._lastFocused = null;
      if (el && typeof el.focus === 'function') {
        this.$nextTick(() => el.focus());
      }
    },

    prevLightbox() {
      const items = this.filteredGallery;
      if (!items.length) return;
      this.lightboxIndex = (this.lightboxIndex - 1 + items.length) % items.length;
    },

    nextLightbox() {
      const items = this.filteredGallery;
      if (!items.length) return;
      this.lightboxIndex = (this.lightboxIndex + 1) % items.length;
    },

    get lightboxItem() {
      return this.filteredGallery[this.lightboxIndex] || null;
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      this.syncScrollLock();
    },

    closeMobileMenu() {
      this.mobileMenuOpen = false;
      this.syncScrollLock();
    },

    // Intersection Observer for active nav highlighting
    setupNavObserver() {
      const sections = document.querySelectorAll('.section[id]');
      if (!sections.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      });

      sections.forEach(s => observer.observe(s));
    },

    // Scroll reveal animation observer
    setupScrollReveal() {
      const reveals = document.querySelectorAll('.reveal');
      if (!reveals.length) return;

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
      });

      reveals.forEach(el => revealObserver.observe(el));
    },

    // Helper methods exposed to template
    getInitials,
    getPlaceholderColor,
    getPlaceholderAspect,
    formatEventDate,
    safeUrl,
    getDisciplineEmoji(discipline) {
      return DISCIPLINE_EMOJI[discipline] || '\uD83C\uDFA8';
    },

    setupFocusTrap(selector) {
      const modal = document.querySelector(selector);
      if (!modal) return;
      const focusable = modal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      first.focus();

      // Remove old trap listener if any
      if (this._focusTrapHandler) {
        document.removeEventListener('keydown', this._focusTrapHandler);
      }
      this._focusTrapHandler = (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener('keydown', this._focusTrapHandler);
    },

    setupLightboxSwipe() {
      const lightbox = document.querySelector('.lightbox');
      if (!lightbox) return;
      let touchStartX = 0;
      let touchEndX = 0;
      const self = this;

      // Remove any stale listeners before re-binding
      this.teardownLightboxSwipe();
      this._swipeEl = lightbox;

      this._swipeTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
      };
      this._swipeTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            self.nextLightbox();
          } else {
            self.prevLightbox();
          }
        }
      };

      lightbox.addEventListener('touchstart', this._swipeTouchStart, { passive: true });
      lightbox.addEventListener('touchend', this._swipeTouchEnd, { passive: true });
    },

    teardownLightboxSwipe() {
      if (this._swipeEl && this._swipeTouchStart) {
        this._swipeEl.removeEventListener('touchstart', this._swipeTouchStart);
        this._swipeEl.removeEventListener('touchend', this._swipeTouchEnd);
      }
      this._swipeEl = null;
      this._swipeTouchStart = null;
      this._swipeTouchEnd = null;
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  }));
});
