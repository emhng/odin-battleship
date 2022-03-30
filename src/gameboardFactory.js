const createGameboard = () => {
  const shipLocations = [];
  const attackedCells = [];
  const sunkShips = [];

  const placeShip = function (ship, ...coordinates) {
    ship.shipCoordinates.push(...coordinates);
    this.shipLocations.push({
      shipId: ship.shipId,
      coordinates: [...coordinates]
    });
  };

  const receiveAttack = function (target, ships) {
    const isMiss = shipLocations.every(ship => {
      if (ship.coordinates.includes(target) === true) {
        const shipIndex = ship.shipId - 1;
        const targetShip = ships[shipIndex];
        targetShip.hit(target);
        if (targetShip.isSunk() === true) {
          this.sunkShips.push(targetShip.shipName);
        }
        return false;
      } else {
        return true;
      }
    });
    if (isMiss === true) {
      if (attackedCells.indexOf(target) === -1) {
        attackedCells.push(target);
      }
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
    attackedCells,
    sunkShips,
    placeShip,
    receiveAttack,
    defeat
  };
};

export { createGameboard };
