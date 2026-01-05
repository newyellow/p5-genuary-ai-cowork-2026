// Day 09 - Crazy Automaton
// Concept: Emergence from Simple Rules

let grid;
let cols, rows;
let resolution = 10;

function setup() {
  createCanvas(1920, 1080);
  flex();
  colorMode(HSB, 360, 100, 100);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols, rows);
  // Random initial state
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
  frameRate(10);
}

function draw() {
  background(0);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(200, 80, 90);
        noStroke();
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = make2DArray(cols, rows);
  
  // Crazy rules: survive if 2-5 neighbors, born if 3-4 neighbors
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(grid, i, j);
      
      if (grid[i][j] == 1 && (neighbors >= 2 && neighbors <= 5)) {
        next[i][j] = 1; // Survive
      } else if (grid[i][j] == 0 && (neighbors == 3 || neighbors == 4)) {
        next[i][j] = 1; // Birth
      } else {
        next[i][j] = 0; // Die
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function keyPressed() {
  if (key === 's') saveCanvas('genuary2026_day09', 'png');
}
