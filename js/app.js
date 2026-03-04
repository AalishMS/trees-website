class App {
    constructor() {
        this.router = new Router();
        this.lightbox = document.getElementById('lightbox');
        this.pages = ['home', 'explore', 'gallery', 'about', 'contact'];
        this.currentPageIndex = 0;
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initGallery();
        this.initContactForm();
        this.initRevealOnScroll();
        this.initExploreFilters();
        this.initTreeCardClicks();
        this.initScrollNavigation();
    }

    initScrollNavigation() {
        const scrollIndicator = document.getElementById('scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                this.scrollToNextPage();
            });
        }

        window.addEventListener('wheel', (e) => {
            if (this.isScrolling) return;
            
            if (e.deltaY > 0) {
                this.scrollToNextPage();
            } else if (e.deltaY < 0) {
                this.scrollToPrevPage();
            }
        }, { passive: true });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.scrollToNextPage();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.scrollToPrevPage();
            }
        });

        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1) || 'home';
            this.currentPageIndex = this.pages.indexOf(hash);
        });
    }

    scrollToNextPage() {
        if (this.currentPageIndex < this.pages.length - 1) {
            this.isScrolling = true;
            this.currentPageIndex++;
            const pageId = this.pages[this.currentPageIndex];
            document.getElementById(pageId).scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => this.isScrolling = false, 1000);
        }
    }

    scrollToPrevPage() {
        if (this.currentPageIndex > 0) {
            this.isScrolling = true;
            this.currentPageIndex--;
            const pageId = this.pages[this.currentPageIndex];
            document.getElementById(pageId).scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => this.isScrolling = false, 1000);
        }
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

    initExploreFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const treeCards = document.querySelectorAll('.tree-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                treeCards.forEach(card => {
                    const type = card.getAttribute('data-type');
                    if (filter === 'all' || type === filter) {
                        card.classList.remove('hidden');
                        card.style.animation = 'none';
                        card.offsetHeight;
                        card.style.animation = 'cardReveal 0.5s ease forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    initTreeCardClicks() {
        const treeCards = document.querySelectorAll('.tree-card');

        treeCards.forEach(card => {
            card.addEventListener('click', () => {
                const imageSrc = card.getAttribute('data-image');
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                const location = card.querySelector('.card-location').textContent;
                
                this.showTreeDetail(title, description, location, imageSrc);
            });
        });
    }

    showTreeDetail(title, description, location, imageSrc) {
        let modal = document.getElementById('tree-modal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'tree-modal';
            modal.className = 'lightbox';
            modal.innerHTML = `
                <span class="lightbox-close" id="modal-close">&times;</span>
                <div class="tree-detail-content">
                    <div class="tree-detail-image">
                        <img src="" alt="${title}">
                    </div>
                    <div class="tree-detail-info">
                        <h2></h2>
                        <p class="tree-detail-desc"></p>
                        <span class="tree-detail-location"></span>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('lightbox-close')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        const modalImg = modal.querySelector('.tree-detail-image img');
        const modalTitle = modal.querySelector('.tree-detail-info h2');
        const modalDesc = modal.querySelector('.tree-detail-desc');
        const modalLocation = modal.querySelector('.tree-detail-location');

        modalImg.src = imageSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = description;
        modalLocation.textContent = location;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
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
