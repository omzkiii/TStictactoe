import { client } from "./server";

const LINE_LENGTH = 3;

type PlayerMoves = [number, number][];

interface LineCounts {
  vert: number;
  hor: number;
  diag: number;
}

const EMPTY_LINES = {
  vert: 0,
  hor: 0,
  diag: 0,
};

interface Game {
  board: number[][];
  p1: PlayerMoves;
  p2: PlayerMoves;
  LINES1: LineCounts;
  LINES2: LineCounts;
}

function is_in(coor: number[], moves: number[][]): boolean {
  return moves.some((el) => {
    return el.every((val, idx) => {
      // console.log("val: " + val);
      // console.log("p: " + p[idx]);
      return val === coor[idx];
    });
  });
}

function getOrInit(
  id: string,
  player: number,
  key: string,
  ret: Object | number[],
) {
  const data = client.hGet(id, `player${player}${key}`).then((d) => {
    if (d !== null) {
      return JSON.parse(d);
    } else return ret;
  });
  return data;
}

export async function logMove(id: string, player: number, coor: number[]) {
  const moves = await getOrInit(id, player, "Moves", []);
  const lines = await getOrInit(id, player, "Lines", EMPTY_LINES);

  if (is_in(coor, moves)) {
    console.log("Invalid Move");
  } else {
    const newmove = moves.concat([coor]);
    const newlines = check(newmove, lines);
    if (newlines === "WINNER") {
      return true;
    }

    await client.hSet(id, `player${player}Moves`, JSON.stringify(newmove));
    await client.hSet(id, `player${player}Lines`, JSON.stringify(newlines));
    return false;
  }
}

export function check(p: PlayerMoves, LINES: LineCounts) {
  if (p.length < 2) {
    console.log(JSON.stringify(LINES));
    return LINES;
  }

  console.log(p);
  for (let i = 0; i <= p.length - 2; i++) {
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
  console.log(JSON.stringify(LINES));
  if (Object.values(LINES).includes(LINE_LENGTH)) {
    return "WINNER";
  }
  return LINES;
}

export function checkWinner(LINES: LineCounts) {
  if (Object.values(LINES).includes(3)) {
    console.log("PLAYER 2 WINS");
  }
}
