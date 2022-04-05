import { createShip } from './shipFactory';
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

  const ships = [
    createShip(1),
    createShip(2),
    createShip(3),
    createShip(4),
    createShip(5)
  ];

  // All functions below are for CPU player logic

  const randomize = array => {
    //Returns a randomized integer used as an array index
    return Math.floor(Math.random() * array.length);
  };

  const getRandomArray = array => {
    const randomIndex = randomize(array);
    return array[randomIndex];
  };

  const getShipCoordinates = ship => {
    const coordinates = [];

    return coordinates;
  };

  const verticalShipCoordinates = (ship, cpuBoard) => {
    const availableColumns = cpuBoard.gridColumns;
    const columnKey = {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D',
      4: 'E',
      5: 'F',
      6: 'G'
    };
    const randomColumnIndex = getRandomArray(availableColumns);
    const column = columnKey[randomColumnIndex];
    let possiblePositions;

    if (ship.shipId === 1) {
      possiblePositions = [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7]
      ];
      //Remove column so that other ships cannot be placed in same column
      const index = availableColumns.indexOf(randomColumnIndex);
      availableColumns.splice(index, 1);
    }

    if (ship.shipId === 2) {
      possiblePositions = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7]
      ];
      //Remove column so that other ships cannot be placed in same column
      const index = availableColumns.indexOf(randomColumnIndex);
      availableColumns.splice(index, 1);
    }

    if (ship.shipId === 3 || ship.shipId === 4) {
      possiblePositions = [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
        [5, 6, 7]
      ];
    }

    if (ship.shipId === 5) {
      possiblePositions = [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7]
      ];
    }

    const positionArray = getRandomArray(possiblePositions);
    const coordinates = positionArray.map(row => {
      return column + row;
    });
    return coordinates;
  };

  const getAttackCoordinates = function (gameboard) {
    const availableCoordinates = gameboard.gridCoordinates;
    const availableColumns = gameboard.gridColumns;

    const availableColumnIndex = randomize(availableColumns);
    const gridColumnIndex = availableColumns[availableColumnIndex];

    const gridColumn = availableCoordinates[gridColumnIndex];

    const coordinateIndex = randomize(gridColumn);
    const targetCoordinate = gridColumn[coordinateIndex];

    // Remove selected coordinate from coordinate array, so it cannot be selected a second time
    gridColumn.splice(coordinateIndex, 1);

    // Remove a grid column from selection once it becomes empty
    if (gridColumn.length === 0) {
      availableColumns.splice(availableColumnIndex, 1);
    }
    console.log(availableCoordinates);
    console.log(availableColumns);

    return targetCoordinate;
  };

  const getHorizontalCoordinates = function (
    previousAttack,
    availableCoordinates
  ) {
    //Only need to change column
    let targetCoordinate;
    let [column, row] = [...previousAttack];
    const columnDownKey = {
      A: 'B',
      B: 'C',
      C: 'D',
      D: 'E',
      E: 'F',
      F: 'G',
      G: 'F'
    };
    const columnUpKey = {
      A: 'B',
      B: 'A',
      C: 'B',
      D: 'C',
      E: 'D',
      F: 'E',
      G: 'F'
    };
    const upDown = [columnUpKey, columnDownKey];
    const randomKeyIndex = randomize(upDown);
    const columnKey = upDown[randomKeyIndex];
    const nextColumn = columnKey[column];
    const desiredCoordinate = nextColumn + row;

    const gridIndexKey = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6
    };
    const targetColIndex = gridIndexKey[nextColumn];
    const gridColArray = availableCoordinates[targetColIndex];
    const desiredCoordinateIndex = gridColArray.indexOf(desiredCoordinate);
    let coordinateIndex;

    // Make sure generated coordinate is still available to attack
    if (desiredCoordinateIndex !== -1) {
      targetCoordinate = gridColArray[desiredCoordinateIndex];
      coordinateIndex = desiredCoordinateIndex;
    } else {
      // If desired coordinate is not available for attack, select random coordinate from the column array
      coordinateIndex = randomize(gridColArray);
      targetCoordinate = gridColArray[coordinateIndex];
    }

    // Remove the corresponding coordinate from the coordinate array
    gridColArray.splice(coordinateIndex, 1);

    console.log(targetCoordinate);
    console.log(gridColArray);

    // Remove column array once all coordinates have been selected
    if (gridColArray.length === 0) {
      availableCoordinates.splice(targetColIndex, 1);
    }

    return targetCoordinate;
  };

  const getVerticalCoordinates = function (
    previousAttack,
    availableCoordinates
  ) {
    //Only need to change row
    let targetCoordinate;
    let [column, row] = [...previousAttack];
    const rowKey = {
      1: '2',
      2: '3',
      3: '4',
      4: '5',
      5: '6',
      6: '7',
      7: '6'
    };
    const nextRow = rowKey[row];
    const desiredCoordinate = column + nextRow;

    // Remove the corresponding coordinate from the coordinate array
    const gridIndexKey = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6
    };
    const targetColIndex = gridIndexKey[column];
    const gridColArray = availableCoordinates[targetColIndex];
    const desiredCoordinateIndex = gridColArray.indexOf(desiredCoordinate);
    let coordinateIndex;

    // Make sure generated coordinate is still available to attack
    if (desiredCoordinateIndex !== -1) {
      targetCoordinate = gridColArray[desiredCoordinateIndex];
      coordinateIndex = desiredCoordinateIndex;
    } else {
      // If desired coordinate is not available for attack, select random coordinate from the column array
      coordinateIndex = randomize(gridColArray);
      targetCoordinate = gridColArray[coordinateIndex];
    }

    gridColArray.splice(coordinateIndex, 1);

    // Remove column array once all coordinates have been selected
    if (gridColArray.length === 0) {
      availableCoordinates.splice(targetColIndex, 1);
    }

    return targetCoordinate;
  };

  const getAdjacentCoordinates = function (previousHit, gameboard) {
    const availableCoordinates = gameboard.gridCoordinates;
    const vert = 'up down';
    const hori = 'left right';
    const orientation = [vert, hori];
    const randomDirection = randomize[orientation];

    if (randomDirection === 'up down') {
      return getVerticalCoordinates(previousHit, availableCoordinates);
    } else {
      return getHorizontalCoordinates(previousHit, availableCoordinates);
    }
  };

  return {
    id,
    turn,
    type,
    ships,
    verticalShipCoordinates,
    getAttackCoordinates,
    getAdjacentCoordinates
  };
};

export { createPlayer };
