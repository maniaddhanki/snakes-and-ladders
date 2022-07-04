class Game {
  #board;
  #dice;
  #currentPosition;
  #positionLog;
  #isWon;
  constructor(board) {
    this.#board = board;
    this.#dice = new Dice();
    this.#currentPosition = 1;
    this.#positionLog = [];
    this.#isWon = false;
  }

  #updateLog({ face }, prevPosition) {
    this.#positionLog.push({ diceFace: face, postion: this.#currentPosition, prevPosition });
  }

  #updatePosition(position) {
    this.#currentPosition = position;
  }

  #isValidPosition(position) {
    return position <= 30;
  }

  #setGameStatus() {
    if (this.#currentPosition === 30) {
      this.#isWon = true;
    }
  }

  rollDice() {
    const prevPosition = this.#currentPosition;
    const roll = this.#dice.roll();
    const position = this.#board.next(this.#currentPosition, roll.face);

    if (this.#isValidPosition(position)) {
      this.#updatePosition(position);
    }

    this.#setGameStatus();
    this.#updateLog(roll, prevPosition);
    return { prevPosition, img: roll.img, position: this.#currentPosition, iswon: this.#isWon };
  }
}
