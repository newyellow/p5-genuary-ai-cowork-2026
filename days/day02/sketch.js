// Genuary 2026 - Day 02
// Prompt: Twelve principles of animation
// Concept: Learning & Mastery - Each human demonstrates one animation principle
// Meta: The journey of mastering animation = the journey of self-improvement

let principles = [];
let gridCols = 4;
let gridRows = 3;
let boxWidth, boxHeight;
let time = 0;

// The 12 principles of animation
const PRINCIPLES = [
  { name: "Squash & Stretch", id: "squash" },
  { name: "Anticipation", id: "anticipation" },
  { name: "Staging", id: "staging" },
  { name: "Straight Ahead", id: "straight" },
  { name: "Follow Through", id: "follow" },
  { name: "Slow In/Out", id: "ease" },
  { name: "Arc", id: "arc" },
  { name: "Secondary Action", id: "secondary" },
  { name: "Timing", id: "timing" },
  { name: "Exaggeration", id: "exaggeration" },
  { name: "Solid Drawing", id: "solid" },
  { name: "Appeal", id: "appeal" }
];

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100, 100);

  boxWidth = width / gridCols;
  boxHeight = height / gridRows;

  // Create a human for each principle
  for (let i = 0; i < 12; i++) {
    let row = floor(i / gridCols);
    let col = i % gridCols;

    let x = col * boxWidth + boxWidth / 2;
    let y = row * boxHeight + boxHeight / 2;

    let hue = map(i, 0, 11, 0, 300);

    let h = new Human(x, y, {
      scale: 0.7,
      headShape: 'circle',
      headColor: color(hue, 70, 90),
      bodyColor: color(hue, 60, 75),
      limbColor: color(hue, 50, 60),
      strokeColor: color(0, 0, 20),
      strokeWeight: 1.5
    });

    principles.push({
      human: h,
      principle: PRINCIPLES[i],
      baseX: x,
      baseY: y,
      phase: random(TWO_PI),
      row: row,
      col: col
    });
  }
}

function draw() {
  background(0, 0, 8);
  time += 0.02;

  // Draw grid lines
  stroke(0, 0, 20, 30);
  strokeWeight(1);
  for (let i = 1; i < gridCols; i++) {
    line(i * boxWidth, 0, i * boxWidth, height);
  }
  for (let i = 1; i < gridRows; i++) {
    line(0, i * boxHeight, width, i * boxHeight);
  }

  // Update and draw each principle
  for (let p of principles) {
    animatePrinciple(p);

    // Draw label
    push();
    fill(0, 0, 90, 80);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(16);
    let labelY = p.row * boxHeight + boxHeight - 20;
    text(p.principle.name, p.baseX, labelY);
    pop();
  }

  // Title
  push();
  fill(0, 0, 95, 90);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text("12 Principles of Animation", width / 2, 30);

  textSize(12);
  fill(0, 0, 80, 70);
  text("Each person demonstrates one principle — a journey of learning and mastery", width / 2, 65);
  pop();
}

function animatePrinciple(p) {
  let h = p.human;
  let t = time + p.phase;

  switch(p.principle.id) {
    case "squash":
      // Squash and Stretch - body height and width change
      let squashT = sin(t * 3);
      h.scale = map(squashT, -1, 1, 0.5, 1.0);
      h.bodyHeight = map(squashT, -1, 1, 80, 40);
      h.bodyWidth = map(squashT, -1, 1, 15, 30);
      h.y = p.baseY;
      break;

    case "anticipation":
      // Anticipation - wind up before action
      let anticipateT = (t * 2) % (TWO_PI);
      if (anticipateT < PI) {
        // Wind up (anticipation)
        h.bodyRotation = map(sin(anticipateT), 0, 1, 0, -20);
        h.leftArmRotation = map(sin(anticipateT), 0, 1, -30, -60);
      } else {
        // Action (jump)
        let actionT = anticipateT - PI;
        h.bodyRotation = 0;
        h.leftArmRotation = -30;
        h.y = p.baseY - abs(sin(actionT)) * 50;
      }
      break;

    case "staging":
      // Staging - clear silhouette
      h.bodyRotation = 20; // Angled for clear silhouette
      h.leftArmRotation = -80;
      h.rightArmRotation = 40;
      h.leftLegRotation = -20;
      h.rightLegRotation = 30;
      h.y = p.baseY + sin(t) * 5;
      break;

    case "straight":
      // Straight Ahead - continuous fluid motion
      h.walk(25, 2, p.phase);
      break;

    case "follow":
      // Follow Through - parts continue after main body stops
      let followT = (t * 1.5) % (TWO_PI * 2);
      if (followT < PI) {
        h.y = p.baseY - 40;
        h.leftArmRotation = -30;
        h.rightArmRotation = 30;
      } else {
        h.y = p.baseY;
        // Arms follow through after landing
        let follow = max(0, PI * 2 - followT);
        h.leftArmRotation = -30 - follow * 10;
        h.rightArmRotation = 30 + follow * 10;
      }
      break;

    case "ease":
      // Slow In and Slow Out - easing function
      let easeT = (t % (TWO_PI)) / TWO_PI;
      let eased = easeInOutCubic(easeT);
      h.y = p.baseY - 50 + eased * 100 - 50;
      break;

    case "arc":
      // Arc - movement follows arc path
      let arcT = (t % (TWO_PI));
      let arcX = sin(arcT) * 60;
      let arcY = -abs(cos(arcT)) * 60;
      h.x = p.baseX + arcX;
      h.y = p.baseY + arcY;
      // Rotate to follow arc
      h.bodyRotation = arcT * 180 / PI - 90;
      break;

    case "secondary":
      // Secondary Action - wave while walking
      h.walk(15, 1.5, p.phase);
      h.leftArmRotation = -30 + sin(t * 4) * 40; // Wave
      break;

    case "timing":
      // Timing - different speeds convey different moods
      let fast = sin(t * 6) * 30;
      let slow = sin(t * 0.5) * 30;
      let timingT = (t % (TWO_PI * 4)) / (TWO_PI * 4);
      let movement = timingT < 0.5 ? fast : slow;
      h.y = p.baseY + movement;
      break;

    case "exaggeration":
      // Exaggeration - over-the-top movement
      h.swayArms(60, 3, p.phase);
      h.bodyRotation = sin(t * 2) * 30;
      h.y = p.baseY + sin(t * 2.5) * 40;
      break;

    case "solid":
      // Solid Drawing - 3D appearance through rotation
      h.bodyRotation = sin(t * 1.5) * 60;
      h.headRotation = sin(t * 1.5) * 40;
      break;

    case "appeal":
      // Appeal - pleasant, inviting pose
      h.swayArms(10, 0.8, p.phase);
      h.bounce(8, 0.8);
      h.bodyRotation = sin(t * 0.5) * 5;
      break;
  }

  h.draw();
}

// Easing function for Slow In/Out
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - pow(-2 * t + 2, 3) / 2;
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    saveCanvas('genuary2026_day02', 'png');
  }
}
