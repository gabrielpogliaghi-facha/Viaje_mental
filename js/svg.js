// ═══════════════════════════════════════════════════
//  SVG VISUALS — Iconos abstractos, enemigos, fondos
// ═══════════════════════════════════════════════════

// ─── Iconos de tipos de carta ───────────────────────

const CARD_TYPE_ICONS = {
    attack: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <line x1="9" y1="31" x2="31" y2="9" stroke-width="3.5"/>
        <polyline points="21,9 31,9 31,19" stroke-width="3.5"/>
        <line x1="9" y1="31" x2="17" y2="23" stroke-width="2" opacity="0.35"/>
        <line x1="9" y1="27" x2="13" y2="31" stroke-width="1.5" opacity="0.2"/>
    </svg>`,

    defense: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 4 L34 10 L34 22 Q34 34 20 38 Q6 34 6 22 L6 10 Z" stroke-width="2.5"/>
        <path d="M20 16 L20 28" stroke-width="2" opacity="0.45"/>
        <path d="M14 22 L26 22" stroke-width="2" opacity="0.45"/>
    </svg>`,

    heal: `<svg viewBox="0 0 40 40">
        <rect x="16" y="8"  width="8" height="24" rx="3.5" fill="currentColor"/>
        <rect x="8"  y="16" width="24" height="8"  rx="3.5" fill="currentColor"/>
        <rect x="18" y="10" width="4" height="20" rx="2" fill="rgba(255,255,255,0.15)"/>
    </svg>`,

    utility: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round">
        <circle cx="20" cy="20" r="7" stroke-width="2.5"/>
        <line x1="20" y1="5"  x2="20" y2="10" stroke-width="2.5"/>
        <line x1="20" y1="30" x2="20" y2="35" stroke-width="2.5"/>
        <line x1="5"  y1="20" x2="10" y2="20" stroke-width="2.5"/>
        <line x1="30" y1="20" x2="35" y2="20" stroke-width="2.5"/>
        <line x1="8.8"  y1="8.8"  x2="12.5" y2="12.5" stroke-width="1.8"/>
        <line x1="27.5" y1="27.5" x2="31.2" y2="31.2" stroke-width="1.8"/>
        <line x1="31.2" y1="8.8"  x2="27.5" y2="12.5" stroke-width="1.8"/>
        <line x1="12.5" y1="27.5" x2="8.8"  y2="31.2" stroke-width="1.8"/>
    </svg>`
};

// ─── Formas abstractas de enemigos por acto ──────────

function getEnemySymbol(enemy) {
    const act = enemy.act !== undefined ? enemy.act : 4;
    const boss = !!enemy.boss;
    const s = boss ? '88' : '68';
    const sw = boss ? '3' : '2.5';

    const colors = ['#60a5fa', '#f97316', '#a78bfa', '#f87171', '#e2e8f0'];
    const c = colors[act] ?? '#60a5fa';

    const ring = boss
        ? `<circle cx="30" cy="30" r="28" stroke="${c}" stroke-width="1" opacity="0.25" stroke-dasharray="6 3"/>`
        : '';

    const shapes = {
        // SOLEDAD — círculos concéntricos vacíos, centro sólido
        0: `<svg viewBox="0 0 60 60" width="${s}" height="${s}" fill="none">
            <circle cx="30" cy="30" r="24" stroke="${c}" stroke-width="${sw}" stroke-dasharray="5 3.5" opacity="0.9"/>
            <circle cx="30" cy="30" r="14" stroke="${c}" stroke-width="${parseFloat(sw)-0.5}" opacity="0.6"/>
            <circle cx="30" cy="30" r="5" fill="${c}" opacity="0.85"/>
            ${ring}
        </svg>`,

        // IRA — triángulos anidados, agresivos
        1: `<svg viewBox="0 0 60 60" width="${s}" height="${s}" fill="none">
            <polygon points="30,5 55,51 5,51" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round" opacity="0.9"/>
            <polygon points="30,20 45,47 15,47" stroke="${c}" stroke-width="${parseFloat(sw)-0.5}" opacity="0.55"/>
            <polygon points="30,33 39,46 21,46" fill="${c}" opacity="0.75"/>
            ${ring}
        </svg>`,

        // TRISTEZA — gota/lágrima descendente
        2: `<svg viewBox="0 0 60 60" width="${s}" height="${s}" fill="none">
            <path d="M30 7 Q46 24 46 38 Q46 54 30 56 Q14 54 14 38 Q14 24 30 7Z" stroke="${c}" stroke-width="${sw}" opacity="0.9"/>
            <path d="M30 20 Q40 32 40 40 Q40 50 30 52 Q20 50 20 40 Q20 32 30 20Z" stroke="${c}" stroke-width="${parseFloat(sw)-0.5}" opacity="0.5"/>
            <ellipse cx="30" cy="43" rx="5.5" ry="5" fill="${c}" opacity="0.8"/>
            ${ring}
        </svg>`,

        // MIEDO — ojo alargado con pupila
        3: `<svg viewBox="0 0 60 60" width="${s}" height="${s}" fill="none">
            <ellipse cx="30" cy="30" rx="26" ry="16" stroke="${c}" stroke-width="${sw}" opacity="0.9"/>
            <circle cx="30" cy="30" r="10" stroke="${c}" stroke-width="${parseFloat(sw)-0.5}" opacity="0.7"/>
            <circle cx="30" cy="30" r="4.5" fill="${c}" opacity="0.95"/>
            <circle cx="28" cy="28" r="1.8" fill="rgba(255,255,255,0.5)"/>
            ${ring}
        </svg>`,

        // CEREBRO — nodos conectados, circuitos
        4: `<svg viewBox="0 0 60 60" width="${s}" height="${s}" fill="none">
            <circle cx="20" cy="18" r="6" stroke="${c}" stroke-width="${parseFloat(sw)-0.5}" opacity="0.75"/>
            <circle cx="40" cy="18" r="6" stroke="${c}" stroke-width="${parseFloat(sw)-0.5}" opacity="0.75"/>
            <circle cx="20" cy="42" r="6" stroke="${c}" stroke-width="${parseFloat(sw)-0.5}" opacity="0.75"/>
            <circle cx="40" cy="42" r="6" stroke="${c}" stroke-width="${parseFloat(sw)-0.5}" opacity="0.75"/>
            <circle cx="30" cy="30" r="9" stroke="${c}" stroke-width="${sw}" opacity="0.95"/>
            <line x1="25" y1="22" x2="27" y2="26" stroke="${c}" stroke-width="1.5" opacity="0.65"/>
            <line x1="35" y1="22" x2="33" y2="26" stroke="${c}" stroke-width="1.5" opacity="0.65"/>
            <line x1="25" y1="38" x2="27" y2="34" stroke="${c}" stroke-width="1.5" opacity="0.65"/>
            <line x1="35" y1="38" x2="33" y2="34" stroke="${c}" stroke-width="1.5" opacity="0.65"/>
            ${ring}
        </svg>`
    };

    return shapes[act] ?? shapes[0];
}

// ─── Fondos abstractos por acto ──────────────────────

const ACT_BG_SVGS = {
    // SOLEDAD — ondas suaves, azul oscuro
    0: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <path d="M-100,180 Q150,120 400,180 Q650,240 900,180 Q1100,130 1200,180" fill="none" stroke="#4c9aff" stroke-width="2.5" opacity="0.35"/>
        <path d="M-100,280 Q200,220 500,280 Q750,330 1000,270 Q1150,230 1300,280" fill="none" stroke="#4c9aff" stroke-width="1.8" opacity="0.22"/>
        <path d="M-100,380 Q250,320 500,380 Q750,440 1000,380 Q1150,340 1300,380" fill="none" stroke="#4c9aff" stroke-width="1.2" opacity="0.15"/>
        <path d="M-100,480 Q300,420 600,480 Q850,540 1100,470 Q1200,440 1400,480" fill="none" stroke="#4c9aff" stroke-width="0.8" opacity="0.1"/>
        <circle cx="150" cy="140" r="90" fill="none" stroke="#4c9aff" stroke-width="1" opacity="0.12"/>
        <circle cx="850" cy="460" r="130" fill="none" stroke="#4c9aff" stroke-width="1" opacity="0.1"/>
        <circle cx="520" cy="300" r="220" fill="none" stroke="#4c9aff" stroke-width="0.5" opacity="0.06"/>
    </svg>`,

    // IRA — formas angulares, naranja-rojo
    1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <polygon points="0,0 320,0 80,600" fill="#f97316" opacity="0.07"/>
        <polygon points="680,0 1000,0 1000,420" fill="#ef4444" opacity="0.06"/>
        <polygon points="380,80 620,80 500,320" fill="#fbbf24" opacity="0.05" stroke="#f97316" stroke-width="1.5"/>
        <line x1="0" y1="0" x2="520" y2="600" stroke="#f97316" stroke-width="2" opacity="0.12"/>
        <line x1="1000" y1="0" x2="380" y2="600" stroke="#ef4444" stroke-width="1.5" opacity="0.09"/>
        <line x1="260" y1="0" x2="780" y2="600" stroke="#fbbf24" stroke-width="1" opacity="0.07"/>
        <line x1="740" y1="0" x2="200" y2="600" stroke="#f97316" stroke-width="0.8" opacity="0.05"/>
        <polygon points="100,580 280,580 190,420" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.1"/>
        <polygon points="700,20 860,20 780,200" fill="none" stroke="#f97316" stroke-width="1.5" opacity="0.1"/>
    </svg>`,

    // TRISTEZA — formas caídas, gris-púrpura
    2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="180" cy="180" rx="160" ry="110" fill="none" stroke="#8b5cf6" stroke-width="1.5" opacity="0.14"/>
        <ellipse cx="820" cy="420" rx="200" ry="130" fill="none" stroke="#6b5aff" stroke-width="1.5" opacity="0.12"/>
        <path d="M100,80 Q80,240 110,420 Q90,540 160,580" fill="none" stroke="#8b5cf6" stroke-width="2" opacity="0.13"/>
        <path d="M380,40 Q340,200 360,420 Q350,530 300,590" fill="none" stroke="#6b5aff" stroke-width="1.5" opacity="0.1"/>
        <path d="M640,60 Q620,240 650,440 Q640,550 580,600" fill="none" stroke="#8b5cf6" stroke-width="1.8" opacity="0.12"/>
        <path d="M880,80 Q900,260 870,460 Q890,560 940,590" fill="none" stroke="#6b5aff" stroke-width="1.5" opacity="0.1"/>
        <circle cx="120" cy="520" r="4" fill="#8b5cf6" opacity="0.15"/>
        <circle cx="340" cy="550" r="3" fill="#6b5aff" opacity="0.12"/>
        <circle cx="560" cy="530" r="5" fill="#8b5cf6" opacity="0.15"/>
        <circle cx="780" cy="545" r="3.5" fill="#6b5aff" opacity="0.12"/>
        <circle cx="950" cy="520" r="4" fill="#8b5cf6" opacity="0.15"/>
    </svg>`,

    // MIEDO — ojo central, formas dispersas, rojo oscuro
    3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="500" cy="300" rx="340" ry="180" fill="none" stroke="#dc2626" stroke-width="1.5" opacity="0.1"/>
        <ellipse cx="500" cy="300" rx="120" ry="80" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.14"/>
        <circle cx="500" cy="300" r="35" fill="#991b1b" opacity="0.08"/>
        <circle cx="500" cy="300" r="15" fill="#dc2626" opacity="0.06"/>
        <circle cx="100" cy="100" r="45" fill="none" stroke="#ef4444" stroke-width="1" opacity="0.1"/>
        <circle cx="900" cy="500" r="65" fill="none" stroke="#dc2626" stroke-width="1.5" opacity="0.12"/>
        <circle cx="200" cy="480" r="30" fill="none" stroke="#ef4444" stroke-width="0.8" opacity="0.08"/>
        <circle cx="800" cy="120" r="50" fill="none" stroke="#dc2626" stroke-width="1" opacity="0.09"/>
        <line x1="0" y1="120" x2="220" y2="140" stroke="#ef4444" stroke-width="1" opacity="0.09"/>
        <line x1="780" y1="80" x2="1000" y2="60" stroke="#dc2626" stroke-width="1" opacity="0.09"/>
        <line x1="0" y1="480" x2="160" y2="460" stroke="#ef4444" stroke-width="0.8" opacity="0.07"/>
        <line x1="840" y1="540" x2="1000" y2="520" stroke="#dc2626" stroke-width="0.8" opacity="0.07"/>
    </svg>`,

    // CEREBRO — cuadrícula simétrica, blanco-azul
    4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <line x1="0" y1="150" x2="1000" y2="150" stroke="#e2e8f0" stroke-width="0.8" opacity="0.08"/>
        <line x1="0" y1="300" x2="1000" y2="300" stroke="#e2e8f0" stroke-width="1.2" opacity="0.1"/>
        <line x1="0" y1="450" x2="1000" y2="450" stroke="#e2e8f0" stroke-width="0.8" opacity="0.08"/>
        <line x1="200" y1="0" x2="200" y2="600" stroke="#e2e8f0" stroke-width="0.8" opacity="0.08"/>
        <line x1="400" y1="0" x2="400" y2="600" stroke="#e2e8f0" stroke-width="0.8" opacity="0.08"/>
        <line x1="500" y1="0" x2="500" y2="600" stroke="#93c5fd" stroke-width="1.2" opacity="0.1"/>
        <line x1="600" y1="0" x2="600" y2="600" stroke="#e2e8f0" stroke-width="0.8" opacity="0.08"/>
        <line x1="800" y1="0" x2="800" y2="600" stroke="#e2e8f0" stroke-width="0.8" opacity="0.08"/>
        <circle cx="200" cy="150" r="9" fill="none" stroke="#93c5fd" stroke-width="1.2" opacity="0.15"/>
        <circle cx="800" cy="150" r="9" fill="none" stroke="#93c5fd" stroke-width="1.2" opacity="0.15"/>
        <circle cx="500" cy="300" r="22" fill="none" stroke="#93c5fd" stroke-width="2"   opacity="0.18"/>
        <circle cx="200" cy="450" r="9" fill="none" stroke="#93c5fd" stroke-width="1.2" opacity="0.15"/>
        <circle cx="800" cy="450" r="9" fill="none" stroke="#93c5fd" stroke-width="1.2" opacity="0.15"/>
        <line x1="200" y1="150" x2="500" y2="300" stroke="#93c5fd" stroke-width="0.8" opacity="0.1"/>
        <line x1="800" y1="150" x2="500" y2="300" stroke="#93c5fd" stroke-width="0.8" opacity="0.1"/>
        <line x1="200" y1="450" x2="500" y2="300" stroke="#93c5fd" stroke-width="0.8" opacity="0.1"/>
        <line x1="800" y1="450" x2="500" y2="300" stroke="#93c5fd" stroke-width="0.8" opacity="0.1"/>
    </svg>`
};

