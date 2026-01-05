// Genuary 2026 - Day 05
// Prompt: Write "Genuary". Avoid using a font
// Concept: Collective Message - Individuals form letters, together create meaning
// Meta: Many small efforts combine to spell out our shared purpose

let humans = [];
let time = 0;
let letterSpacing = 180;
let startX = 200;
let startY;

// Define letters using point coordinates (simplified geometric forms)
const LETTERS = {
  G: [[1,0],[2,0],[3,0],[0,1],[0,2],[0,3],[0,4],[1,5],[2,5],[3,5],[3,4],[3,3],[2,3]],
  E: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,0],[2,0],[3,0],[1,2],[2,2],[3,2],[1,5],[2,5],[3,5]],
  N: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,1],[2,2],[3,3],[3,4],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]],
  U: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,5],[2,5],[3,5],[4,0],[4,1],[4,2],[4,3],[4,4]],
  A: [[1,5],[2,4],[2,3],[2,2],[2,1],[2,0],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[0,2],[1,2],[4,2]],
  R: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,0],[2,0],[3,0],[3,1],[3,2],[2,2],[1,2],[1,3],[2,4],[3,5]],
  Y: [[0,0],[0,1],[1,2],[2,3],[2,4],[2,5],[3,2],[4,0],[4,1]]
};

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 5);

  startY = height / 2 - 80;

  // Create humans forming letters
  let word = "GENUARY";
  let currentX = startX;

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    let points = LETTERS[letter];

    // Color for this letter (gradient across word)
    let hue = map(i, 0, word.length - 1, 200, 320);

    for (let point of points) {
      let px = currentX + point[0] * 25;
      let py = startY + point[1] * 25;

      // Add some noise to positioning for organic feel
      px += random(-5, 5);
      py += random(-5, 5);

      let h = new Human(px, py, {
        scale: 0.5 + random(-0.1, 0.1),
        headShape: random(['circle', 'square', 'triangle']),
        headColor: color(hue, 70 + random(-10, 10), 85 + random(-10, 10)),
        bodyColor: color(hue, 60, 70),
        limbColor: color(hue, 50, 55),
        strokeColor: color(0, 0, 15),
        strokeWeight: 1,
        headSize: 20,
        bodyHeight: 40,
        limbLength: 25
      });

      humans.push({
        human: h,
        baseX: px,
        baseY: py,
        letterIndex: i,
        phase: random(TWO_PI),
        speed: random(0.5, 1.5),
        orbitRadius: random(2, 5)
      });
    }

    // Letter spacing
    let letterWidth = getLetterWidthPoints(points) * 25;
    currentX += letterWidth + letterSpacing;
  }
}

function draw() {
  // Gentle fade
  fill(0, 0, 5, 10);
  noStroke();
  rect(0, 0, width, height);

  time += 0.01;

  // Update and draw humans
  for (let h of humans) {
    h.phase += 0.02 * h.speed;

    // Gentle circular orbit around base position
    let offsetX = cos(h.phase) * h.orbitRadius;
    let offsetY = sin(h.phase) * h.orbitRadius * 0.5;

    h.human.x = h.baseX + offsetX;
    h.human.y = h.baseY + offsetY;

    // Subtle upward reaching arms
    h.human.leftArmRotation = -90 + sin(h.phase * 2) * 15;
    h.human.rightArmRotation = -90 + sin(h.phase * 2 + PI) * 15;

    // Slight body rotation
    h.human.bodyRotation = sin(h.phase * 0.5) * 5;

    h.human.draw();
  }

  // Draw info
  drawInfo();

  // Draw connection lines (optional - shows collective structure)
  if (frameCount % 120 < 60) {
    drawConnections();
  }
}

function drawConnections() {
  push();
  stroke(260, 30, 40, 10);
  strokeWeight(0.5);

  // Connect nearby humans within same letter
  for (let i = 0; i < humans.length; i++) {
    for (let j = i + 1; j < humans.length; j++) {
      let h1 = humans[i];
      let h2 = humans[j];

      // Only connect if same letter
      if (h1.letterIndex === h2.letterIndex) {
        let d = dist(h1.human.x, h1.human.y, h2.human.x, h2.human.y);
        if (d < 40) {
          line(h1.human.x, h1.human.y, h2.human.x, h2.human.y);
        }
      }
    }
  }
  pop();
}

function getLetterWidthPoints(points) {
  let maxX = 0;
  for (let p of points) {
    if (p[0] > maxX) maxX = p[0];
  }
  return maxX;
}

function drawInfo() {
  push();
  fill(0, 0, 95, 80);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('"Write Genuary. Avoid using a font."', width / 2, 40);

  textSize(11);
  fill(0, 0, 85, 70);
  text(`${humans.length} humans form the letters`, width / 2, 70);
  text("Together, we spell our purpose", width / 2, 90);

  // Controls
  fill(0, 0, 70, 60);
  textAlign(LEFT, BOTTOM);
  text("Press 'S' to save | Press 'C' to toggle connections", 20, height - 20);
  pop();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('genuary2026_day05', 'png');
  }
}
