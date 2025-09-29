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
    noStroke();
    fill("#f7e7ce");
    ellipse(300, 300, 400);
    pop();

    /** Draws Eyes */
    push();
    fill(255);
    noStroke();
    arc(210, 225, 100, 100, 0, PI);
    arc(390, 225, 100, 100, 0, PI);
    pop();

    /** Draws Pupils */
    push();
    fill(0);
    noStroke();
    arc(210, 225, 50, 50, 0, PI);
    arc(390, 225, 50, 50, 0, PI);
    pop();

    /** Draws Mouth */
    push();
    noStroke();
    fill(0);
    arc(300, 370, 200, 150, 0, PI);
    fill("#FF4C4C");
    arc(300, 370, 100, 75, 0, PI); 
    pop();
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#00B9F7");
    drawFace();

}