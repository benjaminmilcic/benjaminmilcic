/**
 * Builds every SVG graphic used by the profile README.
 * Design tokens are lifted 1:1 from the hero of auf-zu-neuen-welten.de.
 *
 *   node tools/build-assets.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets');
mkdirSync(OUT, { recursive: true });

const write = (name, svg) => {
  writeFileSync(join(OUT, name), svg.trim() + '\n', 'utf8');
  console.log('  ✓', name);
};

/* ── design tokens ──────────────────────────────────────────── */
const C = {
  sky: ['#1e3a8a', '#000030', '#000018'],
  orb: ['#3b82f6', '#8b5cf6', '#06b6d4'],
  enamel: ['#fed7aa', '#fdba74', '#fb923c'],
  enamelEdge: '#9a3412',
  ink: '#0c4a6e',
  rust: '#7c2d12',
  rustSoft: '#9a3412',
  night: '#0f172a',
  amber: '#fbbf24',
  orange: '#fb923c',
  slate: '#94a3b8',
  slateLight: '#cbd5e1',
};
const SERIF = "Georgia,'Fraunces','Times New Roman',serif";
const MONO = "ui-monospace,'JetBrains Mono','SF Mono',Consolas,monospace";

/* ═══════════════════════════════════════════════════════════
   1 · HERO  —  night sky + floating orbs + enamel sign
   ═══════════════════════════════════════════════════════════ */
const W = 1280;
const H = 470;

