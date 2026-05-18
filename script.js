/* ============================================
   BARKO PET STORE — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initBrandsMarquee();
  highlightCurrentDay();
});

/* --- Navbar Scroll & Mobile Toggle --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__mobile-toggle');
  const menu = document.querySelector('.navbar__menu');
  const overlay = document.querySelector('.mobile-overlay');
  const links = document.querySelectorAll('.navbar__link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (toggle) {
    toggle.setAttribute('aria-controls', 'navMenu');
    const setExpanded = (open) => toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    setExpanded(false);

    toggle.addEventListener('click', () => {
      const opening = !menu.classList.contains('open');
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
      setExpanded(opening);
    });
  }

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('open')) {
        if (toggle) toggle.classList.remove('open');
        menu.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const normalizedCurrent = currentPage === '' ? 'index.html' : currentPage;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (linkPage === normalizedCurrent || (normalizedCurrent === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Brands Marquee --- */
function initBrandsMarquee() {
  const track = document.querySelector('.brands-track');
  if (!track) return;

  // Clone items for seamless loop
  const items = track.innerHTML;
  track.innerHTML = items + items;
}

/* --- Highlight Current Day in Hours Table --- */
function highlightCurrentDay() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];

  document.querySelectorAll('.hours-table tr').forEach(row => {
    const dayCell = row.querySelector('td:first-child');
    if (dayCell && dayCell.textContent.trim() === today) {
      row.classList.add('today');
      dayCell.classList.add('today');
      // Add a "Today" indicator
      dayCell.innerHTML = `${today} <span style="color: var(--color-primary); font-size: 0.75rem; margin-left: 6px;">● Today</span>`;
    }
  });
}

/* --- Smooth Scroll for Anchor Links --- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

/* --- Contact Form Handler --- */
function handleContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Construct WhatsApp message
  const message = `Hi Barko! 🐾\n\nName: ${data.name}\nPhone: ${data.phone}\nSubject: ${data.subject}\n\nMessage: ${data.message}`;
  const whatsappUrl = `https://wa.me/917814444421?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank');

  // Show success state
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = '✓ Sent via WhatsApp!';
  btn.style.background = 'var(--color-success)';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    form.reset();
  }, 3000);
}
