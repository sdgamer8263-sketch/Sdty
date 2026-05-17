// Solar system background script
document.addEventListener('DOMContentLoaded', () => {
    // Ensure snow is stopped/removed if leftover
    const oldSnow = document.getElementById('snow-canvas');
    if (oldSnow) oldSnow.remove();

    const canvas = document.createElement('canvas');
    canvas.id = 'solar-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0'; 
    canvas.style.opacity = '0.7';
    // Find the first child of body to insert before so it acts as background
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
    
    // Solar system setup
    const planets = [
        { radius: 2, distance: 40, speed: 0.05, color: '#a89d91' },   // Mercury
        { radius: 4, distance: 70, speed: 0.035, color: '#e0b263' },  // Venus
        { radius: 5, distance: 110, speed: 0.02, color: '#4b95f0' },  // Earth
        { radius: 3, distance: 150, speed: 0.016, color: '#cc5439' }, // Mars
        { radius: 10, distance: 220, speed: 0.008, color: '#d9a86c' },// Jupiter
        { radius: 8, distance: 300, speed: 0.006, color: '#e8d2a5', rings: true }, // Saturn
    ];

    const stars = [];
    const numStars = window.innerWidth < 768 ? 150 : 350;
    for(let i=0; i<numStars; i++) {
        stars.push({
            x: Math.random() * 2 - 1, // Normalized
            y: Math.random() * 2 - 1,
            size: Math.random() * 1.5,
            opacity: Math.random()
        });
    }

    let angle = 0;

    function draw() {
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;

        // Draw stars
        ctx.save();
        ctx.translate(centerX, centerY);
        stars.forEach(star => {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
            ctx.fill();
            // Twinkle effect
            star.opacity += (Math.random() - 0.5) * 0.05;
            if(star.opacity < 0.1) star.opacity = 0.1;
            if(star.opacity > 1) star.opacity = 1;
        });

        // Rotate the entire galaxy slowly
        angle += 0.001;
        ctx.rotate(angle);

        // Draw Sun
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#fcd34d';
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw orbits and planets
        planets.forEach(p => {
            // Draw orbit
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.arc(0, 0, p.distance, 0, Math.PI * 2);
            ctx.stroke();

            // Calculate planet position
            const px = Math.cos(angle * (p.speed * 100)) * p.distance;
            const py = Math.sin(angle * (p.speed * 100)) * p.distance;

            // Draw planet
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(px, py, p.radius, 0, Math.PI * 2);
            ctx.fill();

            // Draw Saturn's rings
            if (p.rings) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 2;
                ctx.ellipse(px, py, p.radius * 2.5, p.radius * 0.6, angle + Math.PI/4, 0, Math.PI * 2);
                ctx.stroke();
            }
        });

        ctx.restore();
    }

    function loop() {
        draw();
        requestAnimationFrame(loop);
    }
    
    loop();
});
