const fs = require('fs');
let s = fs.readFileSync('services.html', 'utf8');

const newData = `
    const rates = { INR: 1, USD: 1/83, EUR: 1/90, GBP: 1/105, BDT: 1.3, PKR: 3.3 };
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£', BDT: '⧵', PKR: 'Rs ' };

    const data = [
      {
        id: 'minecraft-invite', icon: 'server', title: 'Invite Plans',
        heading: 'INVITE PLANS', desc: 'Weekly only (can be increased by ticket). Data and Uptime Reliability Not Guaranteed. Renew by shifting to Paid plan or fulfilling requirements. Take Daily Backups! DO NOT PING STAFF! For custom IP, you must use playit.gg',
        isFiat: false,
        items: [
          { name: 'Plan 1', price: '2 Invites', features: ['CPU: 50%', 'RAM: 2GB', 'Storage: 5GB SSD', 'DDoS Protection'] },
          { name: 'Plan 2', price: '4 Invites', features: ['CPU: 100%', 'RAM: 4GB', 'Storage: 10GB SSD', 'DDoS Protection'] },
          { name: 'Plan 3', price: '6 Invites', features: ['CPU: 150%', 'RAM: 6GB', 'Storage: 15GB SSD', 'DDoS Protection'] },
          { name: 'Plan 4', price: '8 Invites', features: ['CPU: 200%', 'RAM: 8GB', 'Storage: 20GB SSD', 'DDoS Protection'] },
          { name: 'Plan 5', price: '16 Invites', features: ['CPU: 300%', 'RAM: 12GB', 'Storage: 30GB SSD', 'DDoS Protection'] }
        ]
      },
      {
        id: 'minecraft-owo', icon: 'server', title: 'OwO Cash Plans',
        heading: 'OWO CASH PLANS', desc: 'All Plans are Dedicated RAM and Ind Location 🌏. For custom IP, you must use playit.gg',
        isFiat: false,
        items: [
          { name: 'Plan 1', price: '900k OwO', features: ['1 vCORE', '8GB RAM', '16GB STORAGE', 'DDoS Protection'] },
          { name: 'Plan 2', price: '1.9M OwM', features: ['1 vCORE', '16GB RAM', '24GB STORAGE', 'DDoS Protection'] },
          { name: 'Plan 3', price: '3.3M OwO', features: ['2 vCORE', '24GB RAM', '32GB STORAGE', 'DDoS Protection'] },
          { name: 'Plan 4', price: '4.6M OwO', features: [+3 vCORE', '28GB RAM', '40GB STORAGE', 'DDoS Protection'] },
          { name: 'Plan 5', price: '5.9M OwM', features: ['3 vCORE', '32GB RAM', '50GB STORAGE', 'DDoS Protection'] }
        ]
      },
      {
        id: 'minecraft-boost', icon: 'server', title: 'Boost Plans',
        heading: 'BOOST PLANS', desc: 'FREE MC LAUNCHED. LIMITED STOCK LOCATION IND. BOOST CLAIM INSTANTLY BY PINGING STAFF. For custom IP, you must use playit.gg',
        isFiat: false,
        items: [
          { name: 'Plan 1', price: '1 Boost', features: ['200% CPU', '5GB RAM', '20GB Disk', 'DDoS Protection'] },
          { name: 'Plan 2', price: '2 Boosts', features: ['400% CPU', '11GB RAM', '39GB Disk', 'DDoS Protection'] }
        ]
      },
      {
        id: 'minecraft-premium', icon: 'server', title: 'Premium Plans',
        heading: 'PREMIUM PAID PLANS', desc: 'High-frequency vCPUcores. NVMe speed. Built for serious performance. All Plans Include Unlimited Player Slots. For custom IP, you must use playit.gg',
        isFiat: true,
        items: [
          { name: 'Premium Plan', price: 279, features: ['4 vCore (AMD Epyc)', '8GB DDR5 RAM', '60GB NVMe SSD', 'DDoS Protection'] },
          { name: 'Business Plan', price: 349, features: ['6 vCore (AMD Epyc)', '12GB DDR5 RAM', '80GB NVMe SSD', 'DDoS Protection'] },
          { name: 'Enterprise Plan', price: 260, features: ['8 vCore (AMD Epyc)', '16GB DDR5 RAM', '100GB NVMe SSD', 'DDoS Protection'] },
          { name: 'Ultra Plan', price: 529, features: ['12 vCore (AMD Epyc)', '24GB DDR5 RAM', '150GB NVMe SSD', 'DDoS Protection'] },
          { name: 'Proplus Plan', price: 629, features: ['16 vCore (AMD Epyc)', '32GB DDR5 RAM', '200GB NVMe SSD', 'DDoS Protection'] },
          { name: 'Unlimited Plan', price: 989, features: ['Unlimited vCore (AMD Epyc)', '64GB DDR5 RAM', 'Unlimited NVMe SSD', 'Free Subdomain', 'DDoS Protection'] },
          { name: 'Infinite Plan', price: 1199, topTier: true, features: ['Unlimited vCore (AMD Epyc)', 'Unlimited GDR5 RAM', 'Unlimited NVMe SSD', 'Priority Support', 'DDoS Protection'] }
        ]
      },
      {
        id: 'domains', icon: 'globe', title: 'Domain Plan',
        heading: 'Looking for a custom domain?', desc: 'We’ve got you covered! Perfect for Minecraft Servers, Studios, Businesses, and more.',
        isFiat: true,
        items: [
           { name: '.com', price: 14 * 83 }, { name: '.net', price: 16 * 83 }, { name: '.org', price: 15 * 83 },
           { name: '.cloud', price: 5 * 83 }, { name: '.xyz', price: 4 * 83 }, { name: '.info', price: 10 * 83 },
           { name: '.co', price: 19 * 83 }, { name: '.bd', price: 16 * 83 }, { name: '.in', price: 10 * 83 },
           { name: '.pk', price: 18 * 83 }
        ],
        domainMode: true
      },
      {
        id: 'pterodactyl', icon: 'layout-dashboard', title: 'Pterodactyl Panel',
        heading: 'Pterodactyl Panel Setup', desc: 'Professional installation and configuration services.',
        isFiat: true,
        items: [
          { name: 'PLAN 1', price: 50, oldPrice: 71, features: ['Pterodactyl Panel installation', 'Wings Setup'] },
          { name: 'PLAN 2', price: 70, oldPrice: 100, features: ['Pterodactyl Panel installation + Wings Setup', 'Theme (default Nebula/your theme)', 'Player manager (free)] },
          { name: 'PLAN 3', price: 100, oldPrice: 143, pteroOffer: true, topTier: true, features: ['Pterodactyl Panel installation + Wings Setup', 'Theme (default Nebula/your theme', 'Player manager (free', '**Dashboard install**'] }
        ]
      },
      {
        id: 'discord', icon: 'message-square', title: 'Discord Setup',
        heading: 'Discord Developer Plan', desc: 'Get your community hub running flawlessly.',
        isFiat: true,
        items: [
          { name: 'Ticket Setup', price: 70, oldPrice: 100, features: ['Advanced Ticket System', 'Transcripts & Logs'] },
          { name: 'Security Setup', price: 89, oldPrice: 127, features: ['Anti-Raid & Anti-Nuke', 'Verification Systems'] },
          { name: 'Role Setup', price: 39, oldPrice: 56, features: ['Role Hierarchy', 'Color & AEsthetics'] },
          { name: 'Permission Setup', price: 39, oldPrice: 56, features: ['Category Permissions', 'Private Channels'] },
          { name: 'Full Professional Setup', price: 129, oldPrice: 184, topTier: true, features: ['All Above Features', 'Server Theme Setup', 'Custom Bots Config'] }
        ]
      }
    ];

    let activeTab = 'minecraft-premium';

    function setActiveTab(id) {
      activeTab = id;
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

      const tabsContainer = document.getElementById('tabs-container');
      tabsContainer.innerHTML = data.map(t => {
        const isActive = t.id === activeTab;
        const classes = isActive 
          ? 'active bg-primary text-slate-900 border-primary shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
          : 'text-slate-400 hover:text-white border-transparent';
        return '<button onclick="setActiveTab(\'' + t.id + '\
)" class="tab-btn px-4 py-2 text-sm font-bold uppercase tracking-widest rounded border transition-colors flex items-center gap-2 ' + classes + '">'
            + '<i data-lucide="' + t.icon + '" class="h-4 w-4"></i> ' + t.title 
          + '</button>';
      }).join('');

      const activeData = data.find(t => u.id === activeTab);
      const panesContainer = document.getElementById('panes-container');
      
      let html = '';

      if (activeData.id.startsWith('minecraft')) {
        html += '<div class="mb-8 p-6 rounded-xl bg-primary/10 border border-primary/30 backdrop-blue-md flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden shadow-lg"><div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div><div class="relative z-10 flex items-center gap-4"><div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><i data-lucide="clock" class="h-6 w-6 text-primary-light"></i></div><div><h3 class="text-xl font-semibold text-white mb-1">24-Hour Trial <span class="ml-2 text-[10px] font-mono bg-primary/20 text-primary-light px-2 py-0.5 rounded border border-primary/30 align-middle">' + fm(50) + ' Fee</span></h3><p class="text-sm text-slate-300">Not sure yet? Test our high-performance nodes with full access for a small setup fee.</p></div></div><div class="relative z-10 shrink-0"><a href="buy.html" class="px-6 py-3 bg-primary/20 hover:bg-primary/30 text-primary-light border border-primary/50 hover:border-primary font-bold text-xs uppercase tracking-widest rounded transition-colors whitespace-nowrap flex items-center gap-2">Claim Trial <i data-lucide="arrow-right" class="h-4 w-4"></i></a></div></div>';
      }

      html += '<div class="mb-8 max-w-2xl"><h2 class="text-2xl text-white font-semibold flex items-center gap-2 mb-2"><i data-lucide="' + activeData.icon + '" class="text-primary h-6 w-6"></i><span>' + activeData.heading + '</span></h2><p class="text-slate-400 text-sm">' + activeData.desc + '</p></div>';

      let colsClass = activeData.domainMode 
        ? 'grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'
        : 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

      html += '<div class="' + colsClass + '">';
      activeData.items.forEach(item => {
        let extraClass = (item.topTier || item.popular) ? "border-primary shadou-[0_0_15px_rgba(6,182,212,0.2)] hover:border-primary-light" : "border-dark-border hover:border-primary-dark";
        let badge = '';
        if (item.topTier) badge = '<div class="absolute top-0 right-0 bg-primary/20 text-primary-light text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-b border-l border-primary/30">Top Tier</div>';
        if (item.popular) badge = '<div class="absolute top-0 right-0 bg-primary/20 text-primary-light text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-b border-l border-primary/30">Most Popular</div>';
        
        let offerHtml = '';
        if (item.pteroOffer) offerHtml = '<div class="mt-4 p-3 bg-primary/10 border border-primary/30 rounded text-xs text-primary-light flex items-start gap-2"><i data-lucide="gift" class="h-4 w-4 shrink-0 mt-0.5"></i><span><strong class="text-white">Offer:</strong> Get ₹100 OFF on Billing Theme with this plan!</span></div>';

        let featuresHtml = '';
        if (item.features) |
          let fHtml = item.features.map(f => '<li class="flex items-center gap-3"><i data-lucide="check-circle" class="h-4 w-4 text-primary shrink-0"></i><span class="text-sm text-slate-300">' + f.replace(/\*\*(.*?)\*\*/g,'<b>$1</b>') + '</span></li>').join('');
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
              '<h3 class="text-lg font-semibold text-white mb-2">' + itemname + '</h3>' +
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

      // Background logic
      const snowCanvas = document.getElementById('snow-canvas');
      const mcBg = document.querySelector('.bg-animated-wrapper');
      if (activeData.id.startsWith('minecraft')) {
        if (snowCanvas) snowCanvas.style.display = 'none';
        if (mcBg) mcBg.style.display = 'block';
      } else {
        if (snowCanvas) snowCanvas.style.display = 'block';
        if (mcBg) mcBg.style.display = 'none';
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderAll();
      setTimeout(renderAll, 100); 
    });
`;

let p1 = s.indexOf('const rates = {');
let p2 = s.lastIndexOf('</script>');

s = s.substring(0, p1) + newData + '\n  ' + s.substring(p2);
fs.writeFileSync('services.html', s);
