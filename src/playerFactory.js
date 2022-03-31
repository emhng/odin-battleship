const createPlayer = playerType => {
  let id = '';
  let turn = '';
  let type = '';
  if (playerType === 'human') {
    id = 1;
    turn = true;
    type = 'player';
  }
  if (playerType === 'CPU') {
    id = 2;
    turn = false;
    type = 'CPU';
  }

  const getAttackCoordinates = function (gameboard) {
    const availableCoordinates = gameboard.gridCoordinates;
    const randomize = array => {
      return Math.floor(Math.random() * array.length);
    };
    const columnIndex = randomize(availableCoordinates);
    const gridColumn = availableCoordinates[columnIndex];

    const coordinateIndex = randomize(gridColumn);
    const targetCoordinate = gridColumn[coordinateIndex];

    gridColumn.splice(coordinateIndex, 1);

    if (gridColumn.length === 0) {
      availableCoordinates.splice(columnIndex, 1);
    }

    return targetCoordinate;
  };

  const round = 1;

  return { id, turn, type, round, getAttackCoordinates };
};

export { createPlayer };
