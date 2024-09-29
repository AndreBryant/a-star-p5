class Node {
  constructor(x, y, p) {
    this.x = x;
    this.y = y;
    this.isWall = Math.random() < p;
    this.isPartOfSolution = false;
    this.isStart = false;
    this.isGoal = false;
    this.gCost = Infinity;
    this.fCost = Infinity;
  }

  show() {
    if (this.isWall) {
      fill(48);
    } else if (this.isPartOfSolution) {
      fill(200, 105, 25);
    } else if (this.isStart) {
      fill(255, 165, 0);
    } else if (this.isGoal) {
      fill(50, 205, 50);
    } else {
      noFill();
    }
    stroke(82);
    rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }
}
