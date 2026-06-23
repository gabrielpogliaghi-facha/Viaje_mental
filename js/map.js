// Renderizar el layout del mapa
function renderMapLayout() {
    const container = document.getElementById('mapContainer');
    container.innerHTML = '';
    let nodeIdx = 0;

    MAP_STRUCTURE.forEach(count => {
        const rowEl = document.createElement('div');
        rowEl.className = 'map-row';

        for (let i = 0; i < count; i++) {
            const node = gameState.mapNodes[nodeIdx];
            const nodeEl = document.createElement('div');
            nodeEl.className = 'node';
            nodeEl.setAttribute('data-type', node.type);
            nodeEl.id = `node-${nodeIdx}`;

            if (node.visited) nodeEl.classList.add('visited');
            if (node.locked)  nodeEl.classList.add('locked');

            const info = NODE_TYPES[node.type];
            nodeEl.innerHTML = `
                <div class="node-icon">${info.svg}</div>
                <div class="node-label">${info.label}</div>
            `;

            const idx = nodeIdx;
            nodeEl.onclick = () => selectNode(idx);
            rowEl.appendChild(nodeEl);
            nodeIdx++;
        }

        container.appendChild(rowEl);
    });
}

// Dibujar conexiones SVG entre nodos
function drawConnections() {
    const svg = document.getElementById('connectionsSvg');
    svg.innerHTML = '';

    const wrapper = document.querySelector('.map-wrapper');
    svg.setAttribute('width', wrapper.clientWidth);
    svg.setAttribute('height', wrapper.clientHeight);

    const actColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-act').trim() || '#4c9aff';

    Object.keys(gameState.mapNodeConnections).forEach(fromId => {
        const fromNode = document.getElementById(`node-${fromId}`);
        if (!fromNode) return;

        const fromRect = fromNode.getBoundingClientRect();
        const svgRect  = svg.getBoundingClientRect();
        const x1 = fromRect.left - svgRect.left + fromRect.width / 2;
        const y1 = fromRect.top  - svgRect.top  + fromRect.height / 2;

        gameState.mapNodeConnections[fromId].forEach(toIdx => {
            const toNode = document.getElementById(`node-${toIdx}`);
            if (!toNode) return;

            const toRect = toNode.getBoundingClientRect();
            const x2 = toRect.left - svgRect.left + toRect.width / 2;
            const y2 = toRect.top  - svgRect.top  + toRect.height / 2;

            const visited = gameState.mapNodes[fromId]?.visited;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', actColor);
            line.setAttribute('stroke-width', visited ? '2.5' : '1.5');
            line.setAttribute('stroke-opacity', visited ? '0.6' : '0.22');
            line.setAttribute('stroke-dasharray', visited ? 'none' : '6,5');
            line.setAttribute('stroke-linecap', 'round');
            svg.appendChild(line);
        });
    });
}

function showMapScreen() {
    showScreen('map');
}
