
"use strict";

let gameActive = false;
let titleImg;
let moveSFX;
let crunchSFX;
let swayAngle = 0;
let skySize = 0;
let scene = 1;
let lanes = [64, 192, 320, 448, 576];
let currentLane = 2;
let hunger = 128;

const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 750,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
};

const fly = {
    x: 320, // Random Lane
    y: 0, 
    size: 10,
    speed: 5
};

function setup() {
    createCanvas(640, 750);
}

function preload() {
    titleImg = loadImage("assets/images/title.png");
    moveSFX = loadSound("assets/sounds/move.mp3");
    crunchSFX = loadSound("assets/sounds/crunch.wav");
    moveSFX.setVolume(0.25);
    crunchSFX.setVolume(0.25);
}

function draw() {
    background("#87ceeb");
    titleScreen();
    drawTransition();
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

function titleScreen() { // This Function draw the Intro Scene
    if (!gameActive) {

        // Draw Clouds
        drawCircle("white", width / 4, height / 4, 150);
        drawCircle("white", width / 3, height / 3, 150);
        drawCircle("white", width / 6, height / 3, 150);
        drawCircle("white", width / 2 + width / 4, height / 4, 150);
        drawCircle("white", width / 2 + width / 3, height / 3, 150);
        drawCircle("white", width / 2 + width / 6, height / 3, 150);

        // Adds Sway to the Title
        swayAngle += 0.02; // Sway Speed
        let sway = sin(swayAngle) * 0.1; // Max Rotation Angle

        // Displays Title Image with Sway
        imageMode(CENTER);
        push();
        translate(width / 2, height / 3);
        rotate(sway);                     
        image(titleImg, 0, 0);        
        pop();

        // Instructions Text
        push();
        fill("black");
        textSize(16);
        textAlign(CENTER, CENTER);
        text("Click the Frog to Start", width / 7.5, height / 1.05)
        text("Use ARROW keys to move frog", width / 5.3, height / 1.02)
        pop();
    }
}

function drawTransition() {
    // Starting Animation
    if (scene == 2) {
        if (skySize < 1000) {
        skySize += 15
        }
        drawCircle("#87ceeb", width / 2, height / 2, skySize)
    }

    if (skySize >= 1000) {
        gameActive = true
    }
}

function gameScene() {
    if (gameActive) {

        // Draw Lanes
        drawBox("white", 128, 0, 0.5, 1000)
        drawBox("white", 256, 0, 0.5, 1000)
        drawBox("white", 384, 0, 0.5, 1000)
        drawBox("white", 512, 0, 0.5, 1000)

        // Call Fly Functions
        drawFly();
        moveFly();
        flyEaten();

        // Hunger Bar
        drawHungerBar();
    }
}

function mousePressed() {
    if (scene == 1) {
        let d = dist(mouseX, mouseY, frog.body.x, frog.body.y);
        if (d < frog.body.size / 2) {
            scene = 2
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
    // Draw the frog's body
    drawCircle("#00ff00", frog.body.x, frog.body.y, frog.body.size)
    // Draw the eyes
    drawCircle("white", frog.body.x - 50, frog.body.y - 60, 40)
    drawCircle("white", frog.body.x + 50, frog.body.y - 60, 40)
    drawCircle("black", frog.body.x - 50, frog.body.y - 60, 20)
    drawCircle("black", frog.body.x + 50, frog.body.y - 60, 20)
    // Draw the Mouth
    drawCircle("red", frog.body.x, frog.body.y - 60, 20)
}

function drawFly() {
    if (gameActive) {
        push();
        noStroke();
        fill("#000000");
        ellipse(fly.x, fly.y, fly.size);
        pop();
    }
}

function moveFly() {
    if (gameActive) {
        // Move the fly
        fly.y += fly.speed;
        // Handle the fly going off the canvas
        if (fly.y > height) {
            resetFly();
        }
    }
}

function resetFly() {
    if (gameActive) {
        fly.y = 0;
        fly.x = random(lanes);
        if (fly.speed < 7.5) {
            fly.speed += 0.1
        }
    }
}

function flyEaten() {
    let d = dist(fly.x, fly.y, frog.body.x, frog.body.y - 60);

    if (d < (fly.size / 2 + 20)) {
        resetFly();
        hunger += 128;
        crunchSFX.play();
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