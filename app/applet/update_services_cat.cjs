const fs = require('fs');

let file = fs.readFileSync('services.html', 'utf8');
const p1 = 16262;
const p2 = 23939;

const code = `let activeCategory = 'minecraft'; 
    let activeSubTab = null;

    function setActiveCategory(cat) {
      activeCategory = cat;
      activeSubTab = null;
      renderAll();
    }

    function setActiveSubTab(id) {
      activeSubTab = id;
      renderAll();
    }

    function renderAll() {
      const currency = document.getElementById('currencySelector').value;
      const rate = rates[currency] || 1;
      const symbol = symbols[currency] || '₹';

      function fm(price) {
        let val = price * rate;
        return symbol + (val % 1 !== 0 ? val.toFixed(2) : val);
      }

      const categories = [
        { id: 'minecraft', icon: 'server', title: 'Minecraft Server' },
        { id: 'domains', icon: 'globe', title: 'Domain Plan' },
        { id: 'pterodactyl', icon: 'layout-dashboard', title: 'Pterodactyl Panel' },
        { id: 'discord', icon: 'message-square', title: 'Discord Setup' }
      ];

      const tabsContainer = document.getElementById('tabs-container');
      tabsContainer.innerHTML = categories.map(cat => {
        const isActive = cat.id === activeCategory;
        const classes = isActive 
          ? 'active bg-primary text-slate-900 border-primary shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
          : 'text-slate-400 hover:text-white border-transparent';
        return '<button onclick="setActiveCategory(\\'' + cat.id + '\\')" class="tab-btn px-4 py-2 text-sm font-bold uppercase tracking-widest rounded border transition-colors flex items-center gap-2 ' + classes + '">'
            + '<i data-lucide="' + cat.icon + '" class="h-4 w-4"></i> ' + cat.title 
          + '</button>';
      }).join('');

      const panesContainer = document.getElementById('panes-container');
      let html = '';

      if (activeCategory === 'minecraft' && !activeSubTab) {
        const mcPlans = data.filter(d => d.id.startsWith('minecraft'));
        
        html += '<div class="mb-8 max-w-2xl"><h2 class="text-2xl text-white font-semibold flex items-center gap-2 mb-2"><i data-lucide="server" class="text-primary h-6 w-6"></i><span>MINECRAFT SERVER PLANS</span></h2><p class="text-slate-400 text-sm">Select a category below to view our Minecraft Server offerings.</p></div>';
        
        html += '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">';
        mcPlans.forEach(plan => {
          html += '<div onclick="setActiveSubTab(\\'' + plan.id + '\\')" class="cursor-pointer p-6 rounded-lg bg-dark-card backdrop-blur-md border border-dark-border hover:border-primary flex flex-col items-center justify-center text-center transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(6,182,212,0.15)]">' +
            '<div class="h-16 w-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"><i data-lucide="' + plan.icon + '" class="h-8 w-8 text-primary group-hover:text-primary-light"></i></div>' +
            '<h3 class="text-xl font-bold text-white mb-2 uppercase tracking-wide">' + plan.title + '</h3>' +
            '<p class="text-xs text-slate-400 mt-2 line-clamp-3">' + plan.heading + '</p>' +
            '<div class="mt-6 px-4 py-2 bg-dark-bg/50 rounded border border-dark-border group-hover:border-primary/50 text-xs font-bold text-primary-light flex items-center gap-2">View Plans <i data-lucide="arrow-right" class="h-3 w-3"></i></div>' +
          '</div>';
        });
        html += '</div>';

        panesContainer.innerHTML = html;
        lucide.createIcons();

      } else {
        const renderId = (activeCategory === 'minecraft') ? activeSubTab : activeCategory;
        const activeData = data.find(t => t.id === renderId);
        
        if (!activeData) return;

        if (activeCategory === 'minecraft') {
          html += '<button onclick="setActiveSubTab(null)" class="mb-6 px-4 py-2 bg-dark-card/50 hover:bg-dark-border border border-dark-border hover:border-primary/50 text-white rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"><i data-lucide="arrow-left" class="h-4 w-4"></i> Back to Minecraft Plans</button>';
        }

        if (activeData.id.startsWith('minecraft')) {
          html += '<div class="mb-8 p-6 rounded-xl bg-primary/10 border border-primary/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden shadow-lg"><div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div><div class="relative z-10 flex items-center gap-4"><div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><i data-lucide="clock" class="h-6 w-6 text-primary-light"></i></div><div><h3 class="text-xl font-semibold text-white mb-1">24-Hour Trial <span class="ml-2 text-[10px] font-mono bg-primary/20 text-primary-light px-2 py-0.5 rounded border border-primary/30 align-middle">' + fm(50) + ' Fee</span></h3><p class="text-sm text-slate-300">Not sure yet? Test our high-performance nodes with full access for a small setup fee.</p></div></div><div class="relative z-10 shrink-0"><a href="buy.html" class="px-6 py-3 bg-primary/20 hover:bg-primary/30 text-primary-light border border-primary/50 hover:border-primary font-bold text-xs uppercase tracking-widest rounded transition-colors whitespace-nowrap flex items-center gap-2">Claim Trial <i data-lucide="arrow-right" class="h-4 w-4"></i></a></div></div>';
        }

        html += '<div class="mb-8 max-w-2xl"><h2 class="text-2xl text-white font-semibold flex items-center gap-2 mb-2"><i data-lucide="' + activeData.icon + '" class="text-primary h-6 w-6"></i><span>' + activeData.heading + '</span></h2><p class="text-slate-400 text-sm">' + activeData.desc + '</p></div>';

        let colsClass = activeData.domainMode 
          ? 'grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'
          : 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

        html += '<div class="' + colsClass + '">';
        activeData.items.forEach(item => {
          let extraClass = (item.topTier || item.popular) ? "border-primary shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:border-primary-light" : "border-dark-border hover:border-primary-dark";
          let badge = '';
          if (item.topTier) badge = '<div class="absolute top-0 right-0 bg-primary/20 text-primary-light text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-b border-l border-primary/30">Top Tier</div>';
          if (item.popular) badge = '<div class="absolute top-0 right-0 bg-primary/20 text-primary-light text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-b border-l border-primary/30">Most Popular</div>';
          
          let offerHtml = '';
          if (item.pteroOffer) offerHtml = '<div class="mt-4 p-3 bg-primary/10 border border-primary/30 rounded text-xs text-primary-light flex items-start gap-2"><i data-lucide="gift" class="h-4 w-4 shrink-0 mt-0.5"></i><span><strong class="text-white">Offer:</strong> Get ₹100 OFF on Billing Theme with this plan!</span></div>';

          let featuresHtml = '';
          if (item.features) {
            let fHtml = item.features.map(f => '<li class="flex items-center gap-3"><i data-lucide="check-circle" class="h-4 w-4 text-primary shrink-0"></i><span class="text-sm text-slate-300">' + f.replace(/\\*\\*(.*?)\\*\\*/g,'<b>$1</b>') + '</span></li>').join('');
            featuresHtml = '<div class="h-[1px] w-full bg-dark-border mb-6 group-hover:bg-primary/30 transition-colors"></div><ul class="flex flex-col gap-3 mb-4">' + fHtml + '</ul>';
          }

          let btnClass = 'bg-transparent text-primary-light border border-primary hover:bg-primary/20';
          
          let priceSection = '';
          if (activeData.isFiat !== false && typeof item.price === "number") {
              let oldPrice = item.oldPrice || Math.round(item.price / 0.7);
              priceSection = '<div class="flex items-baseline gap-1 mb-6">' +
                  '<span class="text-sm font-medium text-slate-500 line-through mr-1">' + fm(oldPrice) + '</span>' +
                  '<span class="text-3xl font-light text-white">' + fm(item.price) + '</span>' +
                  '<span class="text-xs text-slate-500 font-medium uppercase tracking-widest tracking-widest">/ ' + (activeData.domainMode ? 'yr' : 'mo') + '</span>' +
                '</div>';
          } else {
              priceSection = '<div class="flex items-baseline gap-1 mb-6">' +
                  '<span class="text-3xl font-light text-white">' + item.price + '</span>' +
                '</div>';
          }

          let extraBtnHtml = '';
          if (activeData.id.startsWith('minecraft')) {
            extraBtnHtml = '<a href="https://panel.civizsicloudhosting.indevs.in" target="_blank" class="w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 bg-dark-bg border border-dark-border hover:border-primary text-slate-300 hover:text-white">Panel <i data-lucide="server" class="h-3 w-3"></i></a>';
          }

          html += '<div class="p-6 rounded-lg bg-dark-card backdrop-blur-md border ' + extraClass + ' flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">' +
              badge +
              '<div class="flex flex-col">' +
                '<h3 class="text-lg font-semibold text-white mb-2">' + item.name + '</h3>' +
                priceSection +
                featuresHtml +
                offerHtml +
              '</div>' +
              '<div class="flex flex-col gap-2 mt-8">' +
                '<a href="buy.html" class="w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ' + btnClass + '">' +
                  'Buy Now <i data-lucide="external-link" class="h-3 w-3"></i>' +
                '</a>' +
                extraBtnHtml +
              '</div>' +
            '</div>';
        });
        html += '</div>';

        panesContainer.innerHTML = html;
        lucide.createIcons();
      }

      const activeRenderId = (activeCategory === 'minecraft') ? (activeSubTab || 'minecraft-group') : activeCategory;
      const snowCanvas = document.getElementById('snow-canvas');
      const mcBg = document.querySelector('.bg-animated-wrapper');
      if (activeRenderId.startsWith('minecraft')) {
        if (snowCanvas) snowCanvas.style.display = 'none';
        if (mcBg) mcBg.style.display = 'block';
      } else {
        if (snowCanvas) snowCanvas.style.display = 'block';
        if (mcBg) mcBg.style.display = 'none';
      }
    }
`;

fs.writeFileSync('services.html', file.substring(0, p1) + code + file.substring(p2));
