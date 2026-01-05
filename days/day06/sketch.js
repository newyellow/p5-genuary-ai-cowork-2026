// Genuary 2026 - Day 06
// Prompt: Lights on/off
// Concept: Visibility - Who sees and who is seen when the lights change
// Meta: Social visibility - some are always visible, others only in certain light

let humans = [];
let lightsOn = true;
let transitioning = false;
let transitionProgress = 0;
let time = 0;

// Light source
let lightX, lightY;

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100, 100);

  lightX = width / 2;
  lightY = 100;

  // Create crowd of humans
  let count = 100;
  for (let i = 0; i < count; i++) {
    let x = random(width * 0.1, width * 0.9);
    let y = random(height * 0.4, height * 0.95);

    // Some humans are "privileged" - always visible
    // Others become invisible in darkness
    let alwaysVisible = random() < 0.2; // 20% privileged

    let hue = alwaysVisible ? 50 : random(180, 280); // Golden vs blue/purple
    let scale = alwaysVisible ? random(0.8, 1.2) : random(0.5, 0.9);

    let h = new Human(x, y, {
      scale: scale,
      headShape: alwaysVisible ? 'star' : random(['circle', 'square', 'triangle']),
      headColor: color(hue, 70, 90),
      bodyColor: color(hue, 60, 75),
      limbColor: color(hue, 50, 60),
      strokeColor: color(0, 0, 20),
      strokeWeight: 1.5
    });

    humans.push({
      human: h,
      baseX: x,
      baseY: y,
      hue: hue,
      alwaysVisible: alwaysVisible,
      phase: random(TWO_PI),
      speed: random(0.5, 1.5),
      // Distance from light affects visibility
      distFromLight: dist(x, y, lightX, lightY)
    });
  }

  // Sort by distance from light (closer = more visible)
  humans.sort((a, b) => a.distFromLight - b.distFromLight);
}

function draw() {
  time += 0.01;

  // Handle transition
  if (transitioning) {
    transitionProgress += lightsOn ? 0.05 : -0.05;
    if (transitionProgress >= 1 || transitionProgress <= 0) {
      transitioning = false;
      transitionProgress = constrain(transitionProgress, 0, 1);
    }
  }

  // Background color based on lights
  let bgBrightness = lightsOn ? 15 : 3;
  background(0, 0, bgBrightness);

  // Draw light source
  if (lightsOn) {
    drawLightSource();
  }

  // Update and draw humans
  for (let h of humans) {
    updateHuman(h);
    drawHuman(h);
  }

  // Draw UI
  drawUI();
}

function updateHuman(h) {
  // Gentle movement
  h.phase += 0.01 * h.speed;
  let breathe = sin(h.phase) * 3;
  h.human.y = h.baseY + breathe;

  // Arms gesture - reaching toward light when it's on
  if (lightsOn) {
    let angleToLight = atan2(lightY - h.human.y, lightX - h.human.x);
    let armAngle = degrees(angleToLight) - 90;
    h.human.leftArmRotation = armAngle + sin(h.phase * 2) * 10;
    h.human.rightArmRotation = armAngle + sin(h.phase * 2 + PI) * 10;
  } else {
    // Hunched, protective posture in darkness
    h.human.leftArmRotation = -20;
    h.human.rightArmRotation = 20;
    h.human.bodyRotation = sin(h.phase * 0.5) * 3;
  }
}

function drawHuman(h) {
  push();

  if (lightsOn) {
    // Lights ON: Full color, but brightness varies with distance from light
    let distFactor = map(h.distFromLight, 0, dist(0, 0, width, height), 1, 0.3);
    distFactor = constrain(distFactor, 0.3, 1);

    // Privileged humans always bright
    if (h.alwaysVisible) {
      distFactor = 1;
    }

    let adjustedHue = h.hue;
    let adjustedSat = 70 * distFactor;
    let adjustedBri = 90 * distFactor;

    h.human.headColor = color(adjustedHue, adjustedSat, adjustedBri);
    h.human.bodyColor = color(adjustedHue, adjustedSat * 0.8, adjustedBri * 0.7);
    h.human.limbColor = color(adjustedHue, adjustedSat * 0.6, adjustedBri * 0.5);

  } else {
    // Lights OFF: Only silhouettes
    if (h.alwaysVisible) {
      // Privileged remain visible (faint glow)
      h.human.headColor = color(h.hue, 30, 40);
      h.human.bodyColor = color(h.hue, 20, 30);
      h.human.limbColor = color(h.hue, 15, 20);
    } else {
      // Others become nearly invisible (dark silhouettes)
      h.human.headColor = color(0, 0, 10);
      h.human.bodyColor = color(0, 0, 8);
      h.human.limbColor = color(0, 0, 6);
      h.human.strokeColor = color(0, 0, 5);
    }
  }

  h.human.draw();
  pop();
}

function drawLightSource() {
  push();

  // Glow effect
  for (let r = 200; r > 0; r -= 20) {
    let alpha = map(r, 0, 200, 30, 0);
    fill(50, 80, 100, alpha);
    noStroke();
    circle(lightX, lightY, r);
  }

  // Light bulb
  fill(50, 80, 100);
  noStroke();
  circle(lightX, lightY, 30);

  // Rays
  stroke(50, 60, 90, 30);
  strokeWeight(2);
  for (let i = 0; i < 12; i++) {
    let angle = (i / 12) * TWO_PI + time;
    let x1 = lightX + cos(angle) * 40;
    let y1 = lightY + sin(angle) * 40;
    let x2 = lightX + cos(angle) * 80;
    let y2 = lightY + sin(angle) * 80;
    line(x1, y1, x2, y2);
  }

  pop();
}

function drawUI() {
  push();

  // Light switch button
  let switchX = width - 100;
  let switchY = 50;
  let switchW = 80;
  let switchH = 40;

  // Switch background
  fill(lightsOn ? color(100, 50, 70) : color(0, 0, 30));
  stroke(0, 0, 50);
  strokeWeight(2);
  rect(switchX, switchY, switchW, switchH, 20);

  // Switch toggle
  fill(lightsOn ? color(50, 80, 90) : color(0, 0, 50));
  let toggleX = lightsOn ? switchX + switchW - 25 : switchX + 5;
  circle(toggleX + 10, switchY + 20, 30);

  // Label
  fill(0, 0, 90);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text(lightsOn ? "ON" : "OFF", switchX + switchW / 2, switchY + switchH + 10);

  // Instructions
  fill(0, 0, 80, 80);
  textAlign(CENTER, TOP);
  textSize(16);
  text("Click anywhere to toggle lights", width / 2, 30);

  // Stats
  textAlign(LEFT, BOTTOM);
  textSize(11);
  fill(0, 0, 70, 70);
  let visibleCount = humans.filter(h => h.alwaysVisible).length;
  text(`${visibleCount} always visible (★) | ${humans.length - visibleCount} fade in darkness`, 20, height - 40);
  text("Golden stars remain seen. Others disappear.", 20, height - 20);

  // Title
  textAlign(CENTER, TOP);
  textSize(24);
  fill(0, 0, 95, 90);
  text("Lights On / Off", width / 2, height - 100);

  pop();
}

function mousePressed() {
  toggleLights();
}

function keyPressed() {
  if (key === ' ') {
    toggleLights();
  }

  if (key === 's' || key === 'S') {
    saveCanvas('genuary2026_day06', 'png');
  }
}

function toggleLights() {
  lightsOn = !lightsOn;
  transitioning = true;
}
