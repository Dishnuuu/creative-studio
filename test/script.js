document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Fade in sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const beams = document.querySelectorAll('.light-beam');
        
        beams.forEach((beam, index) => {
            const speed = 0.05 + (index * 0.02);
            beam.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });

    // Console branding
    console.log('%c MP43 Studios ', 'background: #0a0a0c; color: #c9b99f; font-size: 18px; padding: 10px 20px; letter-spacing: 2px;');
});
