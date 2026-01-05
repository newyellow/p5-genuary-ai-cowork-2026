// Day 10 - Polar Coordinates
// Concept: Circular Migration - People orbit around center

let humans = [];
let time = 0;

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100);
  
  // Create humans in polar coordinates
  for (let i = 0; i < 100; i++) {
    let angle = random(TWO_PI);
    let radius = random(100, 400);
    
    let h = new Human(0, 0, {
      scale: 0.4,
      headShape: random(['circle', 'triangle']),
      headColor: color((angle / TWO_PI) * 360, 70, 80),
      bodyColor: color((angle / TWO_PI) * 360, 60, 60),
      limbColor: color((angle / TWO_PI) * 360, 50, 40)
    });
    
    humans.push({
      human: h,
      angle: angle,
      radius: radius,
      speed: random(0.005, 0.02)
    });
  }
}

function draw() {
  background(0, 0, 5);
  time += 0.01;
  
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Draw center
  fill(50, 80, 90);
  noStroke();
  circle(centerX, centerY, 30);
  
  // Update and draw humans
  for (let h of humans) {
    h.angle += h.speed;
    
    h.human.x = centerX + cos(h.angle) * h.radius;
    h.human.y = centerY + sin(h.angle) * h.radius;
    h.human.bodyRotation = degrees(h.angle) + 90;
    
    h.human.draw();
  }
  
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text("Polar Orbit", width / 2, 50);
}

function keyPressed() {
  if (key === 's') saveCanvas('genuary2026_day10', 'png');
}
