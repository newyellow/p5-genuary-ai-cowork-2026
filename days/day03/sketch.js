// Genuary 2026 - Day 03
// Prompt: Fibonacci forever
// Concept: Natural Growth - Human development follows nature's mathematical patterns
// Meta: Growth is incremental, following universal patterns

let humans = [];
let fibonacci = [];
let goldenRatio = 1.618033988749;
let spiralTightness = 0.15;
let maxGenerations = 18; // How many Fibonacci numbers to generate
let time = 0;

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 5);

  // Generate Fibonacci sequence
  fibonacci = [1, 1];
  for (let i = 2; i < maxGenerations; i++) {
    fibonacci.push(fibonacci[i-1] + fibonacci[i-2]);
  }

  // Create humans arranged in Fibonacci spiral
  let centerX = width / 2;
  let centerY = height / 2;

  for (let i = 0; i < maxGenerations; i++) {
    let fib = fibonacci[i];

    // Golden spiral formula
    // As we go outward, angle increases and radius increases
    let angle = i * 137.5; // Golden angle in degrees
    let radius = spiralTightness * sqrt(fib) * 50;

    let x = centerX + cos(radians(angle)) * radius;
    let y = centerY + sin(radians(angle)) * radius;

    // Size based on Fibonacci number (scaled down)
    let scale = map(log(fib), 0, log(fibonacci[maxGenerations-1]), 0.3, 1.5);

    // Color based on position in sequence (hue rotation)
    let hue = (i * 137.5) % 360; // Golden angle for color too

    // Head shape based on Fibonacci number modulo
    let shapes = ['circle', 'triangle', 'square', 'pentagon', 'hexagon'];
    let shapeIndex = fib % shapes.length;

    let h = new Human(x, y, {
      scale: scale,
      headShape: shapes[shapeIndex],
      headColor: color(hue, 70, 90),
      bodyColor: color(hue, 60, 75),
      limbColor: color(hue, 50, 60),
      strokeColor: color(0, 0, 15),
      strokeWeight: 1,
      headSize: 30,
      bodyHeight: 60,
      limbLength: 40
    });

    humans.push({
      human: h,
      fibonacci: fib,
      index: i,
      angle: angle,
      radius: radius,
      baseX: x,
      baseY: y,
      hue: hue,
      phase: random(TWO_PI)
    });
  }
}

function draw() {
  // Gentle fade
  fill(0, 0, 5, 8);
  noStroke();
  rect(0, 0, width, height);

  time += 0.01;

  // Draw spiral path (golden spiral)
  drawGoldenSpiral();

  // Draw connection lines
  drawConnections();

  // Update and draw humans
  for (let i = 0; i < humans.length; i++) {
    let h = humans[i];

    // Gentle breathing animation
    h.human.phase = h.phase + time;
    let breathe = sin(h.human.phase * 2) * 3;
    h.human.y = h.baseY + breathe;

    // Subtle rotation showing growth direction (outward spiral)
    h.human.bodyRotation = h.angle % 360 - 180;

    // Arms pointing upward (growth gesture)
    h.human.leftArmRotation = -90 + sin(time + h.phase) * 10;
    h.human.rightArmRotation = -90 + sin(time + h.phase + PI) * 10;

    h.human.draw();

    // Draw Fibonacci number label
    drawLabel(h);
  }

  // Draw title and info
  drawInfo();
}

function drawGoldenSpiral() {
  push();
  noFill();
  stroke(45, 60, 70, 20); // Golden hue
  strokeWeight(2);

  let centerX = width / 2;
  let centerY = height / 2;

  beginShape();
  for (let i = 0; i < maxGenerations * 20; i++) {
    let t = i / 20;
    let angle = t * 137.5;
    let fib = fibonacci[min(floor(t), fibonacci.length - 1)];
    let radius = spiralTightness * sqrt(fib) * 50;

    let x = centerX + cos(radians(angle)) * radius;
    let y = centerY + sin(radians(angle)) * radius;
    vertex(x, y);
  }
  endShape();
  pop();
}

function drawConnections() {
  push();
  for (let i = 1; i < humans.length; i++) {
    let prev = humans[i-1];
    let curr = humans[i];

    stroke(curr.hue, 40, 60, 15);
    strokeWeight(1);
    line(prev.human.x, prev.human.y, curr.human.x, curr.human.y);
  }
  pop();
}

function drawLabel(h) {
  push();
  fill(h.hue, 60, 90, 70);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  text(h.fibonacci, h.human.x, h.baseY + 80);
  pop();
}

function drawInfo() {
  push();
  fill(0, 0, 95, 90);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(28);
  text("Fibonacci Forever", width / 2, 30);

  textSize(13);
  fill(0, 0, 85, 80);
  text("Growth follows nature's pattern — each step builds upon the previous", width / 2, 70);

  textSize(11);
  fill(45, 60, 80, 70); // Golden hue
  text("φ = 1.618... | Golden Ratio | Natural Growth", width / 2, 100);

  // Show sequence
  fill(0, 0, 80, 60);
  textSize(10);
  let sequence = fibonacci.slice(0, 12).join(", ") + "...";
  text(sequence, width / 2, height - 30);

  // Controls
  fill(0, 0, 70, 60);
  textAlign(LEFT, BOTTOM);
  text("Press 'S' to save", 20, height - 20);
  pop();
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    saveCanvas('genuary2026_day03', 'png');
  }
}
