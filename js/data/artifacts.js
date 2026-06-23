// Artefactos: objetos pasivos que modifican las reglas del juego
const ARTIFACTS = [
    {
        id: 'corazon_fuerte',
        name: 'Corazón Fuerte',
        emoji: '💗',
        description: '+15 HP máximo al equipar',
        effect: { type: 'max_hp', value: 15 }
    },
    {
        id: 'mente_aguda',
        name: 'Mente Aguda',
        emoji: '🧠',
        description: 'Todos los ataques hacen +2 daño',
        effect: { type: 'damage_bonus', value: 2 }
    },
    {
        id: 'escudo_interno',
        name: 'Escudo Interno',
        emoji: '🔰',
        description: '+4 defensa al iniciar cada combate',
        effect: { type: 'start_defense', value: 4 }
    },
    {
        id: 'bolsa_monedas',
        name: 'Bolsa de Monedas',
        emoji: '💰',
        description: '+8 monedas extra por victoria',
        effect: { type: 'coin_bonus', value: 8 }
    },
    {
        id: 'amuleto_energia',
        name: 'Amuleto de Energía',
        emoji: '⚡',
        description: '+1 energía máxima permanente',
        effect: { type: 'energy_bonus', value: 1 }
    },
    {
        id: 'lagrima_cristal',
        name: 'Lágrima de Cristal',
        emoji: '💧',
        description: '+5 HP al iniciar cada combate',
        effect: { type: 'start_heal', value: 5 }
    },
    {
        id: 'pluma_sabia',
        name: 'Pluma Sabia',
        emoji: '🪶',
        description: 'Roba 1 carta extra al iniciar combate',
        effect: { type: 'start_draw', value: 1 }
    },
    {
        id: 'anillo_velocidad',
        name: 'Anillo de Velocidad',
        emoji: '💍',
        description: 'Los enemigos hacen -3 daño',
        effect: { type: 'enemy_damage_reduction', value: 3 }
    },
    {
        id: 'piedra_alma',
        name: 'Piedra del Alma',
        emoji: '🔮',
        description: 'Cura +8 HP al ganar cada combate',
        effect: { type: 'heal_on_win', value: 8 }
    },
    {
        id: 'cristal_rojo',
        name: 'Cristal Rojo',
        emoji: '🔴',
        description: 'Todas las defensas protegen +3 más',
        effect: { type: 'defense_bonus', value: 3 }
    }
];
