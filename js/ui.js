// Actualizar header con stats del jugador
function updateHeader() {
    const actNum = gameState.currentAct + 1;

    // Ícono de acto: número dentro de círculo con color del acto actual
    const actIcon = document.getElementById('headerActIcon');
    if (actIcon) {
        actIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <text x="12" y="16.5" text-anchor="middle" font-size="10" font-weight="800"
                  fill="currentColor" stroke="none" font-family="system-ui,sans-serif">${actNum}</text>
        </svg>`;
    }

    document.getElementById('headerAct').textContent = `${actNum}/5`;
    document.getElementById('headerProgress').textContent = `${gameState.visitedNodes.size}/41`;
    document.getElementById('headerHp').textContent = `${gameState.playerHp}/${gameState.playerMaxHp}`;
    document.getElementById('headerCoins').textContent = gameState.coins;
    document.getElementById('headerDeck').textContent = gameState.deck.length;
}

// Mostrar pantalla específica
function showScreen(screen) {
    document.querySelectorAll('.game-screen').forEach(s => s.classList.remove('active'));
    if (screen === 'map') {
        document.getElementById('mapScreen').classList.add('active');
    } else if (screen === 'battle') {
        document.getElementById('battleScreen').classList.add('active');
    }
}

// Mostrar modal por tipo
function showModal(type) {
    const ids = {
        defeat: 'defeatModal',
        gameWin: 'gameWinModal',
        shop: 'shopModal',
        event: 'eventModal',
        bossDialogue: 'bossDialogueModal',
        victoryReward: 'victoryRewardModal',
        actComplete: 'actCompleteModal'
    };
    const id = ids[type];
    if (id) document.getElementById(id)?.classList.add('show');
}

// Ocultar modal por tipo
function hideModal(type) {
    const ids = {
        defeat: 'defeatModal',
        gameWin: 'gameWinModal',
        shop: 'shopModal',
        event: 'eventModal',
        bossDialogue: 'bossDialogueModal',
        victoryReward: 'victoryRewardModal',
        actComplete: 'actCompleteModal'
    };
    const id = ids[type];
    if (id) document.getElementById(id)?.classList.remove('show');
}

// Exportar funciones al scope global para el HTML
window.selectNode = selectNode;
window.playCard = playCard;
window.endTurn = endTurn;
window.backToMap = backToMap;
window.showModal = showModal;
window.hideModal = hideModal;
window.confirmBossBattle = confirmBossBattle;
window.selectRewardCard = selectRewardCard;
window.skipCardReward = skipCardReward;
window.buyCard = buyCard;
window.leaveShop = leaveShop;
window.handleEventChoice = handleEventChoice;
window.proceedToNextAct = proceedToNextAct;
