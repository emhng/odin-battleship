const createShip = shipId => {
  const shipInfo = {
    1: { name: 'Carrier', length: 5 },
    2: { name: 'Battleship', length: 4 },
    3: { name: 'Destroyer', length: 3 },
    4: { name: 'Submarine', length: 3 },
    5: { name: 'Patrol Boat', length: 2 }
  };
  const shipName = shipInfo[shipId].name;
  const shipLength = shipInfo[shipId].length;
  const shipCoordinates = [];
  const confirmedHits = [];
  const hit = function (target) {
    if (this.shipCoordinates.indexOf(target) !== -1) {
      this.confirmedHits.push(target);
      return true;
    } else {
      return false;
    }
  };
  const isSunk = function () {
    if (this.confirmedHits.length === this.shipCoordinates.length) {
      return true;
    } else {
      return false;
    }
  };

  return {
    shipId,
    shipName,
    shipLength,
    shipCoordinates,
    confirmedHits,
    hit,
    isSunk
  };
};
