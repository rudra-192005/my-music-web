// ===== SONIX — REACTIVE PARTICLE — REACTIVE BACKGROUND EFFECTS
// Author: Custom SONIX Engine
// Description: Futuristic reactive particles for neon music player

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let width, height;

function init() {
    resize();
    createParticles();
    animate();
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        // Use neon colors from SONIX theme
        this.color = Math.random() > 0.5 ? '#00f0ff' : '#8b5cf6';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
}

function createParticles() {
    // Adjust particle count based on screen size
    const count = Math.floor((width * height) / 10000);
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for music reaction if needed
window.updateParticles = (intensity) => {
    particles.forEach(p => {
        p.speedX *= (1 + intensity * 0.1);
        p.speedY *= (1 + intensity * 0.1);
    });
};
