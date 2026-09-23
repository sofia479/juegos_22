const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GRID = 40; // Celda de 40px (Matriz de 10x10)
let score = 0;
let lives = 3;

// Posición inicial de la rana
const frog = { x: 4 * GRID, y: 9 * GRID };

// Carros de la carretera
const cars = [
  { x: 0, y: 7 * GRID, speed: 2, width: 60, color: "#e74c3c" },
  { x: 200, y: 6 * GRID, speed: -3, width: 50, color: "#e67e22" },
  { x: 100, y: 5 * GRID, speed: 2.5, width: 60, color: "#f1c40f" }
];

// Troncos del río
const logs = [
  { x: 0, y: 3 * GRID, speed: 1.5, width: 80, color: "#8b5a2b" },
  { x: 150, y: 2 * GRID, speed: -2, width: 100, color: "#8b5a2b" },
  { x: 50, y: 1 * GRID, speed: 1, width: 70, color: "#8b5a2b" }
];

// Mover la rana por cuadrícula
function move(dir) {
  if (dir === "up" && frog.y > 0) frog.y -= GRID;
  if (dir === "down" && frog.y < canvas.height - GRID) frog.y += GRID;
  if (dir === "left" && frog.x > 0) frog.x -= GRID;
  if (dir === "right" && frog.x < canvas.width - GRID) frog.x += GRID;
}

// Controles de teclado (Flechas y WASD)
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") move("up");
  if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") move("down");
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") move("left");
  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") move("right");
});

// Reiniciar rana al inicio
function resetFrog() {
  frog.x = 4 * GRID;
  frog.y = 9 * GRID;
}

// Restar vida y reiniciar nivel
function loseLife(msg) {
  lives--;
  document.getElementById("lives").textContent = lives;
  resetFrog();
  if (lives <= 0) {
    alert("¡Juego Terminado! " + msg);
    lives = 3;
    score = 0;
    document.getElementById("lives").textContent = lives;
    document.getElementById("score").textContent = score;
  }
}

// Lógica del juego
function update() {
  // 1. Mover Carros y detectar atropellos
  cars.forEach(car => {
    car.x += car.speed;
    if (car.speed > 0 && car.x > canvas.width) car.x = -car.width;
    if (car.speed < 0 && car.x < -car.width) car.x = canvas.width;

    if (
      frog.y === car.y &&
      frog.x + GRID > car.x &&
      frog.x < car.x + car.width
    ) {
      loseLife("Te atropelló un carro.");
    }
  });

  // 2. Mover Troncos y verificar si flota en el río
  let onLog = false;
  const frogRow = frog.y / GRID;

  logs.forEach(log => {
    log.x += log.speed;
    if (log.speed > 0 && log.x > canvas.width) log.x = -log.width;
    if (log.speed < 0 && log.x < -log.width) log.x = canvas.width;

    if (
      frog.y === log.y &&
      frog.x + GRID / 2 > log.x &&
      frog.x + GRID / 2 < log.x + log.width
    ) {
      onLog = true;
      frog.x += log.speed; // Mover rana junto con el tronco
    }
  });

  // Si está en las filas del río (1, 2 o 3) sin tronco -> Cae al agua
  if (frogRow >= 1 && frogRow <= 3 && !onLog) {
    loseLife("Te caíste al agua.");
  }

  // Caerse fuera de la pantalla por el tronco
  if (frog.x < 0 || frog.x >= canvas.width) {
    loseLife("Te saliste de la pantalla.");
  }

  // 3. Llegar a la Meta (Fila 0)
  if (frog.y === 0) {
    score += 100;
    document.getElementById("score").textContent = score;
    resetFrog();
  }
}

// Dibujar en pantalla
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Escenario
  ctx.fillStyle = "#1b5e20"; ctx.fillRect(0, 0, canvas.width, GRID);          // Meta
  ctx.fillStyle = "#1565c0"; ctx.fillRect(0, GRID, canvas.width, 3 * GRID);   // Río
  ctx.fillStyle = "#2e7d32"; ctx.fillRect(0, 4 * GRID, canvas.width, GRID);   // Descanso
  ctx.fillStyle = "#333333"; ctx.fillRect(0, 5 * GRID, canvas.width, 3 * GRID); // Carretera
  ctx.fillStyle = "#2e7d32"; ctx.fillRect(0, 8 * GRID, canvas.width, 2 * GRID); // Inicio

  // Troncos
  logs.forEach(log => {
    ctx.fillStyle = log.color;
    ctx.fillRect(log.x, log.y + 5, log.width, GRID - 10);
  });

  // Carros
  cars.forEach(car => {
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y + 5, car.width, GRID - 10);
  });

  // Rana
  ctx.fillStyle = "#00e676";
  ctx.beginPath();
  ctx.arc(frog.x + GRID / 2, frog.y + GRID / 2, GRID / 2 - 4, 0, Math.PI * 2);
  ctx.fill();
}

// Bucle principal de animación
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
