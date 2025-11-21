// Health Hack 2026 - JavaScript

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Change navbar background on scroll
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(0, 27, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 27, 255, 0.15)';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    lastScroll = currentScroll;
});

// ========================================
// UPDATE ACTIVE NAVIGATION LINK
// ========================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
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

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// COMMITTEE TABS FUNCTIONALITY
// ========================================

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to selected tab
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ========================================
// TRACK FILTER FUNCTIONALITY
// ========================================

const filterChips = document.querySelectorAll('.chip');
const trackCards = document.querySelectorAll('.track-card');

filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const filter = chip.getAttribute('data-filter');
        
        // Update active chip
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        // Filter track cards
        trackCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const category = card.getAttribute('data-category');
                card.style.display = category === filter ? 'block' : 'none';
            }
        });
    });
});

// ========================================
// TRACK SEARCH FUNCTIONALITY
// ========================================

const trackSearch = document.getElementById('trackSearch');

if (trackSearch) {
    trackSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        trackCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Smooth stagger animation fix for track cards
function applyTrackStagger() {
    const cards = document.querySelectorAll(".track-card:not(.hidden)");
    cards.forEach((card, i) => {
        card.style.setProperty("--delay", `${i * 0.06}s`);
        card.style.animation = "none";
        void card.offsetWidth; // Restart animation
        card.style.animation = "";
    });
}

applyTrackStagger();

// Re-run animation after filtering
document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
        setTimeout(applyTrackStagger, 50);
    });
});


// ========================================
// ACCORDION FUNCTIONALITY
// ========================================

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all accordion items in the same accordion
        const accordion = item.parentElement;
        accordion.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========================================
// CONTACT FORM SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check honeypot (anti-spam)
        if (contactForm.honeypot.value) {
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send data to your backend
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        /* 
        // Example: Send to backend API
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Thank you for your message!');
                contactForm.reset();
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
        */
    });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ========================================
// SEARCH FUNCTIONALITY FOR COMMITTEES
// ========================================

// Advisory Committee Search
const advisorySearch = document.getElementById('advisorySearch');

if (advisorySearch) {
    advisorySearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('#advisoryGrid .small-committee-card');
        
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const title = card.querySelector('.committee-title').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Faculty Coordinators Search
const facultySearch = document.getElementById('facultySearch');

if (facultySearch) {
    facultySearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('#facultyGrid .small-committee-card');
        
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            
            if (name.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(0, 27, 255, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.backdropFilter = 'blur(12px)';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                navLinks.style.display = 'none';
            }
        });
    });
}

// ========================================
// GALLERY LIGHTBOX (Basic Implementation)
// ========================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Placeholder for lightbox functionality
        // You can implement a full lightbox modal here
        console.log('Gallery item clicked');
        
        /* 
        // Example: Simple lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${item.dataset.src}" alt="${item.dataset.alt}">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            lightbox.remove();
        });
        */
    });
});

// ========================================
// TIMELINE ANIMATION ON SCROLL
// ========================================

const timelineDots = document.querySelectorAll('.timeline-dot');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });
}, { threshold: 0.5 });

timelineDots.forEach(dot => timelineObserver.observe(dot));

// ========================================
// LAZY LOAD ANIMATIONS FOR CARDS
// ========================================

const cards = document.querySelectorAll('.glass-card, .track-card, .large-committee-card');

cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ========================================
// PREFERS-REDUCED-MOTION CHECK
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable all animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function to limit how often a function can fire
 * Useful for scroll and resize events
 */
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Throttle function to ensure a function is called at most once in a specified period
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ========================================

// Improve keyboard navigation for interactive elements
document.querySelectorAll('.track-card, .committee-card, .news-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// ========================================
// INITIALIZE ON DOM LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Health Hack 2026 website loaded successfully!');
    
    // Set initial active nav link
    updateActiveNavLink();
    
    // Add any additional initialization code here
});

// ========================================
// WINDOW RESIZE HANDLER
// ========================================

window.addEventListener('resize', debounce(() => {
    // Reset mobile menu on desktop
    if (window.innerWidth > 1024) {
        navLinks.style.display = '';
        navLinks.style.position = '';
        navLinks.style.flexDirection = '';
        navLinks.style.background = '';
        navLinks.style.padding = '';
    }
}));

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Use passive event listeners for better scroll performance
document.addEventListener('scroll', updateActiveNavLink, { passive: true });

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You can add custom error handling here
    // For example, send errors to an analytics service
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║       HEALTH HACK 2026                    ║
║       Improving Health Access for All     ║
║                                           ║
║       VIT Bhopal × Johns Hopkins          ║
║       Designed by Team HEALTH HACK        ║
║                                           ║
╚═══════════════════════════════════════════╝
`);

// ========================================
// EXPORT FOR TESTING (if needed)
// ========================================

// If you're using a module bundler, you can export functions
// export { updateActiveNavLink, debounce, throttle };