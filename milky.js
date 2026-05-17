document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'milky-canvas';
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
    
    const particles = [];
    const numParticles = 400; // Optimized galaxy density
    const colors = ['#0891b2', '#8b5cf6', '#a855f7', '#e0e7ff', '#2dd4bf', '#3b82f6'];

    for(let i=0; i<numParticles; i++) {
        const radius = Math.random() * (Math.min(width, height) * 0.9);
        const angle = Math.random() * Math.PI * 2;
        const spiralAngle = angle + (radius * 0.008); // Tighter spiral
        
        particles.push({
            r: radius,
            angle: spiralAngle,
            size: Math.random() * 2.5 + 0.5,
            speed: (Math.random() * 0.001) + 0.0003,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.8 + 0.1
        });
    }

    const stars = [];
    for(let i=0; i<150; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random()
        });
    }

    // A subtle nebula background layer
    const nebulas = Array.from({length: 4}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 300 + 200,
        c: ['rgba(139, 92, 246, 0.05)', 'rgba(6, 182, 212, 0.05)', 'rgba(56, 189, 248, 0.05)'][Math.floor(Math.random()*3)]
    }));

    // Pre-create the background gradient
    let bgGrad;
    function updateBgGrad() {
        bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#020617');
        bgGrad.addColorStop(1, '#09090b');
    }
    updateBgGrad();
    window.addEventListener('resize', updateBgGrad);

    // Pre-create core glow
    let coreGlowCanvas = document.createElement('canvas');
    function updateCoreGlow() {
        const r = Math.min(width, height) * 0.35;
        coreGlowCanvas.width = r * 2;
        coreGlowCanvas.height = r * 2;
        const cCtx = coreGlowCanvas.getContext('2d');
        const radGrad = cCtx.createRadialGradient(r, r, 0, r, r, r);
        radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        radGrad.addColorStop(0.1, 'rgba(139, 92, 246, 0.4)');
        radGrad.addColorStop(0.4, 'rgba(6, 182, 212, 0.15)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        cCtx.fillStyle = radGrad;
        cCtx.arc(r, r, r, 0, Math.PI * 2);
        cCtx.fill();
    }
    updateCoreGlow();
    window.addEventListener('resize', updateCoreGlow);

    function draw() {
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.globalCompositeOperation = 'screen';
        
        // Draw nebulas (simplified)
        nebulas.forEach(neb => {
            ctx.fillStyle = neb.c;
            ctx.beginPath();
            ctx.arc(neb.x, neb.y, neb.r, 0, Math.PI*2);
            ctx.fill();
            neb.x += 0.2;
            if(neb.x > width + neb.r) neb.x = -neb.r;
        });

        // Draw stars
        stars.forEach(star => {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            star.opacity += (Math.random() - 0.5) * 0.05;
            if(star.opacity < 0.1) star.opacity = 0.1;
            if(star.opacity > 1) star.opacity = 1;
        });

        // Draw galaxy
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.globalCompositeOperation = 'lighter';
        
        // Draw cached core glow
        const r = Math.min(width, height) * 0.35;
        ctx.drawImage(coreGlowCanvas, -r, -r);

        // Rotate whole galaxy very slowly
        ctx.rotate(Date.now() * 0.00005);

        particles.forEach(p => {
            p.angle += p.speed;
            if(p.r < 80) p.angle += p.speed * 2;

            const px = Math.cos(p.angle) * p.r;
            const py = Math.sin(p.angle) * p.r;

            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity * (1 - p.r / (Math.min(width, height) * 0.9)); 
            
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
    }

    function loop() {
        draw();
        requestAnimationFrame(loop);
    }
    
    loop();
});
