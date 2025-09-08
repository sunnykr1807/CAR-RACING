const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = new Image();
car.src = "images/car.png";

let enemies = [
  new Image(),
  new Image(),
  new Image()
];
enemies[0].src = "images/enemy1.png";
enemies[1].src = "images/enemy2.png";
enemies[2].src = "images/enemy3.png";

let carX = canvas.width / 2 - 25;
let carY = canvas.height - 100;
let carWidth = 50;
let carHeight = 100;

let enemyCars = [];
let score = 0;
let gameOver = false;

function spawnEnemy() {
  let x = Math.random() * (canvas.width - carWidth);
  let y = -100;
  let img = enemies[Math.floor(Math.random() * enemies.length)];
  enemyCars.push({ x, y, img });
}

function drawCar() {
  ctx.drawImage(car, carX, carY, carWidth, carHeight);
}

function drawEnemies() {
  for (let i = 0; i < enemyCars.length; i++) {
    let e = enemyCars[i];
    ctx.drawImage(e.img, e.x, e.y, carWidth, carHeight);
  }
}

function updateEnemies() {
  for (let i = 0; i < enemyCars.length; i++) {
    let e = enemyCars[i];
    e.y += 5;

    if (e.y > canvas.height) {
      enemyCars.splice(i, 1);
      score += 10;
      document.getElementById("score").innerText = "Score: " + score;
    }

    if (
      carX < e.x + carWidth &&
      carX + carWidth > e.x &&
      carY < e.y + carHeight &&
      carY + carHeight > e.y
    ) {
      gameOver = true;
      document.getElementById("restartBtn").style.display = "block";
    }
  }
}

function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCar();
  drawEnemies();
  updateEnemies();

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && carX > 0) {
    carX -= 20;
  } else if (e.key === "ArrowRight" && carX < canvas.width - carWidth) {
    carX += 20;
  }
});

setInterval(spawnEnemy, 2000);
gameLoop();

document.getElementById("restartBtn").addEventListener("click", () => {
  enemyCars = [];
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = "Score: 0";
  document.getElementById("restartBtn").style.display = "none";
  gameLoop();
});
