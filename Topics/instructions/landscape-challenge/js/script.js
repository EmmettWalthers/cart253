/**
 * Landscape Challenge
 * Emmett Walthers
 * 
 * A beautiful art piece to showcase the use of draw functions!
 */

"use strict";


function setup() {
    // Creates Canvas
    createCanvas(640, 640);
}

function draw() {
    // Every Frame
    background(135, 206, 235);

    push();
    fill('#007C00')
    noStroke()
    ellipse(110, 640, 800, 400);
    pop();

    push();
    fill('#007C00')
    noStroke()
    ellipse(500, 640, 800, 400);
    pop();

    push();
    fill('#854F28')
    noStroke()
    rect(100, 200, 50, 300);
    pop();

    push();
    fill('#007C00')
    noStroke()
    ellipse(125, 200, 150);
    pop();

    push();
    fill('#D1DFF6')
    noStroke()
    ellipse(450, 100, 150, 100);
    pop();

    push();
    fill('#D1DFF6')
    noStroke()
    ellipse(400, 125, 150, 100);
    pop();

    push();
    fill('#D1DFF6')
    noStroke()
    ellipse(500, 125, 150, 100);
    pop();

}