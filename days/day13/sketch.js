// Day 13 - Self Portrait
// Concept: Multiple selves, fragmented identity

let selves = [];

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100);
  
  // Create multiple versions of self
  for (let i = 0; i < 12; i++) {
    let angle = (i / 12) * TWO_PI;
    let radius = 300;
    let x = width/2 + cos(angle) * radius;
    let y = height/2 + sin(angle) * radius;
    
    let h = new Human(x, y, {
      scale: 0.8,
      headShape: ['circle', 'square', 'triangle', 'pentagon', 'hexagon', 'star'][i % 6],
      headColor: color((i / 12) * 360, 70, 80),
      bodyColor: color((i / 12) * 360, 60, 60),
      limbColor: color((i / 12) * 360, 50, 40)
    });
    
    selves.push({ human: h, angle: angle });
  }
}

function draw() {
  background(0, 0, 5);
  
  // Center self
  fill(0, 0, 90);
  textAlign(CENTER);
  textSize(16);
  text("Who am I?", width/2, height/2);
  
  // Draw all selves
  for (let s of selves) {
    s.human.bodyRotation = degrees(s.angle);
    s.human.draw();
  }
  
  fill(255);
  textSize(24);
  text("Self Portrait: Multiple Selves", width/2, 50);
}

function keyPressed() {
  if (key === 's') saveCanvas('genuary2026_day13', 'png');
}
