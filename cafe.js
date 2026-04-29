document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Fade-up animations
    const fadeElements = document.querySelectorAll('.fade-up');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));

    // 2. Parallax Scroll Effect
    // Using simple requestAnimationFrame for buttery smooth parallax
    const parallaxElements = document.querySelectorAll('.parallax-element');
    let ticking = false;

    function applyParallax() {
        const scrolled = window.scrollY;
        
        // Disable pure parallax on very small screens to avoid weird overlapping
        if (window.innerWidth > 768) {
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed'));
                // Limit the scope so it's not moving wildly
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        } else {
            parallaxElements.forEach(el => el.style.transform = "none");
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(applyParallax);
            ticking = true;
        }
    });
    
    // Initial call
    applyParallax();
});
