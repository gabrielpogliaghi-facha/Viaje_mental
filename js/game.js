// ═══════════════════════════════════════════════════
//  ESTADO GLOBAL DEL JUEGO
// ═══════════════════════════════════════════════════
let gameState = {
    currentAct: 0,
    playerHp: 70,
    playerMaxHp: 70,
    playerDefense: 0,
    hand: [],
    deck: [...STARTER_CARDS],
    energy: 3,
    maxEnergy: 3,
    enemy: null,
    pendingEnemy: null,
    gameMode: 'map',
    battleLog: [],
    mapNodes: [],
    visitedNodes: new Set(),
    mapNodeConnections: {},
    coins: 0,
    artifacts: [],
    cardsPlayedThisTurn: 0,
    shopCards: null,
    shopPurchased: null,
    currentEvent: null
};

// ═══════════════════════════════════════════════════
//  INICIALIZACIÓN
// ═══════════════════════════════════════════════════

function initGame() {
    console.log('%c🧠 VIAJE MENTAL - Fase 2', 'color: #fbbf24; font-size: 14px; font-weight: bold;');
    applyActTheme(0);
    generateMapLayout();
    renderArtifacts();
    updateHeader();
}

// ═══════════════════════════════════════════════════
//  GENERACIÓN DEL MAPA
// ═══════════════════════════════════════════════════

function generateMapLayout() {
    const nodeTypes = generateNodeTypeDistribution();
    const shuffled = nodeTypes.sort(() => Math.random() - 0.5);

    gameState.mapNodes = [];
    gameState.mapNodeConnections = {};
    let nodeId = 0;
    const nodesByRow = [];

    for (let row = 0; row < MAP_STRUCTURE.length; row++) {
        const rowNodes = [];
        for (let col = 0; col < MAP_STRUCTURE[row]; col++) {
            gameState.mapNodes.push({
                id: nodeId,
                row,
                col,
                type: shuffled[nodeId],
                visited: false,
                locked: row > 0
            });
            rowNodes.push(nodeId);
            nodeId++;
        }
        nodesByRow.push(rowNodes);
    }

    createNodeConnections(nodesByRow);
    gameState.mapNodes[0].locked = false;

    renderMapLayout();
    drawConnections();
}

function generateNodeTypeDistribution() {
    const total = MAP_STRUCTURE.reduce((a, b) => a + b, 0);
    const distribution = new Array(total).fill('combat');

    const shops = Math.floor(total * 0.12);
    const rests = Math.floor(total * 0.12);
    const events = Math.floor(total * 0.12);

    let idx = 0;
    for (let i = 0; i < shops; i++) distribution[idx++] = 'shop';
    for (let i = 0; i < rests; i++) distribution[idx++] = 'rest';
    for (let i = 0; i < events; i++) distribution[idx++] = 'event';

    distribution[distribution.length - 1] = 'boss';
    return distribution;
}

function createNodeConnections(nodesByRow) {
    const midPoint = Math.floor(MAP_STRUCTURE.length / 2);

    for (let row = 0; row < MAP_STRUCTURE.length - 1; row++) {
        const currentRowNodes = nodesByRow[row];
        const nextRowNodes = nodesByRow[row + 1];
        const currentRowSize = currentRowNodes.length;
        const nextRowSize = nextRowNodes.length;
        const inFirstHalf = row < midPoint;
        const isExpanding = nextRowSize > currentRowSize;

        currentRowNodes.forEach((nodeId, col) => {
            const connections = [];

            if (row === 0 && col === 0) {
                connections.push(...nextRowNodes);
            } else if ((inFirstHalf && isExpanding) || !isExpanding) {
                const isLeftEdge = col === 0;
                const isRightEdge = col === currentRowSize - 1;

                if (isLeftEdge || isRightEdge) {
                    const relativePos = col / Math.max(1, currentRowSize - 1);
                    const targetIndex = relativePos * (nextRowSize - 1);
                    const minIdx = Math.max(0, Math.floor(targetIndex) - 1);
                    const maxIdx = Math.min(nextRowSize - 1, Math.ceil(targetIndex) + 1);
                    for (let i = minIdx; i <= maxIdx; i++) {
                        if (!connections.includes(nextRowNodes[i])) connections.push(nextRowNodes[i]);
                    }
                } else {
                    const relativePos = col / (currentRowSize - 1);
                    const targetIndex = relativePos * (nextRowSize - 1);
                    const lowerIdx = Math.floor(targetIndex);
                    const upperIdx = Math.ceil(targetIndex);
                    if (lowerIdx >= 0 && lowerIdx < nextRowSize) connections.push(nextRowNodes[lowerIdx]);
                    if (upperIdx >= 0 && upperIdx < nextRowSize && upperIdx !== lowerIdx) connections.push(nextRowNodes[upperIdx]);
                }
            } else {
                const relativePos = currentRowSize === 1 ? 0.5 : col / (currentRowSize - 1);
                const targetIndex = relativePos * (nextRowSize - 1);
                const lowerIdx = Math.floor(targetIndex);
                const upperIdx = Math.ceil(targetIndex);
                if (lowerIdx >= 0 && lowerIdx < nextRowSize) connections.push(nextRowNodes[lowerIdx]);
                if (upperIdx >= 0 && upperIdx < nextRowSize && upperIdx !== lowerIdx) connections.push(nextRowNodes[upperIdx]);
            }

            if (connections.length > 0) gameState.mapNodeConnections[nodeId] = connections;
        });
    }
}

