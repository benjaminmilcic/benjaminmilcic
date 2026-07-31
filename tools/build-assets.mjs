/**
 * Builds every SVG graphic used by the profile README.
 * Design tokens are lifted 1:1 from the hero of auf-zu-neuen-welten.de.
 *
 *   node tools/build-assets.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'assets');
/** Tool logos are reused from the portfolio project. */
const ICON_SRC = join(HERE, '..', '..', 'aznw-routes', 'src', 'assets', 'svg');
mkdirSync(OUT, { recursive: true });

/** SVG is XML — anything going into a text node or attribute needs escaping. */
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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
   4 · STACK BOARD  —  two groups, every tool with its own logo
   ═══════════════════════════════════════════════════════════ */
{
  /** Reads a logo from the portfolio project and inlines it as a data URI. */
  const logo = (file) => {
    const raw = readFileSync(join(ICON_SRC, file), 'utf8');
    return 'data:image/svg+xml;base64,' + Buffer.from(raw, 'utf8').toString('base64');
  };
  /** TypeScript has no logo in the portfolio assets, so draw one. */
  const tsLogo =
    'data:image/svg+xml;base64,' +
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="2.5" fill="#3178c6"/><path d="M13.1 18.9v-2.3c.4.2.8.4 1.3.5s.9.2 1.4.2c.3 0 .5 0 .8-.1.2 0 .4-.1.5-.2l.3-.3c.1-.1.1-.2.1-.4l-.2-.4-.4-.4-.7-.3-.8-.4c-.8-.3-1.3-.7-1.7-1.2s-.6-1-.6-1.7c0-.5.1-1 .3-1.4s.5-.7.9-.9.8-.4 1.3-.5 1-.2 1.5-.2 1 0 1.4.1.8.1 1.1.3v2.2c-.2-.1-.4-.2-.6-.3l-.6-.2-.6-.1h-1.2l-.5.2c-.1.1-.2.2-.3.3l-.1.4c0 .1 0 .3.1.4l.3.3.6.3.8.4.9.5.7.5c.2.2.3.4.4.7s.2.6.2.9c0 .6-.1 1.1-.3 1.5s-.5.7-.9.9-.8.4-1.3.5-1 .1-1.6.1-1.1 0-1.6-.1-.9-.3-1.3-.5zM12 9.1H8.9V19H6.1V9.1H3V6.9h9z" fill="#fff"/></svg>`,
      'utf8'
    ).toString('base64');

  const groups = [
    [
      'FRONTEND',
      [
        ['Angular', logo('angular.svg')],
        ['Ionic', logo('ionic.svg')],
        ['TypeScript', tsLogo],
        ['RxJS', logo('rxjs.svg')],
        ['NgRx', logo('ngrx.svg')],
        ['Tailwind', logo('tailwind.svg')],
        ['HTML5', logo('html5.svg')],
        ['CSS3', logo('css3.svg')],
        ['JavaScript', logo('js.svg')],
      ],
    ],
    [
      'BACKEND & TOOLS',
      [
        ['NestJS', logo('nestjs.svg')],
        ['Node.js', logo('nodejs.svg')],
        ['MySQL', logo('mysql.svg')],
        ['Firebase', logo('firebase.svg')],
        ['Cypress', logo('cypress.svg')],
        ['Docker', logo('docker.svg')],
        ['npm', logo('npm.svg')],
      ],
    ],
  ];

  const W2 = 1000, pad = 30, usable = W2 - pad * 2;
  const fs = 13, cw = fs * 0.61, ic = 20, iGap = 10, padX = 14, chipH = 38, gap = 10;
  let y = 32;
  const out = [];

  for (const [label, chips] of groups) {
    out.push(
      `<text x="${pad}" y="${y}" font-family="${MONO}" font-size="11" letter-spacing="2" fill="${C.orange}">${esc(label)}</text>`
    );
    // Balance the wrap: 8 chips + 1 orphan on the next line looks broken,
    // so aim for rows of roughly equal width instead of filling greedily.
    const widths = chips.map(([n]) => Math.round(padX * 2 + ic + iGap + n.length * cw));
    const total = widths.reduce((a, b) => a + b + gap, -gap);
    const rowCount = Math.ceil(total / usable);
    const target = total / rowCount;

    let x = pad;
    let line = y + 14;
    let rowW = 0;
    chips.forEach(([name, href], i) => {
      const w = widths[i];
      if (rowW && (rowW + gap + w > usable || rowW + gap + w / 2 > target)) {
        x = pad;
        line += chipH + gap;
        rowW = 0;
      }
      rowW += (rowW ? gap : 0) + w;
      out.push(`<g>
    <rect x="${x}" y="${line}" width="${w}" height="${chipH}" rx="10" fill="${C.slate}" fill-opacity=".08" stroke="${C.slate}" stroke-opacity=".18"/>
    <image href="${href}" x="${x + padX}" y="${line + (chipH - ic) / 2}" width="${ic}" height="${ic}"/>
    <text x="${x + padX + ic + iGap}" y="${line + chipH / 2 + 4.5}" font-family="${MONO}" font-size="${fs}" fill="${C.slateLight}">${esc(name)}</text>
  </g>`);
      x += w + gap;
    });
    y = line + chipH + 40;
  }
  const h = y - 40 + pad;

  write(
    'stack.svg',
    `
<svg xmlns="http://www.w3.org/2000/svg" width="${W2}" height="${h}" viewBox="0 0 ${W2} ${h}"
     role="img" aria-label="Frontend: Angular, Ionic, TypeScript, RxJS, NgRx, Tailwind, HTML5, CSS3, JavaScript. Backend and tools: NestJS, Node.js, MySQL, Firebase, Cypress, Docker, npm">
  <defs><filter id="g2" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="38"/></filter></defs>
  <rect width="${W2}" height="${h}" rx="18" fill="${C.night}"/>
  <circle cx="60" cy="${h - 20}" r="80" fill="${C.orb[0]}" opacity=".18" filter="url(#g2)"/>
  <circle cx="960" cy="30" r="80" fill="${C.orb[1]}" opacity=".16" filter="url(#g2)"/>
  <rect x=".5" y=".5" width="${W2 - 1}" height="${h - 1}" rx="17.5" fill="none" stroke="${C.slate}" stroke-opacity=".16"/>
  ${out.join('\n  ')}
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
   6 · BUTTONS  —  flat, quiet, one accent variant
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

function button(file, label, variant, icon) {
  const fs = 12, cw = fs * 0.61 + 0.9, h = 34, padX = 13, iconW = 13, iconGap = 8;
  const w = Math.round(padX * 2 + iconW + iconGap + label.length * cw);
  const accent = variant === 'accent';
  const fill = accent ? C.orange : '#1e293b';
  const edge = accent ? '#c2410c' : '#475569';
  const fg = accent ? '#3b1206' : '#e2e8f0';

  write(
    file,
    `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"
     role="img" aria-label="${label}">
  <rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="7.5" fill="${fill}" stroke="${edge}"/>
  <g transform="translate(${padX} ${(h - 14) / 2})" fill="${FILLED.has(icon) ? fg : 'none'}"
     stroke="${FILLED.has(icon) ? 'none' : fg}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    ${ICONS[icon]}
  </g>
  <text x="${padX + iconW + iconGap}" y="${h / 2 + 4.2}" font-family="${MONO}" font-size="${fs}"
        letter-spacing=".9" fill="${fg}">${label}</text>
</svg>`
  );
}

button('btn-website.svg', 'VISIT THE SITE', 'accent', 'globe');
button('btn-contact.svg', 'GET IN TOUCH', 'dark', 'mail');
button('btn-live.svg', 'LIVE', 'dark', 'arrow');
button('btn-code.svg', 'SOURCE', 'dark', 'code');
button('btn-backend.svg', 'BACKEND', 'dark', 'server');
button('btn-apk.svg', 'APK', 'dark', 'down');
button('btn-playstore.svg', 'PLAY STORE', 'dark', 'play');
button('btn-playground.svg', 'ENTER THE PLAYGROUND', 'accent', 'spark');
button('btn-mail.svg', 'WRITE ME', 'accent', 'mail');
button('btn-so.svg', 'STACK OVERFLOW', 'dark', 'arrow');

console.log('\nDone — assets written to /assets\n');
