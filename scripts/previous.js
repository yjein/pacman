let posX = 300;
let posY = 300;
let elUpDown = posY - 60;
let elLeftRight = posX + 20;
let arcStart = 5;
let arcEnd = 1.8;
let i = 0;
let enemyX = 0;
let enemyY = 0;
let enemyState = "ALIVE";

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  background(220);

  enemyX = mouseX;
  enemyY = mouseY;

  if (posX > 800) {
    posX = 800;
  }
  if (posX < 100) {
    posX = 100;
  }
  if (posY > 800) {
    posY = 800;
  }
  if (posY < 100) {
    posY = 100;
  }

  if (enemyX > 975) {
    enemyX = 975;
  }
  if (enemyX < 25) {
    enemyX = 25;
  }
  if (enemyY > 975) {
    enemyY = 975;
  }
  if (enemyY < 25) {
    enemyY = 25;
  }

  noStroke();
  fill(255, 240, 0);
  arc(posX, posY, 200, 200, PI / arcStart + i, PI * arcEnd + i);

  console.log(arcStart);

  arcStart += 1;
  if (arcStart == 20) {
    while (arcStart > 5) {
      arcStart -= 1;
    }
  }

  if (arcEnd <= 1.8) {
    arcEnd += 0.01;
  } else if (arcEnd >= 1.95) {
    arcEnd -= 0.01;
  }

  if (posX > width / 2 - 100) {
    posX = width / 2 - 100;
  }
  // if (posX < width / 2 + 100) {
  //   posX = width / 2 + 100;
  // }
  // if (posY > height / 2 - 100) {
  //   posY = height / 2 - 100;
  // }
  if (posY < height / 2 + 100) {
    posY = height / 2 + 100;
  }
  stroke(0);
  strokeWeight(5);
  line(width / 2, 0, width / 2, height / 2);

  if (enemyX > posX - 100 && enemyX < posX + 100) {
    if (enemyY > posY - 100 && enemyY < posY + 100) {
      console.log("DIE");
      enemyState = "DIE";
    }
  }

  if (enemyState == "DIE") {
    fill(255, 0, 0);
  } else {
    fill(0);
  }
  ellipse(enemyX, enemyY, 50, 50);

  if (keyIsPressed) {
    if (key === "w") {
      posY -= 10;
      // i = PI * 1.5;
    } else if (key === "a") {
      posX -= 10;
      // i = PI;
    } else if (key === "s") {
      posY += 10;
      // i = PI / 2;
    } else if (key === "d") {
      posX += 10;
      // i = 0;
    }
  }
}

function keyPressed() {
  if (key === "w") {
    posY -= 20;
    i = PI * 1.5;
  } else if (key === "a") {
    posX -= 20;
    i = PI;
  } else if (key === "s") {
    posY += 20;
    i = PI / 2;
  } else if (key === "d") {
    posX += 20;
    i = 0;
  }
}