// ─── Símbolo abstracto del acto (modales, acto completado) ──
function getActSymbolSVG(actIndex, size = 64) {
    const colors = ['#4c9aff', '#ff6b6b', '#6b5aff', '#ffaa00', '#e2e8f0'];
    const c = colors[actIndex] ?? '#4c9aff';

    const symbols = [
        // SOLEDAD — anillos concéntricos con olas
        `<svg viewBox="0 0 60 60" width="${size}" height="${size}" fill="none">
            <circle cx="30" cy="30" r="25" stroke="${c}" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.45"/>
            <circle cx="30" cy="30" r="16" stroke="${c}" stroke-width="2" opacity="0.75"/>
            <circle cx="30" cy="30" r="6.5" fill="${c}" opacity="0.9"/>
            <path d="M8 28 Q18 22 30 22 Q42 22 52 28" stroke="${c}" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
            <path d="M8 38 Q18 44 30 44 Q42 44 52 38" stroke="${c}" stroke-width="1.2" stroke-linecap="round" opacity="0.3"/>
        </svg>`,
        // IRA — triángulos anidados ascendentes
        `<svg viewBox="0 0 60 60" width="${size}" height="${size}" fill="none">
            <polygon points="30,6 54,50 6,50" stroke="${c}" stroke-width="2.5" stroke-linejoin="round" opacity="0.9"/>
            <polygon points="30,20 44,46 16,46" stroke="${c}" stroke-width="1.8" opacity="0.5"/>
            <polygon points="30,33 38,47 22,47" fill="${c}" opacity="0.8"/>
        </svg>`,
        // TRISTEZA — gota/lágrima
        `<svg viewBox="0 0 60 60" width="${size}" height="${size}" fill="none">
            <path d="M30 8 Q46 24 46 38 Q46 54 30 56 Q14 54 14 38 Q14 24 30 8Z" stroke="${c}" stroke-width="2.5" opacity="0.85"/>
            <path d="M30 22 Q40 33 40 41 Q40 50 30 52 Q20 50 20 41 Q20 33 30 22Z" stroke="${c}" stroke-width="1.5" opacity="0.45"/>
            <ellipse cx="30" cy="44" rx="5.5" ry="5" fill="${c}" opacity="0.8"/>
        </svg>`,
        // MIEDO — ojo con pupila
        `<svg viewBox="0 0 60 60" width="${size}" height="${size}" fill="none">
            <ellipse cx="30" cy="30" rx="26" ry="16" stroke="${c}" stroke-width="2.5" opacity="0.85"/>
            <circle cx="30" cy="30" r="10" stroke="${c}" stroke-width="1.8" opacity="0.65"/>
            <circle cx="30" cy="30" r="4.5" fill="${c}" opacity="0.95"/>
            <circle cx="28" cy="28" r="2" fill="rgba(255,255,255,0.45)"/>
        </svg>`,
        // CEREBRO — nodos conectados
        `<svg viewBox="0 0 60 60" width="${size}" height="${size}" fill="none">
            <circle cx="20" cy="18" r="6" stroke="${c}" stroke-width="1.5" opacity="0.7"/>
            <circle cx="40" cy="18" r="6" stroke="${c}" stroke-width="1.5" opacity="0.7"/>
            <circle cx="20" cy="42" r="6" stroke="${c}" stroke-width="1.5" opacity="0.7"/>
            <circle cx="40" cy="42" r="6" stroke="${c}" stroke-width="1.5" opacity="0.7"/>
            <circle cx="30" cy="30" r="9" stroke="${c}" stroke-width="2.5" opacity="0.95"/>
            <line x1="25" y1="22" x2="27" y2="26" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
            <line x1="35" y1="22" x2="33" y2="26" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
            <line x1="25" y1="38" x2="27" y2="34" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
            <line x1="35" y1="38" x2="33" y2="34" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
        </svg>`
    ];

    return symbols[actIndex] ?? symbols[0];
}

