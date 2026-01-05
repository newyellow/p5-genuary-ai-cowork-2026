// Genuary 2026 - Day 04
// Prompt: Lowres
// Concept: Quantized Existence - We are all reduced to pixels in the digital system
// Meta: Digital world simplifies and categorizes us into discrete units

let pixelSize = 8; // Each "pixel" is 8x8 actual pixels
let gridW, gridH;
let humans = [];
let time = 0;

// Low-res color palette (limited colors)
let palette = [
  '#1a1a2e', // dark blue
  '#16213e', // navy
  '#0f3460', // deep blue
  '#533483', // purple
  '#e94560', // red/pink
  '#ff6b6b', // coral
  '#4ecdc4', // cyan
  '#ffe66d', // yellow
  '#95e1d3', // mint
  '#f38181', // light coral
];

function setup() {
  createCanvas(1920, 1080);
  flex();
  noSmooth(); // Disable anti-aliasing for crisp pixels

  gridW = floor(width / pixelSize);
  gridH = floor(height / pixelSize);

  // Create low-res humans
  let humanCount = 80;
  for (let i = 0; i < humanCount; i++) {
    let x = floor(random(gridW));
    let y = floor(random(gridH));

    // Ensure humans are in bottom 2/3 of screen (ground level)
    y = floor(random(gridH * 0.3, gridH));

    let colorIndex = floor(random(palette.length));

    humans.push({
      x: x,
      y: y,
      baseY: y,
      color: palette[colorIndex],
      speed: random(0.3, 1.0),
      phase: random(TWO_PI),
      height: floor(random(4, 8)), // Height in pixels
      width: floor(random(2, 4)),   // Width in pixels
      direction: random() > 0.5 ? 1 : -1,
      walkSpeed: random(0.01, 0.03)
    });
  }
}

function draw() {
  // Dark background
  background(10);
  time += 0.02;

  // Draw using low-res grid
  noStroke();

  // Sort humans by y position (painter's algorithm)
  humans.sort((a, b) => a.y - b.y);

  // Update and draw each human
  for (let h of humans) {
    updateHuman(h);
    drawLowResHuman(h);
  }

  // Draw scanlines effect (adds to retro low-res feel)
  drawScanlines();

  // Info overlay (rendered at full resolution)
  drawInfo();
}

function updateHuman(h) {
  // Gentle upward drift (striving)
  h.phase += 0.02 * h.speed;
  let drift = sin(h.phase) * 0.5;
  h.y = h.baseY - time * h.speed * 0.5 + drift;

  // Horizontal walking
  h.x += h.direction * h.walkSpeed;

  // Wrap around when reaching edges or top
  if (h.x < 0) h.x = gridW;
  if (h.x > gridW) h.x = 0;

  if (h.y < -10) {
    h.y = gridH + 10;
    h.baseY = h.y;
  }
}

function drawLowResHuman(h) {
  let px = floor(h.x);
  let py = floor(h.y);

  // Head (1-2 pixels)
  let headSize = h.height > 6 ? 2 : 1;
  drawPixel(px, py - h.height, h.color);
  if (headSize === 2) {
    drawPixel(px + 1, py - h.height, h.color);
  }

  // Body (vertical line)
  for (let i = 1; i < h.height - 1; i++) {
    for (let w = 0; w < h.width; w++) {
      drawPixel(px + w, py - h.height + i, h.color);
    }
  }

  // Legs (animated)
  let legOffset = floor(sin(time * 10 + h.phase) * 2);
  drawPixel(px, py, h.color); // Left leg
  drawPixel(px + h.width - 1, py, h.color); // Right leg

  // Arms (tiny, raised upward - striving gesture)
  let armY = py - floor(h.height * 0.7);
  if (h.width > 2) {
    drawPixel(px - 1, armY, h.color); // Left arm
    drawPixel(px + h.width, armY, h.color); // Right arm
  }
}

function drawPixel(x, y, col) {
  if (x < 0 || x >= gridW || y < 0 || y >= gridH) return;

  fill(col);
  rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function drawScanlines() {
  push();
  stroke(255, 255, 255, 5);
  strokeWeight(1);
  for (let y = 0; y < height; y += 2) {
    line(0, y, width, y);
  }
  pop();
}

function drawInfo() {
  push();
  fill(255, 255, 255, 220);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(32);
  textFont('monospace');
  text("LOWRES", width / 2, 30);

  textSize(14);
  fill(255, 255, 255, 180);
  text(`Resolution: ${gridW}x${gridH} pixels | Pixel size: ${pixelSize}x${pixelSize}`, width / 2, 75);

  textSize(12);
  fill(255, 255, 255, 150);
  text("In the digital world, we are all reduced to discrete units", width / 2, 105);
  text("Simplified, quantized, categorized — yet still striving upward", width / 2, 125);

  // Controls
  fill(255, 255, 255, 120);
  textAlign(LEFT, BOTTOM);
  textSize(11);
  text("Press 'S' to save | Click to add human | Press '1-5' to change pixel size", 20, height - 20);
  pop();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('genuary2026_day04', 'png');
  }

  // Change pixel size
  if (key === '1') changePixelSize(4);
  if (key === '2') changePixelSize(8);
  if (key === '3') changePixelSize(12);
  if (key === '4') changePixelSize(16);
  if (key === '5') changePixelSize(24);
}

function changePixelSize(newSize) {
  let oldGridW = gridW;
  let oldGridH = gridH;

  pixelSize = newSize;
  gridW = floor(width / pixelSize);
  gridH = floor(height / pixelSize);

  // Scale human positions
  for (let h of humans) {
    h.x = floor(h.x * gridW / oldGridW);
    h.y = floor(h.y * gridH / oldGridH);
    h.baseY = floor(h.baseY * gridH / oldGridH);
  }
}

function mousePressed() {
  // Add new human at mouse position
  let gridX = floor(mouseX / pixelSize);
  let gridY = floor(mouseY / pixelSize);

  let colorIndex = floor(random(palette.length));

  humans.push({
    x: gridX,
    y: gridY,
    baseY: gridY,
    color: palette[colorIndex],
    speed: random(0.3, 1.0),
    phase: random(TWO_PI),
    height: floor(random(4, 8)),
    width: floor(random(2, 4)),
    direction: random() > 0.5 ? 1 : -1,
    walkSpeed: random(0.01, 0.03)
  });
}
