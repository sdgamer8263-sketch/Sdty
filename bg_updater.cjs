const fs = require('fs');

let html = fs.readFileSync('services.html', 'utf8');

// 1. Add other bg wrappers and update style
const cssToAdd = `
    .bg-animated-layer {
      position: fixed;
      top: -5%;
      left: -5%;
      width: 110%;
      height: 110%;
      z-index: 0;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      will-change: transform, opacity;
      animation: panBackground 40s linear infinite alternate;
      mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%);
      -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%);
      pointer-events: none;
    }

    .bg-animated-layer.active {
      opacity: 0.3;
    }

    #bg-mc {
      background-image: url('src/assets/images/realistic_minecraft_bg_1779042877649.png');
    }

    #bg-domains {
      background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop');
    }

    #bg-vps {
      background-image: url('https://images.unsplash.com/photo-1483728642387-6c3ba6c6af5f?q=80&w=2000&auto=format&fit=crop');
    }

    #snow-canvas {
      transition: opacity 1s ease-in-out;
    }
  </style>
`;
html = html.replace('</style>', cssToAdd);

// Remove the old .bg-animated-wrapper section
html = html.replace(/\.bg-animated-wrapper \{[\s\S]*?pointer-events: none;\n    \}/, '');

const htmlBgs = `
  <div id="bg-mc" class="bg-animated-layer active"></div>
  <div id="bg-domains" class="bg-animated-layer"></div>
  <div id="bg-vps" class="bg-animated-layer"></div>
`;
html = html.replace('<div class="bg-animated-wrapper"></div>', htmlBgs);

const bgLogicOld = `
      // Background logic
      const activeRenderId = activeSubTab || activeCategory;
      const snowCanvas = document.getElementById('snow-canvas');
      const mcBg = document.querySelector('.bg-animated-wrapper');
      if (activeRenderId.startsWith('minecraft')) {
        if (snowCanvas) snowCanvas.style.display = 'none';
        if (mcBg) mcBg.style.display = 'block';
      } else {
        if (snowCanvas) snowCanvas.style.display = 'block';
        if (mcBg) mcBg.style.display = 'none';
      }
`;

const bgLogicNew = `
      // Background logic
      const activeRenderId = activeSubTab || activeCategory;
      const snowCanvas = document.getElementById('snow-canvas');
      
      const layerMc = document.getElementById('bg-mc');
      const layerDomains = document.getElementById('bg-domains');
      const layerVps = document.getElementById('bg-vps');
      
      // Default reset
      if(layerMc) layerMc.classList.remove('active');
      if(layerDomains) layerDomains.classList.remove('active');
      if(layerVps) layerVps.classList.remove('active');
      if(snowCanvas) {
         snowCanvas.style.display = 'block'; 
      }

      if (activeRenderId.startsWith('minecraft') || activeRenderId === 'pterodactyl') {
        if(layerMc) layerMc.classList.add('active');
        if(snowCanvas) snowCanvas.style.opacity = '0';
      } else if (activeRenderId === 'domains') {
        if(layerDomains) layerDomains.classList.add('active');
        if(snowCanvas) snowCanvas.style.opacity = '1';
      } else if (activeCategory === 'vps') {
        if(layerVps) layerVps.classList.add('active');
        if(snowCanvas) snowCanvas.style.opacity = '1';
      } else {
        if(snowCanvas) snowCanvas.style.opacity = '1';
      }
`;
// Because the indentation might differ, let's use a regex to replace bgLogicOld
html = html.replace(/\/\/ Background logic[\s\S]*?if \(mcBg\) mcBg\.style\.display = 'none';\n      \}/, bgLogicNew);

fs.writeFileSync('services.html', html);
console.log("updated");