// ═══════════════════════════════════════════════════
//  SELECCIÓN DE NODO
// ═══════════════════════════════════════════════════

function selectNode(nodeIdx) {
    const node = gameState.mapNodes[nodeIdx];
    if (node.locked || node.visited) return;

    node.visited = true;
    gameState.visitedNodes.add(nodeIdx);

    const connections = gameState.mapNodeConnections[nodeIdx] || [];
    connections.forEach(id => {
        if (gameState.mapNodes[id]) gameState.mapNodes[id].locked = false;
    });

    renderMapLayout();
    drawConnections();

    switch (node.type) {
        case 'combat':
            startBattle(false);
            break;
        case 'boss':
            startBattle(true);
            break;
        case 'rest':
            handleRest();
            break;
        case 'shop':
            handleShop();
            break;
        case 'event':
            handleEvent();
            break;
    }
}

// ═══════════════════════════════════════════════════
//  NODOS: DESCANSO, TIENDA, EVENTO
// ═══════════════════════════════════════════════════

function handleRest() {
    const healAmount = Math.floor(gameState.playerMaxHp * 0.3);
    gameState.playerHp = Math.min(gameState.playerMaxHp, gameState.playerHp + healAmount);
    showNotification(`😴 Descansaste: +${healAmount} HP recuperados`);
    updateHeader();
    showScreen('map');
}

// ─── TIENDA ───

function handleShop() {
    if (!gameState.shopCards) {
        const allKeys = Object.keys(CARDS);
        gameState.shopCards = [...allKeys].sort(() => Math.random() - 0.5).slice(0, 3);
        gameState.shopPurchased = new Set();
    }
    renderShop();
    showModal('shop');
}

function renderShop() {
    document.getElementById('shopCoins').textContent = gameState.coins;
    const prices = { comun: 45, infrecuente: 70, raro: 95, epico: 140 };

    const html = gameState.shopCards.map(k => {
        const c = CARDS[k];
        const price = prices[c.rarity] || 45;
        const bought = gameState.shopPurchased.has(k);
        const canAfford = !bought && gameState.coins >= price;

        return `
            <div class="shop-slot ${bought ? 'shop-sold' : ''}">
                ${renderCardMTG(k, { compact: true })}
                ${bought
                    ? `<div class="shop-sold-banner">✓ COMPRADO</div>`
                    : `<button class="buy-btn ${canAfford ? '' : 'cant-afford'}"
                        ${canAfford ? `onclick="buyCard('${k}', ${price})"` : 'disabled'}
                       >◈ ${price} monedas</button>`
                }
            </div>
        `;
    }).join('');

    document.getElementById('shopCards').innerHTML = html;
}

function buyCard(cardKey, price) {
    if (gameState.coins < price || gameState.shopPurchased.has(cardKey)) return;
    gameState.coins -= price;
    gameState.deck.push(cardKey);
    gameState.shopPurchased.add(cardKey);
    showNotification(`🛒 Compraste: ${CARDS[cardKey].name}`);
    renderShop();
    updateHeader();
}

function leaveShop() {
    gameState.shopCards = null;
    gameState.shopPurchased = null;
    hideModal('shop');
    showScreen('map');
    updateHeader();
}

// ─── EVENTOS ───