// ─── Símbolos abstractos de eventos ──────────────────

const EVENT_SYMBOLS = {
    voz_interior: `<svg viewBox="0 0 60 60" width="56" height="56" fill="none">
        <path d="M32 18 Q42 24 42 30 Q42 36 32 42" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
        <path d="M24 12 Q40 22 40 30 Q40 38 24 48" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
        <path d="M16 7 Q38 20 38 30 Q38 40 16 53" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round" opacity="0.28"/>
        <circle cx="30" cy="30" r="4.5" fill="#8b5cf6" opacity="0.85"/>
    </svg>`,

    espejo_mente: `<svg viewBox="0 0 60 60" width="56" height="56" fill="none">
        <ellipse cx="20" cy="30" rx="11" ry="17" stroke="#3b82f6" stroke-width="2.5" opacity="0.85"/>
        <ellipse cx="40" cy="30" rx="11" ry="17" stroke="#3b82f6" stroke-width="2.5" opacity="0.85"/>
        <line x1="30" y1="13" x2="30" y2="47" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4 3" opacity="0.4"/>
        <circle cx="20" cy="30" r="4" stroke="#3b82f6" stroke-width="1.5" opacity="0.4"/>
        <circle cx="40" cy="30" r="4" stroke="#3b82f6" stroke-width="1.5" opacity="0.4"/>
    </svg>`,

    altar_emocional: `<svg viewBox="0 0 60 60" width="56" height="56" fill="none">
        <polygon points="30,8 50,30 30,46 10,30" stroke="#fbbf24" stroke-width="2.5" opacity="0.9"/>
        <polygon points="30,18 42,30 30,40 18,30" stroke="#fbbf24" stroke-width="1.5" opacity="0.4"/>
        <circle cx="30" cy="30" r="4.5" fill="#fbbf24" opacity="0.75"/>
        <line x1="20" y1="46" x2="40" y2="46" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
        <line x1="14" y1="52" x2="46" y2="52" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
    </svg>`,

    susurros_olvido: `<svg viewBox="0 0 60 60" width="56" height="56" fill="none">
        <path d="M5 22 Q15 16 25 22 Q35 28 45 22 Q52 18 56 22" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
        <path d="M5 31 Q15 25 25 31 Q35 37 45 31 Q52 27 56 31" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M5 40 Q15 34 25 40 Q35 46 45 40 Q52 36 56 40" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" opacity="0.32"/>
        <circle cx="10" cy="22" r="2" fill="#94a3b8" opacity="0.4"/>
        <circle cx="50" cy="31" r="2" fill="#94a3b8" opacity="0.4"/>
        <circle cx="30" cy="40" r="2" fill="#94a3b8" opacity="0.35"/>
    </svg>`,

    mercader_sombras: `<svg viewBox="0 0 60 60" width="56" height="56" fill="none">
        <polygon points="15,30 30,14 45,30 30,46" stroke="#fbbf24" stroke-width="2.5" stroke-linejoin="round" opacity="0.9"/>
        <polygon points="30,22 38,30 30,38 22,30" fill="#fbbf24" opacity="0.22"/>
        <line x1="8" y1="22" x2="15" y2="29" stroke="#fbbf24" stroke-width="1.5" opacity="0.4"/>
        <line x1="8" y1="38" x2="15" y2="31" stroke="#fbbf24" stroke-width="1.5" opacity="0.4"/>
        <line x1="52" y1="22" x2="45" y2="29" stroke="#fbbf24" stroke-width="1.5" opacity="0.4"/>
        <line x1="52" y1="38" x2="45" y2="31" stroke="#fbbf24" stroke-width="1.5" opacity="0.4"/>
    </svg>`,

    oraculo_mental: `<svg viewBox="0 0 60 60" width="56" height="56" fill="none">
        <circle cx="30" cy="30" r="24" stroke="#8b5cf6" stroke-width="1.2" stroke-dasharray="6 3" opacity="0.38"/>
        <circle cx="30" cy="30" r="16" stroke="#8b5cf6" stroke-width="2" opacity="0.65"/>
        <circle cx="30" cy="30" r="9" stroke="#8b5cf6" stroke-width="1.8" opacity="0.55"/>
        <circle cx="30" cy="30" r="3.5" fill="#8b5cf6" opacity="0.95"/>
        <circle cx="28.5" cy="28.5" r="1.5" fill="rgba(255,255,255,0.5)"/>
    </svg>`
};

