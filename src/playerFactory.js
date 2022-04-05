import { createShip } from './shipFactory';
const createPlayer = playerType => {
  let id = '';
  let turn = '';
  let type = '';

  if (playerType === undefined) {
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
    //Returns a random array item from target array
    return array[randomIndex];
  };

  const getShipCoordinates = function (ship, cpuBoard) {
    const orientation = ['vertical', 'horizontal'];
    const randomOrientation = getRandomArray(orientation);
    console.log(randomOrientation);
    let coordinates;

    if (randomOrientation === 'vertical') {
      coordinates = this.verticalShipCoordinates(ship, cpuBoard);
    }

    if (randomOrientation === 'horizontal') {
      coordinates = this.horizontalShipCoordinates(ship, cpuBoard);
    }

    return coordinates;
  };

  const getColumnRow = (index, cpuBoard) => {
    //Index Key:
    // 0 = carrier
    // 1 = battleship
    // 2 = destroyer
    // 3 = submarine
    // 4 = patrol boat
    const coordinates = cpuBoard.shipLocations[index].coordinates[index];
    const [column, row] = coordinates;
    return [column, row];
  };

  const getViableVerticalRows = (index, column, possibleRows, cpuBoard) => {
    //Index Key:
    // 0 = carrier
    // 1 = battleship
    // 2 = destroyer
    // 3 = submarine
    // 4 = patrol boat

    //Check if target ship is horizontal
    const horizontalShip =
      cpuBoard.shipLocations[index].shipOrientation === 'horizontal';

    if (horizontalShip) {
      const [shipColumn, shipRow] = getColumnRow(index, cpuBoard);

      if (shipColumn === column) {
        //Vertical ship can be in the same column as horizontal ship but it cannot overlap rows
        const filteredRows = possibleRows.filter(rowPattern => {
          if (rowPattern.indexOf(+shipRow) === -1) {
            return rowPattern;
          }
        });

        return filteredRows;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getViableHorizontalRows = (index, row, possibleColumns, cpuBoard) => {
    //Index Key:
    // 0 = carrier
    // 1 = battleship
    // 2 = destroyer
    // 3 = submarine
    // 4 = patrol boat

    //Check if target ship is horizontal
    const verticalShip =
      cpuBoard.shipLocations[index].shipOrientation === 'vertical';

    if (verticalShip) {
      const [shipColumn, shipRow] = getColumnRow(index, cpuBoard);

      if (shipRow === row) {
        //Change what column
        const filteredColumns = possibleColumns.filter(columnPattern => {
          if (columnPattern.indexOf(shipColumn) === -1) {
            return columnPattern;
          }
        });

        return filteredColumns;
      } else {
        return false;
      }
    } else {
      return false;
    }
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

    //Column letter stays the same, but row number changes
    const randomColumnIndex = getRandomArray(availableColumns);
    const column = columnKey[randomColumnIndex];
    let possibleRows;

    if (ship.shipId === 1) {
      possibleRows = [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7]
      ];
      //Remove column so that other ships cannot be placed in same column
      const index = availableColumns.indexOf(randomColumnIndex);
      availableColumns.splice(index, 1);
    }

    if (ship.shipId === 2) {
      possibleRows = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7]
      ];

      //Check if carrier is horizontal
      const isHorizontalCarrier = getViableVerticalRows(
        0,
        column,
        possibleRows,
        cpuBoard
      );

      if (isHorizontalCarrier !== false) {
        possibleRows = isHorizontalCarrier;
      }

      //Remove column so that other ships cannot be placed in same column
      const index = availableColumns.indexOf(randomColumnIndex);
      availableColumns.splice(index, 1);
    }

    if (ship.shipId === 3 || ship.shipId === 4) {
      possibleRows = [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
        [5, 6, 7]
      ];

      //Check if carrier is horizontal
      const isHorizontalCarrier = getViableVerticalRows(
        0,
        column,
        possibleRows,
        cpuBoard
      );

      if (isHorizontalCarrier !== false) {
        possibleRows = isHorizontalCarrier;
      }

      //Check if battleship is horizontal
      const isHorizontalBattleShip = getViableVerticalRows(
        1,
        column,
        possibleRows,
        cpuBoard
      );

      if (isHorizontalBattleShip !== false) {
        possibleRows = isHorizontalBattleShip;
      }

      if (ship.shipId === 4) {
        //Check if destroyer is horizontal
        const isHorizontalDestroyer = getViableVerticalRows(
          2,
          column,
          possibleRows,
          cpuBoard
        );

        if (isHorizontalDestroyer !== false) {
          possibleRows = isHorizontalDestroyer;
        }
      }
    }

    if (ship.shipId === 5) {
      possibleRows = [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7]
      ];

      //Check if carrier is horizontal
      const isHorizontalCarrier = getViableVerticalRows(
        0,
        column,
        possibleRows,
        cpuBoard
      );

      if (isHorizontalCarrier !== false) {
        possibleRows = isHorizontalCarrier;
      }

      //Check if battleship is horizontal
      const isHorizontalBattleShip = getViableVerticalRows(
        1,
        column,
        possibleRows,
        cpuBoard
      );

      if (isHorizontalBattleShip !== false) {
        possibleRows = isHorizontalBattleShip;
      }

      //Check if destroyer is horizontal
      const isHorizontalDestroyer = getViableVerticalRows(
        2,
        column,
        possibleRows,
        cpuBoard
      );

      if (isHorizontalDestroyer !== false) {
        possibleRows = isHorizontalDestroyer;
      }

      //Check if submarine is horizontal
      //BUG NOTE: coordinates are undefined / cannot be found only for submarine?
      const isHorizontalSubmarine = getViableVerticalRows(
        3,
        column,
        possibleRows,
        cpuBoard
      );

      if (isHorizontalSubmarine !== false) {
        possibleRows = isHorizontalSubmarine;
      }
    }
    const positionArray = getRandomArray(possibleRows);
    const coordinates = positionArray.map(row => {
      return column + row;
    });
    ship.shipOrientation = 'vertical';
    return coordinates;
  };

  const horizontalShipCoordinates = (ship, cpuBoard) => {
    const availableRows = cpuBoard.gridRows;

    //Row number stays the same, but column letter changes
    const row = getRandomArray(availableRows);
    let possibleColumns;

    if (ship.shipId === 1) {
      // Carrier is first ship placed, so don't need to worry about any taken positions
      possibleColumns = [
        ['A', 'B', 'C', 'D', 'E'],
        ['B', 'C', 'D', 'E', 'F'],
        ['C', 'D', 'E', 'F', 'G']
      ];
      //Remove row so that other ships cannot be placed in same row
      const index = availableRows.indexOf(row);
      availableRows.splice(index, 1);
    }

    if (ship.shipId === 2) {
      possibleColumns = [
        ['A', 'B', 'C', 'D'],
        ['B', 'C', 'D', 'E'],
        ['C', 'D', 'E', 'F'],
        ['D', 'E', 'F', 'G']
      ];

      //Check if carrier is vertical
      const isVerticalCarrier = getViableHorizontalRows(
        0,
        row,
        possibleColumns,
        cpuBoard
      );

      if (isVerticalCarrier !== false) {
        possibleColumns = isVerticalCarrier;
      }

      //Remove row so that other ships cannot be placed in same row
      const index = availableRows.indexOf(row);
      availableRows.splice(index, 1);
    }

    if (ship.shipId === 3 || ship.shipId === 4) {
      possibleColumns = [
        ['A', 'B', 'C'],
        ['B', 'C', 'D'],
        ['C', 'D', 'E'],
        ['D', 'E', 'F'],
        ['E', 'F', 'G']
      ];
      //Check if carrier is vertical
      const isVerticalCarrier = getViableHorizontalRows(
        0,
        row,
        possibleColumns,
        cpuBoard
      );

      if (isVerticalCarrier !== false) {
        possibleColumns = isVerticalCarrier;
      }

      //Check if battleship is vertical
      const isVerticalBattleShip = getViableHorizontalRows(
        1,
        row,
        possibleColumns,
        cpuBoard
      );

      if (isVerticalBattleShip !== false) {
        possibleColumns = isVerticalBattleShip;
      }

      if (ship.shipId === 4) {
        //Check if destroyer is vertical
        const isVerticalDestroyer = getViableHorizontalRows(
          2,
          row,
          possibleColumns,
          cpuBoard
        );

        if (isVerticalDestroyer !== false) {
          possibleColumns = isVerticalDestroyer;
        }
      }
    }

    if (ship.shipId === 5) {
      possibleColumns = [
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'D'],
        ['D', 'E'],
        ['E', 'F'],
        ['F', 'G']
      ];
      //Check if carrier is vertical
      const isVerticalCarrier = getViableHorizontalRows(
        0,
        row,
        possibleColumns,
        cpuBoard
      );

      if (isVerticalCarrier !== false) {
        possibleColumns = isVerticalCarrier;
      }

      //Check if battleship is vertical
      const isVerticalBattleShip = getViableHorizontalRows(
        1,
        row,
        possibleColumns,
        cpuBoard
      );

      if (isVerticalBattleShip !== false) {
        possibleColumns = isVerticalBattleShip;
      }

      //Check if destroyer is vertical
      const isVerticalDestroyer = getViableHorizontalRows(
        2,
        row,
        possibleColumns,
        cpuBoard
      );

      if (isVerticalDestroyer !== false) {
        possibleColumns = isVerticalDestroyer;
      }

      //Check if submarine is vertical
      //BUG NOTE: coordinates are undefined / cannot be found only for submarine?
      const isVerticalSub = getViableHorizontalRows(
        3,
        row,
        possibleColumns,
        cpuBoard
      );

      if (isVerticalSub !== false) {
        possibleColumns = isVerticalSub;
      }
    }

    const positionArray = getRandomArray(possibleColumns);
    const coordinates = positionArray.map(column => {
      return column + row;
    });
    ship.shipOrientation = 'horizontal';
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
    getShipCoordinates,
    verticalShipCoordinates,
    horizontalShipCoordinates,
    getAttackCoordinates,
    getAdjacentCoordinates
  };
};

export { createPlayer };
