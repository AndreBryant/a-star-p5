class Node {
  constructor(x, y, p) {
    this.x = x;
    this.y = y;
    this.isWall = Math.random() < p;
    this.isPartOfSolution = false;
    this.isVisited = false;
    this.stillOpen = false;
    this.isStart = false;
    this.isGoal = false;
    this.gCost = Infinity;
    this.fCost = Infinity;
  }

  //   TODO fix this
  show() {
    stroke(120, 120, 120, 36);
    if (this.isWall) {
      noStroke();
      fill(99, 99, 99);
      rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else if (this.isVisited) {
      noStroke();
      fill(200, 200, 255, 100);
      rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else if (this.stillOpen) {
      noStroke();
      fill(100, 100, 200, 150);
      rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else if (this.isPartOfSolution) {
      noStroke();
      fill(173, 255, 47);
      rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    } else if (this.isStart) {
      noStroke();
      fill(0, 204, 204);
      rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      textSize(16);
      textAlign(CENTER, CENTER);
      fill(30);
      text(
        "S",
        this.x * tileSize + tileSize / 2,
        this.y * tileSize + tileSize / 2
      );
    } else if (this.isGoal) {
      noStroke();
      fill(0, 255, 0);
      rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
      textSize(16);
      textAlign(CENTER, CENTER);
      fill(30);
      text(
        "G",
        this.x * tileSize + tileSize / 2,
        this.y * tileSize + tileSize / 2
      );
    } else {
      noFill();
      rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
    }
  }
}
