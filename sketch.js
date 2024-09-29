const cWidth = 600;
const cHeight = 600;
const tileSize = 20;
const p = 0.04; // probability that a tile will be a wall
let rows;
let cols;

let nodes = [];
let startNode = null;
let goalNode = null;
let path = [];
let visitedNodes = [];
let openNodes = [];

function setup() {
  rows = cWidth / tileSize;
  cols = cHeight / tileSize;

  // initialize the tiles as a Node object
  for (let x = 0; x < rows; x++) {
    nodes[x] = [];
    for (let y = 0; y < cols; y++) {
      // if (x == floor(rows / 2)) {
      //   tiles[x][y] = new Node(x, y, 1);
      //   continue;
      // }
      nodes[x][y] = new Node(x, y, p);
    }
  }

  // assign start and goal nodes
  assign();

  // get solution
  ({ path, visitedNodes, openNodes } = AStar.search(
    nodes,
    startNode,
    goalNode
  ));

  // update tiles to draw solution
  for (const p of path) {
    let node = nodes[p.x][p.y];
    if (!node.isStart && !node.isGoal) {
      node.isPartOfSolution = true;
    }
  }

  // draw the nodes on the open and closed set
  for (const n of visitedNodes) {
    let node = nodes[n.x][n.y];
    if (!node.isStart && !node.isGoal && !node.isPartOfSolution) {
      node.isVisited = true;
    }
  }

  for (const n of openNodes) {
    let node = nodes[n.x][n.y];
    if (
      !node.isStart &&
      !node.isGoal &&
      !node.isPartOfSolution & !node.isVisited
    ) {
      node.stillOpen = true;
    }
  }

  createCanvas(cWidth, cHeight);
}

function draw() {
  noStroke();
  background(189, 189, 189);
  drawGrid();
  // noLoop();
}

function assign() {
  let startRow, startCol, goalRow, goalCol;
  do {
    startRow = floor(random(rows));
    startCol = floor(random(cols));
  } while (nodes[startRow][startCol].isWall);

  do {
    goalRow = floor(random(rows));
    goalCol = floor(random(cols));
  } while (
    nodes[goalRow][goalCol].isWall ||
    (goalRow === startRow && goalCol === startCol)
  );

  startNode = nodes[startRow][startCol];
  startNode.isStart = true;
  goalNode = nodes[goalRow][goalCol];
  goalNode.isGoal = true;
}

function drawGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      nodes[i][j].show();
    }
  }
}
