/**
 * Frog Dude Lite (the game)
 * Emmett Walthers
 * 
 * A game where the player controls a frog with their mouse 
 * and tries to eat flies which come down vertically in random positions
 * 
 * Controls: 
 * - Use your mouse to catch the flies
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

// Score Variables
let hunger = 120;

// Fly Variables
let blueFlyChance = 20;
let flySpeed = 5;

// The frog's body has a position and size
const frog = {
    body: {
        x: 320,
        y: 320,
        size: 50
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
        let d = dist(mouseX, mouseY, width / 2, height / 2); // Distance from mouse to center of play button
        if (d < 100) { // If mouse is inside play button radius
            gameActive = true;
            bgMusic.loop();
        }
        return;
    }
}

// Draws the hunger bar
function drawHungerBar() {
    drawBox("red", 0, 0, hunger, 25) // Draws the actual bar
    if (hunger < 640) { // If hunger isn't maxed out already, slowly take it away
        hunger -= 0.25;
    }
}

// Draws the frog
function drawFrog() {
    let frogSize = frog.body.size; // For easier calculations

    // Eye and Mouth positioning + sizing variables
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

// Checks if the fly has been eaten by the frog
function flyEaten() {
    let d = dist(fly.x, fly.y, frog.body.x, frog.body.y); // Distance from fly to frog
    let eatDistance = (frog.body.size / 2) + (fly.size / 2); // Distance at which the fly is considered eaten

    if (d < eatDistance) { // If the fly is close enough to be eaten
        if (fly.status > blueFlyChance) { // If the fly is a normal fly
            hunger += 32;
            crunchSFX.play();
        } else { // If the fly is a blue fly
            hunger -= 64;
            hurtSFX.play();
        }
        resetFly();
    }
}

// Draws the fly (if gameActive is True)
function drawFly() {
    if (gameActive) {
        if (fly.status > blueFlyChance) { // Checks if the fly is normal
            push();
            noStroke();
            fill("#000000");
            ellipse(fly.x, fly.y, fly.size);
            pop();
        }

        else { // If the fly is blue
            push();
            noStroke();
            fill("blue");
            ellipse(fly.x, fly.y, fly.size);
            pop();
        }
    }
}

// Moves the fly down the screen if gameActive is true
function moveFly() {
    if (gameActive) {
        fly.y += flySpeed; // Move the fly downwards by flySpeed
        if (fly.y > height) { // If the fly goes off the bottom of the screen
            resetFly(); // Reset the fly
        }
    }
}

// Resets the fly's position and updates game variables if gameActive is true
function resetFly() {
    if (gameActive) {
        fly.y = 0; // 
        fly.x = random(width*0.1, width*0.9); // Reset fly to a random horizontal position within the points
        fly.status = random(1, 100); // Gives the fly a random percent (number). This changes the chance for a blue fly to spawn
        flySpeed += 0.15
    }
}

// Checks if game should be over
function gameOver() {
    if (hunger <= 0) { // Activates gameLose if hunger reaches 0
        gameLose();
        flySpeed = 0
    }
    else if (hunger >= 640) { // Activates gameWin if hunger reaches max
        gameWin();
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