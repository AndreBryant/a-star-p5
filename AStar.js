const AStar = {
  search: (grid, start, goal) => {
    let openSet = [start];
    let closedSet = [];

    start.gCost = 0;
    start.hCost = AStar.heuristic(start, goal);
    start.fCost = start.gCost + start.hCost;

    while (openSet.length > 0) {
      // sort according to fCost (ascending)
      // or maybe use Priority Queue maybe.
      openSet.sort((a, b) => a.fCost - b.fCost);

      // lowest fCost
      let current = openSet[0];

      if (current === goal) {
        return AStar.reconstructPath(goal);
      }

      // remove current from the open set
      openSet = openSet.filter((node) => node !== current);
      closedSet.push(current);

      // explore neighbors of current node
      let neighbors = AStar.getNeighbors(grid, current);
      for (let neighbor of neighbors) {
        if (closedSet.includes(neighbor)) continue;

        let tentativeGcost = current.gCost + AStar.distance(current, neighbor);

        if (tentativeGcost < neighbor.gCost) {
          neighbor.parent = current;
          neighbor.gCost = tentativeGcost;
          neighbor.fCost = neighbor.gCost + AStar.heuristic(neighbor, goal);
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    // if no path found
    return [];
  },
  distance: (current, neighbor) => {
    const dx = current.x - neighbor.x;
    const dy = current.y - neighbor.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  },
  getNeighbors: (grid, current) => {
    let neighbors = [];
    let { x, y } = current;
    const directions = [
      { dx: 0, dy: -1 }, // up
      { dx: 0, dy: 1 }, // down
      { dx: -1, dy: 0 }, // left
      { dx: 1, dy: 0 }, // right
      { dx: -1, dy: -1 }, // top left
      { dx: 1, dy: -1 }, // top right
      { dx: -1, dy: 1 }, // bottom left
      { dx: 1, dy: 1 }, // bottom right
    ];

    for (const d of directions) {
      const nx = x + d.dx;
      const ny = y + d.dy;

      if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
        const neighbor = grid[nx][ny];
        if (neighbor && !neighbor.isWall) {
          neighbors.push(neighbor);
        }
      }
    }
    return neighbors;
  },
  heuristic: (node0, node1) => {
    const dx = node0.x - node1.x;
    const dy = node0.y - node1.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  },
  reconstructPath: (goal) => {
    let path = [];
    let current = goal;
    while (current) {
      path.push(current);
      current = current.parent;
    }

    return path.reverse(); // i think this is returning the path starting from the goal, so this needs to be returned in reverse order. But yea it doesnt matter in the visuals
  },
};
