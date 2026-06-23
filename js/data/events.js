// Eventos especiales del mapa con múltiples opciones narrativas
const EVENTS = [
    {
        id: 'voz_interior',
        emoji: '🗣️',
        title: 'La Voz Interior',
        description: 'Una voz surge desde lo más profundo de tu subconsciente. Te ofrece algo... pero ¿a qué precio?',
        options: [
            {
                text: '🙏 Escucharla con calma',
                outcome: 'heal',
                value: 18,
                label: 'Recuperas 18 HP al calmarte'
            },
            {
                text: '⚡ Canalizarla como poder',
                outcome: 'card',
                label: 'Elige una carta como recompensa'
            },
            {
                text: '💰 Ignorarla por completo',
                outcome: 'coins',
                value: 20,
                label: '+20 monedas (te desconectas)'
            }
        ]
    },
    {
        id: 'espejo_mente',
        emoji: '🪞',
        title: 'El Espejo de la Mente',
        description: 'Un espejo te refleja no tu imagen física, sino tu estado emocional. Lo que ves te inquieta profundamente.',
        options: [
            {
                text: '👁️ Mirarte fijamente sin miedo',
                outcome: 'artifact',
                label: 'Encuentras un artefacto oculto'
            },
            {
                text: '💔 Romper el espejo',
                outcome: 'damage_coins',
                value: 12,
                coins: 30,
                label: '-12 HP pero ganas 30 monedas'
            },
            {
                text: '🏃 Alejarte lentamente',
                outcome: 'nothing',
                label: 'Nada ocurre. Sigues adelante.'
            }
        ]
    },
    {
        id: 'altar_emocional',
        emoji: '⛩️',
        title: 'El Altar Emocional',
        description: 'Un altar de piedra antigua brilla con luz suave. Acepta ofrendas y entrega dones a quienes se atreven.',
        options: [
            {
                text: '❤️ Ofrecer vitalidad por cartas',
                outcome: 'damage_cards',
                value: 15,
                cards: 2,
                label: '-15 HP, recibes 2 cartas nuevas'
            },
            {
                text: '💰 Ofrecer monedas por curación',
                outcome: 'trade_heal',
                coins: 25,
                heal: 25,
                label: '-25 monedas → +25 HP'
            },
            {
                text: '🚶 Pasar de largo',
                outcome: 'nothing',
                label: 'Respetas el altar. Nada ocurre.'
            }
        ]
    },
    {
        id: 'susurros_olvido',
        emoji: '🌫️',
        title: 'Susurros del Olvido',
        description: 'Memorias perdidas susurran desde las paredes. Cada una lleva una emoción diferente que puedes absorber.',
        options: [
            {
                text: '📖 Recordar el pasado con valentía',
                outcome: 'heal',
                value: 28,
                label: 'La memoria te sana: +28 HP'
            },
            {
                text: '⚡ Transformarlas en fuerza interior',
                outcome: 'max_hp',
                value: 10,
                label: '+10 HP máximo permanente'
            },
            {
                text: '💨 Dejar que pasen',
                outcome: 'coins',
                value: 15,
                label: '+15 monedas de paz interior'
            }
        ]
    },
    {
        id: 'mercader_sombras',
        emoji: '🎭',
        title: 'El Mercader de las Sombras',
        description: 'Un extraño mercader de apariencia peculiar emerge de la oscuridad ofreciendo sus servicios exclusivos.',
        options: [
            {
                text: '🃏 Carta rara garantizada (70💰)',
                outcome: 'buy_rare',
                cost: 70,
                label: 'Elige entre 3 cartas raras'
            },
            {
                text: '🔮 Artefacto misterioso (90💰)',
                outcome: 'buy_artifact',
                cost: 90,
                label: 'Obtienes un artefacto aleatorio'
            },
            {
                text: '👋 Rechazar y seguir',
                outcome: 'nothing',
                label: 'No confías en extraños.'
            }
        ]
    },
    {
        id: 'oraculo_mental',
        emoji: '🔮',
        title: 'El Oráculo Mental',
        description: 'Una presencia etérea de sabiduría ancestral te ofrece visiones a cambio de lo que más valoras.',
        options: [
            {
                text: '💰 Intercambiar monedas por artefacto',
                outcome: 'buy_artifact',
                cost: 60,
                label: '-60 monedas → artefacto garantizado'
            },
            {
                text: '❤️ Intercambiar HP por cartas',
                outcome: 'damage_cards',
                value: 20,
                cards: 3,
                label: '-20 HP → 3 cartas al mazo'
            },
            {
                text: '🚫 Rechazar la visión',
                outcome: 'coins',
                value: 10,
                label: '+10 monedas (integridad mantenida)'
            }
        ]
    }
];
