/* ============================================
   AMINATA — 22 ANS DE LUMIÈRE
   JavaScript principal — interactions & animations
   ============================================ */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURATION — MODIFIER CES VALEURS ICI
    // ==========================================
    const CONFIG = {
        // Ton prénom (pour la signature et le footer)
        tonPrenom: '[Ton prénom]', // REMPLACER

        // Texte machine à écrire dans le hero
        heroTypewriterText: 'Joyeux Anniversaire, mon amour',

        // Nombre de cœurs flottants en background
        floatingHeartsCount: 12,

        // Délai avant disparition du loader (ms)
        loaderDelay: 2500,

        // Seuil pour l'apparition de la nav (px scrollés)
        navShowThreshold: 100,

        // Seuil Intersection Observer
        observerThreshold: 0.12,

        // Couleurs des confettis
        confettiColors: ['#8B6F9E', '#7BA87B', '#E07A6E', '#5A8FB8', '#D48A92', '#C9B8D8', '#F0B0A8'],
    };

    // ==========================================
    // UTILITAIRES
    // ==========================================
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    function throttle(fn, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ==========================================
    // LOADER
    // ==========================================
    async function initLoader() {
        const loader = $('#loader');
        if (!loader) return;

        await wait(CONFIG.loaderDelay);
        loader.classList.add('hidden');
        await wait(1000);
        loader.style.display = 'none';

        initHeroAnimations();
    }

    // ==========================================
    // NAVIGATION
    // ==========================================
    function initNavigation() {
        const nav = $('#mainNav');
        const toggle = $('#navToggle');
        const links = $('#navLinks');
        const navAnchors = $$('.nav-links a');

        if (!nav) return;

        let lastScroll = 0;
        window.addEventListener('scroll', throttle(() => {
            const currentScroll = window.scrollY;

            if (currentScroll > CONFIG.navShowThreshold) {
                nav.classList.add('visible');
            } else {
                nav.classList.remove('visible');
            }

            lastScroll = currentScroll;
        }, 100));

        // Menu mobile
        if (toggle && links) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                links.classList.toggle('active');
            });

            navAnchors.forEach(a => {
                a.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    links.classList.remove('active');
                });
            });
        }

        // Active link highlighting
        const sections = $$('section[id]');
        window.addEventListener('scroll', throttle(() => {
            const scrollPos = window.scrollY + 150;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    navAnchors.forEach(a => {
                        a.classList.remove('active');
                        if (a.getAttribute('href') === `#${id}`) {
                            a.classList.add('active');
                        }
                    });
                }
            });
        }, 100));
    }

    // ==========================================
    // HERO ANIMATIONS
    // ==========================================
    function initHeroAnimations() {
        const typewriterEl = $('#heroTypewriter');
        if (typewriterEl) {
            typeWriter(typewriterEl, CONFIG.heroTypewriterText, 80);
        }

        $$('.fade-in-up').forEach((el, i) => {
            const delay = parseInt(el.dataset.delay) || 0;
            setTimeout(() => {
                el.classList.add('visible');
            }, delay);
        });

        initHeroParticles();
    }

    function typeWriter(element, text, speed = 80) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed + (Math.random() * 40 - 20));
            }
        }

        type();
    }

    function initHeroParticles() {
        const container = $('#heroParticles');
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            const size = Math.random() * 8 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${15 + Math.random() * 15}s`;
            container.appendChild(particle);
        }
    }

    // ==========================================
    // MACHINE À ÉCRIRE — SECTIONS
    // ==========================================
    function initTypewriterSections() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.typed) {
                    entry.target.dataset.typed = 'true';
                    const text = entry.target.dataset.text;
                    if (text) {
                        typeWriter(entry.target, text, 50);
                    }
                }
            });
        }, { threshold: 0.5 });

        $$('.typewriter-trigger, .typewriter-paragraph, .typewriter-lettre').forEach(el => {
            observer.observe(el);
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: CONFIG.observerThreshold,
            rootMargin: '0px 0px -50px 0px'
        });

        $$('.timeline-item').forEach(item => observer.observe(item));

        $$('.raison-card').forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.05}s`;
            observer.observe(card);
        });

        $$('.gallery-item').forEach((item, i) => {
            item.style.transitionDelay = `${i * 0.05}s`;
            observer.observe(item);
        });

        $$('.video-card').forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.1}s`;
            observer.observe(card);
        });

        // Lettre paper — visible directement (pas d'enveloppe)
        const lettrePaper = $('#lettrePaper');
        if (lettrePaper) {
            setTimeout(() => {
                lettrePaper.classList.add('visible');
            }, 500);
        }
    }

    // ==========================================
    // PARALLAX LÉGER
    // ==========================================
    function initParallax() {
        const parallaxElements = $$('[data-parallax]');

        window.addEventListener('scroll', throttle(() => {
            const scrollY = window.scrollY;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.3;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, 16));
    }

    // ==========================================
    // CŒURS FLOTTANTS
    // ==========================================
    function initFloatingHearts() {
        const container = $('#floating-hearts-container');
        if (!container) return;

        const hearts = ['💜', '💗', '🤍', '💕', '💖'];
        const colors = ['#8B6F9E', '#D48A92', '#E07A6E', '#5A8FB8', '#7BA87B'];

        for (let i = 0; i < CONFIG.floatingHeartsCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 15}s`;
            heart.style.animationDuration = `${12 + Math.random() * 10}s`;
            heart.style.fontSize = `${0.8 + Math.random() * 0.8}rem`;
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(heart);
        }
    }

    // ==========================================
    // CONFETTIS
    // ==========================================
    function createConfetti(x, y, count = 30) {
        const container = $('#confetti-container');
        if (!container) return;

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            const color = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
            const size = Math.random() * 8 + 4;
            const left = x !== undefined ? x : Math.random() * window.innerWidth;
            const startY = y !== undefined ? y : -10;

            confetti.style.cssText = `
                left: ${left}px;
                top: ${startY}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                animation-duration: ${2 + Math.random() * 2}s;
                animation-delay: ${Math.random() * 0.5}s;
                transform: rotate(${Math.random() * 360}deg);
            `;

            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    function initAutoConfetti() {
        setTimeout(() => {
            createConfetti(undefined, undefined, 50);
        }, CONFIG.loaderDelay + 1000);
    }

    // ==========================================
    // GALERIE LIGHTBOX
    // ==========================================
    function initGallery() {
        const lightbox = $('#lightbox');
        const lightboxImg = $('#lightboxImg');
        const lightboxCaption = $('#lightboxCaption');
        const items = $$('.gallery-item');
        let currentIndex = 0;

        if (!lightbox || !lightboxImg) return;

        function openLightbox(index) {
            const item = items[index];
            if (!item) return;

            const src = item.dataset.src;
            const caption = item.dataset.caption;

            if (!src || src.includes('placeholder')) {
                lightboxImg.src = '';
                lightboxImg.style.display = 'none';
                lightboxCaption.innerHTML = `<div style="text-align:center;padding:3rem;color:white;font-family:serif;font-size:1.2rem;">${caption || 'Photo à ajouter'}<br><small style="opacity:0.7;font-family:sans-serif;font-size:0.8rem;">Remplace le placeholder par une vraie photo</small></div>`;
            } else {
                lightboxImg.style.display = 'block';
                lightboxImg.src = src;
                lightboxCaption.textContent = caption || '';
            }

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            currentIndex = index;
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % items.length;
            openLightbox(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            openLightbox(currentIndex);
        }

        items.forEach((item, i) => {
            item.addEventListener('click', () => openLightbox(i));
        });

        $('.lightbox-close', lightbox)?.addEventListener('click', closeLightbox);
        $('.lightbox-next', lightbox)?.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
        $('.lightbox-prev', lightbox)?.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

    // ==========================================
    // BOUTON "AUGMENTER L'AMOUR"
    // ==========================================
    function initLoveButton() {
        const btn = $('#btnLove');
        const countEl = $('#loveCount');
        const heart = $('#loveHeart');

        if (!btn || !countEl) return;

        let count = parseInt(localStorage.getItem('aminataLoveCount')) || 0;
        countEl.textContent = count;

        btn.addEventListener('click', async () => {
            count++;
            countEl.textContent = count;
            localStorage.setItem('aminataLoveCount', count);

            countEl.style.transform = 'scale(1.5)';
            countEl.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            setTimeout(() => {
                countEl.style.transform = 'scale(1)';
            }, 300);

            if (heart) {
                heart.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    heart.style.transform = '';
                }, 300);
            }

            const rect = btn.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top, 20);
            createFloatingLoveParticles(rect.left + rect.width / 2, rect.top);
        });

        if (heart) {
            heart.addEventListener('click', () => btn.click());
        }
    }

    function createFloatingLoveParticles(x, y) {
        const container = document.body;

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.textContent = '💜';

            const angle = (Math.PI * 2 * i) / 8;
            const distance = 60 + Math.random() * 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 80;

            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 10000;
                animation: loveParticle 1.5s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;

            const style = document.createElement('style');
            style.textContent = `
                @keyframes loveParticle {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: translate(${tx}px, ${ty}px) scale(0.3); opacity: 0; }
                }
            `;
            document.head.appendChild(style);

            container.appendChild(particle);
            setTimeout(() => {
                particle.remove();
                style.remove();
            }, 2000);
        }
    }

    // ==========================================
    // VERSET CORANIQUE — AUDIO ARABE UNIQUEMENT
    // ==========================================
    function initQuranAudio() {
        // Récitateurs Arabe uniquement
        const reciterBtns = $$('.reciter-btn');
        const audio = $('#quranAudio');

        reciterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const src = btn.dataset.src;

                reciterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (audio && src) {
                    audio.src = src;
                    audio.load();
                    audio.play().catch(() => {
                        // Autoplay bloqué
                    });
                }
            });
        });
    }

    // ==========================================
    // FORMULAIRE SOUVENIRS
    // ==========================================
    function initSouvenirsForm() {
        const form = $('#souvenirsForm');
        const fileInput = $('#eventMedia');
        const fileList = $('#fileList');

        if (!form) return;

        if (fileInput && fileList) {
            fileInput.addEventListener('change', () => {
                fileList.innerHTML = '';
                Array.from(fileInput.files).forEach(file => {
                    const tag = document.createElement('div');
                    tag.className = 'file-tag';
                    tag.innerHTML = `
                        <span>${file.name}</span>
                        <button type="button" onclick="this.parentElement.remove()">&times;</button>
                    `;
                    fileList.appendChild(tag);
                });
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Souvenir envoyé avec amour 💜</span>';
            btn.disabled = true;

            createConfetti(undefined, undefined, 40);

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                form.reset();
                if (fileList) fileList.innerHTML = '';
            }, 3000);

            console.log('Souvenir à envoyer :', data);
        });
    }

    // ==========================================
    // TÉLÉCHARGEMENT LETTRE PDF
    // ==========================================
    function initLetterDownload() {
        const btn = $('#downloadLetter');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const lettre = $('#lettrePaper');
            if (lettre) {
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Lettre pour Aminata</title>
                        <style>
                            body { font-family: Georgia, serif; max-width: 600px; margin: 40px auto; line-height: 1.8; color: #2D2D2D; }
                            h2 { font-family: Georgia, serif; color: #6B4F7E; text-align: center; }
                            .date { text-align: center; color: #8A8A8A; font-size: 0.9rem; margin-bottom: 2rem; }
                            p { margin-bottom: 1.5rem; font-size: 1.1rem; }
                            .signature { text-align: right; margin-top: 3rem; font-style: italic; color: #6B4F7E; }
                        </style>
                    </head>
                    <body>
                        <div class="date">Aujourd'hui et chaque jour</div>
                        <h2>Ma Sirah,</h2>
                        ${Array.from($$('.lettre-body p')).map(p => `<p>${p.textContent}</p>`).join('')}
                        <div class="signature">
                            <p>Ton forever,</p>
                            <p style="font-weight:bold;">${CONFIG.tonPrenom}</p>
                        </div>
                    </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 500);
            }
        });
    }

    // ==========================================
    // ANALYTICS — VERCEL
    // ==========================================
    function initAnalytics() {
        $('#btnLove')?.addEventListener('click', () => {
            if (window.va) {
                window.va('event', { name: 'love_click' });
            }
        });

        $$('audio').forEach(audio => {
            audio.addEventListener('play', () => {
                if (window.va) {
                    window.va('event', { name: 'quran_play' });
                }
            });
        });
    }

    // ==========================================
    // REMPLACEMENT AUTOMATIQUE DU PRÉNOM
    // ==========================================
    function replacePlaceholderName() {
        if (CONFIG.tonPrenom && CONFIG.tonPrenom !== '[Ton prénom]') {
            document.body.innerHTML = document.body.innerHTML.replace(/\[Ton prénom\]/g, CONFIG.tonPrenom);
        }
    }

    // ==========================================
    // TOUCH / SWIPE SUPPORT (mobile)
    // ==========================================
    function initTouchSupport() {
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const lightbox = $('#lightbox');
            if (!lightbox || !lightbox.classList.contains('active')) return;

            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe up — next
                    $('.lightbox-next', lightbox)?.click();
                } else {
                    // Swipe down — prev
                    $('.lightbox-prev', lightbox)?.click();
                }
            }
        }
    }

    // ==========================================
    // INITIALISATION GLOBALE
    // ==========================================
    function init() {
        replacePlaceholderName();
        initLoader();
        initNavigation();
        initFloatingHearts();
        initAutoConfetti();
        initTypewriterSections();
        initScrollAnimations();
        initParallax();
        initGallery();
        initLoveButton();
        initQuranAudio();
        initSouvenirsForm();
        initLetterDownload();
        initAnalytics();
        initTouchSupport();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
