document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    const toggleMenu = () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    mobileBtn.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Animate on scroll using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger animation
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(6, 8, 11, 0.85)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'rgba(6, 8, 11, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Make elements above the fold visible immediately with staggering
    setTimeout(() => {
        const visibleAboveFold = document.querySelectorAll('.hero .fade-in-up');
        visibleAboveFold.forEach(el => {
            el.classList.add('visible');
            observer.unobserve(el);
        });
    }, 100);
});
