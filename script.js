// script.js - all interactive features for PowerFit Pro

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('progressBar');
        if (progressBar) progressBar.style.width = scrolled + '%';
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // Dropdown Toggle for Mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Search Toggle
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    if (searchToggle && searchOverlay && closeSearch) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            document.getElementById('searchInput')?.focus();
        });

        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    let isDark = true;
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (isDark) {
                document.body.style.background = '#fff';
                document.body.style.color = '#333';
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                isDark = false;
            } else {
                document.body.style.background = '#0a0a0a';
                document.body.style.color = '#fff';
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                isDark = true;
            }
        });
    }

    // Back to Top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Counter Animation
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    const observerOptions = { threshold: 0.5 };
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        if (!isNaN(target)) animateCounter(counter, target);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        observer.observe(statsSection);
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Initialize Swiper
    if (typeof Swiper !== 'undefined') {
        const heroSwiper = new Swiper('.hero-slider', {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
        });

        const trainersSwiper = new Swiper('.trainers-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ff4d4d' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#ff4d4d', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Search Functionality
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (searchForm && searchInput && searchResults) {
        const searchData = [
            { name: 'Yoga Classes', url: 'schedule.html' },
            { name: 'HIIT Workout', url: 'schedule.html' },
            { name: 'CrossFit Training', url: 'schedule.html' },
            { name: 'John Anderson - Trainer', url: 'index.html' },
            { name: 'Sarah Williams - Trainer', url: 'index.html' },
            { name: 'Basic Membership', url: 'membership.html' },
            { name: 'Premium Membership', url: 'membership.html' },
            { name: 'BMI Calculator', url: 'bmi-calculator.html' },
            { name: 'Nutrition Plans', url: 'nutrition-plans.html' },
            { name: 'Workout Plans', url: 'index.html' },
        ];

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '<p>Please enter at least 2 characters</p>';
                return;
            }
            const results = searchData.filter(item => item.name.toLowerCase().includes(query));
            if (results.length > 0) {
                let html = '<h3>Search Results:</h3>';
                results.forEach(result => {
                    html += `<a href="${result.url}" class="search-result-item">${result.name}</a>`;
                });
                searchResults.innerHTML = html;
            } else {
                searchResults.innerHTML = '<p>No results found</p>';
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}!`);
            newsletterForm.reset();
        });
    }

    // Cart Count (simulated)
    let cartCount = 0;
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        setTimeout(() => {
            cartCount = 3;
            cartCountElement.textContent = cartCount;
        }, 2000);
    }
});