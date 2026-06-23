const ACTS = [
    {
        id: 0,
        name: 'SOLEDAD',
        emoji: '🌊',
        color: '#4c9aff',
        description: 'El primer dilema: la profunda soledad del ser'
    },
    {
        id: 1,
        name: 'IRA',
        emoji: '🔥',
        color: '#ff6b6b',
        description: 'La ira ardiente que consume'
    },
    {
        id: 2,
        name: 'TRISTEZA',
        emoji: '💔',
        color: '#6b5aff',
        description: 'La tristeza que abruma'
    },
    {
        id: 3,
        name: 'MIEDO',
        emoji: '👁️',
        color: '#ffaa00',
        description: 'El miedo que paraliza'
    },
    {
        id: 4,
        name: 'EL CEREBRO',
        emoji: '🧠',
        color: '#ffffff',
        description: 'El encuentro final con tu propia mente'
    }
];

// Estructura del mapa (nodos por acto)
const MAP_STRUCTURE = [1, 3, 4, 4, 5, 5, 4, 4, 3, 2, 1];

// Tipos de nodos en el mapa — iconos SVG abstractos
const NODE_TYPES = {
    combat: {
        label: 'Combate',
        svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="19" x2="19" y2="5"/>
            <polyline points="14,5 19,5 19,10"/>
            <line x1="5" y1="19" x2="11" y2="13" stroke-width="1.5" opacity="0.45"/>
        </svg>`
    },
    shop: {
        label: 'Tienda',
        svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <ellipse cx="12" cy="8" rx="6" ry="2.5"/>
            <path d="M6 8 L6 16 Q6 18.5 12 18.5 Q18 18.5 18 16 L18 8"/>
            <ellipse cx="12" cy="14" rx="6" ry="2.5"/>
        </svg>`
    },
    rest: {
        label: 'Descanso',
        svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 10 Q8 6 12 6 Q16 6 20 10"/>
            <path d="M4 14 Q8 18 12 18 Q16 18 20 14"/>
            <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.7"/>
        </svg>`
    },
    event: {
        label: 'Evento',
        svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="9"/>
            <line x1="12" y1="8" x2="12" y2="13" stroke-width="2.5"/>
            <circle cx="12" cy="16.5" r="1.2" fill="currentColor"/>
        </svg>`
    },
    boss: {
        label: 'Jefe',
        svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="9"/>
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="3" x2="12" y2="8"/>
            <line x1="12" y1="16" x2="12" y2="21"/>
            <line x1="3" y1="12" x2="8" y2="12"/>
            <line x1="16" y1="12" x2="21" y2="12"/>
        </svg>`
    }
};

// Función para obtener acto por índice
function getAct(index) {
    return ACTS[index];
}

// Función para obtener nombre de acto
function getActName(index) {
    return ACTS[index]?.name || 'Desconocido';
}
