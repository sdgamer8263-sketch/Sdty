const fs = require('fs');
let s = fs.readFileSync('/services.html', 'utf8');

const regexRender = /\} else \{\s*const colsClass = [^]*?html \+= \`<div class="\$\{colsClass\}">\`;\s*activeData\.items\.forEach\(item => \{[^]*?\n\s*html \+= \`<\/div>\`;\s*\}/s;

let newRenderLogic = `
      } else if (activeData.subOptions) {
        html += '<div class="space-y-12">';
        activeData.subOptions.forEach(sub => {
          html += '<div>';
          html += '<h3 class="text-2xl font-bold text-white mb-2 border-b border-dark-border pb-2">' + sub.title + '</h3>';
          html += '<p class="text-sm text-slate-400 mb-6">' + sub.note + '</p>';
          html += '<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">';
          
          sub.items.forEach(item => {
            let badge = '';
            if (item.topTier) badge = '<div class="absolute top-0 right-0 bg-primary/20 text-primary-light text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-b border-l border-primary/30">Top Tier</div>';

            let features = item.features.map(f => '<li class="flex items-center gap-3"><i data-lucide="check-circle" class="h-4 w-4 text-primary shrink-0"></i><span class="text-sm text-slate-300">' + f.replace(/\\*\\*(.*?)\\*\\*/g,"<b>$1</b>") + '</span></li>').join('');
            
            let btnClass = "bg-transparent text-primary-light border border-primary hover:bg-primary/20";
            let priceHtml = '';
            
            if (sub.isFiat) {
              let oldPrice = item.oldPrice || Math.round((Number(item.price) || 0) / 0.7);
              priceHtml = '<div class="flex items-baseline gap-1 mb-6">' +
                '<span class="text-sm font-medium text-slate-500 line-through mr-1">' + fm(oldPrice) + '</span>' +
                '<span class="text-3xl font-light text-white">' + fm(item.price) + '</span>' +
                '<span class="text-xs text-slate-500 font-medium uppercase tracking-widest">/ mo</span>' +
              '</div>';
            } else {
              priceHtml = '<div class="flex items-baseline gap-1 mb-6">' +
                '<span class="text-3xl font-light text-white">' + item.price + '</span>' +
              '</div>';
            }
            
            html += '<div class="p-6 rounded-lg bg-dark-card backdrop-blur-md border border-dark-border hover:border-primary-dark flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">' +
                badge +
                '<div class="flex flex-col">' +
                  '<h3 class="text-lg font-semibold text-white mb-2">' + item.name + '</h3>' +
                  priceHtml +
                  '<div class="h-[1px] w-full bg-dark-border mb-6 group-hover:bg-primary/30 transition-colors"></div>' +
                  '<ul class="flex flex-col gap-3 mb-4">' +
                    features +
                  '</ul>' +
                '</div>' +
                '<div class="flex flex-col gap-2 mt-8">' +
                  '<a href="buy.html" class="w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ' + btnClass + '">' +
                    'Buy Now <i data-lucide="external-link" class="h-3 w-3"></i>' +
                  '</a>' +
                  '<a href="https://panel.civizsicloudhosting.indevs.in" target="_blank" class="w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 bg-dark-bg border border-dark-border hover:border-primary text-slate-300 hover:text-white">Panel <i data-lucide="server" class="h-3 w-3"></i></a>' +
                '</div>' +
              '</div>';
          });
          html += '</div></div>';
        });
        html += '</div>';
      } else {
        const colsClass = 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

        html += '<div class="' + colsClass + '">';
        activeData.items.forEach(item => {
          let oldPrice = item.oldPrice || Math.round(item.price / 0.7);
          let extraClass = (item.topTier || item.popular) ? "border-primary shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:border-primary-light" : "border-dark-border hover:border-primary-dark";
          let badge = '';
          if (item.topTier) badge = '<div class="absolute top-0 right-0 bg-primary/20 text-primary-light text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-b border-l border-primary/30">Top Tier</div>';
          if (item.popular) badge = '<div class="absolute top-0 right-0 bg-primary/20 text-primary-light text-[9px] font-bold uppercase tracking-widest px-3 py-1 border-b border-l border-primary/30">Most Popular</div>';
          
          let offerHtml = '';
          if (item.pteroOffer) offerHtml = '<div class="mt-4 p-3 bg-primary/10 border border-primary/30 rounded text-xs text-primary-light flex items-start gap-2"><i data-lucide="gift" class="h-4 w-4 shrink-0 mt-0.5"></i><span><strong class="text-white">Offer:</strong> Get ₹100 OFF on Billing Theme with this plan!</span></div>';

          let features = item.features.map(f => '<li class="flex items-center gap-3"><i data-lucide="check-circle" class="h-4 w-4 text-primary shrink-0"></i><span class="text-sm text-slate-300">' + f.replace(/\\*\\*(.*?)\\*\\*/g,"<b>$1</b>") + '</span></li>').join('');

          let btnClass = "bg-transparent text-primary-light border border-primary hover:bg-primary/20";
          
          html += '<div class="p-6 rounded-lg bg-dark-card backdrop-blur-md border ' + extraClass + ' flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">' +
              badge +
              '<div class="flex flex-col">' +
                '<h3 class="text-lg font-semibold text-white mb-2">' + item.name + '</h3>' +
                '<div class="flex items-baseline gap-1 mb-6">' +
                  '<span class="text-sm font-medium text-slate-500 line-through mr-1">' + fm(oldPrice) + '</span>' +
                  '<span class="text-3xl font-light text-white">' + fm(item.price) + '</span>' +
                  '<span class="text-xs text-slate-500 font-medium uppercase tracking-widest tracking-widest">/ mo</span>' +
                '</div>' +
                '<div class="h-[1px] w-full bg-dark-border mb-6 group-hover:bg-primary/30 transition-colors"></div>' +
                '<ul class="flex flex-col gap-3 mb-4">' +
                  features +
                '</ul>' +
                offerHtml +
              '</div>' +
              '<div class="flex flex-col gap-2 mt-8">' +
                '<a href="buy.html" class="w-full py-3 px-4 rounded text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ' + btnClass + '">' +
                  'Buy Now <i data-lucide="external-link" class="h-3 w-3"></i>' +
                '</a>' +
              '</div>' +
            '</div>';
        });
        html += '</div>';
      }
`;

if (regexRender.test(s)) {
    s = s.replace(regexRender, newRenderLogic);
    fs.writeFileSync('/services.html', s);
    console.log("Successfully replaced");
} else {
    console.log("Regex didn't match");
}