function getEventSymbolSVG(eventId) {
    return EVENT_SYMBOLS[eventId] ?? `<svg viewBox="0 0 60 60" width="56" height="56" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round">
        <circle cx="30" cy="30" r="24"/>
        <line x1="30" y1="20" x2="30" y2="32" stroke-width="2.5"/>
        <circle cx="30" cy="40" r="2" fill="#8b5cf6"/>
    </svg>`;
}

// ─── Partículas flotantes sutiles ────────────────────
function generateParticles(color, count = 10) {
    let dots = '';
    for (let i = 0; i < count; i++) {
        const x = 5 + Math.random() * 90;
        const y = 5 + Math.random() * 90;
        const r = 0.8 + Math.random() * 1.4;
        const op = (0.04 + Math.random() * 0.07).toFixed(3);
        dots += `<circle cx="${(x * 10).toFixed(0)}" cy="${(y * 6).toFixed(0)}" r="${r}" fill="${color}" opacity="${op}"/>`;
    }
    return dots;
}

// Inyectar fondo del acto en el DOM
function updateActBackground(actIndex) {
    const bg = document.getElementById('actBg');
    if (!bg) return;

    const colors = ['#4c9aff', '#f97316', '#8b5cf6', '#ef4444', '#93c5fd'];
    const c = colors[actIndex] ?? '#4c9aff';

    const baseSvg = ACT_BG_SVGS[actIndex] ?? ACT_BG_SVGS[0];
    // Inyecta partículas dentro del SVG antes del cierre
    const withParticles = baseSvg.replace(
        '</svg>',
        `${generateParticles(c, 10)}</svg>`
    );
    bg.innerHTML = withParticles;
}

