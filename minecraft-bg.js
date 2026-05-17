// Realistic Tech/Server Grid Background (Replacing simplistic minecraft)
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'minecraft-canvas';
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

    // Nodes for a high-tech/server network mesh
    const nodes = [];
    const numNodes = 150;
    
    for(let i=0; i<numNodes; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 2 + 0.5, // Depth for parallax
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            color: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6',
            size: Math.random() * 3 + 1
        });
    }

    // Glowing data packets traveling along lines
    const packets = [];
    setInterval(() => {
        if(packets.length < 30) {
            const startNode = nodes[Math.floor(Math.random() * nodes.length)];
            const nearbyNodes = nodes.filter(n => Math.hypot(n.x - startNode.x, n.y - startNode.y) < 200 && n !== startNode);
            if(nearbyNodes.length > 0) {
                const targetNode = nearbyNodes[Math.floor(Math.random() * nearbyNodes.length)];
                packets.push({
                    x: startNode.x,
                    y: startNode.y,
                    tx: targetNode.x,
                    ty: targetNode.y,
                    progress: 0,
                    speed: Math.random() * 0.02 + 0.01,
                    color: '#22d3ee'
                });
            }
        }
    }, 200);

    function draw() {
        // Deep background
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        bgGrad.addColorStop(0, '#020617'); // slate-950
        bgGrad.addColorStop(1, '#082f49'); // sky-900 (deep blue)
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
        
        ctx.globalCompositeOperation = 'screen';

        // Draw connections
        for(let i=0; i<nodes.length; i++) {
            for(let j=i+1; j<nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.hypot(dx, dy);
                
                if(dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    
                    const opacity = 1 - (dist / 150);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.2})`; // subtle purple lines
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Draw flowing packets
        for(let i=packets.length-1; i>=0; i--) {
            const p = packets[i];
            p.progress += p.speed;
            
            if(p.progress >= 1) {
                packets.splice(i, 1);
                continue;
            }
            
            const px = p.x + (p.tx - p.x) * p.progress;
            const py = p.y + (p.ty - p.y) * p.progress;
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Update and draw nodes
        nodes.forEach(node => {
            node.x += node.vx / node.z;
            node.y += node.vy / node.z;
            
            if(node.x < 0 || node.x > width) node.vx *= -1;
            if(node.y < 0 || node.y > height) node.vy *= -1;
            
            ctx.shadowBlur = 15;
            ctx.shadowColor = node.color;
            ctx.fillStyle = node.color;
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        });
        
        ctx.globalCompositeOperation = 'source-over';
    }

    function loop() {
        draw();
        requestAnimationFrame(loop);
    }
    
    loop();
});
