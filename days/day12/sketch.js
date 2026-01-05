// Day 12 - Boxes Only
// Concept: Humans made of boxes

let humans = [];

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100);
  
  for (let i = 0; i < 50; i++) {
    humans.push({
      x: random(width),
      y: random(height * 0.5, height * 0.9),
      hue: random(360),
      size: random(20, 60)
    });
  }
}

function draw() {
  background(0, 0, 5);
  
  for (let h of humans) {
    drawBoxHuman(h.x, h.y, h.size, h.hue);
  }
  
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Boxes Only", width/2, 50);
}

function drawBoxHuman(x, y, size, hue) {
  rectMode(CENTER);
  noStroke();
  
  // Head
  fill(hue, 70, 90);
  rect(x, y - size * 1.2, size * 0.6, size * 0.6);
  
  // Body
  fill(hue, 60, 70);
  rect(x, y, size * 0.8, size);
  
  // Arms
  fill(hue, 50, 60);
  rect(x - size * 0.7, y - size * 0.2, size * 0.4, size * 0.6);
  rect(x + size * 0.7, y - size * 0.2, size * 0.4, size * 0.6);
  
  // Legs
  rect(x - size * 0.2, y + size * 0.8, size * 0.3, size * 0.6);
  rect(x + size * 0.2, y + size * 0.8, size * 0.3, size * 0.6);
}

function keyPressed() {
  if (key === 's') saveCanvas('genuary2026_day12', 'png');
}