// Generar HTML de carta estilo MTG (usable en mano, recompensas y tienda)
function renderCardMTG(cardType, options = {}) {
    const card = CARDS[cardType];
    if (!card) return '';

    const { onclick = null, disabled = false, compact = false } = options;

    const costClass = card.cost === 0 ? 'cost-free'
        : card.cost <= 2 ? 'cost-blue'
        : card.cost === 3 ? 'cost-purple'
        : 'cost-orange';

    const typeLabels = { attack: 'Ataque', defense: 'Defensa', heal: 'Curación', utility: 'Utilidad' };
    const typeLabel = typeLabels[card.type] || 'Carta';
    const icon = CARD_TYPE_ICONS[card.type] || CARD_TYPE_ICONS.utility;

    const disabledClass = disabled ? 'disabled' : '';
    const clickAttr = onclick && !disabled ? `onclick="${onclick}"` : '';
    const compactClass = compact ? 'card-compact' : '';

    return `
        <div class="card rarity-${card.rarity} type-${card.type} ${disabledClass} ${compactClass}" ${clickAttr}>
            <div class="card-cost-pip ${costClass}">${card.cost}</div>
            <div class="card-header-bar">
                <span class="card-name">${card.name}</span>
            </div>
            <div class="card-art-area">
                <div class="card-type-icon">${icon}</div>
                ${card.exhaust ? '<div class="exhaust-mini">◈ Agota</div>' : ''}
            </div>
            <div class="card-type-line">${typeLabel}</div>
            <div class="card-text-box">
                <span class="card-desc-text">${card.description}</span>
            </div>
        </div>
    `;
}
