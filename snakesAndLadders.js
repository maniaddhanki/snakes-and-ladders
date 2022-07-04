const snakes = () => {
  return {
    27: 1,
    21: 9,
    17: 4,
    19: 7
  }
};

const ladders = () => {
  return {
    11: 26,
    3: 22,
    5: 8,
    20: 29
  }
};

const gameRound = (game) => {
  const { prevPosition, img, position, iswon } = game.rollDice();
  document.getElementById('dice').src = img;
  document.getElementById(prevPosition).innerText = '';
  document.getElementById(position).innerText = '⚫️';

  if (iswon) {
    document.getElementById('winning-msg').style.visibility = 'visible';
  }
  console.log(game);
};

const initGame = () => {
  const board = new Board(snakes(), ladders());
  const game = new Game(board);
  const dice = document.getElementById('dice');
  dice.onclick = () => gameRound(game);
};

window.onload = initGame;