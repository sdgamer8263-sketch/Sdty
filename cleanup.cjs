const fs = require('fs');
let html = fs.readFileSync('services.html', 'utf8');

// Replace everything from `// Background logic` to the end of `renderAll` block
// We can find `// Background logic` and `document.addEventListener('DOMContentLoaded',`
const startIdx = html.indexOf('// Background logic');
const endIdx = html.indexOf('document.addEventListener(\'DOMContentLoaded\',');

if (startIdx !== -1 && endIdx !== -1) {
    const bgLogicNew = `// Background logic
      const activeRenderId = activeSubTab || activeCategory;
      const snowCanvas = document.getElementById('snow-canvas');
      
      const layerMc = document.getElementById('bg-mc');
      const layerDomains = document.getElementById('bg-domains');
      const layerVps = document.getElementById('bg-vps');
      const layerPtero = document.getElementById('bg-ptero');
      const layerDiscord = document.getElementById('bg-discord');
      
      // Default reset
      if(layerMc) layerMc.classList.remove('active');
      if(layerDomains) layerDomains.classList.remove('active');
      if(layerVps) layerVps.classList.remove('active');
      if(layerPtero) layerPtero.classList.remove('active');
      if(layerDiscord) layerDiscord.classList.remove('active');
      
      if(snowCanvas) {
         snowCanvas.style.display = 'block'; 
      }

      if (activeCategory === 'minecraft') {
        if(layerMc) layerMc.classList.add('active');
        if(snowCanvas) snowCanvas.style.opacity = '0';
      } else if (activeCategory === 'domains') {
        if(layerDomains) layerDomains.classList.add('active');
        if(snowCanvas) snowCanvas.style.opacity = '0';
      } else if (activeCategory === 'vps') {
        if(layerVps) layerVps.classList.add('active');
        if(snowCanvas) snowCanvas.style.opacity = '0';
      } else if (activeCategory === 'pterodactyl') {
        if(layerPtero) layerPtero.classList.add('active');
        if(snowCanvas) snowCanvas.style.opacity = '0';
      } else if (activeCategory === 'discord') {
        if(layerDiscord) layerDiscord.classList.add('active');
        if(snowCanvas) snowCanvas.style.opacity = '0';
      } else {
        if(snowCanvas) snowCanvas.style.opacity = '1';
      }
    }

    `;
    
    html = html.substring(0, startIdx) + bgLogicNew + html.substring(endIdx);
    fs.writeFileSync('services.html', html);
    console.log("cleaned logic");
}
