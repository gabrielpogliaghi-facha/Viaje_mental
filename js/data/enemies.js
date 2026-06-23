const ENEMIES = [
    // ═══════════════════ ACTO 0: SOLEDAD ═══════════════════
    {
        name: 'Eco del Silencio',
        emoji: '👻',
        hp: 22,
        damage: 5,
        act: 0
    },
    {
        name: 'Voz de la Soledad',
        emoji: '🌑',
        hp: 28,
        damage: 6,
        act: 0
    },
    {
        name: 'Sombra Perdida',
        emoji: '🖤',
        hp: 18,
        damage: 4,
        act: 0
    },

    // ═══════════════════ ACTO 1: IRA ═══════════════════
    {
        name: 'Furia Ciega',
        emoji: '🔥',
        hp: 30,
        damage: 9,
        act: 1
    },
    {
        name: 'Llama Devorada',
        emoji: '😤',
        hp: 25,
        damage: 11,
        act: 1
    },
    {
        name: 'Rabia del Pasado',
        emoji: '💢',
        hp: 36,
        damage: 7,
        act: 1
    },
    {
        name: 'Resentimiento Puro',
        emoji: '🌋',
        hp: 22,
        damage: 13,
        act: 1
    },

    // ═══════════════════ ACTO 2: TRISTEZA ═══════════════════
    {
        name: 'Lágrima Olvidada',
        emoji: '😢',
        hp: 35,
        damage: 8,
        act: 2
    },
    {
        name: 'Peso del Tiempo',
        emoji: '⏳',
        hp: 44,
        damage: 6,
        act: 2
    },
    {
        name: 'Melancolía Profunda',
        emoji: '🌧️',
        hp: 30,
        damage: 10,
        act: 2
    },
    {
        name: 'Nostalgia Oscura',
        emoji: '🌫️',
        hp: 26,
        damage: 12,
        act: 2
    },

    // ═══════════════════ ACTO 3: MIEDO ═══════════════════
    {
        name: 'Pavor Nocturno',
        emoji: '🦇',
        hp: 40,
        damage: 11,
        act: 3
    },
    {
        name: 'Fobia Ancestral',
        emoji: '🕸️',
        hp: 50,
        damage: 9,
        act: 3
    },
    {
        name: 'Terror Silencioso',
        emoji: '😱',
        hp: 32,
        damage: 15,
        act: 3
    },
    {
        name: 'Pesadilla Vívida',
        emoji: '💀',
        hp: 28,
        damage: 17,
        act: 3
    },

    // ═══════════════════ ACTO 4: EL CEREBRO ═══════════════════
    {
        name: 'Pensamiento Negativo',
        emoji: '💭',
        hp: 45,
        damage: 12,
        act: 4
    },
    {
        name: 'Voz Crítica',
        emoji: '🗣️',
        hp: 55,
        damage: 11,
        act: 4
    },
    {
        name: 'Duda Existencial',
        emoji: '❓',
        hp: 38,
        damage: 16,
        act: 4
    }
];

// Jefes de cada acto con diálogo narrativo
const BOSSES = [
    {
        name: 'Grito Sordo',
        emoji: '😶',
        hp: 50,
        damage: 9,
        act: 0,
        boss: true,
        dialogue: '"El silencio es mi dominio. En él, estás solo... para siempre."'
    },
    {
        name: 'La Ira Desatada',
        emoji: '🌋',
        hp: 65,
        damage: 13,
        act: 1,
        boss: true,
        dialogue: '"Tu enojo te consume desde adentro. ¡Serás pasto de mis llamas eternamente!"'
    },
    {
        name: 'El Llanto Eterno',
        emoji: '😭',
        hp: 80,
        damage: 11,
        act: 2,
        boss: true,
        dialogue: '"Tus lágrimas me alimentan. La tristeza nunca... nunca termina."'
    },
    {
        name: 'El Gran Miedo',
        emoji: '👁️',
        hp: 95,
        damage: 15,
        act: 3,
        boss: true,
        dialogue: '"Eres todo lo que temes. Mírate a los ojos... y tiembla ante ti mismo."'
    },
    {
        name: 'LA SOLEDAD',
        emoji: '🧠',
        hp: 120,
        damage: 17,
        act: 4,
        boss: true,
        image: 'img/soledad.png',
        dialogue: '"Soy todo lo que evitaste sentir. Soy tú. ¿Puedes realmente enfrentarte a tu propia soledad... y ganar?"'
    }
];

function getRandomEnemy(actIndex) {
    const actEnemies = ENEMIES.filter(e => e.act === actIndex);
    if (!actEnemies.length) return ENEMIES[0];
    return actEnemies[Math.floor(Math.random() * actEnemies.length)];
}

function getActBoss(actIndex) {
    return BOSSES.find(b => b.act === actIndex) || BOSSES[0];
}
