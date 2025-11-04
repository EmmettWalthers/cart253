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
let lanes = [64, 192, 320, 448, 576]; // The middle of each lane 1-5
let currentLane = 2;
let hunger = 128;
let blueFlyChance = 10;

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
    speed: 5,
    status: 100
};

// Creates the canvas
function setup() { 
    createCanvas(640, 750);
}

// Preloads all the images and sounds
function preload() {
    titleImg = loadImage("assets/images/title.png");
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
    titleScreen();
    drawTransition();
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

// This Function draws the Title Screen if gameActive is false
function titleScreen() {
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

        // Displays Instructions Text
        push();
        fill("black");
        textSize(16);
        textAlign(screenLeft, CENTER);
        text("Click the Frog to Start \nUse ARROW keys to move frog \nAvoid blue flies or ELSE", 10, 710)
        pop();
    }
}

// Transition Animation when frog is click and game starts
function drawTransition() {
    // When scene is changed, activate transition
    if (scene == 2) {
        if (skySize < 1000) {
        skySize += 15
        }
        drawCircle("#87ceeb", width / 2, height / 2, skySize)
    }
    // When the circle (sky) reaches proper size, set gameActive to true
    if (skySize >= 1000) {
        gameActive = true
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

        // Hunger Bar
        drawHungerBar();
    }
}

// Detects when mouse is pressed
function mousePressed() {
    // if mouse is inside the frogs body and is clicked, switch scenes and start music
    if (scene == 1) {
        let d = dist(mouseX, mouseY, frog.body.x, frog.body.y);
        if (d < frog.body.size / 2) {
            scene = 2
            bgMusic.loop();
        }
    }
}

// Draws the hunger bar
function drawHungerBar() {
    // Draws the actual bar
    drawBox("red", 0, 0, hunger, 25)
    // If hunger isn't maxed out already, slowly take it away
    if (hunger < 640) {
        hunger -= 0.5;
    }
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
        fly.y += fly.speed;
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
        fly.x = random(lanes);
        // Gives the fly a random percent (number). This changes the chance for a blue fly to spawn
        fly.status = random(1, 100);
    }
}

// Activates when fly enters frogs mouth
function flyEaten() {
    // Creates variable for the distance between the fly and frogs mouth
    let d = dist(fly.x, fly.y, frog.body.x, frog.body.y - 60);
    // If fly enters that radius & status is bigger than blue fly chance, trigger resetFly, add hunger to the bar, and play crunch SFX
    if (d < (fly.size / 2 + 20) && fly.status > blueFlyChance) {
        resetFly();
        hunger += 128;
        crunchSFX.play();
    }
    // If fly enters that radius & status is lower than blue fly chance, trigger resetFly, remove hunger from the bar, and play hurt SFX
    else if (d < (fly.size / 2 + 20) && fly.status < blueFlyChance) {
        resetFly();
        hunger -= 64;
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
    // Activates gameLose if hunger reaches 0
    if (hunger <= 0) {
        gameLose();
        fly.speed = 0
    }
    // Activates gameWin if hunger reaches 640 (max)
    else if (hunger >= 640) {
        gameWin();
        // Stops fly from moving anymore
        fly.speed = 0
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