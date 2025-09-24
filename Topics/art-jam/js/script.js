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
    size: 250,
    fill: "#F7D5BA"
};

const eyes = {
    size: 60,
    fill: "#FFFFFF"
};

const hat = {
    fill: "#000000",
    size: 150
}

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
    ellipse(250, 250, eyes.size);
    pop();

    push();
    noStroke();
    fill(eyes.fill);
    ellipse(350, 250, eyes.size);
    pop();
}

function drawHat(){
    push();
    noStroke();
    fill(hat.fill);
    ellipse(head.x, head.y - 175, 200, 150);
    pop();

    push();
    noStroke();
    fill(hat.fill);
    rect(150, 160, 300, 40, 50);
    pop();
}




/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#00B9F7");
    drawFace();
    drawHat();

}