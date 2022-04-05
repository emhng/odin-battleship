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

export { renderShip, renderAttack, displayPrompt };
