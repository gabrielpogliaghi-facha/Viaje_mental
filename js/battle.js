// ═══════════════════════════════════════════════════
//  BATTLE UI — renderizado y animaciones de combate
// ═══════════════════════════════════════════════════

// Reiniciar display del enemigo al iniciar un nuevo combate
function resetEnemyDisplay() {
    const el = document.getElementById('enemyEmoji');
    if (!el) return;
    // Quitar todas las clases de animación y estado previo
    el.classList.remove('boss-visual', 'anim-attack', 'anim-hit', 'anim-defend', 'anim-die');
    el.style.opacity = '';
    el.innerHTML = '';
    // Quitar clase de jefe final de la tarjeta enemiga
    document.querySelector('.enemy-card')?.classList.remove('is-final-boss');
}

// Disparar animación de combate sobre el avatar enemigo
function triggerEnemyAnimation(type) {
    const el = document.getElementById('enemyEmoji');
    if (!el) return;

    const animClasses = ['anim-attack', 'anim-hit', 'anim-defend', 'anim-die'];

    // Si ya murió, no interrumpir la muerte con otra animación
    if (el.classList.contains('anim-die') && type !== 'die') return;

    el.classList.remove(...animClasses);
    void el.offsetWidth; // forzar reflow para reiniciar animación

    el.classList.add(`anim-${type}`);

    // Auto-limpiar clases temporales (die usa forwards y se limpia en resetEnemyDisplay)
    if (type !== 'die') {
        const durations = { attack: 400, hit: 480, defend: 360 };
        setTimeout(() => el.classList.remove(`anim-${type}`), durations[type] ?? 440);
    }
}

// Actualizar toda la UI del combate
function updateBattleUI() {
    const playerPercent = (gameState.playerHp / gameState.playerMaxHp) * 100;
    const enemyPercent  = (gameState.enemy.currentHp / gameState.enemy.hp) * 100;

    // ── Barras de HP ──────────────────────────────────────────
    document.getElementById('playerHpBar').style.width = Math.max(0, playerPercent) + '%';
    document.getElementById('enemyHpBar').style.width  = Math.max(0, enemyPercent) + '%';

    const playerBar = document.getElementById('playerHpBar');
    const critical = gameState.playerHp <= Math.floor(gameState.playerMaxHp * 0.25);
    playerBar.classList.toggle('critical', critical);

    // ── Textos de HP ─────────────────────────────────────────
    document.getElementById('playerHpText').textContent    = Math.max(0, gameState.playerHp);
    document.getElementById('playerMaxHpText').textContent  = gameState.playerMaxHp;
    document.getElementById('enemyHpText').textContent     = Math.max(0, gameState.enemy.currentHp);
    document.getElementById('enemyMaxHpText').textContent  = gameState.enemy.hp;

    // ── Defensa ───────────────────────────────────────────────
    const defEl = document.getElementById('playerDefenseText');
    if (defEl) {
        defEl.textContent = gameState.playerDefense;
        defEl.closest('.defense-display').style.opacity = gameState.playerDefense > 0 ? '1' : '0.4';
    }

    // ── Avatar del enemigo ────────────────────────────────────
    const enemyEmojiEl = document.getElementById('enemyEmoji');
    const enemy = gameState.enemy;

    if (enemy.image) {
        // Jefe con imagen: crear solo si no existe aún (preservar animaciones activas)
        if (!enemyEmojiEl.querySelector('.boss-avatar-img')) {
            enemyEmojiEl.classList.add('boss-visual');
            enemyEmojiEl.innerHTML =
                `<img class="boss-avatar-img" src="${enemy.image}" alt="${enemy.name}" draggable="false">`;
            document.querySelector('.enemy-card')?.classList.add('is-final-boss');
        }
    } else {
        // Enemigo normal: SVG abstracto
        enemyEmojiEl.classList.remove('boss-visual');
        enemyEmojiEl.innerHTML = getEnemySymbol(enemy);
    }

    document.getElementById('enemyName').textContent = enemy.name;
    document.getElementById('enemyName').classList.toggle('boss-name', !!enemy.boss);

    // ── Energía ───────────────────────────────────────────────
    document.getElementById('energy').textContent = gameState.energy;
    const maxShow = Math.max(gameState.maxEnergy, gameState.energy);
    let energyHtml = '';
    for (let i = 0; i < maxShow; i++) {
        const used  = i >= gameState.energy ? 'used' : '';
        const bonus = i >= gameState.maxEnergy ? 'bonus' : '';
        energyHtml += `<div class="energy-orb ${used} ${bonus}"></div>`;
    }
    document.getElementById('energyDisplay').innerHTML = energyHtml;

    // ── Cartas en mano — estilo MTG ───────────────────────────
    let handHtml = '';
    gameState.hand.forEach((cardType, idx) => {
        const card = CARDS[cardType];
        if (!card) return;
        const canPlay = gameState.energy >= card.cost;
        const costClass = card.cost === 0 ? 'cost-free'
            : card.cost <= 2 ? 'cost-blue'
            : card.cost === 3 ? 'cost-purple'
            : 'cost-orange';
        const typeLabels = { attack: 'Ataque', defense: 'Defensa', heal: 'Curación', utility: 'Utilidad' };
        const icon = CARD_TYPE_ICONS[card.type] || CARD_TYPE_ICONS.utility;

        handHtml += `
            <div class="card rarity-${card.rarity} type-${card.type} ${canPlay ? '' : 'disabled'}"
                 ${canPlay ? `onclick="playCard('${cardType}')"` : ''}
                 style="animation-delay:${idx * 0.06}s">
                <div class="card-cost-pip ${costClass}">${card.cost}</div>
                <div class="card-header-bar">
                    <span class="card-name">${card.name}</span>
                </div>
                <div class="card-art-area">
                    <div class="card-type-icon">${icon}</div>
                    ${card.exhaust ? '<div class="exhaust-mini">◈ Agota</div>' : ''}
                </div>
                <div class="card-type-line">${typeLabels[card.type] || 'Carta'}</div>
                <div class="card-text-box">
                    <span class="card-desc-text">${card.description}</span>
                </div>
            </div>
        `;
    });
    document.getElementById('hand').innerHTML = handHtml;
}

// Volver al mapa (retirada)
function backToMap() {
    showScreen('map');
}
