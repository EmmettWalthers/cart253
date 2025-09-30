/**
 * Emmett's Art Jam
 * Emmett Walthers
 * 
 * Very acurate self portrait that reacts to pain! 
 * 
 */

"use strict";

/**
 * Creates The Canvas
*/

/** Pink variables changed eye color, pink1 is left eye, pink2 is right eye */
let pink1 = 255;
let pink2 = 255;
/** Sound Effect */
let ouch;

/** Creates canvas and loads sound effect */
function setup() {
    createCanvas(600, 600);
    ouch = loadSound('assets/sounds/classic_hurt.mp3');
}

function drawFace() {
    /** Draws Head */
    push();
    fill("#fae8caff");
    noStroke();
    ellipse(300, 300, 400);
    pop();

    /** Draws Left Eye */
    push();
    fill(255, pink1, pink1); /** '255' keeps eye red and 'pink' variable removes other colors */
    noStroke();
    arc(210, 240, 100, 100, 0, PI);
    pop();

    /** Draws Right Eye */
    push();
    fill(255, pink2, pink2);
    noStroke();
    arc(390, 240, 100, 100, 0, PI);
    pop();

    /** Draws Mouth */
    push();
    fill(0);
    noStroke();
    arc(300, 370, 200, 150, 0, PI);
    fill("#FF4C4C");
    arc(300, 370, 100, 75, 0, PI); 
    pop();

    /** Draws Hair */
    push();
    fill("#8B4513");
    noStroke();
    arc(300, 200, 400, 300, PI, TWO_PI);
    pop();
}

function mousePressed() {

    /** If Mouse is within the semi-circle/eye and pink variable is under 50 it will remove 50 from variable and play sfx */
    if (dist(mouseX, mouseY, 210, 240) < 50 && mouseY > 240) {
        if (pink1 > 50) {
            pink1 -= 50
            ouch.play();
        }
    }

    else if (dist(mouseX, mouseY, 390, 240) < 50 && mouseY > 240) {
        if (pink2 > 50) {
            pink2 -= 50
            ouch.play();
        }
    }
}

function drawPupils() {

    /** Constrains pupils to the eye */
    let x1 = constrain(mouseX, 185, 235);
    let x2 = constrain(mouseX, 365, 415);

    /** Draws Pupils */
    push();
    fill(0);
    noStroke();
    arc(x1, 240, 50, 50, 0, PI);
    arc(x2, 240, 50, 50, 0, PI);
    pop();
}

/** Runs the program - draws background, calls draw functions (ie: drawFace). */
function draw() {
    background("#00B9F7");
    drawFace();
    drawPupils();
    
    /** If pink variable is under 255, continuously adds 1.5 to it until it reaches 255*/
    if (pink1 < 255) {
        pink1 += 1.5
    } 

    if (pink2 < 255) {
        pink2 += 1.5
    } 
}