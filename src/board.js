const numbersInRange = (start, end) => {
  const numbers = [];
  for (let number = start; number <= end; number++) {
    numbers.push(number);
  }
  return numbers;
};

class Board {
  #snakes;
  #ladders;
  constructor(snakes, ladders) {
    this.#snakes = snakes;
    this.#ladders = ladders;
  }

  #getPath(position, nextPosition) {
    const snakeTail = this.#snakes[nextPosition];
    const ladderHead = this.#ladders[nextPosition];
    const extraMove = snakeTail || ladderHead;
    const path = numbersInRange(position, nextPosition);

    if (extraMove) {
      path.push(extraMove);
    }
    return path;
  }

  nextMove(position, diceFace) {
    const nextPosition = position + diceFace;
    return this.#getPath(position, nextPosition);
  }
}
