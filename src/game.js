class Game {
  #board;
  #dice;
  #currentPosition;
  #positionLog;
  #isWon;
  constructor(board) {
    this.#board = board;
    this.#dice = new Dice();
    this.#currentPosition = 0;
    this.#positionLog = [];
    this.#isWon = false;
  }

  #updateLog({ face }, path) {
    this.#positionLog.push({ diceFace: face, move: path });
  }

  #updatePosition(position) {
    this.#currentPosition = position;
  }

  #setGameStatus() {
    if (this.#currentPosition === 30) {
      this.#isWon = true;
    }
  }

  rollDice() {
    const roll = this.#dice.roll();
    const path = this.#board.nextMove(this.#currentPosition, roll.face);
    if (path.length > 0) {
      this.#updatePosition(path[path.length - 1]);
    }

    this.#setGameStatus();
    this.#updateLog(roll, path);
    return { img: roll.img, path, isWon: this.#isWon };
  }
}