function handleEvent() {
    const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    gameState.currentEvent = event;

    document.getElementById('eventIcon').innerHTML = getEventSymbolSVG(event.id);
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDescription').textContent = event.description;

    const html = event.options.map((opt, i) => `
        <button class="event-option" onclick="handleEventChoice(${i})">
            <span class="opt-text">${opt.text}</span>
            <span class="opt-label">${opt.label}</span>
        </button>
    `).join('');

    document.getElementById('eventOptions').innerHTML = html;
    showModal('event');
}

function handleEventChoice(optionIndex) {
    const option = gameState.currentEvent.options[optionIndex];
    hideModal('event');

    switch (option.outcome) {
        case 'heal':
            gameState.playerHp = Math.min(gameState.playerMaxHp, gameState.playerHp + option.value);
            showNotification(`❤️ +${option.value} HP recuperados`);
            break;
        case 'coins':
            gameState.coins += option.value;
            showNotification(`💰 +${option.value} monedas obtenidas`);
            break;
        case 'card':
            showCardReward('✨ Recompensa: Elige una carta');
            return;
        case 'artifact': {
            const art = getRandomArtifact();
            if (art) {
                addArtifact(art);
                showNotification(`✨ Artefacto: ${art.emoji} ${art.name}`);
            } else {
                gameState.coins += 30;
                showNotification('💰 Sin artefactos disponibles: +30 monedas');
            }
            break;
        }
        case 'damage_coins':
            gameState.playerHp = Math.max(1, gameState.playerHp - option.value);
            gameState.coins += option.coins;
            showNotification(`💔 -${option.value} HP | 💰 +${option.coins} monedas`);
            break;
        case 'damage_cards': {
            gameState.playerHp = Math.max(1, gameState.playerHp - option.value);
            const count = option.cards || 1;
            const allKeys = Object.keys(CARDS);
            for (let i = 0; i < count; i++) {
                gameState.deck.push(allKeys[Math.floor(Math.random() * allKeys.length)]);
            }
            showNotification(`💔 -${option.value} HP | 🃏 +${count} carta${count > 1 ? 's' : ''} al mazo`);
            break;
        }
        case 'trade_heal':
            if (gameState.coins >= option.coins) {
                gameState.coins -= option.coins;
                gameState.playerHp = Math.min(gameState.playerMaxHp, gameState.playerHp + option.heal);
                showNotification(`🔄 -${option.coins}💰 → +${option.heal} HP`);
            } else {
                showNotification('💸 No tienes suficientes monedas');
            }
            break;
        case 'max_hp':
            gameState.playerMaxHp += option.value;
            gameState.playerHp += option.value;
            showNotification(`💗 +${option.value} HP máximo permanente`);
            break;
        case 'buy_rare':
            if (gameState.coins >= option.cost) {
                gameState.coins -= option.cost;
                showCardReward('⭐ Carta Rara: Elige una', 'raro');
                return;
            } else {
                showNotification('💸 No tienes suficientes monedas');
            }
            break;
        case 'buy_artifact':
            if (gameState.coins >= option.cost) {
                gameState.coins -= option.cost;
                const art = getRandomArtifact();
                if (art) {
                    addArtifact(art);
                    showNotification(`✨ ${art.emoji} ${art.name}`);
                } else {
                    gameState.coins += option.cost;
                    showNotification('Sin artefactos disponibles');
                }
            } else {
                showNotification('💸 No tienes suficientes monedas');
            }
            break;
        case 'nothing':
        default:
            showNotification('🚶 Nada ocurre. Sigues tu camino...');
            break;
    }

    updateHeader();
    showScreen('map');
}

// ═══════════════════════════════════════════════════
//  COMBATE: INICIO
// ═══════════════════════════════════════════════════

function startBattle(isBoss = false) {
    const enemy = isBoss
        ? getActBoss(gameState.currentAct)
        : getRandomEnemy(gameState.currentAct);

    if (!enemy) return;

    gameState.pendingEnemy = { ...enemy, currentHp: enemy.hp };

    if (isBoss && enemy.dialogue) {
        showBossDialogue(enemy);
    } else {
        initBattleWithEnemy();
    }
}

function showBossDialogue(boss) {
    document.getElementById('bossDialogueEmoji').innerHTML = getEnemySymbol(boss);
    document.getElementById('bossDialogueName').textContent = boss.name;
    document.getElementById('bossDialogueQuote').textContent = boss.dialogue;
    showModal('bossDialogue');
}

function confirmBossBattle() {
    hideModal('bossDialogue');
    initBattleWithEnemy();
}

