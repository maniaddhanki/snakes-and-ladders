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

const editHtmlParamById = (id, param, value) => {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }
  element[param] = value;
};

const handleWinnerMsg = isWon => {
  if (isWon) {
    document.getElementById('winning-msg').style.visibility = 'visible';
  }
};

const pathCycler = (intervelId) => {
  let index = 0;
  return (path) => {
    const currentPosition = path[index];
    const next = path[++index];

    if (!next) { return false };

    editHtmlParamById(currentPosition, 'innerText', '');
    editHtmlParamById(next, 'innerText', '⚫️');
    return true;
  }
};

const handleDice = (game, action) => {
  const gameLaunch = () => gameRound(game);
  const dice = document.getElementById('dice');
  const diceMsg = document.getElementById('dice-msg');

  if (action === 'activate') {
    dice.onclick = gameLaunch;
    diceMsg.style.visibility = 'visible';
    return;
  }
  if (action === 'deactivate') {
    diceMsg.style.visibility = 'hidden';
    dice.onclick = null;
    return;
  }
};

const gameRound = (game) => {
  const { path, img, isWon } = game.rollDice();
  handleDice(game, 'deactivate');
  editHtmlParamById('dice', 'src', img);

  const moveToken = pathCycler();

  const intervelId = setInterval(() => {
    if (!moveToken(path)) {
      clearInterval(intervelId);
      handleDice(game, 'activate');
    }
  }, 500);

  handleWinnerMsg(isWon);
};

const initGame = () => {
  const board = new Board(snakes(), ladders());
  const game = new Game(board);
  handleDice(game, 'activate');
};

window.onload = initGame;