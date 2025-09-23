/**
 * Circle Master 2.0
 * Emmett, Ben, Jordan
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 200,
  y: 200,
  size: 100,
  fill: "#ff0000"
};

const target = {
    x: 200,
    y: 75,
    size: 75,
    fill: "#00FF00",
    fills: {
    noOverlap: "#00ff00", // red for no overlap
    overlap: "#00f0f0" // green for overlap
    }
  }

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

function drawTarget() {
  push();
  noStroke();
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop()
}

function checkTarget() {
    const d = dist(user.x, user.y, target.x, target.y);
    const overlap = (d < user.size/2 + puck.size/2);
    if (overlap) {
    target.fill = target.fills.overlap;
    }
    else {
    target.fill = target.fills.noOverlap;
    }
}


function movePuck() {
    const d = dist(user.x, user.y, puck.x, puck.y);
    const overlap = (d < user.size/2 + puck.size/2);
    if (overlap) {
        if (user.x > puck.x) {
            puck.x -= 2
        }
        else {
            puck.x += 2
        }
        if (user.y > puck.y) {
            puck.y -= 2
        }
        else {
            puck.y += 2
        }
            
            
    }

}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  checkTarget();
  movePuck();
  // Move user circle
  moveUser();
  
  // Draw the user and puck
  drawUser();
  drawPuck();
  drawTarget();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}
