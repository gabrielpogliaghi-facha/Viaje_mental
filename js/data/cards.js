const CARDS = {
    // ═══════════════════ COMUNES ═══════════════════
    punch: {
        name: 'Puñetazo',
        cost: 1, rarity: 'comun', type: 'attack',
        damage: 6,
        description: 'Inflige 6 de daño'
    },
    shield: {
        name: 'Escudo',
        cost: 1, rarity: 'comun', type: 'defense',
        defense: 5,
        description: 'Gana 5 de defensa'
    },
    tea: {
        name: 'Té Calmante',
        cost: 1, rarity: 'comun', type: 'heal',
        heal: 6,
        description: 'Recupera 6 HP'
    },
    dobleGolpe: {
        name: 'Doble Golpe',
        cost: 2, rarity: 'comun', type: 'attack',
        damageMulti: [4, 4],
        description: 'Dos golpes de 4 daño c/u'
    },
    concentracion: {
        name: 'Concentración',
        cost: 1, rarity: 'comun', type: 'utility',
        draw: 2,
        description: 'Roba 2 cartas adicionales'
    },
    respirar: {
        name: 'Respirar',
        cost: 1, rarity: 'comun', type: 'heal',
        heal: 3, defense: 3,
        description: '+3 HP y +3 defensa'
    },

    // ═══════════════════ INFRECUENTES ═══════════════════
    block: {
        name: 'Bloqueo',
        cost: 1, rarity: 'infrecuente', type: 'defense',
        defense: 8,
        description: 'Gana 8 de defensa'
    },
    power: {
        name: 'Carga Mental',
        cost: 2, rarity: 'infrecuente', type: 'attack',
        damage: 12,
        description: 'Inflige 12 de daño'
    },
    empatia: {
        name: 'Empatía',
        cost: 2, rarity: 'infrecuente', type: 'heal',
        heal: 15,
        description: 'Recupera 15 HP'
    },
    muralla: {
        name: 'Muralla',
        cost: 2, rarity: 'infrecuente', type: 'defense',
        defense: 14,
        description: 'Gana 14 de defensa'
    },
    tormenta: {
        name: 'Tormenta',
        cost: 3, rarity: 'infrecuente', type: 'attack',
        damage: 8, draw: 1,
        description: '8 daño y roba 1 carta'
    },
    impulso: {
        name: 'Impulso',
        cost: 0, rarity: 'infrecuente', type: 'utility',
        energyGain: 2,
        description: 'Gana 2 de energía extra'
    },

    // ═══════════════════ RARAS ═══════════════════
    combo: {
        name: 'Combo Mental',
        cost: 3, rarity: 'raro', type: 'attack',
        damage: 18,
        description: 'Golpe devastador: 18 daño'
    },
    heal: {
        name: 'Sanación',
        cost: 2, rarity: 'raro', type: 'heal',
        heal: 20,
        description: 'Recupera 20 HP'
    },
    catarsis: {
        name: 'Catarsis',
        cost: 3, rarity: 'raro', type: 'attack',
        damage: 10, heal: 10,
        description: '10 daño y cura 10 HP'
    },
    destello: {
        name: 'Destello',
        cost: 2, rarity: 'raro', type: 'attack',
        damage: 6, draw: 2,
        description: '6 daño y roba 2 cartas'
    },
    contraataque: {
        name: 'Contraataque',
        cost: 1, rarity: 'raro', type: 'defense',
        defense: 5, damage: 5,
        description: '+5 defensa y 5 daño'
    },

    // ═══════════════════ ÉPICAS ═══════════════════
    trance: {
        name: 'Trance',
        cost: 0, rarity: 'epico', type: 'utility',
        energyGain: 3, draw: 1, exhaust: true,
        description: '+3 energía, roba 1 carta'
    },
    vendaval: {
        name: 'Vendaval Mental',
        cost: 3, rarity: 'epico', type: 'attack',
        damage: 28, exhaust: true,
        description: 'Destrucción total: 28 daño'
    },
    espejo: {
        name: 'Espejo del Alma',
        cost: 2, rarity: 'epico', type: 'attack',
        damageMulti: [8, 8], heal: 8, exhaust: true,
        description: '2×8 daño + cura 8 HP'
    }
};

const STARTER_CARDS = [
    'punch', 'punch', 'shield', 'shield',
    'tea', 'dobleGolpe', 'concentracion', 'respirar', 'block'
];

const REWARD_CARDS = Object.keys(CARDS);
