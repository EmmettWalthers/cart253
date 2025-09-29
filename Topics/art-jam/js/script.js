/**
 * Emmett's Art Jam
 * Emmett Walthers
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * Creates The Canvas
*/
function setup() {
    createCanvas(600, 600);
}

function drawFace() {
    /** Draws Head */
    push();
    fill("#fae8caff");
    noStroke();
    ellipse(300, 300, 400);
    pop();

    /** Draws Eyes */
    push();
    fill(255);
    noStroke();
    arc(210, 240, 100, 100, 0, PI);
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

function drawPupils() {
    /** Draws Pupils */
    let x1 = constrain(mouseX, 185, 235);
    let x2 = constrain(mouseX, 365, 415);

    push();
    fill(0);
    noStroke();
    arc(x1, 240, 50, 50, 0, PI);
    arc(x2, 240, 50, 50, 0, PI);
    pop();
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#00B9F7");
    drawFace();
    drawPupils();

}