const fs = require('fs');
let html = fs.readFileSync('services.html', 'utf8');

// replace the divs
html = html.replace(/<div id="bg-mc" class="bg-animated-layer active"><\/div>[\s\S]*?<div id="bg-vps" class="bg-animated-layer"><\/div>/, 
`  <div id="bg-mc" class="bg-animated-layer active"></div>
  <div id="bg-domains" class="bg-animated-layer"></div>
  <div id="bg-vps" class="bg-animated-layer"></div>
  <div id="bg-ptero" class="bg-animated-layer"></div>
  <div id="bg-discord" class="bg-animated-layer"></div>`);

// Update CSS urls
const newCss = `
    #bg-mc {
      background-image: url('src/assets/images/realistic_minecraft_bg_1779042877649.png');
    }

    #bg-domains {
      background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop');
    }

    #bg-vps {
      background-image: url('https://images.unsplash.com/photo-1534088568595-a066f410cbda?q=80&w=2000&auto=format&fit=crop'); /* Clouds */
    }

    #bg-ptero {
      background-image: url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop'); /* Servers */
    }

    #bg-discord {
      background-image: url('https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=2000&auto=format&fit=crop'); /* Abstract */
    }

    #snow-canvas {`;

html = html.replace(/#bg-mc \{[\s\S]*?#snow-canvas \{/, newCss);

const bgLogicNew = `
      // Background logic
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
`;
html = html.replace(/\/\/ Background logic[\s\S]*?if\(snowCanvas\) snowCanvas\.style\.opacity = '1';\n      \}/, bgLogicNew);

fs.writeFileSync('services.html', html);
console.log("fixed backgrounds");
