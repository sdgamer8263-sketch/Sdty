// Snow falling animation script
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '100';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Create particles
    const particleCount = Math.floor(window.innerWidth / 10); // responsive count
    for(let i=0; i<particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 1, // radius
            speedY: Math.random() * 1 + 0.5,
            speedX: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    let angle = 0;
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        for(let i=0; i<particleCount; i++) {
            let p = particles[i];
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            ctx.fill();
        }
    }
    
    function update() {
        angle += 0.01;
        for(let i=0; i<particleCount; i++) {
            let p = particles[i];
            p.y += p.speedY;
            p.x += Math.sin(angle) * 0.5 + p.speedX;
            
            if(p.y > height) {
                p.y = -10;
                p.x = Math.random() * width;
            }
        }
    }
    
    function loop() {
        draw();
        update();
        requestAnimationFrame(loop);
    }
    
    loop();
});
