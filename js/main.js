/* ============================================
   MAXIMUM PLUS SERVICES - JavaScript principal
   Animations, navigation, formulaire, carrousel
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBurger();
  initScrollAnimations();
  initTestimonialsCarousel();
  initFormValidation();
  initSmoothScroll();
  initStatCounters();
});

/* --- Navbar : ombre au scroll + section active --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- Menu burger mobile --- */
function initBurger() {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!burger || !mobileMenu) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Animations au scroll (IntersectionObserver) --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --- Carrousel de témoignages --- */
function initTestimonialsCarousel() {
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonials-dots .dot');
  if (!track || !dots.length) return;

  let currentIndex = 0;
  const totalSlides = dots.length;
  let autoplayInterval;

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoplay();
    });
  });

  function autoplay() {
    autoplayInterval = setInterval(() => {
      goToSlide((currentIndex + 1) % totalSlides);
    }, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplay();
  }

  autoplay();
}

/* --- Validation et envoi du formulaire --- */
function initFormValidation() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const fields = form.querySelectorAll('[required]');
    fields.forEach(field => {
      field.classList.remove('error');
      const errorEl = field.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.style.display = 'none';

      if (!field.value.trim()) {
        field.classList.add('error');
        if (errorEl) errorEl.style.display = 'block';
        isValid = false;
      }

      if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
          field.classList.add('error');
          if (errorEl) {
            errorEl.textContent = 'Veuillez entrer une adresse email valide.';
            errorEl.style.display = 'block';
          }
          isValid = false;
        }
      }

      if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,20}$/;
        if (!phoneRegex.test(field.value.trim())) {
          field.classList.add('error');
          if (errorEl) {
            errorEl.textContent = 'Veuillez entrer un numéro de téléphone valide.';
            errorEl.style.display = 'block';
          }
          isValid = false;
        }
      }
    });

    if (isValid) {
      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          form.reset();
          const success = document.querySelector('.form-success');
          if (success) success.classList.add('show');
        } else {
          throw new Error('Erreur lors de l\'envoi');
        }
      })
      .catch(() => {
        const success = document.querySelector('.form-success');
        if (success) {
          success.innerHTML = 'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.';
          success.classList.add('show');
        }
        form.reset();
      });
    }
  });

  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const errorEl = field.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.style.display = 'none';
    });
  });
}

/* --- Scroll fluide pour ancres --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

/* --- Compteur animé pour les chiffres clés --- */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + target.toLocaleString('fr-FR') + suffix;
    }
  }

  requestAnimationFrame(update);
}
