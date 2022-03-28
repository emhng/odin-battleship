const createShip = require('./shipFactory.js');

describe('createShip', () => {
  test('Checks if a ship has been hit', function () {
    const patrolBoat = createShip(5);
    patrolBoat.shipCoordinates.push('A1', 'A2');

    expect(patrolBoat.hit('A3')).toBe(false);

    expect(patrolBoat.hit('A2')).toBe(true);
  });

  test('Checks if a ship has sunk', function () {
    const patrolBoat = createShip(5);
    patrolBoat.shipCoordinates.push('A1', 'A2');
    patrolBoat.confirmedHits.push('A1', 'A2');

    expect(patrolBoat.isSunk()).toBe(true);
  });
});
