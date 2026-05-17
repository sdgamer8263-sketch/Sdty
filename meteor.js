document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'meteor-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '1';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    
    let width, height;
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();
    
    // Background stars
    const stars = [];
    const numStars = 300;
    for(let i=0; i<numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.2,
            opacity: Math.random(),
            color: Math.random() > 0.5 ? '#93c5fd' : '#ffffff'
        });
    }

    const meteors = [];
    
    function createMeteor() {
        return {
            x: Math.random() * width * 1.5,
            y: -100,
            length: Math.random() * 150 + 50,
            speed: Math.random() * 15 + 20,
            thickness: Math.random() * 2 + 1.5,
            opacity: 1,
            active: true
        };
    }

    function draw() {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#020617');
        bgGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
        
        // Draw stars
        stars.forEach(star => {
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            star.opacity += (Math.random() - 0.5) * 0.05;
            if(star.opacity < 0.1) star.opacity = 0.1;
            if(star.opacity > 1) star.opacity = 1;
        });
        ctx.globalAlpha = 1;

        // Add occasional new meteor
        if (Math.random() < 0.08) {
            meteors.push(createMeteor());
        }

        // Draw and update meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
            let m = meteors[i];
            if (!m.active) {
                meteors.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#22d3ee';
            
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - m.length, m.y + m.length);
            
            const gradient = ctx.createLinearGradient(m.x, m.y, m.x - m.length, m.y + m.length);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
            gradient.addColorStop(0.1, `rgba(34, 211, 238, ${m.opacity})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = m.thickness;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.restore();

            m.x -= m.speed;
            m.y += m.speed;
            m.opacity -= 0.015;

            if (m.opacity <= 0 || m.y > height + 100 || m.x < -100) {
                m.active = false;
            }
        }
    }

    function loop() {
        draw();
        requestAnimationFrame(loop);
    }
    
    loop();
});
