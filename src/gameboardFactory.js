const createGameboard = () => {
  const shipLocations = [];
  const gridCoordinates = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7'],
    ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7'],
    ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7']
  ];
  const attackedCells = [];
  const hitCells = [];
  const missCells = [];
  const sunkShips = [];

  const placeShip = function (ship, ...coordinates) {
    ship.shipCoordinates.push(...coordinates);
    this.shipLocations.push({
      shipId: ship.shipId,
      coordinates: [...coordinates]
    });
  };

  const receiveAttack = function (target, ships) {
    if (attackedCells.indexOf(target) === -1) {
      const isMiss = shipLocations.every(ship => {
        if (ship.coordinates.includes(target) === true) {
          const shipIndex = ship.shipId - 1;
          const targetShip = ships[shipIndex];

          targetShip.hit(target);
          this.hitCells.push(target);

          if (targetShip.isSunk() === true) {
            this.sunkShips.push(targetShip.shipName);
          }

          return false;
        } else {
          return true;
        }
      });

      if (isMiss === true) {
        this.missCells.push(target);
      }

      attackedCells.push(target);
    }
  };

  const defeat = function () {
    if (this.sunkShips.length === 5) {
      return true;
    } else {
      return false;
    }
  };

  return {
    shipLocations,
    gridCoordinates,
    attackedCells,
    hitCells,
    missCells,
    sunkShips,
    placeShip,
    receiveAttack,
    defeat
  };
};

export { createGameboard };
