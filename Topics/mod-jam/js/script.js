
"use strict";

let gameActive = false;
let titleImg;
let swayAngle = 0;

const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 480,
        size: 200
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

function setup() {
    createCanvas(640, 480);
}

function preload() {
    titleImg = loadImage("assets/images/title.png");
}

function draw() {
    background("#87ceeb");
    gameStart();
    drawFrog();
}

function drawCircle(color, x, y, size) {
    push();
    fill(color);
    noStroke();
    ellipse(x, y, size);
    pop();
}

function drawBox(color, x, y, size) {
    push();
    fill(color);
    noStroke();
    ellipse(x, y, size);
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
}

function drawFrog() {
    // Draw the frog's body
    drawCircle("#00ff00", frog.body.x, frog.body.y, frog.body.size)
    // Draw the eyes
    drawCircle("white", frog.body.x - 50, frog.body.y - 75, 50)
    drawCircle("white", frog.body.x + 50, frog.body.y - 75, 50)
    drawCircle("black", frog.body.x - 50, frog.body.y - 75, 30)
    drawCircle("black", frog.body.x + 50, frog.body.y - 75, 30)
}