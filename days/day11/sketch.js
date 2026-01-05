// Day 11 - Quine (Self-replicating code)
let code = `// Day 11 - Quine (Self-replicating code)
let code = \`;

function setup() {
  createCanvas(1920, 1080);
  flex();
  background(0);
}

function draw() {
  background(0);
  fill(0, 255, 0);
  textFont('monospace');
  textSize(10);
  textAlign(LEFT, TOP);
  let fullCode = code.substring(0, code.indexOf('let code')) + 'let code = \`' + code + '\`;' + code.substring(code.indexOf('let code') + 11);
  text(fullCode, 20, 20, width - 40);
  
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("QUINE: Code that outputs itself", width/2, height - 50);
  noLoop();
}

function keyPressed() {
  if (key === 's') saveCanvas('genuary2026_day11', 'png');
}`;

function setup() {
  createCanvas(1920, 1080);
  flex();
  background(0);
}

function draw() {
  background(0);
  fill(0, 255, 0);
  textFont('monospace');
  textSize(10);
  textAlign(LEFT, TOP);
  let fullCode = code.substring(0, code.indexOf('let code')) + 'let code = \`' + code + '\`;' + code.substring(code.indexOf('let code') + 11);
  text(fullCode, 20, 20, width - 40);
  
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("QUINE: Code that outputs itself", width/2, height - 50);
  noLoop();
}

function keyPressed() {
  if (key === 's') saveCanvas('genuary2026_day11', 'png');
}
