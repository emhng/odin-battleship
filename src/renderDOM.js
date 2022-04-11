const renderShip = (ship, player) => {
  const coordinates = ship.shipCoordinates;
  if (player === undefined) {
    coordinates.forEach(coordinate => {
      const targetCell = document.querySelector(
        `div#main div.grid div.cell[data-coord="${coordinate}"]`
      );
      targetCell.classList.add('ship');
    });
  } else {
    coordinates.forEach(coordinate => {
      const targetCell = document.querySelector(
        `div#radar div.grid div.cell[data-coord="${coordinate}"]`
      );
      targetCell.classList.add('ship');
    });
  }
};

const renderAttack = (coordinate, gameboard, player) => {
  let targetCell;
  if (player.id === 1) {
    targetCell = document.querySelector(
      `div#radar div.grid div.cell[data-coord="${coordinate}"]`
    );
  } else {
    targetCell = document.querySelector(
      `div#main div.grid div.cell[data-coord="${coordinate}"]`
    );
  }

  if (gameboard.missCells.indexOf(coordinate) !== -1) {
    targetCell.classList.add('miss', 'blink');
  } else {
    targetCell.classList.add('hit', 'blink');
  }
};

const displayPrompt = () => {
  const radarDivEl = document.querySelector('div#radar');
  radarDivEl.classList.toggle('disable');

  const playerTurnH2El = document.querySelector('h2#player-turn');

  playerTurnH2El.classList.toggle('disable');

  if (playerTurnH2El.classList.contains('blink')) {
    playerTurnH2El.classList.remove('blink');
  } else {
    playerTurnH2El.classList.add('blink');
  }

  const promptDivEl = document.querySelector('div#prompt');
  promptDivEl.classList.toggle('hidden');
  promptDivEl.classList.toggle('prompt-blink');
};

const offsetTargetIndex = (
  currentColumn,
  currentRow,
  targetIndex,
  ship,
  orientation
) => {
  let offset;
  let limit;
  let offsetIndex;
  // Defining the offset amount for each ship
  if (ship.shipId === 1) {
    limit = [4, 5, 6, 7];
    orientation === 'horizontal'
      ? (offset = {
          4: 7,
          5: 7 * 2,
          6: 7 * 3,
          7: 7 * 4
        })
      : (offset = {
          4: 1,
          5: 2,
          6: 3,
          7: 4
        });
  } else if (ship.shipId === 2) {
    limit = [5, 6, 7];
    orientation === 'horizontal'
      ? (offset = {
          5: 7,
          6: 7 * 2,
          7: 7 * 3
        })
      : (offset = {
          5: 1,
          6: 2,
          7: 3
        });
  } else if (ship.shipId === 3 || ship.shipId === 4) {
    limit = [6, 7];
    orientation === 'horizontal'
      ? (offset = {
          6: 7,
          7: 7 * 2
        })
      : (offset = {
          6: 1,
          7: 2
        });
  } else {
    limit = [7];
    orientation === 'horizontal'
      ? (offset = {
          7: 7
        })
      : (offset = {
          7: 1
        });
  }

  const isColumnLimit = limit.indexOf(+currentColumn) !== -1;
  const isRowLimit = limit.indexOf(+currentRow) !== -1;

  // Offset the targetIndex if mouse is over a column or row that is too short for the ship
  if (orientation === 'horizontal' && isColumnLimit) {
    offsetIndex = targetIndex - offset[+currentColumn];
    return offsetIndex;
  }

  if (orientation === 'vertical' && isRowLimit) {
    offsetIndex = targetIndex - offset[+currentRow];
    return offsetIndex;
  } else {
    // If the mouse is not over a column or row that would be too short, then just return normal targetIndex
    return targetIndex;
  }
};

const addHoverClass = (targetIndex, ship, orientation, cellArray) => {
  if (orientation === 'horizontal') {
    for (let i = 0; i < ship.shipLength; i++) {
      cellArray[targetIndex + 7 * i].classList.add('hover');
    }
  } else {
    for (let i = 0; i < ship.shipLength; i++) {
      cellArray[targetIndex + i].classList.add('hover');
    }
  }
};

const getCellCoordFromIndex = (ship, targetIndex, orientation, cellArray) => {
  let result = [];
  if (orientation === 'horizontal') {
    for (let i = 0; i < ship.shipLength; i++) {
      result.push(cellArray[targetIndex + 7 * i].dataset.coord);
    }
  } else {
    for (let i = 0; i < ship.shipLength; i++) {
      result.push(cellArray[targetIndex + i].dataset.coord);
    }
  }
  return result;
};

const removeHoverClass = (targetIndex, ship, orientation, cellArray) => {
  const previousHoverHTMLCollection = document.getElementsByClassName('hover');
  const previousHoverArray = [...previousHoverHTMLCollection];

  previousHoverArray.forEach(cell => {
    let currentHover1,
      currentHover2,
      currentHover3,
      currentHover4,
      currentHover5;

    let notCurrentHoverCells;

    if (ship.shipId === 1) {
      [
        currentHover1,
        currentHover2,
        currentHover3,
        currentHover4,
        currentHover5
      ] = getCellCoordFromIndex(ship, targetIndex, orientation, cellArray);

      notCurrentHoverCells =
        cell.dataset.coord !== currentHover1 &&
        cell.dataset.coord !== currentHover2 &&
        cell.dataset.coord !== currentHover3 &&
        cell.dataset.coord !== currentHover4 &&
        cell.dataset.coord !== currentHover5;
    }

    if (notCurrentHoverCells) {
      cell.classList.remove('hover');
    }
  });
};

const displayShipHover = (ship, targetItem, orientation) => {
  const cellNodeList = document.querySelectorAll(
    'div.wide#main div.grid div.cell'
  );
  const cellArray = [...cellNodeList];

  const targetCoordinate = targetItem.dataset.coord;
  let targetIndex = cellArray.findIndex(
    cell => cell.dataset.coord === targetCoordinate
  );

  const currentColumn = targetItem.parentNode.dataset.col;
  const currentRow = targetItem.dataset.row;

  targetIndex = offsetTargetIndex(
    currentColumn,
    currentRow,
    targetIndex,
    ship,
    orientation
  );

  addHoverClass(targetIndex, ship, orientation, cellArray);

  removeHoverClass(targetIndex, ship, orientation, cellArray);
};

export { renderShip, renderAttack, displayPrompt, displayShipHover };
