document.addEventListener('DOMContentLoaded', () => {

    /* ══════════════════════════════════════════════════
       1. REVEAL ON SCROLL — blur + fade-up
       ══════════════════════════════════════════════════ */
    const revealElements = document.querySelectorAll('.reveal, .reveal-blur');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* Spotlight effect on manifesto cards */
    document.querySelectorAll('.manifesto-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
            const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });


    /* ══════════════════════════════════════════════════
       2. NAVBAR PREMIUM — SMART SCROLL
       ══════════════════════════════════════════════════ */
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // run once on load


    /* ══════════════════════════════════════════════════
       3. ACTIVE NAV LINK on scroll
       ══════════════════════════════════════════════════ */
    const navLinksAll = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.35,
        rootMargin: '-10% 0px -55% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));


    /* ══════════════════════════════════════════════════
       4. MOBILE MENU
       ══════════════════════════════════════════════════ */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const openMenu = () => {
        hamburgerBtn.classList.add('is-active');
        mobileMenu.classList.add('is-open');
        mobileOverlay.classList.add('is-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileOverlay.setAttribute('aria-hidden', 'false');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        hamburgerBtn.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        mobileOverlay.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    mobileClose.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });


    /* ══════════════════════════════════════════════════
       5. COUNTER ANIMATION (métricas)
       ══════════════════════════════════════════════════ */
    const counterEls = document.querySelectorAll('.metric-number');
    const metricsGrid = document.querySelector('.metrics-grid');
    let countersStarted = false;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3); // cubic ease-out

    const animateCounters = () => {
        const duration = 2000; // ms
        const startTime = performance.now();

        const tick = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOut(progress);

            counterEls.forEach(el => {
                const target = parseInt(el.getAttribute('data-target'), 10);
                el.textContent = Math.floor(eased * target);
            });

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                // Ensure exact final values
                counterEls.forEach(el => {
                    el.textContent = el.getAttribute('data-target');
                });
            }
        };

        requestAnimationFrame(tick);
    };

    if (metricsGrid && counterEls.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    animateCounters();
                    counterObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        counterObserver.observe(metricsGrid);
    }


    /* ══════════════════════════════════════════════════
       6. FAQ ACCORDION
       ══════════════════════════════════════════════════ */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('is-open');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open the clicked one (toggle)
            if (!isOpen) {
                item.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });


    /* ══════════════════════════════════════════════════
       7. CONTACT FORM → WHATSAPP
       ══════════════════════════════════════════════════ */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nameInput = document.getElementById('contactName');
        const phoneInput = document.getElementById('contactPhone');
        const messageInput = document.getElementById('contactMessage');

        const markError = (input) => {
            input.classList.add('has-error');
            input.addEventListener('input', () => input.classList.remove('has-error'), { once: true });
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const message = messageInput.value.trim();

            let valid = true;
            if (!name) { markError(nameInput); valid = false; }
            if (!phone) { markError(phoneInput); valid = false; }
            if (!message) { markError(messageInput); valid = false; }

            if (!valid) return;

            const text = `Olá! Meu nome é ${name}. Meu contato: ${phone}. Mensagem: ${message}`;
            const url = `https://wa.me/5584994243772?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    }

    /* ══════════════════════════════════════════════════
       8. PLAN CARDS — 3D TILT + SPOTLIGHT
       ══════════════════════════════════════════════════ */
    const planCards = document.querySelectorAll('.plan-card');

    if (planCards.length > 0 && window.matchMedia('(min-width: 900px)').matches) {
        planCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
                const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);

                // Spotlight position
                card.style.setProperty('--mx', `${x}%`);
                card.style.setProperty('--my', `${y}%`);

                // 3D tilt: max ±4deg rotation
                const centerX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const centerY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                const tiltX = (centerY * -3).toFixed(2); // inverted for natural feel
                const tiltY = (centerX * 3).toFixed(2);

                const isFeatured = card.classList.contains('plan-card--featured');
                const baseY = isFeatured ? -16 : -6;

                card.style.transform = `translateY(${baseY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.removeProperty('--mx');
                card.style.removeProperty('--my');

                const isFeatured = card.classList.contains('plan-card--featured');
                card.style.transform = isFeatured ? 'translateY(-16px)' : '';
            });
        });
    }

});
