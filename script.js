/**
 * MP43 Studios - Website JavaScript
 * Simplified for new studio website
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // Page Loader
    // ========================================

    const pageLoader = document.getElementById('pageLoader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 1400);
    });

    document.body.style.overflow = 'hidden';

    // ========================================
    // Navigation
    // ========================================

    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    let lastScroll = 0;
    const handleNavScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = window.scrollY;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            burger?.classList.remove('active');
            navLinks?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const sections = document.querySelectorAll('section[id]');

    const updateActiveNav = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ========================================
    // Smooth Scroll
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Scroll Animations
    // ========================================

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
    };

    // Service Cards with stagger
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 120);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => serviceObserver.observe(card));

    // Portfolio Items with stagger
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, (index % 4) * 100);
                portfolioObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    portfolioItems.forEach(item => portfolioObserver.observe(item));

    // About Text with stagger
    const aboutTexts = document.querySelectorAll('.about-content-simple .about-text');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                aboutObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    aboutTexts.forEach(text => aboutObserver.observe(text));

    // Contact Items with stagger
    const contactItems = document.querySelectorAll('.contact-item-simple');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                contactObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    contactItems.forEach(item => contactObserver.observe(item));

    // Section Headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    sectionHeaders.forEach(header => headerObserver.observe(header));

    // Portfolio CTA
    const portfolioCta = document.querySelector('.portfolio-cta');
    if (portfolioCta) {
        const portfolioCtaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        portfolioCtaObserver.observe(portfolioCta);
    }

    // Quote Section
    const quoteContent = document.querySelector('.quote-content');
    if (quoteContent) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        quoteObserver.observe(quoteContent);
    }

    // ========================================
    // Hero Parallax - Optimized
    // ========================================

    const heroContent = document.querySelector('.hero-content');
    const heroLines = document.querySelectorAll('.hero-bg-decoration .line');

    if (heroContent) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const heroHeight = window.innerHeight;

                    if (scrolled < heroHeight) {
                        const parallaxFactor = scrolled / heroHeight;
                        const easedFactor = 1 - Math.pow(parallaxFactor, 1.5);

                        heroContent.style.transform = `translateY(${scrolled * 0.35}px)`;
                        heroContent.style.opacity = Math.max(0, easedFactor);

                        heroLines.forEach((line, index) => {
                            const speed = 0.08 + (index * 0.04);
                            line.style.transform = `translateY(${scrolled * speed}px)`;
                        });
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ========================================
    // 3D Tilt Effect - Service Cards
    // ========================================

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // Portfolio Hover Effect
    // ========================================

    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            portfolioItems.forEach(other => {
                if (other !== item) {
                    other.style.opacity = '0.4';
                    other.style.transform = 'scale(0.97)';
                }
            });
        });

        item.addEventListener('mouseleave', function() {
            portfolioItems.forEach(other => {
                other.style.opacity = '1';
                other.style.transform = 'scale(1)';
            });
        });
    });

    // ========================================
    // Button Ripple Effect
    // ========================================

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-instagram');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(212, 196, 168, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 700);
        });
    });

    // Add ripple keyframes
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ========================================
    // Magnetic Buttons
    // ========================================

    const magneticButtons = document.querySelectorAll('.btn-primary');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // ========================================
    // Logo Click
    // ========================================

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // Footer Animation
    // ========================================

    const footerBrand = document.querySelector('.footer-brand');
    const footerColumns = document.querySelectorAll('.footer-column');
    const footerBottom = document.querySelector('.footer-bottom');
    const footerContactBoxes = document.querySelectorAll('.footer-contact-box');

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    if (footerBrand) footerObserver.observe(footerBrand);
    footerColumns.forEach(col => footerObserver.observe(col));
    if (footerBottom) footerObserver.observe(footerBottom);
    footerContactBoxes.forEach((box, index) => {
        setTimeout(() => {
            footerObserver.observe(box);
        }, index * 100);
    });

    // ========================================
    // Performance - Throttle
    // ========================================

    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    const optimizedScrollHandler = throttle(() => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 80);
        }
    }, 100);

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // ========================================
    // Console Branding
    // ========================================

    console.log('%c MP43 Studios ', 'background: #0d0d0f; color: #d4c4a8; font-size: 24px; padding: 12px 24px; letter-spacing: 3px;');
    console.log('%c Creative Video Production ', 'color: #888; font-size: 11px; letter-spacing: 1px;');

});

// ========================================
// Page Load
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// Dynamic Styles
// ========================================

const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    .service-card, .portfolio-item, .about-content-simple .about-text,
    .contact-item-simple, .section-header,
    .portfolio-cta, .quote-content, .footer-brand, .footer-column,
    .footer-bottom, .footer-contact-box {
        will-change: opacity, transform;
    }
`;
document.head.appendChild(fadeStyle);