write(
  'header.svg',
  `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
     role="img" aria-label="Benjamin Milčić — Freelance Full-Stack Developer, Angular · NestJS · Ionic">
  <title>Benjamin Milčić — Freelance Full-Stack Developer</title>
  <defs>
    <radialGradient id="sky" cx="50%" cy="-10%" r="115%">
      <stop offset="0%"   stop-color="${C.sky[0]}"/>
      <stop offset="60%"  stop-color="${C.sky[1]}"/>
      <stop offset="100%" stop-color="${C.sky[2]}"/>
    </radialGradient>
    <linearGradient id="enamel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="${C.enamel[0]}"/>
      <stop offset="50%"  stop-color="${C.enamel[1]}"/>
      <stop offset="100%" stop-color="${C.enamel[2]}"/>
    </linearGradient>
    <linearGradient id="gloss" x1="0.15" y1="0" x2="0.55" y2="1">
      <stop offset="0%"   stop-color="#fff" stop-opacity=".45"/>
      <stop offset="28%"  stop-color="#fff" stop-opacity=".15"/>
      <stop offset="50%"  stop-color="#fff" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity=".07"/>
    </linearGradient>
    <radialGradient id="screw" cx="30%" cy="30%" r="78%">
      <stop offset="0%"   stop-color="${C.slateLight}"/>
      <stop offset="55%"  stop-color="#64748b"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="105%" r="80%">
      <stop offset="45%"  stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity=".45"/>
    </radialGradient>
    <filter id="soft" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="40"/>
    </filter>
    <filter id="lift" x="-25%" y="-25%" width="150%" height="160%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#000" flood-opacity=".45"/>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0v40" fill="none" stroke="#fff" stroke-opacity=".025"/>
    </pattern>
  </defs>

  <style>
    @keyframes drift { 0%,100% { transform: translate(0,0) scale(1); }
                        50%     { transform: translate(40px,-30px) scale(1.1); } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
    .o1 { animation: drift 14s ease-in-out infinite; }
    .o2 { animation: drift 18s ease-in-out -3s infinite reverse; }
    .o3 { animation: drift 12s ease-in-out -6s infinite; }
    .live { animation: pulse 2.4s ease-in-out infinite; }
    @media (prefers-reduced-motion: reduce) { .o1,.o2,.o3,.live { animation: none; } }
  </style>

  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <g opacity=".5">
    <circle class="o1" cx="70"   cy="40"  r="140" fill="${C.orb[0]}" filter="url(#soft)"/>
    <circle class="o2" cx="1210" cy="440" r="170" fill="${C.orb[1]}" filter="url(#soft)"/>
    <circle class="o3" cx="640"  cy="250" r="100" fill="${C.orb[2]}" filter="url(#soft)"/>
  </g>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>

  <!-- ── enamel sign ── -->
  <g filter="url(#lift)">
    <rect x="200" y="30" width="880" height="310" rx="26"
          fill="url(#enamel)" stroke="${C.enamelEdge}" stroke-width="5"/>
    <rect x="202.5" y="32.5" width="875" height="305" rx="24" fill="url(#gloss)"/>
  </g>

  <!-- corner screws -->
  ${[
    [226, 56],
    [1054, 56],
    [226, 314],
    [1054, 314],
  ]
    .map(
      ([x, y], i) => `<g transform="translate(${x} ${y}) rotate(${[18, -34, 62, -12][i]})">
    <circle r="11" fill="url(#screw)"/>
    <path d="M-5.5 0h11" stroke="#0f172a" stroke-opacity=".65" stroke-width="2.2" stroke-linecap="round"/>
  </g>`
    )
    .join('\n  ')}

  <!-- availability pill -->
  <g>
    <rect x="512" y="56" width="256" height="28" rx="14" fill="#fff" fill-opacity=".35"
          stroke="${C.rust}" stroke-opacity=".2"/>
    <circle class="live" cx="536" cy="70" r="4" fill="#16a34a"/>
    <circle cx="536" cy="70" r="7" fill="#16a34a" fill-opacity=".3"/>
    <text x="551" y="74.5" font-family="${MONO}" font-size="12" font-weight="600"
          letter-spacing="2.1" fill="${C.rust}">AVAILABLE FOR PROJECTS</text>
  </g>

  <!-- name -->
  <text x="640" y="168" text-anchor="middle" font-family="${SERIF}" font-size="66"
        font-weight="600" letter-spacing="-1.2" fill="${C.ink}">Benjamin <tspan
        font-style="italic">Milčić</tspan></text>

  <!-- role -->
  <text x="640" y="209" text-anchor="middle" font-family="${SERIF}" font-size="27"
        font-style="italic" fill="${C.rust}">Full Stack Developer</text>

  <!-- stack pill -->
  <g>
    <rect x="524" y="224" width="232" height="28" rx="14" fill="#fff" fill-opacity=".42"
          stroke="${C.rust}" stroke-opacity=".2"/>
    <text x="640" y="243" text-anchor="middle" font-family="${MONO}" font-size="13"
          fill="${C.rustSoft}">Angular · NestJS · Ionic</text>
  </g>

  <!-- claim -->
  <g>
    <rect x="290" y="266" width="700" height="60" rx="14" fill="#fff" fill-opacity=".3"/>
    <text x="640" y="291" text-anchor="middle" font-family="${SERIF}" font-size="16"
          font-weight="600" fill="${C.ink}">Passionate developer with 10+ years of experience,</text>
    <text x="640" y="313" text-anchor="middle" font-family="${SERIF}" font-size="16"
          font-weight="600" fill="${C.ink}">turning ideas into elegant, functional solutions.</text>
  </g>

  <!-- stats -->
  ${[
    ['10+', 'YEARS EXPERIENCE', 400],
    ['20+', 'PROJECTS', 640],
    ['100%', 'PASSION', 880],
  ]
    .map(
      ([num, label, x]) => `<g>
    <text x="${x}" y="412" text-anchor="middle" font-family="${SERIF}" font-size="38"
          font-weight="600" fill="${C.amber}">${num}</text>
    <text x="${x}" y="436" text-anchor="middle" font-family="${MONO}" font-size="11"
          letter-spacing="2" fill="${C.slate}">${label}</text>
  </g>`
    )
    .join('\n  ')}
  <path d="M520 378v58M760 378v58" stroke="${C.slate}" stroke-opacity=".25"/>
</svg>`
);

