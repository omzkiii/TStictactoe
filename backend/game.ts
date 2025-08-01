import { client } from "./server";

const LINE_LENGTH = 3;

type PlayerMoves = [number, number][];

type LineCounts = {
  vert: number;
  hor: number;
  diag_neg: number;
  diag_pos: number;
};

export type GameData = {
  player0Moves: string;
  player0Lines: LineCounts;
  player1Moves: string;
  player1Lines: LineCounts;
};

const EMPTY_LINES = {
  vert: 0,
  hor: 0,
  diag_neg: 0,
  diag_pos: 0,
};

function is_in(coor: number[], moves: PlayerMoves): boolean {
  return moves.some((el) => {
    return el.every((val, idx) => {
      // console.log("val: " + val);
      // console.log("p: " + p[idx]);
      return val === coor[idx];
    });
  });
}

async function getOrInit<T>(
  id: string,
  player: number,
  key: string,
  ret: Object | number[],
): Promise<T> {
  const data: T = await client.hGet(id, `player${player}${key}`).then((d) => {
    if (d !== null) {
      return JSON.parse(d);
    }
    return ret;
  });
  return data;
}

export async function logMove(
  id: string,
  player: number,
  coor: [number, number],
): Promise<boolean | void> {
  const moves: PlayerMoves = await getOrInit(id, player, "Moves", []);
  const lines: LineCounts = await getOrInit(id, player, "Lines", EMPTY_LINES);

  if (is_in(coor, moves)) {
    console.log("Invalid Move");
    return;
  }

  const newmove: PlayerMoves = moves.concat([coor]);
  const newlines: LineCounts | string = check(newmove, lines);

  if (newlines === "WINNER") {
    return true;
  }

  await client.hSet(id, `player${player}Moves`, JSON.stringify(newmove));
  await client.hSet(id, `player${player}Lines`, JSON.stringify(newlines));
  return false;
}

export function check(p: PlayerMoves, LINES: LineCounts): LineCounts | string {
  if (p.length < 2) {
    console.log(JSON.stringify(LINES));
    return LINES;
  }

  console.log(p);
  for (let i = 0; i <= p.length - 2; i++) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[p.length - 1];
    const slope = (y2 - y1) / (x2 - x1);
    console.log(`Slope of ${p[i]} and ${p[p.length - 1]}: ${slope}`);
    // console.log(`Negative infinity checker: ${slope === -Infinity}`);

    switch (slope) {
      case Infinity:
      case -Infinity:
        console.log("Horizontal");
        LINES.hor++;
        break;
      case 0:
        LINES.vert++;
        console.log("Vertical");
        break;
      case 1:
        LINES.diag_pos++;
        console.log("Diagonal");
        break;
      case -1:
        LINES.diag_neg++;
        console.log("Diagonal");
        break;
      default:
        break;
    }
  }
  console.log(JSON.stringify(LINES));
  if (Object.values(LINES).some((val) => val >= LINE_LENGTH)) {
    return "WINNER";
  }
  return LINES;
}
