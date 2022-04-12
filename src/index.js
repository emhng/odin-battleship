import './style.css';

import { createPlayer } from './playerFactory';
import { createGameboard } from './gameboardFactory';
import { renderShip } from './renderDOM';
import { renderAttack } from './renderDOM';
import { displayPrompt } from './renderDOM';
import { displayShipHover } from './renderDOM';
import { clearHoverClass } from './renderDOM';
import { hideStartScreenItems } from './renderDOM';
import { displayNextShip } from './renderDOM';

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

  const isCarrier = playerBoard.shipLocations.length === 0;
  const isBattleship = playerBoard.shipLocations.length === 1;
  const isDestroyer = playerBoard.shipLocations.length === 2;
  const isSubmarine = playerBoard.shipLocations.length === 3;
  const isPatrol = playerBoard.shipLocations.length === 4;

  if (targetItem.classList.contains('cell')) {
    if (isCarrier) {
      displayShipHover(carrier, targetItem, shipOrientation);
    } else if (isBattleship) {
      displayShipHover(battleship, targetItem, shipOrientation);
    } else if (isDestroyer) {
      displayShipHover(destroyer, targetItem, shipOrientation);
    } else if (isSubmarine) {
      displayShipHover(submarine, targetItem, shipOrientation);
    } else if (isPatrol) {
      displayShipHover(patrolBoat, targetItem, shipOrientation);
    }
  }
});

playerGridDivEl.addEventListener('click', target => {
  const coordinates = [];

  const hoveredCellsHTMLCollection = document.getElementsByClassName('hover');
  const hoveredCellsArray = [...hoveredCellsHTMLCollection];

  hoveredCellsArray.forEach(cell => {
    coordinates.push(cell.dataset.coord);
  });

  const isCarrier = playerBoard.shipLocations.length === 0;
  const isBattleship = playerBoard.shipLocations.length === 1;
  const isDestroyer = playerBoard.shipLocations.length === 2;
  const isSubmarine = playerBoard.shipLocations.length === 3;
  const isPatrol = playerBoard.shipLocations.length === 4;

  if (isCarrier && coordinates.length === 5) {
    playerBoard.placeShip(carrier, ...coordinates);
    displayNextShip('div#player-carrier', 'div#player-battleship');
  } else if (isBattleship && coordinates.length === 4) {
    playerBoard.placeShip(battleship, ...coordinates);
    displayNextShip('div#player-battleship', 'div#player-destroyer');
  } else if (isDestroyer && coordinates.length === 3) {
    playerBoard.placeShip(destroyer, ...coordinates);
    displayNextShip('div#player-destroyer', 'div#player-sub');
  } else if (isSubmarine && coordinates.length === 3) {
    playerBoard.placeShip(submarine, ...coordinates);
    displayNextShip('div#player-sub', 'div#player-patrol');
  } else if (isPatrol && coordinates.length === 2) {
    playerBoard.placeShip(patrolBoat, ...coordinates);
    hideStartScreenItems();
  }

  clearHoverClass();

  playerShips.forEach(ship => {
    renderShip(ship);
  });
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
