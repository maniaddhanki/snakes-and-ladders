class Board {
  #snakes;
  #ladders;
  constructor(snakes, ladders) {
    this.#snakes = snakes;
    this.#ladders = ladders;
  }

  next(position, diceFace) {
    const nextPosition = position + diceFace;
    const snakeTail = this.#snakes[nextPosition];
    const ladderHead = this.#ladders[nextPosition];
    return snakeTail || ladderHead || nextPosition;
  }
}
