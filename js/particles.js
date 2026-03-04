class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.leaves = [];
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createParticles();
        this.createLeaves();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const count = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: `rgba(52, 199, 89, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }

    createLeaves() {
        for (let i = 0; i < 15; i++) {
            this.leaves.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 20 + 10,
                speedX: Math.random() * 1 + 0.5,
                speedY: Math.random() * 0.5 + 0.2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 2,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    drawParticle(p) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
    }

    drawLeaf(leaf) {
        this.ctx.save();
        this.ctx.translate(leaf.x, leaf.y);
        this.ctx.rotate((leaf.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = leaf.opacity;
        
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, leaf.size, leaf.size / 2, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = '#34C759';
        this.ctx.fill();
        
        this.ctx.restore();
    }

    updateParticle(p) {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;
        if (p.y < 0) p.y = this.canvas.height;
        if (p.y > this.canvas.height) p.y = 0;
    }

    updateLeaf(leaf) {
        leaf.x += leaf.speedX;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotationSpeed;
        
        if (leaf.x > this.canvas.width + 50) {
            leaf.x = -50;
            leaf.y = Math.random() * this.canvas.height;
        }
        if (leaf.y > this.canvas.height + 50) {
            leaf.y = -50;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
        );
        gradient.addColorStop(0, 'rgba(52, 199, 89, 0.1)');
        gradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            this.updateParticle(p);
            this.drawParticle(p);
        });
        
        this.leaves.forEach(leaf => {
            this.updateLeaf(leaf);
            this.drawLeaf(leaf);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
