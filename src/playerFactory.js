const createPlayer = playerType => {
  let id = '';
  let turn = '';
  let type = '';
  if (playerType === 'human') {
    id = 1;
    turn = true;
    type = 'player';
  }
  if (playerType === 'CPU') {
    id = 2;
    turn = false;
    type = 'CPU';
  }

  const round = 1;

  return { id, turn, type, round };
};

export { createPlayer };