/* ═══════════════════════════════════════════════════════════
   2 · MARQUEE  —  endlessly scrolling stack strip
   ═══════════════════════════════════════════════════════════ */
{
  const items = [
    'ANGULAR', 'NESTJS', 'IONIC', 'TYPESCRIPT', 'NODE.JS', 'RXJS',
    'NGRX', 'CYPRESS', 'MYSQL', 'FIREBASE', 'TAILWIND', 'CAPACITOR',
  ];
  const fs = 13, cw = fs * 0.62 + 1.3, gap = 26;
  let x = 0;
  const parts = [];
  for (const it of items) {
    parts.push(
      `<text x="${x.toFixed(1)}" y="22" font-family="${MONO}" font-size="${fs}" letter-spacing="1.3" fill="${C.slate}">${it}</text>`
    );
    x += it.length * cw + gap;
    parts.push(`<circle cx="${(x + 3).toFixed(1)}" cy="17.5" r="3" fill="${C.orange}"/>`);
    x += 6 + gap;
  }
  const seq = Math.round(x);

  write(
    'marquee.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="56" viewBox="0 0 1280 56"
     role="img" aria-label="Angular · NestJS · Ionic · TypeScript · Node.js · RxJS · NgRx · Cypress · MySQL · Firebase · Tailwind · Capacitor">
  <defs>
    <g id="seq">${parts.join('')}</g>
    <linearGradient id="fade" x1="0" x2="1">
      <stop offset="0"    stop-color="${C.night}"/>
      <stop offset=".06"  stop-color="${C.night}" stop-opacity="0"/>
      <stop offset=".94"  stop-color="${C.night}" stop-opacity="0"/>
      <stop offset="1"    stop-color="${C.night}"/>
    </linearGradient>
  </defs>
  <style>
    @keyframes roll { from { transform: translateX(0); } to { transform: translateX(-${seq}px); } }
    .track { animation: roll 26s linear infinite; }
    @media (prefers-reduced-motion: reduce) { .track { animation: none; } }
  </style>
  <rect width="1280" height="56" fill="${C.night}"/>
  <path d="M0 .5h1280M0 55.5h1280" stroke="${C.slate}" stroke-opacity=".14"/>
  <g clip-path="inset(0)">
    <g class="track" transform="translate(0 16)">
      <use href="#seq" x="0"/><use href="#seq" x="${seq}"/><use href="#seq" x="${seq * 2}"/>
    </g>
  </g>
  <rect width="1280" height="56" fill="url(#fade)"/>
</svg>`
  );
}

/* ═══════════════════════════════════════════════════════════
   3 · SECTION HEADINGS
   ═══════════════════════════════════════════════════════════ */
const section = (num, tag, head, em) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="126" viewBox="0 0 1000 126"
     role="img" aria-label="${num} ${tag} — ${head} ${em}">
  <defs>
    <filter id="g" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="34"/></filter>
  </defs>
  <rect width="1000" height="126" rx="18" fill="${C.night}"/>
  <circle cx="948" cy="26" r="66" fill="${C.orange}" opacity=".16" filter="url(#g)"/>
  <rect x=".5" y=".5" width="999" height="125" rx="17.5" fill="none"
        stroke="${C.slate}" stroke-opacity=".16"/>
  <path d="M36 41h34" stroke="${C.amber}" stroke-opacity=".85" stroke-width="1.5"/>
  <rect x="82" y="30" width="36" height="22" rx="6" fill="${C.amber}"/>
  <text x="100" y="45.5" text-anchor="middle" font-family="${MONO}" font-size="12"
        font-weight="700" fill="${C.night}">${num}</text>
  <text x="132" y="45.5" font-family="${MONO}" font-size="12" letter-spacing="2.1"
        fill="${C.slate}">${tag}</text>
  <text x="36" y="96" font-family="${SERIF}" font-size="36" font-weight="600"
        letter-spacing="-.7" fill="#f1f5f9">${head} <tspan font-style="italic"
        fill="${C.orange}">${em}</tspan></text>
</svg>`;

write('sec-01-about.svg', section('01', 'ABOUT', 'Who is behind the', 'code'));
write('sec-02-stack.svg', section('02', 'STACK', 'Tools I use', 'every day'));
write('sec-03-work.svg', section('03', 'WORK', 'Selected', 'projects'));
write('sec-04-playground.svg', section('04', 'PLAYGROUND', 'Where ideas get', 'tested'));
write('sec-05-clients.svg', section('05', 'CLIENTS', 'Shipped for', 'other people'));
write('sec-06-contact.svg', section('06', 'CONTACT', "Let's", 'talk.'));

/* ═══════════════════════════════════════════════════════════
   4 · STACK BOARD  —  chips grouped by how often I reach for them
   ═══════════════════════════════════════════════════════════ */
{
  const tiers = [
    ['EVERY SINGLE DAY', ['Angular', 'TypeScript', 'Ionic', 'NestJS', 'RxJS', 'NgRx', 'SCSS']],
    ['REGULARLY', ['Node.js', 'Express', 'MySQL', 'Firebase', 'Tailwind', 'Angular Material', 'Cypress']],
    ['WHEN A PROJECT ASKS FOR IT', ['Socket.IO', 'Stripe', 'Leaflet', 'MapTiler', 'Chart.js', 'Cloudflare Workers', 'Capacitor']],
    ['WHERE IT ALL STARTED', ['HTML', 'CSS', 'JavaScript', 'PHP']],
  ];
  const fs = 13.5, cw = fs * 0.55, padX = 15, chipH = 30, gap = 9;
  let y = 30;
  const rows = [];
  for (const [label, chips] of tiers) {
    rows.push(
      `<text x="30" y="${y + 12}" font-family="${MONO}" font-size="11" letter-spacing="2" fill="${C.orange}">${label}</text>`
    );
    let x = 30;
    const line = y + 26;
    for (const c of chips) {
      const w = Math.round(c.length * cw + padX * 2);
      rows.push(
        `<g><rect x="${x}" y="${line}" width="${w}" height="${chipH}" rx="15" fill="${C.slate}" fill-opacity=".09" stroke="${C.slate}" stroke-opacity=".2"/>` +
          `<text x="${x + w / 2}" y="${line + 19.5}" text-anchor="middle" font-family="${MONO}" font-size="${fs}" fill="${C.slateLight}">${c}</text></g>`
      );
      x += w + gap;
    }
    y = line + chipH + 26;
  }
  const h = y + 4;

  write(
    'stack.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="${h}" viewBox="0 0 1000 ${h}"
     role="img" aria-label="Tech stack grouped by how often I use it">
  <defs><filter id="g2" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="38"/></filter></defs>
  <rect width="1000" height="${h}" rx="18" fill="${C.night}"/>
  <circle cx="60" cy="${h - 20}" r="80" fill="${C.orb[0]}" opacity=".18" filter="url(#g2)"/>
  <circle cx="960" cy="30" r="80" fill="${C.orb[1]}" opacity=".16" filter="url(#g2)"/>
  <rect x=".5" y=".5" width="999" height="${h - 1}" rx="17.5" fill="none" stroke="${C.slate}" stroke-opacity=".16"/>
  ${rows.join('\n  ')}
</svg>`
  );
}

/* ═══════════════════════════════════════════════════════════
   5 · PLAYGROUND BOARD  —  everything living in /gimmicks
   ═══════════════════════════════════════════════════════════ */
{
  const tiles = [
    'Weather maps', 'Interactive charts', 'AI image generator', 'Realtime chat', 'Recipe manager',
    'Movie database', 'Country explorer', 'Calendar', 'Guestbook', 'Site-wide search',
    'Minesweeper', 'Connect Four', 'Yahtzee', 'Jigsaw puzzle', 'Quizzes',
  ];
  const tw = 182, th = 62, gapX = 12, gapY = 12, padOut = 30, perRow = 5;
  const rows = Math.ceil(tiles.length / perRow);
  const w = padOut * 2 + perRow * tw + (perRow - 1) * gapX;
  const h = padOut * 2 + rows * th + (rows - 1) * gapY;

  const cells = tiles.map((t, i) => {
    const x = padOut + (i % perRow) * (tw + gapX);
    const y = padOut + Math.floor(i / perRow) * (th + gapY);
    return `<g>
    <rect x="${x}" y="${y}" width="${tw}" height="${th}" rx="13" fill="${C.slate}" fill-opacity=".08" stroke="${C.slate}" stroke-opacity=".17"/>
    <rect x="${x + 14}" y="${y + 18}" width="4" height="26" rx="2" fill="${C.orange}"/>
    <text x="${x + 28}" y="${y + 36}" font-family="${MONO}" font-size="12.5" fill="${C.slateLight}">${t}</text>
  </g>`;
  });

  write(
    'playground.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"
     role="img" aria-label="Playground: ${tiles.join(', ')}">
  <defs><filter id="g3" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="40"/></filter></defs>
  <rect width="${w}" height="${h}" rx="18" fill="${C.night}"/>
  <circle cx="${w - 40}" cy="${h - 30}" r="90" fill="${C.orb[2]}" opacity=".16" filter="url(#g3)"/>
  <circle cx="40" cy="20" r="90" fill="${C.orb[1]}" opacity=".14" filter="url(#g3)"/>
  <rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="17.5" fill="none" stroke="${C.slate}" stroke-opacity=".16"/>
  ${cells.join('\n  ')}
</svg>`
  );
}

/* ═══════════════════════════════════════════════════════════
   6 · BELL BUTTONS  —  the pill buttons from the hero
   ═══════════════════════════════════════════════════════════ */
const ICONS = {
  globe: '<circle cx="7" cy="7" r="5.6"/><path d="M1.4 7h11.2M7 1.4c1.7 1.8 2.5 3.7 2.5 5.6S8.7 10.8 7 12.6C5.3 10.8 4.5 8.9 4.5 7S5.3 3.2 7 1.4"/>',
  code: '<path d="M5 3 1.4 7 5 11M9 3l3.6 4L9 11"/>',
  arrow: '<path d="M1.6 7h9.4M7.4 3.4 11 7l-3.6 3.6"/>',
  down: '<path d="M7 1.6v6.8M4.1 5.6 7 8.5l2.9-2.9M2.2 12h9.6"/>',
  mail: '<rect x="1.3" y="3.2" width="11.4" height="7.6" rx="1.4"/><path d="m1.7 4 5.3 3.9L12.3 4"/>',
  play: '<path d="M3.4 1.9v10.2L12 7z"/>',
  spark: '<path d="M7 1.2 8.5 5.3l4.3 1.7-4.3 1.7L7 12.8 5.5 8.7 1.2 7l4.3-1.7z"/>',
  server: '<rect x="1.4" y="2.4" width="11.2" height="4" rx="1.2"/><rect x="1.4" y="7.6" width="11.2" height="4" rx="1.2"/>',
};
const FILLED = new Set(['play', 'spark']);

function bell(file, label, variant, icon) {
  const fs = 13, cw = fs * 0.61 + 1.2, h = 44, b = 3, padX = 24, iconW = 14, iconGap = 10;
  const textW = label.length * cw;
  const w = Math.round(b * 2 + padX * 2 + iconW + iconGap + textW);
  const startX = (w - (iconW + iconGap + textW)) / 2;
  const primary = variant === 'primary';
  const fg = primary ? '#e2e8f0' : C.rust;
  const id = file.replace(/[^a-z0-9]/gi, '');

  write(
    file,
    `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"
     role="img" aria-label="${label}">
  <defs>
    <linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1">
      ${
        primary
          ? '<stop offset="0%" stop-color="#2a5a7e"/><stop offset="40%" stop-color="#1a4a6e"/><stop offset="100%" stop-color="#0c3a5e"/>'
          : '<stop offset="0%" stop-color="#fef3c7"/><stop offset="50%" stop-color="#fde68a"/><stop offset="100%" stop-color="#fbbf24"/>'
      }
    </linearGradient>
    <radialGradient id="s${id}" cx="35%" cy="22%" r="62%">
      <stop offset="0%" stop-color="#fff" stop-opacity="${primary ? '.32' : '.5'}"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <filter id="f${id}" x="-25%" y="-25%" width="150%" height="170%">
      <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="${primary ? '#1e293b' : '#b45309'}" flood-opacity=".45"/>
    </filter>
  </defs>
  <g filter="url(#f${id})">
    <rect x="${b / 2}" y="${b / 2}" width="${w - b}" height="${h - b}" rx="${(h - b) / 2}"
          fill="url(#b${id})" stroke="${primary ? '#64748b' : '#a16207'}" stroke-width="${b}"/>
    <rect x="${b}" y="${b}" width="${w - b * 2}" height="${h - b * 2}" rx="${(h - b * 2) / 2}" fill="url(#s${id})"/>
  </g>
  <g transform="translate(${startX.toFixed(1)} 15)" fill="${FILLED.has(icon) ? fg : 'none'}"
     stroke="${FILLED.has(icon) ? 'none' : fg}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    ${ICONS[icon]}
  </g>
  <text x="${(startX + iconW + iconGap).toFixed(1)}" y="27.5" font-family="${MONO}" font-size="${fs}"
        font-weight="700" letter-spacing="1.2" fill="${fg}">${label}</text>
</svg>`
  );
}

bell('btn-website.svg', 'VISIT THE SITE', 'primary', 'globe');
bell('btn-contact.svg', 'GET IN TOUCH', 'secondary', 'mail');
bell('btn-live.svg', 'LIVE', 'secondary', 'arrow');
bell('btn-code.svg', 'SOURCE', 'primary', 'code');
bell('btn-backend.svg', 'BACKEND', 'primary', 'server');
bell('btn-apk.svg', 'APK', 'secondary', 'down');
bell('btn-playstore.svg', 'PLAY STORE', 'secondary', 'play');
bell('btn-playground.svg', 'ENTER THE PLAYGROUND', 'secondary', 'spark');
bell('btn-mail.svg', 'WRITE ME', 'primary', 'mail');
bell('btn-so.svg', 'STACK OVERFLOW', 'primary', 'arrow');

console.log('\nDone — assets written to /assets\n');
