// Punto de entrada del juego
window.addEventListener('load', () => {
    console.log('%c🧠 VIAJE MENTAL - Fase 2', 'color: #fbbf24; font-size: 18px; font-weight: bold;');
    console.log('%c20 cartas | 5 actos | Artefactos | Tienda | Eventos', 'color: #8b5cf6;');
    initGame();
    console.log('%c✓ Juego iniciado!', 'color: #10b981;');
});

console.log(`
╔══════════════════════════════════════════╗
║  VIAJE MENTAL - FASE 2 - ESTRUCTURA      ║
╚══════════════════════════════════════════╝

📁 js/data/
   cards.js     → 20 cartas con rareza
   enemies.js   → 18 enemigos + 5 jefes
   acts.js      → 5 actos temáticos
   artifacts.js → 10 artefactos
   events.js    → 6 eventos narrativos

📁 js/
   game.js      → lógica principal
   map.js       → renderizado del mapa
   battle.js    → UI del combate
   ui.js        → modales y pantallas
   main.js      → entrada del juego

📁 css/
   main.css     → estilos globales
   map.css      → estilos del mapa
   battle.css   → estilos del combate
`);
