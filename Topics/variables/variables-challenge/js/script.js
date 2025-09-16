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
    direction: 1,

    fill: {
    r: 173,
    g: 216,
    b: 230
  }
};

let rage = {
    shakeMin: 1,
    shakeMax: 2
}

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
  mrFurious.fill.r = mrFurious.fill.r + 0.5;
  mrFurious.fill.r = constrain(mrFurious.fill.r, 100, 200);
  skyShade = skyShade - 0.5;

  rage.shakeMin = rage.shakeMin + 0.1;
  rage.shakeMax = rage.shakeMax + 0.1;
  rage.shakeMin = constrain(rage.shakeMin, 1, 15);
  rage.shakeMax = constrain(rage.shakeMax, 2, 25);

  mrFurious.x = 200 + random(rage.shakeMin, rage.shakeMax)
  mrFurious.y = 200 + random(rage.shakeMin, rage.shakeMax)

  if (bird.x >= 325) {
    bird.direction = -2.5;
  }

  if (bird.x <= 25) {
    bird.direction = 2.5;
  }

  bird.x = bird.x + bird.direction;

  push();
  fill(bird.fill.r, bird.fill.g, bird.fill.b)
  rect(bird.x, bird.y, bird.width, bird.height);

  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size,);
  pop();
}
