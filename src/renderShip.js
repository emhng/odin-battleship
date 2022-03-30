const renderShip = ship => {
  const coordinates = ship.shipCoordinates;

  coordinates.forEach(coordinate => {
    const targetCell = document.querySelector(
      `div#main div.grid div.cell[data-coord="${coordinate}"]`
    );
    targetCell.classList.add('ship');
  });
};

export { renderShip };