function initBattleWithEnemy() {
    gameState.gameMode = 'battle';
    gameState.energy = gameState.maxEnergy;
    gameState.playerDefense = 0;
    gameState.hand = [];
    gameState.battleLog = [];
    gameState.cardsPlayedThisTurn = 0;
    gameState.enemy = gameState.pendingEnemy;

    applyBattleStartArtifacts();

    const extraDraw = gameState.artifacts
        .filter(a => a.effect.type === 'start_draw')
        .reduce((sum, a) => sum + a.effect.value, 0);
    drawCardsFromDeck(5 + extraDraw);

    const act = ACTS[gameState.currentAct];
    const battleTitle = document.getElementById('battleActTitle');
    if (battleTitle) battleTitle.textContent = `${act.name} · COMBATE`;

    // Limpiar display del enemigo antes de configurar el nuevo combate
    resetEnemyDisplay();

    updateBattleUI();
    showScreen('battle');
    addLog(`⚔️ ¡${gameState.enemy.name} aparece!`);
}

// ═══════════════════════════════════════════════════
//  COMBATE: GAMEPLAY
// ═══════════════════════════════════════════════════

function drawCardsFromDeck(count) {
    if (!gameState.deck.length) return;
    for (let i = 0; i < count; i++) {
        const cardType = gameState.deck[Math.floor(Math.random() * gameState.deck.length)];
        gameState.hand.push(cardType);
    }
}

function playCard(cardType) {
    const card = CARDS[cardType];
    if (!card || gameState.energy < card.cost) return;

    // Quitar solo UNA copia de la mano
    const cardIdx = gameState.hand.indexOf(cardType);
    if (cardIdx === -1) return;
    gameState.hand.splice(cardIdx, 1);

    gameState.energy -= card.cost;
    gameState.cardsPlayedThisTurn++;

    const dmgBonus = getArtifactDamageBonus();
    const defBonus = getArtifactDefenseBonus();

    if (card.damage) {
        const totalDmg = card.damage + dmgBonus;
        gameState.enemy.currentHp -= totalDmg;
        triggerEnemyAnimation('hit');
        addLog(`✊ ${card.name}! -${totalDmg} daño`);
    }

    if (card.damageMulti) {
        let totalDmg = 0;
        card.damageMulti.forEach(dmg => {
            const hit = dmg + dmgBonus;
            gameState.enemy.currentHp -= hit;
            totalDmg += hit;
        });
        triggerEnemyAnimation('hit');
        addLog(`✊ ${card.name}! ${card.damageMulti.length}x${card.damageMulti[0] + dmgBonus} = -${totalDmg}`);
    }

    if (card.defense) {
        const totalDef = card.defense + defBonus;
        gameState.playerDefense += totalDef;
        triggerEnemyAnimation('defend'); // el enemigo retrocede al ver la defensa
        addLog(`🛡️ ${card.name}! +${totalDef} defensa`);
    }

    if (card.heal) {
        gameState.playerHp = Math.min(gameState.playerMaxHp, gameState.playerHp + card.heal);
        addLog(`❤️ ${card.name}! +${card.heal} HP`);
    }

    if (card.draw) {
        drawCardsFromDeck(card.draw);
        addLog(`🃏 Robas ${card.draw} carta${card.draw > 1 ? 's' : ''}`);
    }

    if (card.energyGain) {
        gameState.energy = Math.min(gameState.maxEnergy + 3, gameState.energy + card.energyGain);
        addLog(`⚡ +${card.energyGain} energía!`);
    }

    if (card.exhaust) {
        const deckIdx = gameState.deck.indexOf(cardType);
        if (deckIdx !== -1) gameState.deck.splice(deckIdx, 1);
        addLog(`💨 ${card.name} agotada del mazo`);
    }

    updateBattleUI();
    updateHeader();

    if (gameState.enemy.currentHp <= 0) {
        winBattle();
        return;
    }

    if (gameState.energy <= 0) {
        setTimeout(enemyTurn, 700);
    }
}

function endTurn() {
    if (gameState.gameMode !== 'battle') return;
    addLog('⏭️ Fin de turno...');
    gameState.cardsPlayedThisTurn = 0;
    setTimeout(enemyTurn, 400);
}

