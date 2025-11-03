
"use strict";

let gameActive = false;
let titleImg;
let swayAngle = 0;
let skySize = 0;
let scene = 1;
let lanes = [64, 192, 320, 448, 576];
let currentLane = 2;
let hunger = 0;

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
    speed: 3
};

function setup() {
    createCanvas(640, 750);
}

function preload() {
    titleImg = loadImage("assets/images/title.png");
}

function draw() {
    background("#87ceeb");
    gameStart();
    drawScene2();
    gameScene();
    drawFrog();
    drawHungerBar();
    drawFly();
    moveFly();
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

function gameStart() {
    if (gameActive == false) {
        drawScene1();
    }
}

function drawScene1() { // This Function draw the Intro Scene
    // Draw Clouds
    drawCircle("white", width / 4, height / 4, 150);
    drawCircle("white", width / 3, height / 3, 150);
    drawCircle("white", width / 6, height / 3, 150);
    drawCircle("white", width / 2 + width / 4, height / 4, 150);
    drawCircle("white", width / 2 + width / 3, height / 3, 150);
    drawCircle("white", width / 2 + width / 6, height / 3, 150);

    // Adds Sway to the Title
    swayAngle += 0.02; // Sway Speed
    let sway = sin(swayAngle) * 0.1; // Max rotation angle

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

function drawScene2() {
    // Starting Animation
    if (scene == 2) {
        if (skySize < 1000) {
        skySize += 10
        }
        drawCircle("#87ceeb", width / 2, height / 2, skySize)
    }

    if (skySize == 1000) {
        gameActive = true
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

function gameScene() {
    if (gameActive == true) {
        // Draw Lanes
        drawBox("black", 128, 0, 1, 1000)
        drawBox("black", 256, 0, 1, 1000)
        drawBox("black", 384, 0, 1, 1000)
        drawBox("black", 512, 0, 1, 1000)
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
}

function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

function moveFly() {
    // Move the fly
    fly.y += fly.speed;
    // Handle the fly going off the canvas
    if (fly.y > height) {
        resetFly();
    }
}

function resetFly() {
    console.log("reset")
    fly.y = 0;
    fly.x = random(lanes);
}

function keyPressed() {
    if (gameActive) {
        if (keyCode == LEFT_ARROW && currentLane > 0) {
            currentLane--;
        } 
        else if (keyCode == RIGHT_ARROW && currentLane < lanes.length - 1) {
            currentLane++;
        }

        frog.body.x = lanes[currentLane];
    }
}



