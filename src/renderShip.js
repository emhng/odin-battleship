const renderShip = ship => {
  const coordinates = ship.shipCoordinates;

  coordinates.forEach(coordinate => {
    const targetCell = document.querySelector(
      `div#main div.grid div.cell[data-coord="${coordinate}"]`
    );
    targetCell.classList.add('ship');
  });
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
    targetCell.classList.add('miss');
  } else {
    targetCell.classList.add('hit');
  }
};

export { renderShip, renderAttack };
