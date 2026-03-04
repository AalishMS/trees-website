class Router {
    constructor() {
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.handleHashChange();
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const hash = link.getAttribute('href');
                window.location.hash = hash.substring(1);
            });
        });
    }

    handleHashChange() {
        const hash = window.location.hash.substring(1) || 'home';
        this.navigate(hash);
    }

    navigate(pageId) {
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-page') === pageId);
        });
        
        this.pages.forEach(page => {
            const isActive = page.id === pageId;
            page.classList.toggle('active', isActive);
            
            if (isActive) {
                this.animatePageIn(page);
                this.triggerPageAnimations(pageId);
            }
        });
    }

    animatePageIn(page) {
        page.style.animation = 'none';
        page.offsetHeight;
        page.style.animation = 'fadeIn 0.5s ease';
    }

    triggerPageAnimations(pageId) {
        if (pageId === 'about') {
            this.animateCounters();
        }
        
        if (pageId === 'gallery') {
            this.animateGallery();
        }
        
        if (pageId === 'explore') {
            this.animateCards();
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
    }

    animateGallery() {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateCards() {
        const cards = document.querySelectorAll('.tree-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    }
}
