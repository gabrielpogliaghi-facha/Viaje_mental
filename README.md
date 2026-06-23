# 🧠 VIAJE MENTAL - Estructura Modular

Roguelike de cartas estilo Slay the Spire con arquitectura escalable y modular.

## 📁 Estructura de Archivos

```
viaje_mental/
├── index.html              # Punto de entrada HTML
├── README.md              # Este archivo
│
├── css/
│   ├── main.css          # Estilos globales, variables, animaciones
│   ├── map.css           # Estilos específicos del mapa
│   └── battle.css        # Estilos específicos del combate
│
└── js/
    ├── data/
    │   ├── cards.js      # Definiciones de cartas
    │   ├── enemies.js    # Definiciones de enemigos
    │   └── acts.js       # Definiciones de actos
    │
    ├── game.js           # Lógica principal del juego
    ├── map.js            # Lógica específica del mapa
    ├── battle.js         # Lógica específica del combate
    ├── ui.js             # Funciones de interfaz
    └── main.js           # Punto de entrada/inicialización
```

## 🎮 Cómo Funciona

### Flujo de Carga
1. **index.html** se carga
2. Se cargan todos los archivos JS en orden:
   - Primero: datos (cards.js, enemies.js, acts.js)
   - Luego: lógica (game.js, map.js, battle.js, ui.js)
   - Último: inicialización (main.js)

### Estado del Juego
El `gameState` global contiene toda la información:
```javascript
{
    currentAct: 0,           // Acto actual (0-4)
    playerHp: 50,            // HP del jugador
    playerMaxHp: 50,         // HP máximo
    hand: [],                // Cartas en mano
    deck: [],                // Mazo de cartas
    energy: 3,               // Energía actual
    mapNodes: [],            // Nodos del mapa
    visitedNodes: Set(),     // Nodos visitados
    enemy: null,             // Enemigo actual
    gameMode: 'map'          // 'map' o 'battle'
}
```

## 🚀 Próximas Fases

### FASE 2: Expansión de Contenido
- [ ] Más cartas (12 → 30)
- [ ] Sistema de rareza (común, infrecuente, raro, épico)
- [ ] Enemigos temáticos por acto
- [ ] Tienda funcional
- [ ] Eventos especiales
- [ ] Diálogos narrativos

### FASE 3: Sistemas Avanzados
- [ ] Artefactos (items permanentes)
- [ ] Poderes especiales (buffs permanentes)
- [ ] Modificadores de combate

### FASE 4: Más Contenido
- [ ] Meta-progresión (desbloqueables)
- [ ] Finales alternativos
- [ ] Difficulty settings

### FASE 5: Pulido
- [ ] Efectos visuales mejorados
- [ ] Animaciones de combate
- [ ] Música y sonido
- [ ] Pantalla de game over refinada

## 📝 Agregar Nuevas Cartas

En `js/data/cards.js`:

```javascript
const CARDS = {
    tu_carta: {
        name: 'Nombre de la Carta',
        emoji: '🎯',
        cost: 2,
        damage: 10,        // opcional
        defense: 5,        // opcional
        heal: 8,           // opcional
        description: 'Descripción corta'
    }
};
```

## 👿 Agregar Nuevos Enemigos

En `js/data/enemies.js`:

```javascript
const ENEMIES = [
    {
        name: 'Nombre del Enemigo',
        emoji: '👹',
        hp: 25,
        damage: 6,
        act: 0  // Acto en el que aparece (0-4)
    }
];
```

## 🎯 Agregar Nuevos Actos

En `js/data/acts.js`:

```javascript
const ACTS = [
    {
        id: 0,
        name: 'NOMBRE',
        emoji: '🎯',
        color: '#ffffff',
        description: 'Descripción'
    }
];
```

## 🔍 Debugging

En el navegador:
```javascript
// Ver estado actual
console.log(gameState);

// Ver cartas en mano
console.log(gameState.hand);

// Ver enemigo
console.log(gameState.enemy);

// Manipular HP (testing)
gameState.playerHp = 100;
```

## 📚 Referencia Rápida

### Cambiar de pantalla
```javascript
showScreen('map');      // Mostrar mapa
showScreen('battle');   // Mostrar combate
```

### Agregar mensaje al log
```javascript
addLog('Tu mensaje aquí');
```

### Mostrar modal
```javascript
showModal('victory');    // Victoria
showModal('defeat');     // Derrota
showModal('gameWin');    // Ganaste el juego
```

### Obtener información
```javascript
getAct(0);              // Obtener acto 0
getActName(0);          // Obtener nombre del acto 0
getRandomEnemy(0);      // Enemigo random del acto 0
getActBoss(0);          // Boss del acto 0
```

## 🎨 Personalizar Colores

En `css/main.css`, variables CSS:
```css
:root {
    --bg-primary: #0f172a;      /* Fondo principal */
    --bg-secondary: #1e293b;    /* Fondo secundario */
    --color-primary: #3b82f6;   /* Color primario */
    --color-secondary: #8b5cf6; /* Color secundario */
    --color-accent: #fbbf24;    /* Color de acentos */
}
```

## 💡 Notas de Desarrollo

- Siempre mantén los datos separados de la lógica
- Documenta nuevas funciones con comentarios
- Usa console.log() para debugging
- Prueba cambios en la consola antes de guardar
- Mantén la modularidad: una funcionalidad = un archivo

## 📞 Soporte

Si algo no funciona:
1. Abre la consola (F12)
2. Busca errores en rojo
3. Verifica que todos los archivos estén cargados
4. Recarga la página (Ctrl+Shift+R)

---

**Versión:** Beta v1.0  
**Última actualización:** 2026  
**Hecho con ❤️ para jugadores de roguelikes**
