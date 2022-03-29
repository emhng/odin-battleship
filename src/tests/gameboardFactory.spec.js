const createGameboard = require('./gameboardFactory.js');
const createShip = require('./shipFactory.js');

describe('createGameboard', () => {
  test('Pushes the correct coordinates', function () {
    const patrolBoat = createShip(5);
    const gameboard = createGameboard();
    gameboard.placeShip(patrolBoat, 'A1', 'A2');

    expect(patrolBoat.shipCoordinates).toEqual(['A1', 'A2']);
  });
  test('Pushes the object to ship locations', function () {
    const patrolBoat = createShip(5);
    const gameboard = createGameboard();
    gameboard.placeShip(patrolBoat, 'A1', 'A2');

    expect(gameboard.shipLocations).toEqual([
      { shipId: 5, coordinates: ['A1', 'A2'] }
    ]);
  });
  test('Receives a hit on correct ship', function () {
    const carrier = createShip(1);
    const battleship = createShip(2);
    const destroyer = createShip(3);
    const submarine = createShip(4);
    const patrolBoat = createShip(5);
    const ships = [carrier, battleship, destroyer, submarine, patrolBoat];
    const gameboard = createGameboard();
    gameboard.placeShip(carrier, 'E1', 'E2');
    gameboard.placeShip(battleship, 'D1', 'D2');
    gameboard.placeShip(destroyer, 'B1', 'B2');
    gameboard.placeShip(submarine, 'C1', 'C2');
    gameboard.placeShip(patrolBoat, 'A1', 'A2');
    gameboard.receiveAttack('A1', ships);
    expect(patrolBoat.confirmedHits).toEqual(['A1']);
  });
  test('Logs missed attacks', function () {
    const carrier = createShip(1);
    const battleship = createShip(2);
    const destroyer = createShip(3);
    const submarine = createShip(4);
    const patrolBoat = createShip(5);
    const ships = [carrier, battleship, destroyer, submarine, patrolBoat];
    const gameboard = createGameboard();
    gameboard.placeShip(carrier, 'E1', 'E2');
    gameboard.placeShip(battleship, 'D1', 'D2');
    gameboard.placeShip(destroyer, 'B1', 'B2');
    gameboard.placeShip(submarine, 'C1', 'C2');
    gameboard.placeShip(patrolBoat, 'A1', 'A2');
    gameboard.receiveAttack('A3', ships);
    expect(gameboard.attackedCells).toEqual(['A3']);
  });
  test('Logs sunk ships', function () {
    const carrier = createShip(1);
    const battleship = createShip(2);
    const destroyer = createShip(3);
    const submarine = createShip(4);
    const patrolBoat = createShip(5);
    const ships = [carrier, battleship, destroyer, submarine, patrolBoat];
    const gameboard = createGameboard();

    gameboard.placeShip(patrolBoat, 'A1', 'A2');
    gameboard.receiveAttack('A1', ships);
    gameboard.receiveAttack('A2', ships);

    expect(gameboard.sunkShips).toEqual(['Patrol Boat']);
  });
  test('Defeat is true when all ships are sunk', function () {
    const gameboard = createGameboard();
    gameboard.sunkShips.push('1', '2', '3', '4', '5');

    expect(gameboard.defeat()).toBe(true);
  });
});
