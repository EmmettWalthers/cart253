/**
 * Frog Dude (the game)
 * Emmett Walthers
 * 
 * A game where the player controls a frog and tries to eat flies which
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
let hunger = 120;
let blueFlyChance = 10;
let flySpeed = 5;
let playButtonImg;

const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 320,
        size: 50
    },
};

const fly = {
    x: 320, // Random
    y: 0, 
    size: 10,
    status: 100
};

// Creates the canvas
function setup() { 
    createCanvas(640, 750);
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
    moveFrog();
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

        // Call Fly Functions
        drawFly();
        moveFly();
        flyEaten();

        // Hunger Bar
        drawHungerBar();
    }
}

function moveFrog() {
    frog.body.x = mouseX;
    frog.body.y = mouseY;
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
        return;
    }
}

// Draws the hunger bar
function drawHungerBar() {
    // Draws the actual bar
    drawBox("red", 0, 0, hunger, 25)
    // If hunger isn't maxed out already, slowly take it away
    if (hunger < 640) {
        hunger -= 0.25;
    }
}

// Draws the frog
function drawFrog() {

    let frogSize = frog.body.size;

    let eyeX = frogSize * 0.33;
    let eyeY = frogSize * 0.4;
    let eyeSize = frogSize * 0.27;
    let pupilSize = eyeSize * 0.5;
    let mouthY = frogSize * 0.40;
    let mouthSize = frogSize * 0.13;

    // Draw the frog's body
    drawCircle("#00ff00", frog.body.x, frog.body.y, frog.body.size)

    // Eyes
    drawCircle("white", frog.body.x - eyeX, frog.body.y - eyeY, eyeSize);
    drawCircle("white", frog.body.x + eyeX, frog.body.y - eyeY, eyeSize);

    // Pupils
    drawCircle("black", frog.body.x - eyeX, frog.body.y - eyeY, pupilSize);
    drawCircle("black", frog.body.x + eyeX, frog.body.y - eyeY, pupilSize);

    // Mouth
    drawCircle("red", frog.body.x, frog.body.y - mouthY, mouthSize);
}

function flyEaten() {
    // Distance between frog center and fly center
    let d = dist(fly.x, fly.y, frog.body.x, frog.body.y);

    // Combined radii (frog radius + fly radius)
    let eatDistance = (frog.body.size / 2) + (fly.size / 2);

    // If touching, eat it
    if (d < eatDistance) {
        if (fly.status > blueFlyChance) {
            hunger += 32;
            crunchSFX.play();
        } else {
            hunger -= 16;
            hurtSFX.play();
        }
        resetFly();
    }
}

// Draws the fly (if gameActive is True)
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

// Moves the fly (if gameActive is True)
function moveFly() {
    if (gameActive) {
        // Move the fly
        fly.y += flySpeed;
        // Handle the fly going off the canvas
        if (fly.y > height) {
            resetFly();
        }
    }
}

// Resets the fly (if gameActive is True)
function resetFly() {
    if (gameActive) {
        fly.y = 0;
        // Starts the fly in a random lane using the variable list 'lanes'
        fly.x = random(width*0.1, width*0.9);
        // Gives the fly a random percent (number). This changes the chance for a blue fly to spawn
        fly.status = random(1, 100);
        // Increases fly speed everytime it resets
        flySpeed += 0.15
    }
}

// Checks if game should be over
function gameOver() {
    // Activates gameLose if hunger reaches 0
    if (hunger <= 0) {
        gameLose();
        flySpeed = 0
    }
    // Activates gameWin if hunger reaches 640 (max)
    else if (hunger >= 640) {
        gameWin();
        // Stops fly from moving anymore
        flySpeed = 0
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