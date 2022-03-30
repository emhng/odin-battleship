import './style.css';

import { createPlayer } from './playerFactory';
import { createShip } from './shipFactory';
import { createGameboard } from './gameboardFactory';
import { renderShip } from './renderShip';
import { renderAttack } from './renderShip';

// Player settings
const player = createPlayer('human');

const playerShips = [
  createShip(1),
  createShip(2),
  createShip(3),
  createShip(4),
  createShip(5)
];

const [carrier, battleship, destroyer, submarine, patrolBoat] = playerShips;

const playerBoard = createGameboard();
playerBoard.placeShip(carrier, 'A1', 'B1', 'C1', 'D1', 'E1');
playerBoard.placeShip(battleship, 'C3', 'C4', 'C5', 'C6');
playerBoard.placeShip(destroyer, 'G2', 'G3', 'G4');
playerBoard.placeShip(submarine, 'E6', 'F6', 'G6');
playerBoard.placeShip(patrolBoat, 'A7', 'B7');

playerShips.forEach(ship => {
  renderShip(ship);
});

// CPU settings
const cpu = createPlayer('CPU');

const cpuShips = [
  createShip(1),
  createShip(2),
  createShip(3),
  createShip(4),
  createShip(5)
];

const [
  cpuCarrier,
  cpuBattleship,
  cpuDestroyer,
  cpuSubmarine,
  cpuPatrolBoat
] = cpuShips;

const cpuBoard = createGameboard();
cpuBoard.placeShip(cpuCarrier, 'A1', 'B1', 'C1', 'D1', 'E1');
cpuBoard.placeShip(cpuBattleship, 'C3', 'C4', 'C5', 'C6');
cpuBoard.placeShip(cpuDestroyer, 'G2', 'G3', 'G4');
cpuBoard.placeShip(cpuSubmarine, 'E6', 'F6', 'G6');
cpuBoard.placeShip(cpuPatrolBoat, 'A7', 'B7');

// Allowing player to attack CPU board
const radarGridEl = document.querySelector('div#radar div.grid');
radarGridEl.addEventListener('click', target => {
  const attackCoordinates = target.target.dataset.coord;
  cpuBoard.receiveAttack(attackCoordinates, cpuShips);
  renderAttack(attackCoordinates, cpuBoard, player);
});
