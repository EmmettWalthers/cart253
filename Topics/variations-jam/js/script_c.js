/**
 * Frog Dude 2 (the game)
 * Emmett Walthers
 * 
 * A game where the player controls a frog and tries to AVOID flies which
 * come down different lanes vertically
 * 
 * Controls: 
 * - Use arrow keys to switch lanes
 * 
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// Setup Variables
let gameActive = false; 
let playButtonImg;
let moveSFX;
let crunchSFX;
let hurtSFX;
let bgMusic;

// Lanes
let lanes = [64, 192, 320, 448, 576]; // The middle of each lane 1-5
let currentLane = 2;

// Speeds
let flySpeed = 5;

// Game Score
let health = undefined;
let score = 0;

// The frog's body has a position and size
const frog = {
    body: {
        x: 320,
        y: 750,
        size: 150
    },
};

// The fly's body has a position and size
const fly = {
    x: 320,
    y: 0, 
    size: 10,
    status: 100
};

// Creates the canvas
function setup() { 
    createCanvas(640, 750);
    health = width; // Set health to max at start
}

// Preloads all the images and sounds
function preload() {
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

// Calls certain functions every frame
function draw() {
    background("#87ceeb");
    drawPlayButton();
    gameScene();
    drawFrog();
    gameOver();
}

// Draws a circle using given parameters
function drawCircle(color, x, y, size) {
    push();
    fill(color);
    noStroke();
    ellipse(x, y, size);
    pop();
}

// Draws a rectangle using given parameters
function drawBox(color, x, y, w, h) {
    push();
    fill(color);
    noStroke();
    rect(x, y, w, h);
    pop();
}

// Draws text using given parameters
function drawText(color, size, txt, x, y) {
    push();
    fill(color);
    textSize(size);
    textAlign(CENTER, CENTER);
    text(txt, x, y)
    pop();
}

// This Function draws the Play Button if gameActive is false
function drawPlayButton() {
    console.log("Drawing Play Button");
    if (!gameActive) {
        imageMode(CENTER);
        image(playButtonImg, width / 2, height / 2);
    }
}

// Draws everything needed for the main game + calls the functions needed to play
function gameScene() {
    if (gameActive) {

        // Draw Lanes
        drawBox("white", 128, 0, 0.5, 1000)
        drawBox("white", 256, 0, 0.5, 1000)
        drawBox("white", 384, 0, 0.5, 1000)
        drawBox("white", 512, 0, 0.5, 1000)

        // Draw Score and Health Bar
        drawText("white", 64, score, width / 2, height - 600);
        drawHealthBar();

        // Call Fly Functions
        drawFly();
        moveFly();
        flyEaten();
    }
}

// Detects when mouse is pressed
function mousePressed() {
    if (!gameActive) {
        let d = dist(mouseX, mouseY, width / 2, height / 2); // Distance from mouse to center of play button
        if (d < 100) { // If mouse is inside play button
            gameActive = true;
            bgMusic.loop();
        }
    }
}

// Draws the health bar at the top of the screen
function drawHealthBar() {
    drawBox("red", 0, 0, health, 25)
}

// Draws the frog using its body properties
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

// Draws the fly (if gameActive is True)
function drawFly() {
    if (gameActive) {
        push();
        noStroke();
        fill("black");
        ellipse(fly.x, fly.y, fly.size);
        pop();
        }
    }

// Moves the fly down the screen if gameActive is true
function moveFly() {
    if (gameActive) {
        fly.y += flySpeed; // Move the fly downwards by flySpeed
        if (fly.y > height) { // If the fly goes off the bottom of the screen
            resetFly(); // Reset the fly
            score += 1;
        }
    }
}

// Resets the fly's position and updates game variables if gameActive is true
function resetFly() {
    if (gameActive) {
        fly.y = 0;
        fly.x = random(lanes); // Reset fly to a random lane
        flySpeed += 0.5
    }
}

// Checks if the fly has been eaten by the frog
function flyEaten() {
    let d = dist(fly.x, fly.y, frog.body.x, frog.body.y - 60); // Distance from fly to frog's mouth
    if (d < (fly.size / 2 + 20)) { // If the fly is within eating distance of the frog's mouth
        resetFly();
        health -= 75;
        crunchSFX.play();
        hurtSFX.play();
    }
}

// Detects key presses (if gameActive is True)
function keyPressed() {
    if (gameActive) {
        if (keyCode == LEFT_ARROW && currentLane > 0) { // Moves frog to the left if not in the first lane and plays SFX
            currentLane -= 1;
            moveSFX.play();
        } 
        else if (keyCode == RIGHT_ARROW && currentLane < lanes.length - 1) { // Moves frog to the right if not in the last lane and plays SFX
            currentLane += 1;
            moveSFX.play();
        }
        frog.body.x = lanes[currentLane]; // Moves frog to the given lane
    }
}

// Checks if game should be over
function gameOver() {
    if (health <= 0) { // Activates gameLose if health reaches 0
        gameLose();
    }
}

// Activates Game Over screen
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