import express, { Request, Response } from "express";
import { createClient } from "redis";

const client = createClient({ url: "redis://valkey:6379" });
client.on("error", (err) => console.log(err));
client.connect();
const app = express();
function match(p: number[], m: number[][]): boolean {
  return m.some((el) => {
    return el.every((val, idx) => {
      console.log("val: " + val);
      console.log("p: " + p[idx]);
      return val === p[idx];
    });
  });
}

let game = {
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

let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let p1: number[][] = [];
let p2: number[][] = [];
let LINES1 = { vert: 0, hor: 0, diag: 0 };
let LINES2 = { vert: 0, hor: 0, diag: 0 };

function check(m: number[][], LINES) {
  if (m.length < 2) {
    return;
  }

  for (let i = 0; i <= m.length - 1; i++) {
    const [x1, y1] = m[i];
    const [x2, y2] = m[m.length - 1];
    const slope = Math.abs((y2 - y1) / (x2 - x1));
    console.log(`Slope of ${m[i]} and ${m[m.length - 1]}: ${slope}`);
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
  if (Object.values(LINES1).includes(3)) {
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    p1 = [];
    p2 = [];
    LINES1 = { vert: 0, hor: 0, diag: 0 };
    LINES2 = { vert: 0, hor: 0, diag: 0 };
    console.log("PLAYER 1 WINS");
  }
  if (Object.values(LINES2).includes(3)) {
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    p1 = [];
    p2 = [];
    LINES1 = { vert: 0, hor: 0, diag: 0 };
    LINES2 = { vert: 0, hor: 0, diag: 0 };
    console.log("PLAYER 2 WINS");
  }
  console.log("STATS: " + JSON.stringify(LINES));
}

let player = -1;
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  // client.hSet("game", game);
  res.send("OK");
});
app.get("/get", async (req: Request, res: Response) => {
  const value = await client.get("player");
  res.send(value);
});

app.post("/click", (req: Request, res: Response): void => {
  const coor = req.body.coor;
  if (coor.some((val: number) => val < 0 || val > 3)) {
    console.log("INVALID MOVE");
    res.send(board + "\n INVALID MOVE\n");
    return;
  }
  if (match(coor, p1) || match(coor, p2)) {
    console.log("INVALID MOVE");
    res.send(board + "\n INVALID MOVE\n");
    return;
  }

  player = player * -1;
  if (player === 1) {
    p1.push(coor);
    console.log("P1: " + p1);
    check(p1, LINES1);
  } else if (player === -1) {
    p2.push(coor);
    console.log("P2: " + p2);
    check(p2, LINES2);
  }
  board[coor[0]][coor[1]] = player;
  console.log("VALID MOVE");
  console.table(board);
  res.send(board + "\n");
});

app.listen(3000, () => {
  console.log("Listening...");
});
