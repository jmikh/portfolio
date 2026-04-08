/**
 * Portfolio — Page-level Interactions
 */

// Scroll-triggered fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animation for siblings
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: just show everything
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // Initialize the photo widget
    if (typeof initPhotoWidget === 'function') {
        initPhotoWidget('photoWidget');
    }
});

