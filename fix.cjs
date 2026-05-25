const fs = require('fs');
let lines = fs.readFileSync('services.html', 'utf8').split('\n');
const idx = lines.findIndex(l => l.includes('let fHtml = item.features.map'));
if (idx !== -1) {
  lines[idx] = `            let fHtml = item.features.map(f => '<li class="flex items-center gap-3"><i data-lucide="check-circle" class="h-4 w-4 text-primary shrink-0"></i><span class="text-sm text-slate-300">' + f.replace(/\\*\\*(.*?)\\*\\*/g, '<b>$1</b>') + '</span></li>').join('');`;
}
fs.writeFileSync('services.html', lines.join('\n'));
