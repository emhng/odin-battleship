import './style.css';

import { createPlayer } from './playerFactory';
import { createGameboard } from './gameboardFactory';
import { renderShip } from './renderDOM';
import { renderAttack } from './renderDOM';
import { displayPrompt } from './renderDOM';
import { displayShipHover } from './renderDOM';

// Player settings
const player = createPlayer();
const playerShips = player.ships;
const [carrier, battleship, destroyer, submarine, patrolBoat] = playerShips;

const playerBoard = createGameboard();

const playerGridDivEl = document.querySelector('div.wide#main div.grid');

let shipOrientation = 'horizontal';
const buttonEl = document.querySelector('div#place-ship button');
buttonEl.addEventListener('click', () => {
  shipOrientation === 'horizontal'
    ? (shipOrientation = 'vertical')
    : (shipOrientation = 'horizontal');
});

playerGridDivEl.addEventListener('mouseover', target => {
  const targetItem = target.target;
  if (targetItem.classList.contains('cell')) {
    displayShipHover(carrier, targetItem, shipOrientation);
  }
});

playerGridDivEl.addEventListener('click', target => {
  const targetItem = target.target;
  console.log(targetItem.parentNode);
});

playerShips.forEach(ship => {
  renderShip(ship);
});

// CPU settings
const cpu = createPlayer('CPU');
const cpuShips = cpu.ships;

const cpuBoard = createGameboard();

cpuShips.forEach(ship => {
  const randomShipCoords = cpu.getShipCoordinates(ship, cpuBoard);
  cpuBoard.placeShip(ship, ...randomShipCoords);
  renderShip(ship, 'CPU');
});

console.log(cpuBoard.shipLocations);

//Game progresses when user clicks on enemy grid
const radarGridEl = document.querySelector('div#radar div.grid');
radarGridEl.addEventListener('click', target => {
  // Allowing player to attack CPU board
  if (player.turn === true) {
    const attackCoordinates = target.target.dataset.coord;
    cpuBoard.receiveAttack(attackCoordinates, cpuShips);
    renderAttack(attackCoordinates, cpuBoard, player);
    player.turn = false;

    // CPU logic to attack player board
    if (player.turn === false) {
      setTimeout(() => {
        displayPrompt();
      }, 1000);

      setTimeout(() => {
        let cpuAttackCoordinates;
        // Pick a random coordinate
        cpuAttackCoordinates = cpu.getAttackCoordinates(playerBoard);

        playerBoard.receiveAttack(cpuAttackCoordinates, playerShips);
        renderAttack(cpuAttackCoordinates, playerBoard, cpu);
        player.turn = true;

        setTimeout(() => {
          displayPrompt();
        }, 2000);
      }, 3000);
    }
  }
});
