// Genuary 2026 - Day 01
// Prompt: One color, one shape
// Concept: "One color PER one shape" - Each head shape defines a person's "type" and color
// Meta: Social categorization through visual identity

let humans = [];
let shapeTypes = ['circle', 'square', 'triangle', 'pentagon', 'hexagon', 'star'];
let shapeColors = {}; // Maps shape type to hue value

// System parameters
let targetCount = 120; // Number of humans in the system
let noiseScale = 0.003;
let timeOffset = 0;

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 8);

  // Assign each shape type a specific hue (one color per shape)
  // This creates the "classification system"
  shapeColors['circle'] = 210;    // Blue - the majority, the default
  shapeColors['square'] = 30;     // Orange - the builders
  shapeColors['triangle'] = 0;    // Red - the rebels
  shapeColors['pentagon'] = 280;  // Purple - the rare ones
  shapeColors['hexagon'] = 160;   // Cyan - the analytical
  shapeColors['star'] = 50;       // Yellow - the dreamers

  // Create the system of humans
  initializeHumans();
}

function initializeHumans() {
  humans = [];

  for (let i = 0; i < targetCount; i++) {
    // Position with noise-based clustering
    let col = i % 12;
    let row = floor(i / 12);

    let baseX = map(col, 0, 11, width * 0.1, width * 0.9);
    let baseY = map(row, 0, 9, height * 0.2, height * 0.85);

    // Add noise for organic positioning
    let noiseVal = noise(col * 0.3, row * 0.3, timeOffset);
    let x = baseX + (noiseVal - 0.5) * 100;
    let y = baseY + (noiseVal - 0.5) * 80;

    // Randomly assign a shape type (with weighted probabilities)
    let shapeType = getWeightedRandomShape();
    let hue = shapeColors[shapeType];

    // Brightness variation within the same hue (still "one color" per shape)
    let brightness = random(60, 95);
    let saturation = random(70, 100);

    // Scale variation - some people are bigger/smaller
    let scaleVal = random(0.6, 1.2);

    // Random pose variations
    let leftArmRot = random(-45, -15);
    let rightArmRot = random(15, 45);
    let leftLegRot = random(-20, 5);
    let rightLegRot = random(-5, 20);
    let bodyRot = random(-8, 8);

    let h = new Human(x, y, {
      scale: scaleVal,
      headShape: shapeType,
      headColor: color(hue, saturation, brightness),
      bodyColor: color(hue, saturation * 0.8, brightness * 0.7),
      limbColor: color(hue, saturation * 0.6, brightness * 0.5),
      strokeColor: color(0, 0, 10),
      strokeWeight: 1.5,
      leftArmRotation: leftArmRot,
      rightArmRotation: rightArmRot,
      leftLegRotation: leftLegRot,
      rightLegRotation: rightLegRot,
      bodyRotation: bodyRot,
      headSize: random(25, 35),
      bodyHeight: random(50, 70),
      limbLength: random(35, 50)
    });

    // Store metadata for animation
    h.targetY = y - random(2, 8); // Slight upward striving
    h.speed = random(0.3, 0.8);
    h.phase = random(TWO_PI);

    humans.push(h);
  }
}

// Weighted random shape selection
// Circles are most common (like "normal" people in society)
// Stars are rarest (the dreamers, the different ones)
function getWeightedRandomShape() {
  let r = random(100);

  if (r < 40) return 'circle';      // 40% - the majority
  if (r < 65) return 'square';      // 25% - common
  if (r < 82) return 'triangle';    // 17% - less common
  if (r < 92) return 'hexagon';     // 10% - rare
  if (r < 97) return 'pentagon';    // 5% - very rare
  return 'star';                     // 3% - the dreamers
}

function draw() {
  // Gentle fade for trail effect
  fill(0, 0, 8, 15);
  noStroke();
  rect(0, 0, width, height);

  timeOffset += 0.002;

  // Update and draw all humans
  for (let h of humans) {
    // Subtle upward movement - the striving
    h.phase += 0.02 * h.speed;
    let breathe = sin(h.phase) * 2;
    h.y = h.originalY + breathe - frameCount * 0.02 * h.speed;

    // Wrap around when reaching top (futility - endless cycle)
    if (h.y < -100) {
      h.y = height + 100;
      h.originalY = h.y;
    }

    // Subtle arm sway - the struggle
    h.swayArms(8, h.speed, h.phase);

    // Draw the human
    h.draw();
  }

  // Display info
  drawInfo();
}

function drawInfo() {
  push();
  fill(0, 0, 90, 80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);

  let infoY = 20;
  text("One Color, One Shape", 20, infoY);
  infoY += 20;

  textSize(11);
  fill(0, 0, 70, 70);
  text("Each shape type has its own color.", 20, infoY);
  infoY += 16;
  text("Your shape defines your hue.", 20, infoY);
  infoY += 16;
  text("We are categorized, yet we strive.", 20, infoY);

  // Legend
  infoY += 30;
  textSize(10);
  let shapes = Object.keys(shapeColors);
  for (let shape of shapes) {
    let hue = shapeColors[shape];
    fill(hue, 80, 85);
    text(`● ${shape}`, 20, infoY);
    infoY += 15;
  }

  // Controls
  infoY = height - 60;
  fill(0, 0, 70, 70);
  textSize(11);
  text("Press 'R' to regenerate", 20, infoY);
  infoY += 16;
  text("Press 'S' to save", 20, infoY);
  infoY += 16;
  text("Click to add a human", 20, infoY);

  pop();
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    saveCanvas('genuary2026_day01', 'png');
  }

  if (key == 'r' || key == 'R') {
    background(0, 0, 8);
    initializeHumans();
  }
}

function mousePressed() {
  // Add a new human at mouse position
  let shapeType = random(shapeTypes);
  let hue = shapeColors[shapeType];

  let h = new Human(mouseX, mouseY, {
    scale: random(0.8, 1.4),
    headShape: shapeType,
    headColor: color(hue, random(70, 100), random(60, 95)),
    bodyColor: color(hue, random(56, 80), random(42, 67)),
    limbColor: color(hue, random(42, 60), random(30, 48)),
    strokeColor: color(0, 0, 10),
    strokeWeight: 1.5,
    leftArmRotation: random(-50, -10),
    rightArmRotation: random(10, 50),
    bodyRotation: random(-10, 10)
  });

  h.speed = random(0.3, 0.8);
  h.phase = random(TWO_PI);
  humans.push(h);

  // Keep population in check
  if (humans.length > targetCount * 1.5) {
    humans.shift();
  }
}
