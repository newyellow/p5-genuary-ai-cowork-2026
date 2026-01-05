// Genuary 2026 - Day 07
// Prompt: Boolean algebra
// Concept: Binary Existence - Everything reduced to TRUE/FALSE, 1/0
// Meta: We are classified by binary rules (in/out, yes/no, us/them)

let humans = [];
let gridSize = 20;
let time = 0;

// Boolean states for different groups
let stateA = [];
let stateB = [];

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100, 100);

  let cols = 15;
  let rows = 8;
  let spacingX = width / (cols + 1);
  let spacingY = height / (rows + 1);

  // Initialize boolean states (random)
  for (let i = 0; i < rows; i++) {
    stateA[i] = [];
    stateB[i] = [];
    for (let j = 0; j < cols; j++) {
      stateA[i][j] = random() > 0.5;
      stateB[i][j] = random() > 0.5;
    }
  }

  // Create humans in grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = (j + 1) * spacingX;
      let y = (i + 1) * spacingY + 100;

      let h = new Human(x, y, {
        scale: 0.6,
        headShape: 'circle',
        strokeWeight: 1.5
      });

      humans.push({
        human: h,
        row: i,
        col: j,
        baseX: x,
        baseY: y,
        phase: random(TWO_PI)
      });
    }
  }
}

function draw() {
  background(0, 0, 5);
  time += 0.01;

  // Slowly flip states
  if (frameCount % 60 === 0) {
    let ri = floor(random(stateA.length));
    let rj = floor(random(stateA[0].length));
    stateA[ri][rj] = !stateA[ri][rj];
  }
  if (frameCount % 90 === 0) {
    let ri = floor(random(stateB.length));
    let rj = floor(random(stateB[0].length));
    stateB[ri][rj] = !stateB[ri][rj];
  }

  // Update and draw humans based on boolean operations
  for (let h of humans) {
    let a = stateA[h.row][h.col];
    let b = stateB[h.row][h.col];

    // Boolean operations
    let AND = a && b;
    let OR = a || b;
    let XOR = a !== b;
    let NOT_A = !a;

    // Use different operations for different visual properties
    updateHumanFromBoolean(h, a, b, AND, OR, XOR, NOT_A);
    h.human.draw();
  }

  // Draw logic gates explanation
  drawUI();
}

function updateHumanFromBoolean(h, a, b, AND, OR, XOR, NOT_A) {
  // Color based on OR operation
  if (OR) {
    h.human.headColor = color(200, 80, 90);
    h.human.bodyColor = color(200, 70, 70);
    h.human.limbColor = color(200, 60, 50);
  } else {
    h.human.headColor = color(0, 0, 30);
    h.human.bodyColor = color(0, 0, 20);
    h.human.limbColor = color(0, 0, 15);
  }

  // Size based on AND operation
  h.human.scale = AND ? 0.8 : 0.4;

  // Arms position based on XOR
  if (XOR) {
    h.human.leftArmRotation = -90;
    h.human.rightArmRotation = -90; // Both arms up
  } else {
    h.human.leftArmRotation = -30;
    h.human.rightArmRotation = 30;
  }

  // Visibility based on state A
  h.human.strokeColor = a ? color(0, 0, 90) : color(0, 0, 10);

  // Position offset based on NOT_A
  h.human.y = h.baseY + (NOT_A ? -10 : 0);
}

function drawUI() {
  push();
  fill(0, 0, 95, 90);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(28);
  text("Boolean Algebra", width / 2, 20);

  textSize(13);
  fill(0, 0, 85, 80);
  text("Humans controlled by binary logic: A ∧ B, A ∨ B, A ⊕ B, ¬A", width / 2, 60);

  // Legend
  textAlign(LEFT, TOP);
  textSize(11);
  fill(0, 0, 80, 70);
  let y = height - 120;
  text("A OR B → Color (bright if true)", 20, y);
  text("A AND B → Size (large if true)", 20, y + 20);
  text("A XOR B → Arms (up if true)", 20, y + 40);
  text("NOT A → Position (elevated if true)", 20, y + 60);

  textAlign(RIGHT, BOTTOM);
  text("Press 'S' to save", width - 20, height - 20);
  pop();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('genuary2026_day07', 'png');
  }

  // Manual state flip with keys
  if (key === '1') {
    stateA = stateA.map(row => row.map(() => random() > 0.5));
  }
  if (key === '2') {
    stateB = stateB.map(row => row.map(() => random() > 0.5));
  }
}
