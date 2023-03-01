let posX;
let posY;
let elUpDown;
let elLeftRight;
let i;
let j;
let parfait;
let img;
let rakko_face;
let rakko_side1;
let rakko_side2;
let rakko_side;
let imgChange;
let pudding;
let life;
let score;
let restartBtn;
let bgImg;
let characterState = "ALIVE" || "DIE";
let gameState = "START" || "END";
let textState = "SHOW" || "HIDE";
let w_wallState;
let a_wallState;
let s_wallState;
let d_wallState;
let myFont;
let increase;
let eggMonster1;
let eggMonster2;
let eggMonster;
let ladybugMonster1;
let ladybugMonster2;
let ladybugMonster;
let eggMonsterX;
let eggMonsterY;
let ladybugMonsterX;
let ladybugMonsterY;
let portal;
let map;
let onePoint;
let onePointX;
let onePointY;
let fivePoint;
let fivePointX;
let fivePointY;

function preload() {
  parfait = loadImage("/images/parfait.png");
  rakko_face = loadImage("/images/rakko_face.png");
  rakko_side1 = loadImage("/images/rakko_side1.png");
  rakko_side2 = loadImage("/images/rakko_side2.png");
  pudding = loadImage("/images/pudding.png");
  bgImg = loadImage("/images/background.png");
  eggMonster1 = loadImage("/images/eggMonster.png");
  eggMonster2 = loadImage("/images/eggMonster2.png");
  ladybugMonster1 = loadImage("/images/ladybugMonster.png");
  ladybugMonster2 = loadImage("/images/ladybugMonster2.png");
  portal = loadImage("/images/portal.png");

  rakko_side = loadAnimation(rakko_side1, rakko_side2);
  rakko_side.frameDelay = 10;
  eggMonster = loadAnimation(eggMonster1, eggMonster2);
  eggMonster.frameDelay = 10;
  ladybugMonster = loadAnimation(ladybugMonster1, ladybugMonster2);
  ladybugMonster.frameDelay = 10;

  loadFont(
    "https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/BinggraeSamanco-Bold.woff"
  );
}

function setup() {
  posX = 320;
  posY = 320;
  elUpDown = posY - 60;
  elLeftRight = posX + 20;
  i = 0;
  j = 0;
  life = 2;
  score = 0;
  imgChange = false;
  characterState = "ALIVE";
  gameState = "END";
  textState = "SHOW";
  w_wallState = false;
  a_wallState = false;
  s_wallState = false;
  d_wallState = false;
  increase = true;
  eggMonsterX = 315;
  eggMonsterY = 125;
  ladybugMonsterX = 520;
  ladybugMonsterY = 400;

  onePoint = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];
  onePointX = 100;
  onePointY = 75;
  fivePoint = [true, true, true, true, true];
  fivePointX = 80;
  fivePointY = 400;

  createCanvas(640, 480);
  imageMode(CENTER);
  rectMode(CENTER);

  restartBtn = createButton("Restart?");
  restartBtn.hide();
}

