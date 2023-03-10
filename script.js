const cells = document.querySelectorAll('.grid > div');
const gameOverModal = document.getElementById('game-over-modal');
const gameOverMessage = document.getElementById('game-over-message');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let robotPlayer = 'O';

/* Cette fonction checkWin(player) vérifie s'il y a un gagnant sur le plateau de jeu pour le joueur donné. 
Il utilise les tableaux rows, columns et diagonals pour stocker les indices de chaque ligne, colonne et diagonale sur le plateau de jeu. 
Ensuite, il boucle sur toutes ces lignes, colonnes et diagonales pour vérifier si tous les indices contiennent le MEME symbole du joueur actuel, 
qui est transmis en tant qu'ARGUMENT à la fonction.*/

const checkWin = (player) => {
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  const columns = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  const diagonals = [
    [0, 4, 8],
    [2, 4, 6],
  ];
  const lines = [...rows, ...columns, ...diagonals];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[b] === board[c] && board[a] === player) {
      return true;
    }
  }
  return false;
};

/*Cette fonction vérifie si le plateau de jeu est rempli sans qu'il y ait de gagnant. 
Il utilise la méthode Array.includes() pour vérifier si le tableau board contient encore des cases vides.*/

const checkDraw = () => {
  return !board.includes('');
};

/*Cette fonction réinitialise toutes les variables à leur état initial et réinitialise tous les éléments HTML de la grille de jeu en leur donnant un texte vide.*/

const restartGame = () => {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
  });
  gameOverModal.classList.add('hidden');
};

/*Cette fonction renvoie un tableau d'index des cellules vides sur le plateau de jeu.*/

const getEmptyCells = () => {
  return board.reduce((emptyCells, cell, index) => {
    if (cell === '') {
      emptyCells.push(index);
    }
    return emptyCells;
  }, []);
};

/*Cette fonction renvoie un index de cellule vide choisi au hasard.*/

const getRandomEmptyCell = () => {
  const emptyCells = getEmptyCells();
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

/* Cette fonction choisit une cellule vide aléatoire pour que le robot joue et met à jour le tableau et la grille de jeu en conséquence.*/

const playRobot = () => {
  const cellIndex = getRandomEmptyCell();
  cells[cellIndex].textContent = robotPlayer;
  board[cellIndex] = robotPlayer;
  if (checkWin(robotPlayer)) {
    gameOverMessage.textContent = `${robotPlayer} a gagné !`;
    gameOverModal.classList.remove('hidden');
  } else if (checkDraw()) {
    gameOverMessage.textContent = "Match nul !";
    gameOverModal.classList.remove('hidden');
  } else {
    currentPlayer = 'X';
  }
};

/* Cette fonction gère l'événement click pour chaque cellule du jeu. Elle vérifie si la cellule est vide, 
si le joueur a gagné ou s'il y a un match nul, et met à jour le tableau et la grille de jeu en conséquence.*/

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.textContent === '' && !checkWin(currentPlayer) && !checkDraw()) {
      cell.textContent = currentPlayer;
      board[index] = currentPlayer;
      if (checkWin(currentPlayer)) {
        gameOverMessage.textContent = `${currentPlayer} a gagné !`;
        gameOverModal.classList.remove('hidden');
      } else if (checkDraw()) {
        gameOverMessage.textContent = "Match nul !";
        gameOverModal.classList.remove('hidden');
      } else {
        currentPlayer = 'O';
        playRobot();
      }
    }
  });
});

/* Cette fonction gère l'événement click pour le bouton de redémarrage du jeu.*/

restartButton.addEventListener('click', () => {
  restartGame();
});
