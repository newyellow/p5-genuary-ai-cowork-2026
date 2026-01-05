// Day 14 - Everything Fits Perfectly
// Concept: Perfect tessellation of humans

let humans = [];
let gridSize = 100;

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100);
  
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * gridSize + gridSize/2;
      let y = j * gridSize + gridSize/2;
      let hue = ((i + j) * 30) % 360;
      
      let h = new Human(x, y, {
        scale: 0.5,
        headShape: 'hexagon',
        headColor: color(hue, 70, 80),
        bodyColor: color(hue, 60, 60),
        limbColor: color(hue, 50, 40)
      });
      
      humans.push({ human: h });
    }
  }
}

function draw() {
  background(0, 0, 5);
  
  for (let h of humans) {
    h.human.draw();
  }
  
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Everything Fits Perfectly", width/2, 50);
}

function keyPressed() {
  if (key === 's') saveCanvas('genuary2026_day14', 'png');
}
