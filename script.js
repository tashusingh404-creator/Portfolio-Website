/**
 * Portfolio Script — script.js
 * Handles: Navbar scroll, mobile menu, scroll reveal,
 *          skill bar animations, contact form, newsletter form,
 *          active nav link on scroll, character counter.
 */

/* ─── Navbar ──────────────────────────────────────── */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── Active Nav Link on Scroll ───────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');

function updateActiveNav () {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ─── Scroll Reveal ────────────────────────────────── */
const revealEls = document.querySelectorAll('[data-animate]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ─── Skill Bar Animation ──────────────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      fill.style.setProperty('--target-width', `${width}%`);
      // Small delay to allow CSS transition to kick in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fill.classList.add('animated');
        });
      });
      skillObserver.unobserve(fill);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

skillFills.forEach(fill => skillObserver.observe(fill));

/* ─── Character Counter ────────────────────────────── */
const messageInput  = document.getElementById('message');
const charCounter   = document.getElementById('char-counter');

if (messageInput && charCounter) {
  messageInput.addEventListener('input', () => {
    const len = messageInput.value.length;
    charCounter.textContent = `(${len}/500)`;
    if (len >= 450) {
      charCounter.style.color = '#ef4444';
    } else {
      charCounter.style.color = '';
    }
  });
}

/* ─── Contact Form ─────────────────────────────────── */
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');
const submitBtn    = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      shakeForm(contactForm);
      return;
    }

    // Simulate async send
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      contactForm.reset();
      if (charCounter) charCounter.textContent = '(0/500)';
      formSuccess.classList.add('show');
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    }, 1200);
  });
}

function shakeForm (form) {
  form.style.animation = 'shake 0.4s ease';
  form.addEventListener('animationend', () => {
    form.style.animation = '';
  }, { once: true });
}

// Add shake keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-5px); }
  80%       { transform: translateX(5px); }
}`;
document.head.appendChild(shakeStyle);

/* ─── Newsletter Form ──────────────────────────────── */
const newsletterForm    = document.getElementById('newsletter-form');
const newsletterSuccess = document.getElementById('newsletter-success');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (!emailInput.value.trim()) return;

    emailInput.value = '';
    newsletterSuccess.classList.add('show');
    setTimeout(() => newsletterSuccess.classList.remove('show'), 4000);
  });
}

/* ─── Smooth scroll for all anchor links ──────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Hero "View My Work" smooth scroll ───────────── */
const viewWorkBtn = document.getElementById('view-work-btn');
if (viewWorkBtn) {
  viewWorkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const projects = document.getElementById('projects');
    if (projects) projects.scrollIntoView({ behavior: 'smooth' });
  });
}