function enemyTurn() {
    // Animación de ataque primero — luego el daño llega
    triggerEnemyAnimation('attack');

    setTimeout(() => {
        const dmgReduction = getArtifactEnemyDamageReduction();
        const baseDmg = gameState.enemy.damage + Math.floor(Math.random() * 4);
        const damage = Math.max(0, baseDmg - gameState.playerDefense - dmgReduction);

        gameState.playerHp -= damage;
        gameState.playerDefense = 0;

        // Si el ataque fue bloqueado completamente, el enemigo retrocede
        if (damage === 0) {
            triggerEnemyAnimation('defend');
        }

        addLog(`👹 ${gameState.enemy.name} golpea! -${damage} daño`);
        updateBattleUI();
        updateHeader();

        if (gameState.playerHp <= 0) {
            loseBattle();
            return;
        }

        // Nuevo turno del jugador
        gameState.energy = gameState.maxEnergy;
        gameState.cardsPlayedThisTurn = 0;
        drawCardsFromDeck(3);
        addLog('─── Tu turno ───');
        updateBattleUI();
    }, 300); // espera el inicio de la animación de ataque
}

// ═══════════════════════════════════════════════════
//  COMBATE: VICTORIA Y DERROTA
// ═══════════════════════════════════════════════════

function winBattle() {
    const isBoss = gameState.enemy.boss;
    const baseCoins = isBoss ? 35 : (Math.floor(Math.random() * 6) + 10);
    const coinBonus = gameState.artifacts
        .filter(a => a.effect.type === 'coin_bonus')
        .reduce((sum, a) => sum + a.effect.value, 0);
    const coinsEarned = baseCoins + coinBonus;
    gameState.coins += coinsEarned;

    const healOnWin = gameState.artifacts.find(a => a.effect.type === 'heal_on_win');
    if (healOnWin) {
        gameState.playerHp = Math.min(gameState.playerMaxHp, gameState.playerHp + healOnWin.effect.value);
    }

    // Animación de muerte — más pausa para jefe con imagen (deja que la muerte se vea)
    triggerEnemyAnimation('die');
    addLog(`⭐ ¡Victoria! +${coinsEarned} monedas`);
    updateHeader();

    const victoryDelay = gameState.enemy.image ? 1200 : 650;
    setTimeout(() => showVictoryReward(coinsEarned), victoryDelay);
}

function loseBattle() {
    addLog('💀 Has sido derrotado...');
    setTimeout(() => showModal('defeat'), 500);
}

function showVictoryReward(coinsEarned) {
    document.getElementById('rewardCoinsText').textContent = `+${coinsEarned} 💰 monedas ganadas`;
    document.getElementById('skipRewardBtn').style.display = 'block';
    renderRewardCards(Object.keys(CARDS));
    showModal('victoryReward');
}

function showCardReward(title, rarityFilter = null) {
    document.getElementById('rewardCoinsText').textContent = title;
    document.getElementById('skipRewardBtn').style.display = 'none';
    let keys = Object.keys(CARDS);
    if (rarityFilter) keys = keys.filter(k => CARDS[k].rarity === rarityFilter);
    renderRewardCards(keys);
    showModal('victoryReward');
}

function renderRewardCards(keyPool) {
    const shuffled = [...keyPool].sort(() => Math.random() - 0.5).slice(0, 3);
    const html = shuffled.map(k =>
        renderCardMTG(k, { onclick: `selectRewardCard('${k}')` })
    ).join('');
    document.getElementById('rewardCards').innerHTML = html;
}

function selectRewardCard(cardKey) {
    gameState.deck.push(cardKey);
    showNotification(`✅ ${CARDS[cardKey].name} añadida al mazo`);
    hideModal('victoryReward');
    updateHeader();
    showScreen('map');
    checkActCompletion();
}

function skipCardReward() {
    hideModal('victoryReward');
    showScreen('map');
    updateHeader();
    checkActCompletion();
}

// ═══════════════════════════════════════════════════
//  ACTOS Y PROGRESIÓN
// ═══════════════════════════════════════════════════

function checkActCompletion() {
    const bossNode = gameState.mapNodes.find(n => n.type === 'boss');
    if (bossNode && bossNode.visited) {
        setTimeout(() => showActComplete(), 700);
    }
}

