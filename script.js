// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('#nav-links a');

function setActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ===== Typing effect for hero heading =====
const typingTarget = document.getElementById('typing-target');
const phrases = [
    'Airline Planning IT systems',
    'Cloud-Native Architectures',
    'Automated DevOps Platforms',
    'AI-Enabled Workflows'
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    if (!typingTarget) return;

    const current = phrases[phraseIndex];

    if (!deleting) {
        charIndex++;
        typingTarget.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1600);
            return;
        }
    } else {
        charIndex--;
        typingTarget.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(typeLoop, deleting ? 40 : 80);
}

typeLoop();

// ===== Scroll reveal animations =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== Animated stat counters =====
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 40));

        const tick = () => {
            count += step;
            if (count >= target) {
                el.textContent = `${target}+`;
            } else {
                el.textContent = count;
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.4 });

counters.forEach(el => counterObserver.observe(el));

// ===== Back to top button =====
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Cursor-follow background glow (desktop only) =====
const glow = document.querySelector('.background-glow');

if (glow && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        glow.style.setProperty('--x', `${x}%`);
        glow.style.setProperty('--y', `${y}%`);
    });
}

// ===== Header shrink on scroll =====
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
});
