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

  const getViablePositions = (
    index,
    horizontal_or_vertical,
    column_or_row,
    possiblePositions,
    cpuBoard
  ) => {
    // Index Key:
    // 0 = carrier
    // 1 = battleship
    // 2 = destroyer
    // 3 = submarine
    // 4 = patrol boat

    // Check if there are any possible conflicting ships
    const conflictingShip =
      cpuBoard.shipLocations[index].shipOrientation === horizontal_or_vertical;

    if (conflictingShip) {
      // If there is a possible conflicting ship, check if there is any coordinate overlap
      const coordinateArray = cpuBoard.shipLocations[index].coordinates;
      const overlap = coordinateArray.find(coordinate =>
        coordinate.includes(column_or_row)
      );

      if (overlap !== undefined) {
        // If there is coordinate overlap found, filter through possible positions for a valid position
        const [shipColumn, shipRow] = overlap;
        let filteredPositions;

        if (horizontal_or_vertical === 'horizontal') {
          filteredPositions = possiblePositions.filter(pattern => {
            if (pattern.indexOf(+shipRow) === -1) {
              return pattern;
            }
          });
        }

        if (horizontal_or_vertical === 'vertical') {
          filteredPositions = possiblePositions.filter(pattern => {
            if (pattern.indexOf(shipColumn) === -1) {
              return pattern;
            }
          });
        }

        //NOTE: Sometimes if column is completely taken, it will filter down to an empty array
        //In this case you will need to reroll for a new column or row that's not taken

        return filteredPositions;
      } else {
        // Return false if there is no coordinate overlap found
        return false;
      }
    } else {
      // Return false if there is no conflicting ship
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
    }

    if (ship.shipId === 2) {
      possibleRows = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        [4, 5, 6, 7]
      ];
      const shipsToCheck = [0];

      shipsToCheck.forEach(ship => {
        const isHorizontalShip = getViablePositions(
          ship,
          'horizontal',
          column,
          possibleRows,
          cpuBoard
        );

        if (isHorizontalShip !== false) {
          possibleRows = isHorizontalShip;
          console.log(possibleRows);
        }
      });
    }

    if (ship.shipId === 3 || ship.shipId === 4) {
      possibleRows = [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6],
        [5, 6, 7]
      ];
      const shipsToCheck = [0, 1];

      shipsToCheck.forEach(ship => {
        const isHorizontalShip = getViablePositions(
          ship,
          'horizontal',
          column,
          possibleRows,
          cpuBoard
        );

        if (isHorizontalShip !== false) {
          possibleRows = isHorizontalShip;
          console.log(possibleRows);
        }
      });

      if (ship.shipId === 4) {
        const shipsToCheck = [2];

        shipsToCheck.forEach(ship => {
          const isHorizontalShip = getViablePositions(
            ship,
            'horizontal',
            column,
            possibleRows,
            cpuBoard
          );

          if (isHorizontalShip !== false) {
            possibleRows = isHorizontalShip;
            console.log(possibleRows);
          }
        });
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

      const shipsToCheck = [0, 1, 2, 3];

      shipsToCheck.forEach(ship => {
        const isHorizontalShip = getViablePositions(
          ship,
          'horizontal',
          column,
          possibleRows,
          cpuBoard
        );

        if (isHorizontalShip !== false) {
          possibleRows = isHorizontalShip;
          console.log(possibleRows);
        }
      });
    }

    if (possibleRows.length === 0) {
      console.log('array empty');
      // If the filtered positions return back as empty, then it means column is completely taken
      // Need to assign a new column instead and then loop back through the function...

      // Remove the column from selection ability so it does not get picked up on the next loop
      const index = availableColumns.indexOf(randomColumnIndex);
      availableColumns.splice(index, 1);

      // Loop through the function again
      return verticalShipCoordinates(ship, cpuBoard);
    } else {
      const positionArray = getRandomArray(possibleRows);
      const coordinates = positionArray.map(row => {
        return column + row;
      });

      ship.shipOrientation = 'vertical';

      //Remove column so that other ships cannot be placed in same column
      const index = availableColumns.indexOf(randomColumnIndex);
      availableColumns.splice(index, 1);

      return coordinates;
    }
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
    }

    if (ship.shipId === 2) {
      possibleColumns = [
        ['A', 'B', 'C', 'D'],
        ['B', 'C', 'D', 'E'],
        ['C', 'D', 'E', 'F'],
        ['D', 'E', 'F', 'G']
      ];
      const shipsToCheck = [0];

      shipsToCheck.forEach(ship => {
        const isVerticalShip = getViablePositions(
          ship,
          'vertical',
          row,
          possibleColumns,
          cpuBoard
        );

        if (isVerticalShip !== false) {
          possibleColumns = isVerticalShip;
          console.log(possibleColumns);
        }
      });
    }

    if (ship.shipId === 3 || ship.shipId === 4) {
      possibleColumns = [
        ['A', 'B', 'C'],
        ['B', 'C', 'D'],
        ['C', 'D', 'E'],
        ['D', 'E', 'F'],
        ['E', 'F', 'G']
      ];
      const shipsToCheck = [0, 1];

      shipsToCheck.forEach(ship => {
        const isVerticalShip = getViablePositions(
          ship,
          'vertical',
          row,
          possibleColumns,
          cpuBoard
        );

        if (isVerticalShip !== false) {
          possibleColumns = isVerticalShip;
          console.log(possibleColumns);
        }
      });

      if (ship.shipId === 4) {
        const shipsToCheck = [2];

        shipsToCheck.forEach(ship => {
          const isVerticalShip = getViablePositions(
            ship,
            'vertical',
            row,
            possibleColumns,
            cpuBoard
          );

          if (isVerticalShip !== false) {
            possibleColumns = isVerticalShip;
            console.log(possibleColumns);
          }
        });
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
      const shipsToCheck = [0, 1, 2, 3];

      shipsToCheck.forEach(ship => {
        const isVerticalShip = getViablePositions(
          ship,
          'vertical',
          row,
          possibleColumns,
          cpuBoard
        );

        if (isVerticalShip !== false) {
          possibleColumns = isVerticalShip;
          console.log(possibleColumns);
        }
      });
    }

    if (possibleColumns.length === 0) {
      console.log('array empty');
      // If the filtered positions return back as empty, then it means row is completely taken
      // Need to assign a new row instead and then loop back through the function...
      // Remove the row from selection ability so it does not get picked up on the next loop
      const index = availableRows.indexOf(row);
      availableRows.splice(index, 1);
      // Loop through the function again
      return horizontalShipCoordinates(ship, cpuBoard);
    } else {
      const positionArray = getRandomArray(possibleColumns);
      const coordinates = positionArray.map(column => {
        return column + row;
      });

      ship.shipOrientation = 'horizontal';

      //Remove row so that other ships cannot be placed in same row
      const index = availableRows.indexOf(row);
      availableRows.splice(index, 1);

      return coordinates;
    }
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

  return {
    id,
    turn,
    type,
    ships,
    getShipCoordinates,
    verticalShipCoordinates,
    horizontalShipCoordinates,
    getAttackCoordinates
  };
};

export { createPlayer };
