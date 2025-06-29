type PlayerMoves = [number, number][];

interface LineCounts {
  vert: number;
  hor: number;
  diag: number;
}

interface Game {
  board: number[][];
  p1: PlayerMoves;
  p2: PlayerMoves;
  LINES1: LineCounts;
  LINES2: LineCounts;
}

function match(p: number[], m: number[][]): boolean {
  return m.some((el) => {
    return el.every((val, idx) => {
      console.log("val: " + val);
      console.log("p: " + p[idx]);
      return val === p[idx];
    });
  });
}

function newGame() {
  return {
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    p1: [],
    p2: [],
    LINES1: { vert: 0, hor: 0, diag: 0 },
    LINES2: { vert: 0, hor: 0, diag: 0 },
  };
}

let game = newGame();

function check(p: PlayerMoves, LINES: LineCounts) {
  if (p.length < 2) {
    return;
  }
  for (let i = 0; i <= p.length - 1; i++) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[p.length - 1];
    const slope = Math.abs((y2 - y1) / (x2 - x1));
    console.log(`Slope of ${p[i]} and ${p[p.length - 1]}: ${slope}`);
    switch (slope) {
      case Infinity | NaN:
        LINES.vert++;
        break;
      case 0:
        LINES.hor++;
        break;
      case 1:
        LINES.diag++;
        break;
      default:
        break;
    }
  }
  console.log("STATS: " + JSON.stringify(LINES));
}

function checkWinner(LINES: LineCounts) {
  if (Object.values(LINES).includes(3)) {
    game = newGame();
    console.log("PLAYER 2 WINS");
  }
}