function showActComplete() {
    const act = ACTS[gameState.currentAct];
    const messages = [
        '"Has atravesado la soledad. El silencio ya no te aterra."',
        '"Has domado tu ira. Las llamas que te consumían ahora te iluminan."',
        '"Has abrazado tu tristeza. Las lágrimas limpian el alma."',
        '"Has enfrentado tu miedo. La oscuridad ya no tiene poder sobre ti."',
        '"Has encontrado la paz con tu mente. Eres más fuerte de lo que creías."'
    ];
    document.getElementById('actCompleteEmoji').innerHTML = getActSymbolSVG(gameState.currentAct, 64);
    document.getElementById('actCompleteTitle').textContent = `${act.name} SUPERADA`;
    document.getElementById('actCompleteMessage').textContent =
        messages[gameState.currentAct] || '¡Acto completado!';
    showModal('actComplete');
}

function proceedToNextAct() {
    hideModal('actComplete');
    nextAct();
}

function nextAct() {
    gameState.currentAct++;
    gameState.visitedNodes.clear();
    gameState.shopCards = null;
    gameState.shopPurchased = null;

    if (gameState.currentAct >= ACTS.length) {
        showModal('gameWin');
        return;
    }

    // Curar hasta 60% HP entre actos
    gameState.playerHp = Math.max(
        gameState.playerHp,
        Math.floor(gameState.playerMaxHp * 0.6)
    );

    const act = ACTS[gameState.currentAct];
    applyActTheme(gameState.currentAct);

    setTimeout(() => {
        gameState.mapNodes = [];
        generateMapLayout();
        document.getElementById('actTitle').textContent =
            `ACTO ${gameState.currentAct + 1} · ${act.name}`;
        updateHeader();
    }, 300);
}

function applyActTheme(actIndex) {
    const act = ACTS[actIndex];
    document.documentElement.style.setProperty('--color-act', act.color);
    updateActBackground(actIndex);
}

// ═══════════════════════════════════════════════════
//  ARTEFACTOS
// ═══════════════════════════════════════════════════

function addArtifact(artifact) {
    gameState.artifacts.push(artifact);
    applyArtifactEffect(artifact);
    renderArtifacts();
    updateHeader();
}

function applyArtifactEffect(artifact) {
    switch (artifact.effect.type) {
        case 'max_hp':
            gameState.playerMaxHp += artifact.effect.value;
            gameState.playerHp += artifact.effect.value;
            break;
        case 'energy_bonus':
            gameState.maxEnergy += artifact.effect.value;
            break;
    }
}

function applyBattleStartArtifacts() {
    gameState.artifacts.forEach(artifact => {
        if (artifact.effect.type === 'start_defense') {
            gameState.playerDefense += artifact.effect.value;
        }
        if (artifact.effect.type === 'start_heal') {
            gameState.playerHp = Math.min(gameState.playerMaxHp, gameState.playerHp + artifact.effect.value);
        }
    });
}

function getRandomArtifact() {
    const owned = new Set(gameState.artifacts.map(a => a.id));
    const available = ARTIFACTS.filter(a => !owned.has(a.id));
    if (!available.length) return null;
    return available[Math.floor(Math.random() * available.length)];
}

function renderArtifacts() {
    const bar = document.getElementById('artifactsBar');
    if (!bar) return;
    if (!gameState.artifacts.length) {
        bar.innerHTML = '<span class="no-artifacts">Sin artefactos</span>';
        return;
    }
    bar.innerHTML = gameState.artifacts.map(a =>
        `<span class="artifact-badge" title="${a.name}: ${a.description}">
            <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" style="vertical-align:middle;opacity:0.85">
                <polygon points="6,1 11,6 6,11 1,6"/>
            </svg>
            <small>${a.name}</small>
        </span>`
    ).join('');
}

// ═══════════════════════════════════════════════════
//  HELPERS Y UTILIDADES
// ═══════════════════════════════════════════════════

function getArtifactDamageBonus() {
    return gameState.artifacts
        .filter(a => a.effect.type === 'damage_bonus')
        .reduce((sum, a) => sum + a.effect.value, 0);
}

function getArtifactDefenseBonus() {
    return gameState.artifacts
        .filter(a => a.effect.type === 'defense_bonus')
        .reduce((sum, a) => sum + a.effect.value, 0);
}

function getArtifactEnemyDamageReduction() {
    return gameState.artifacts
        .filter(a => a.effect.type === 'enemy_damage_reduction')
        .reduce((sum, a) => sum + a.effect.value, 0);
}

function addLog(msg) {
    gameState.battleLog.unshift(msg);
    const logEl = document.getElementById('battleLog');
    if (logEl) logEl.textContent = gameState.battleLog.slice(0, 5).join('\n');
}

function showNotification(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 2800);
}
