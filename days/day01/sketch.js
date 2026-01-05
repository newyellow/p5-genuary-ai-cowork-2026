// Genuary 2026 - Day 01
// Prompt: One color, one shape
// Using only circles and a single hue (blue) with varying brightness

let circles = [];
let maxCircles = 100;
let baseHue = 210; // Blue color

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 5);

  // Initialize circles with random positions and properties
  for (let i = 0; i < maxCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(10, 80),
      brightness: random(30, 90),
      alpha: random(5, 30),
      speedX: random(-0.5, 0.5),
      speedY: random(-0.5, 0.5),
      growSpeed: random(-0.1, 0.1)
    });
  }
}

function draw() {
  // Fade effect for trail
  fill(0, 0, 5, 8);
  noStroke();
  rect(0, 0, width, height);

  // Update and draw circles
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];

    // Update position
    c.x += c.speedX;
    c.y += c.speedY;

    // Update size
    c.size += c.growSpeed;

    // Bounce off edges
    if (c.x < 0 || c.x > width) c.speedX *= -1;
    if (c.y < 0 || c.y > height) c.speedY *= -1;

    // Reset size if too small or too large
    if (c.size < 10 || c.size > 80) {
      c.growSpeed *= -1;
    }

    // Draw circle with varying brightness
    noFill();
    stroke(baseHue, 80, c.brightness, c.alpha);
    strokeWeight(1);
    circle(c.x, c.y, c.size);

    // Draw inner circle for depth
    stroke(baseHue, 60, c.brightness * 1.2, c.alpha * 0.6);
    circle(c.x, c.y, c.size * 0.6);

    // Draw center point
    stroke(baseHue, 40, c.brightness * 1.5, c.alpha * 0.4);
    circle(c.x, c.y, c.size * 0.2);
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    saveCanvas('genuary2026_day01', 'png');
  }

  // Press 'r' to reset
  if (key == 'r' || key == 'R') {
    circles = [];
    for (let i = 0; i < maxCircles; i++) {
      circles.push({
        x: random(width),
        y: random(height),
        size: random(10, 80),
        brightness: random(30, 90),
        alpha: random(5, 30),
        speedX: random(-0.5, 0.5),
        speedY: random(-0.5, 0.5),
        growSpeed: random(-0.1, 0.1)
      });
    }
    background(0, 0, 5);
  }
}

function mousePressed() {
  // Add new circle at mouse position
  circles.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 80),
    brightness: random(30, 90),
    alpha: random(5, 30),
    speedX: random(-0.5, 0.5),
    speedY: random(-0.5, 0.5),
    growSpeed: random(-0.1, 0.1)
  });

  // Remove oldest circle if too many
  if (circles.length > maxCircles * 1.5) {
    circles.shift();
  }
}
