/**
 * Lines
 * Emmett Walthers & Jordan Lobazzo
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {

    for (let x = 0; x < width; x += 1) {
        let m = map(x, 0, width, 0, 255);
        stroke(m, 100, 150);
        line(x, 0, x, height);
    }

    let strokeSize = 0;
    let x = 0;
    let y = 0;
    while (strokeSize <= 250) {
        stroke(strokeSize);
        line(x, 0, y, height);

        stroke(strokeSize);
        line(0, x, width, y);

        strokeSize += 25
        x += 50
        y += 50
    }
}
