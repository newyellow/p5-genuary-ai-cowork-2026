// Day 08 - A City
// Concept: Urban Organism - City as living system of moving people

let humans = [];
let buildings = [];

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100, 100);

  // Create buildings (vertical lines)
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let h = random(200, 600);
    buildings.push({ x: x, height: h, width: random(40, 100) });
  }
  buildings.sort((a, b) => a.x - b.x);

  // Create people moving in city
  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = height - random(20, 100);
    let h = new Human(x, y, {
      scale: 0.3,
      headShape: random(['circle', 'square']),
      headColor: color(random(200, 280), 60, 80),
      bodyColor: color(random(200, 280), 50, 60),
      limbColor: color(random(200, 280), 40, 40)
    });
    humans.push({
      human: h,
      speed: random(0.3, 1.5),
      direction: random() > 0.5 ? 1 : -1
    });
  }
}

function draw() {
  background(0, 0, 5);

  // Draw buildings
  fill(0, 0, 15);
  noStroke();
  for (let b of buildings) {
    rect(b.x, height - b.height, b.width, b.height);
    // Windows
    fill(50, 60, 80, 30);
    for (let wy = height - b.height + 20; wy < height - 20; wy += 30) {
      for (let wx = b.x + 10; wx < b.x + b.width - 10; wx += 20) {
        rect(wx, wy, 8, 15);
      }
    }
    fill(0, 0, 15);
  }

  // Update and draw humans
  for (let h of humans) {
    h.human.x += h.direction * h.speed;
    if (h.human.x < 0) h.human.x = width;
    if (h.human.x > width) h.human.x = 0;
    h.human.walk(15, h.speed);
    h.human.draw();
  }

  // Info
  fill(0, 0, 90);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text("The City Breathes", width / 2, 30);
}

function keyPressed() {
  if (key === 's' || key === 'S') saveCanvas('genuary2026_day08', 'png');
}
