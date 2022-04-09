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
  const targetIndex = cellArray.findIndex(
    cell => cell.dataset.coord === targetCoordinate
  );

  addHoverClass(targetIndex, ship, orientation, cellArray);
  removeHoverClass(targetIndex, ship, orientation, cellArray);
};

export { renderShip, renderAttack, displayPrompt, displayShipHover };
