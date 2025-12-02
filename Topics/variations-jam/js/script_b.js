/**
 * Fly Dude (the game)
 * Emmett Walthers
 * 
 * A game where the player controls a fly and tries to avoid the frog.
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
let frogTimer;

// Lanes
let lanes = [64, 192, 320, 448, 576];
let currentLane = 2;
let flyLane = 2;
let laneGoal = 2;
let direction = undefined;

// Speeds
let flySpeed = 2.5;
let frogSpeed = 500;

// Game Score
let hunger = 640;
let fliesLeft = 15;
let fliesNeeded = 10;

// The frog's body has a position and size
const frog = {
    body: {
        x: 320,
        y: 750,
        size: 150,
    },
};

// The fly's body has a position and size
const fly = {
    x: 320,
    y: 0,
    size: 15,
};

function setup() { 
    createCanvas(640, 750); // Creates the canvas
    startFrogTimer(); // Starts the frog movement timer for the first time (calls function)
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
    if (!gameActive) {
        imageMode(CENTER);
        image(playButtonImg, width / 2, height / 2);
    }
}

// Starts the frog movement timer, chaning the interval based on frogSpeed
function startFrogTimer() {
    frogTimer = setInterval(moveFrog, frogSpeed);
}

// Draws everything needed for the main game + calls the functions needed to play
function gameScene() {
    if (gameActive) {

         // Draw Lanes
        drawBox("white", 128, 0, 0.5, 1000);
        drawBox("white", 256, 0, 0.5, 1000);
        drawBox("white", 384, 0, 0.5, 1000);
        drawBox("white", 512, 0, 0.5, 1000);

        // Draw Score and Hunger Bar
        drawText("white", 64, fliesNeeded, width / 2, height - 600);
        drawHungerBar();

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

// Draws the hunger bar at the top of the screen
function drawHungerBar() {
    drawBox("red", 0, 0, hunger, 25)
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
        drawCircle("#000000", fly.x, fly.y, fly.size)
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
        if (fliesLeft >= fliesNeeded) { // If there are enough flies left to continue the game
            fly.y = 0; // Reset fly to top of screen
            flyLane = floor(random(lanes.length)); // Randomly choose a lane for the fly
            fly.x = lanes[flyLane]; // Set fly's x position based on chosen lane
            fliesNeeded -= 1;
        }
        else {
            gameActive = false; // End the game if not enough flies are left
            flySpeed = 0; // Stop the fly from moving
        }

        // Update game variables
        fliesLeft -= 1;
        hunger -= 640 / 15;
        flySpeed += 0.5
        frogSpeed -= 25;
        clearInterval(frogTimer); // Clear the existing frog movement timer
        startFrogTimer(); // Restart the frog movement timer with the new speed
    }
}

// Checks if the fly has been eaten by the frog
function flyEaten() {
    let d = dist(fly.x, fly.y, frog.body.x, frog.body.y - 60); // Distance between fly and frog's mouth
    if (d < (fly.size / 2 + 20)) { // If the fly is within eating distance of the frog's mouth
        resetFly();
        fliesNeeded += 1;
        crunchSFX.play();
    }
}

// Moves the frog towards the fly's lane with some randomness
function moveFrog() {
    if (gameActive) {
        let followChance = 0.8; // Chance the frog will move towards the fly (80%)

        if (random() < followChance) { // Frog decides to follow the fly
            if (currentLane < flyLane) { // Fly is to the right of the frog
                direction = 1; // Move right
            }
            else if (currentLane > flyLane) { // Fly is to the left of the frog
                direction = -1; // Move left
            }
            else direction = 0; // Else, Stay in the same lane
        }
        else { // Frog decides to move randomly
            if (currentLane < flyLane) { // Fly is to the right of the frog
                direction = -1; // Move left
            }
            else if (currentLane > flyLane) { // Fly is to the left of the frog
                direction = 1; // Move right
            }
            else direction = random([-1, 1]); // Else, Move randomly
        } 
        let newLane = currentLane + direction; // Calculate new lane

        if (newLane >= 0 && newLane < lanes.length) { // Check if new lane is within bounds
            currentLane = newLane; // Update current lane
            frog.body.x = lanes[currentLane]; // Update frog's x position
        }
    }
}

// Detects key presses (if gameActive is True)
function keyPressed() {
    if (gameActive) {
        if (keyCode == LEFT_ARROW && flyLane > 0) { // Moves fly to the left if not in the first lane and plays SFX
            flyLane -= 1;
            moveSFX.play();
        } 
        else if (keyCode == RIGHT_ARROW && flyLane < lanes.length - 1) { // Moves fly to the right if not in the last lane and plays SFX
            flyLane += 1;
            moveSFX.play();
        }
        fly.x = lanes[flyLane]; // Moves fly to the given lane
    }
}

// Checks if game should be over
function gameOver() {
    if (hunger <= 0) {
        gameLose()
    }
    else if (fliesNeeded <= 0) {
        gameWin()
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