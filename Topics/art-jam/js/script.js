/**
 * Emmett's Art Jam
 * Emmett Walthers
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";



const head = {
    x: 300,
    y: 300,
    size: 500,
    fill: "#F7D5BA"
};

const eyes = {
    size: 125,
    fill: "#FFFFFF"
};

/**
 * Creates The Canvas
*/
function setup() {
    createCanvas(600, 600);
}

function drawFace() {
    push();
    noStroke();
    fill(head.fill);
    ellipse(head.x, head.y, head.size);
    pop();

    push();
    noStroke();
    fill(eyes.fill);
    ellipse(200, 250, eyes.size);
    pop();

    push();
    noStroke();
    fill(eyes.fill);
    ellipse(400, 250, eyes.size);
    pop();
}




/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#00B9F7");
    drawFace();

}