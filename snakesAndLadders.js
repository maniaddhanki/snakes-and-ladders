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

const handleDiceMsg = (needToOn) => {
  const diceMsg = document.getElementById('dice-msg');
  let visibility = 'hidden';
  if (needToOn) {
    visibility = 'visible';
  }
  diceMsg.style.visibility = visibility;
};

const gameRound = (game) => {
  if (game.isPaused) {
    handleDiceMsg(false);
    return;
  };

  const { path, img, isWon } = game.play();
  game.pause();

  editHtmlParamById('dice', 'src', img);

  const moveToken = pathCycler();

  const intervelId = setInterval(() => {
    if (!moveToken(path)) {
      clearInterval(intervelId);
      game.resume();
      handleDiceMsg(true);
    }
  }, 500);

  handleWinnerMsg(isWon);
};

const initGame = () => {
  const board = new Board(snakes(), ladders(), 30);
  const game = new Game(board);
  const dice = document.getElementById('dice');
  dice.onclick = () => gameRound(game);
};

window.onload = initGame;