function draw() {
  image(bgImg, width / 2, height / 2, 640, 480);

  //전체범위(게임영역)에서 벗어나지 않기
  //캐릭터(전체범위)
  if (posX < 40) {
    if (posY - 15 < height / 2 && posY + 15 > height / 2) {
      w_wallState = true;
      s_wallState = true;
      posY = height / 2;

      if (posX < 0) {
        posX = 640;
      }
    } else {
      posX = 40;
    }
  } else {
    w_wallState = false;
    s_wallState = false;
  }
  if (posX > 600) {
    if (posY - 15 < height / 2 && posY + 15 > height / 2) {
      w_wallState = true;
      s_wallState = true;
      posY = height / 2;

      if (posX > 640) {
        posX = 0;
      }
    } else {
      posX = 600;
    }
  } else {
    w_wallState = false;
    s_wallState = false;
  }
  if (posY < 60) {
    posY = 60;
  }
  if (posY > 420) {
    posY = 420;
  }

  //적(전체범위)
  if (eggMonsterX < 30) {
    eggMonsterX = 30;
  }
  if (eggMonsterX > 610) {
    eggMonsterX = 610;
  }
  if (eggMonsterY < 60) {
    eggMonsterY = 60;
  }
  if (eggMonsterY > 420) {
    eggMonsterY = 420;
  }
  if (ladybugMonsterX < 30) {
    ladybugMonsterX = 30;
  }
  if (ladybugMonsterX > 610) {
    ladybugMonsterX = 610;
  }
  if (ladybugMonsterY < 60) {
    ladybugMonsterY = 60;
  }
  if (ladybugMonsterY > 420) {
    ladybugMonsterY = 420;
  }

  //아이템(전체범위)
  if (onePointX < 30) {
    onePointX = 30;
  }
  if (onePointX > 610) {
    onePointX = 610;
  }
  if (onePointY < 60) {
    onePointY = 60;
  }
  if (onePointY > 420) {
    onePointY = 420;
  }
  if (fivePointX < 30) {
    fivePointX = 30;
  }
  if (fivePointX > 610) {
    fivePointX = 610;
  }
  if (fivePointY < 60) {
    fivePointY = 60;
  }
  if (fivePointY > 420) {
    fivePointY = 420;
  }

  //적 충돌
  if (gameState == "START" && characterState == "ALIVE") {
    if (
      eggMonsterX > posX - 40 &&
      eggMonsterX < posX + 40 &&
      eggMonsterY > posY - 40 &&
      eggMonsterY < posY + 40
    ) {
      console.log("DIE");

      characterState = "DIE";
    } else if (
      ladybugMonsterX > posX - 40 &&
      ladybugMonsterX < posX + 40 &&
      ladybugMonsterY > posY - 40 &&
      ladybugMonsterY < posY + 40
    ) {
      console.log("DIE");
      characterState = "DIE";
    }
  }

  //게임 오버 & 진행
  if (life == 0 && characterState == "DIE" && gameState == "START") {
    life = life - 1; //게임오버 전에 목숨 하나 사라지도록
    gameState = "END";

    noLoop();
    btnStyle(restartBtn);
    textSize(30);
    textFont("BinggraeSamanco-Bold");
    textAlign(CENTER, CENTER);
    text("YOU LOSE!", width / 2, height / 2 - 80);
  } else if (life >= 1 && characterState == "DIE" && gameState == "START") {
    posX = 320;
    posY = 320;
    life = life - 1;
    characterState = "ALIVE";
  } else if (score >= 40 && characterState == "ALIVE" && gameState == "START") {
    gameState = "END";

    noLoop();
    btnStyle(restartBtn);
    textSize(30);
    textFont("BinggraeSamanco-Bold");
    textAlign(CENTER, CENTER);
    text("YOU WIN!", width / 2, height / 2 - 80);
  }

  //벽
  strokeWeight(5);
  line(0, height / 2 - 25, 15, height / 2 - 25);
  line(0, height / 2 + 25, 15, height / 2 + 25);
  line(width - 15, height / 2 - 25, width, height / 2 - 25);
  line(width - 15, height / 2 + 25, width, height / 2 + 25);
  line(15, height / 2 - 25, 15, 40);
  line(15, height / 2 + 25, 15, height - 40);
  line(15, 40, width - 15, 40);
  line(15, height - 40, width - 15, height - 40);
  line(width - 15, height / 2 - 25, width - 15, 40);
  line(width - 15, height / 2 + 25, width - 15, height - 40);

  //장애물
  fill(170, 210, 150, 150);
  rect(width / 2, height / 2, 200, 100, 3);
  line(220, 190, 420, 190);
  line(220, 290, 420, 290);

  if (mouseIsPressed) {
    console.log(mouseX, mouseY);
  }
  //장애물 못 넘어가게 하기
  if (posX + 20 > 220 && posX + 20 < 425) {
    if (posY - 15 < 60 || posY < 170) {
      if (posY - 15 < 170 && posY + 15 > 170) {
        s_wallState = true;
        d_wallState = false;
        a_wallState = false;
      } else {
        d_wallState = true;
      }
    } else if (posY - 15 < 315 || posY + 15 < 440) {
      if (posY - 15 < 315 && posY + 15 > 315) {
        w_wallState = true;
        d_wallState = false;
        a_wallState = false;
      }
    } else {
      posX = 190;
    }
  } else {
    s_wallState = false;
    w_wallState = false;
    d_wallState = false;
    a_wallState = false;
  }

  //포탈
  image(portal, 0, height / 2, 100, 90);
  image(portal, 640, height / 2, 100, 90);

  //적 생성
  eggMonster1.resize(90, 90);
  eggMonster2.resize(90, 0);
  ladybugMonster1.resize(90, 90);
  ladybugMonster2.resize(90, 90);
  animation(eggMonster, eggMonsterX, eggMonsterY);
  animation(ladybugMonster, ladybugMonsterX, ladybugMonsterY);

  //아이템(포인트) 생성
  noStroke();
  fill(255, 240, 0);
  for (let k = 0; k < onePoint.length + 1; k++) {
    if (gameState == "START" && onePoint[k] == true) {
      if (onePointX <= 100) {
        onePointX = onePointX + k * 30;

        if (
          onePointX > posX - 40 &&
          onePointX < posX + 40 &&
          onePointY > posY - 40 &&
          onePointY < posY + 40
        ) {
          print("onePoint");
          onePoint[k] = false;
          score += 1;
        }
      } else {
        onePointX = 100;
      }
      ellipse(onePointX, onePointY, 20, 20);
    }
  }
  for (let k = 0; k < fivePoint.length + 1; k++) {
    if (gameState == "START" && fivePoint[k] == true) {
      if (fivePointX <= 200) {
        fivePointX = fivePointX + k * 30;

        if (
          fivePointX > posX - 40 &&
          fivePointX < posX + 40 &&
          fivePointY > posY - 40 &&
          fivePointY < posY + 40
        ) {
          print("fivePoint");
          fivePoint[k] = false;
          score += 5;
        }
      } else {
        fivePointX = 200;
      }
      image(parfait, fivePointX, fivePointY, 50, 50);
    }
  }

  //스코어 카운트
  fill(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  textFont("BinggraeSamanco-Bold");
  text("SCORE: " + score, width / 2, 20);

  //목숨(푸딩) 생성
  for (let k = 0; k < life + 1; k++) {
    image(pudding, 25 + k * 30, 20, 55, 55);
  }

  //시작 화면
  noStroke();
  if (gameState == "END" && textState == "SHOW") {
    // img = rakko_face;
    imgChange = false;

    fill(0, 0, 0, 250);
    // rect(width / 2, height / 2, 640, 480); //시작 전과 후 화면 구분용

    fill(255, 240, 0);
    textSize(50);
    text("Press Key To Start", width / 2, height / 2);

    //게임 시작
    if (keyIsPressed) {
      gameState = "START";
      textState = "HIDE";
      imgChange = true;

      console.log(gameState);
    }
  } else {
    //재시작 후 key 누를 시 발동
    if (keyIsPressed) {
      imgChange = true;

      console.log(gameState);
    }
  }

  //캐릭터 생성
  if (imgChange == true) {
    rakko_side1.resize(80, 80);
    rakko_side2.resize(80, 80);

    // translate(posX, posY);
    // rotate(PI / 2); //아래
    // rotate(4);
    animation(rakko_side, posX, posY);
    // console.log(posX, posY);
  } else {
    image(rakko_face, posX, posY, 80, 80);
  }
}

function keyPressed() {
  if (w_wallState == false && (key === "w" || key === "ArrowUp")) {
    posY -= 20;
    i = PI * 1.5;
  } else if (a_wallState == false && (key === "a" || key === "ArrowLeft")) {
    posX -= 20;
    i = PI;

    // if (posX < width / 2 + 100) {
    //   if (posY < height / 2 + 100) {
    //     console.log(width);
    //     posX = width / 2 + 100;
    //   }
    // }
  } else if (s_wallState == false && (key === "s" || key === "ArrowDown")) {
    posY += 20;
    i = PI / 2;
  } else if (d_wallState == false && (key === "d" || key === "ArrowRight")) {
    posX += 20;
    i = 0;

    // if (posX > width / 2 - 100) {
    //   if (posY < height / 2 + 100) {
    //     console.log(width);
    //     posX = width / 2 - 100;
    //   }
    // }
  }
}

// function setImg() {
//   let k;
//   k++;
//   if (k < charMotion.length) {
//     img = charMotion[k];
//     console.log(k);
//   } else {
//     k = 0;
//     console.log(k);
//   }
// }

function btnStyle(btn) {
  btn.show();
  btn.position(
    width / 2 - 150,
    height / 2 - 50,
    width / 2 + 150,
    height / 2 + 50
  );
  btn.size(300, 100);
  btn.style("border", "none");
  btn.style("font-family", "BinggraeSamanco-Bold");
  btn.style("font-size", "50px");
  btn.style("color", "red");
  btn.style("background", "dark-gray");
  btn.style("border-radius", "45px");
  btn.style("box-shadow", "0px 8px 5px rgba(0, 0, 0, 0.1)");
  btn.mousePressed(restart);
}

function restart() {
  characterState = "ALIVE";
  gameState = "START";
  posX = 320;
  posY = 320;
  life = 2;
  i = 0;
  imgChange = false;
  score = 0;
  onePoint = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];
  fivePoint = [true, true, true, true, true];

  loop();
  redraw(1);
  restartBtn.hide();

  console.log(gameState);
  console.log(textState);
  console.log("restart");
}

// function plus() {
//   k = 0;
//   k++;

//   if (k <= 60) {
//     image(rakko_side1, 100, 400, 100, 100);
//   }
//   increase = false;
// }

// function minus() {
//   k = 60;
//   k--;

//   if (k >= 0) {
//     image(rakko_side2, 100, 400, 100, 100);
//   }
//   increase = true;
// }
