"use strict";

// Variables
let gameActive = false; 
let titleImg;
let playButtonImg;
let moveSFX;
let crunchSFX;
let hurtSFX;
let bgMusic;
let swayAngle = 0;
let skySize = 0;
let lanes = [64, 192, 320, 448, 576]; // The middle of each lane 1-5
let currentLane = 2;
let hunger = 128;
let blueFlyChance = 10;
let flySpeed = 5;

const frog = {
    body: {
        x: 320,
        y: 750,
        size: 150
    },
};

const fly = {
    x: 320,
    y: 0,
    size: 10,
    status: 100
};

function setup() { 
    createCanvas(640, 750);
}

function preload() {
    titleImg = loadImage("assets/images/title.png");
    playButtonImg = loadImage("assets/images/play_button.png");
    moveSFX = loadSound("assets/sounds/move.mp3");
    crunchSFX = loadSound("assets/sounds/crunch.wav");
    hurtSFX = loadSound("assets/sounds/hurt.wav");
    bgMusic = loadSound("assets/sounds/bg.mp3");
    bgMusic.setVolume(0.10);
    moveSFX.setVolume(0.25);
    hurtSFX.setVolume(0.25);
    crunchSFX.setVolume(0.25);
}

function draw() {
    background("#87ceeb");
    drawPlayButton();
    gameScene();
    drawFrog();
    gameOver();
}

function drawCircle(color, x, y, size) {
    push();
    fill(color);
    noStroke();
    ellipse(x, y, size);
    pop();
}

function drawBox(color, x, y, w, h) {
    push();
    fill(color);
    noStroke();
    rect(x, y, w, h);
    pop();
}

function drawPlayButton() {
    if (!gameActive) {
        imageMode(CENTER);
        image(playButtonImg, width / 2, height / 2);
    }
}

function gameScene() {
    if (gameActive) {
        drawBox("white", 128, 0, 0.5, 1000)
        drawBox("white", 256, 0, 0.5, 1000)
        drawBox("white", 384, 0, 0.5, 1000)
        drawBox("white", 512, 0, 0.5, 1000)

        drawFly();
        moveFly();
        flyEaten();
        drawHungerBar();
    }
}

function mousePressed() {
    if (!gameActive) {
        let d = dist(mouseX, mouseY, width / 2, height / 2);
        // Adjust 100 based on your button size
        if (d < 100) {
            gameActive = true;
            bgMusic.loop();
        }
    }
}

function drawHungerBar() {
    drawBox("red", 0, 0, hunger, 25)
    if (hunger < 640) {
        hunger -= 0.5;
    }
}

function drawFrog() {
    drawCircle("#00ff00", frog.body.x, frog.body.y, frog.body.size)
    drawCircle("white", frog.body.x - 50, frog.body.y - 60, 40)
    drawCircle("white", frog.body.x + 50, frog.body.y - 60, 40)
    drawCircle("black", frog.body.x - 50, frog.body.y - 60, 20)
    drawCircle("black", frog.body.x + 50, frog.body.y - 60, 20)
    drawCircle("red", frog.body.x, frog.body.y - 60, 20)
}

function drawFly() {
    if (gameActive) {
        if (fly.status > blueFlyChance) {
            push();
            noStroke();
            fill("#000000");
            ellipse(fly.x, fly.y, fly.size);
            pop();
        }
        else {
            push();
            noStroke();
            fill("blue");
            ellipse(fly.x, fly.y, fly.size);
            pop();
        }
    }
}

function moveFly() {
    if (gameActive) {
        fly.y += flySpeed;
        if (fly.y > height) {
            resetFly();
        }
    }
}

function resetFly() {
    if (gameActive) {
        fly.y = 0;
        fly.x = random(lanes);
        fly.status = random(1, 100);
        flySpeed += 0.5
    }
}

function flyEaten() {
    let d = dist(fly.x, fly.y, frog.body.x, frog.body.y - 60);
    if (d < (fly.size / 2 + 20) && fly.status > blueFlyChance) {
        resetFly();
        hunger += 128;
        crunchSFX.play();
    }
    else if (d < (fly.size / 2 + 20) && fly.status < blueFlyChance) {
        resetFly();
        hunger -= 64;
        hurtSFX.play();
    }
}

function keyPressed() {
    if (gameActive) {
        if (keyCode == LEFT_ARROW && currentLane > 0) {
            currentLane -= 1;
            moveSFX.play();
        } 
        else if (keyCode == RIGHT_ARROW && currentLane < lanes.length - 1) {
            currentLane += 1;
            moveSFX.play();
        }
        frog.body.x = lanes[currentLane];
    }
}

function gameOver() {
    if (hunger <= 0) {
        gameLose();
        fly.speed = 0
    }
    else if (hunger >= 640) {
        gameWin();
        fly.speed = 0
    }
}

function gameLose() {
    gameActive = false;
    drawBox("red", 0, 0, 1000, 1000)
    push();
    fill("white");
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2)
    pop();
}

function gameWin() {
    gameActive = false;
    drawBox("green", 0, 0, 1000, 1000)
    push();
    fill("white");
    textSize(32);
    textAlign(CENTER, CENTER);
    text("YOU WIN", width / 2, height / 2)
    pop();
}