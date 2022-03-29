const createGameboard = () => {
  const shipLocations = [];
  const attackedCells = [];
  const placeShip = function (ship, ...coordinates) {
    ship.shipCoordinates.push(...coordinates);
    this.shipLocations.push({
      shipId: ship.shipId,
      coordinates: [...coordinates]
    });
  };

  const receiveAttack = function (target, ships) {
    shipLocations.forEach(ship => {
      if (ship.coordinates.indexOf(target) !== -1) {
        const shipIndex = ship.shipId - 1;
        ships[shipIndex].hit(target);
      } else {
        // Only push coordinates if they haven't already been logged
        if (attackedCells.indexOf(target) === -1) {
          attackedCells.push(target);
        }
      }
    });
  };

  return { shipLocations, attackedCells, placeShip, receiveAttack };
};
