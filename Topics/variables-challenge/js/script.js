/**
 * Mr. Furious
 * Emmett Walthers
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 100,
    g: 100,
    b: 100
  }
};

let skyShade = 255

let bird = {
    x: 0,
    y: 50,
    width: 50,
    height: 25,

    fill: {
    r: 173,
    g: 216,
    b: 230
  }
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(skyShade);
  mrFurious.fill.r = mrFurious.fill.r + 1;
  skyShade = skyShade - 1;
  bird.x = bird.x + 1;

  push();
  fill(bird.fill.r, bird.fill.g, bird.fill.b)
  rect(bird.x, bird.y, bird.width, bird.height);

  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size,);
  pop();
}
