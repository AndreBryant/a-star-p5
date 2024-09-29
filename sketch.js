const cWidth = 600;
const cHeight = 600;
const tileSize = 20;
const p = 0.05; // probability that a tile will be a wall
let rows;
let cols;

let tiles = [];
let startNode = null;
let goalNode = null;
let path = [];

function setup() {
  rows = cWidth / tileSize;
  cols = cHeight / tileSize;

  // initialize the tiles as a Node object
  for (let x = 0; x < rows; x++) {
    tiles[x] = [];
    for (let y = 0; y < cols; y++) {
      tiles[x][y] = new Node(x, y, p);
    }
  }

  // assign start and goal nodes
  assign();

  // randomly assign start and goal nodes
  createCanvas(cWidth, cHeight);

  // get solution
  path = AStar.search(tiles, startNode, goalNode);

  // update tiles to draw solution
  for (const p of path) {
    let node = tiles[p.x][p.y];
    if (!node.isStart && !node.isGoal) {
      node.isPartOfSolution = true;
    }
  }
}

function draw() {
  background(72);
  drawGrid();
  noLoop();
}

function assign() {
  let startRow, startCol, goalRow, goalCol;
  do {
    startRow = floor(random(rows));
    startCol = floor(random(cols));
  } while (tiles[startRow][startCol].isWall);

  do {
    goalRow = floor(random(rows));
    goalCol = floor(random(cols));
  } while (
    tiles[goalRow][goalCol].isWall ||
    (goalRow === startRow && goalCol === startCol)
  );

  startNode = tiles[startRow][startCol];
  startNode.isStart = true;
  goalNode = tiles[goalRow][goalCol];
  goalNode.isGoal = true;
}

function drawGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      tiles[i][j].show();
    }
  }
}
