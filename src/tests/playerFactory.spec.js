const createPlayer = require('./playerFactory.js');

describe('createPlayer', () => {
  test('Creates the correct player type', function () {
    const playerTwo = createPlayer('CPU');
    expect(playerTwo.type).toBe('CPU');
  });

  test('Creates the correct turn type', function () {
    const playerOne = createPlayer('human');
    expect(playerOne.turn).toBe(true);
  });

  test('Turn can be manipulated', function () {
    const playerOne = createPlayer('human');
    playerOne.turn = false;
    expect(playerOne.turn).toBe(false);
  });
});
