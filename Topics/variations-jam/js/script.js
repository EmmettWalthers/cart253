/**
 * Frog Dude (the game)
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

// Variables
let gameActive = false; 
let titleImg;
let moveSFX;
let crunchSFX;
let hurtSFX;
let bgMusic;
let swayAngle = 0;
let skySize = 0;
let scene = 1;
let lanes = [64, 192, 320, 448, 576]; // The middle of each lane 1-5
let currentLane = 2;
let health = undefined;
let flySpeed = 5;
let playButtonImg;
let score = 0;

const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 750,
        size: 150
    },
};

const fly = {
    x: 320, // Random Lane
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

function drawText(color, size, txt, x, y) {
    push();
    fill(color);
    textSize(size);
    textAlign(CENTER, CENTER);
    text(txt, x, y)
    pop();
}

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

        // Call Fly Functions
        drawFly();
        moveFly();
        flyEaten();

        // health Bar
        drawHealthBar();
        drawText("white", 64, score, width / 2, height - 600);
    }
}

// Detects when mouse is pressed
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

// Draws the health bar
function drawHealthBar() {
    // Draws the actual bar
    drawBox("red", 0, 0, health, 25)
    // If health isn't maxed out already, slowly take it away
}

// Draws the frog
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

// Moves the fly (if gameActive is True)
function moveFly() {
    if (gameActive) {
        // Move the fly
        fly.y += flySpeed;
        // Handle the fly going off the canvas
        if (fly.y > height) {
            resetFly();
            score += 1;
        }
    }
}

// Resets the fly (if gameActive is True)
function resetFly() {
    if (gameActive) {
        fly.y = 0;
        // Starts the fly in a random lane using the variable list 'lanes'
        fly.x = random(lanes);
        // Gives the fly a random percent (number). This changes the chance for a blue fly to spawn
        // Increases fly speed everytime it resets
        flySpeed += 0.5
    }
}

// Activates when fly enters frogs mouth
function flyEaten() {
    // Creates variable for the distance between the fly and frogs mouth
    let d = dist(fly.x, fly.y, frog.body.x, frog.body.y - 60);
    // If fly enters that radius & status is bigger than blue fly chance, trigger resetFly, add health to the bar, and play crunch SFX
    if (d < (fly.size / 2 + 20)) {
        resetFly();
        health -= 75;
        crunchSFX.play();
        hurtSFX.play();
    }
}

// Detects key presses (if gameActive is True)
function keyPressed() {
    if (gameActive) {
        // Moves frog to the left if not in the first lane and plays SFX
        if (keyCode == LEFT_ARROW && currentLane > 0) {
            currentLane -= 1;
            moveSFX.play();

        } 
        // Moves frog to the right if not in the last lane and plays SFX
        else if (keyCode == RIGHT_ARROW && currentLane < lanes.length - 1) {
            currentLane += 1;
            moveSFX.play();
        }
        // Moves frogs body to the given lane
        frog.body.x = lanes[currentLane];
    }
}

// Checks if game should be over
function gameOver() {
    // Activates gameLose if health reaches 0
    if (health <= 0) {
    }
    // Activates gameWin if health reaches 640 (max)
    else if (health >= 640) {
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

// Activates Game Win screen
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