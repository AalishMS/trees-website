class App {
    constructor() {
        this.router = new Router();
        this.lightbox = document.getElementById('lightbox');
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initGallery();
        this.initContactForm();
        this.initRevealOnScroll();
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.tree-card, .gallery-item, .stat-card, .about-text').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                this.openLightbox(src);
            });
        });

        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox || e.target.classList.contains('lightbox-close')) {
                    this.closeLightbox();
                }
            });
        }
    }

    openLightbox(src) {
        const img = this.lightbox.querySelector('img');
        img.src = src;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.querySelector('span').textContent;
            
            btn.querySelector('span').textContent = 'Sent!';
            btn.style.background = 'linear-gradient(135deg, #30D158, #34C759)';
            
            setTimeout(() => {
                btn.querySelector('span').textContent = originalText;
                btn.style.background = '';
                form.reset();
            }, 2000);
        });
    }

    initRevealOnScroll() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                hero.style.opacity = 1 - scrolled / 700;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
