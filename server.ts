import express, { Request, Response } from "express";
// import cors from "cors";

const app = express();
const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let player = -1;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(board);
});

const checkMatch = (p: number[], m: number[][]) => {
  return m.some((el) => {
    return el.every((val, idx) => {
      console.log("val: " + val);
      console.log("p: " + p[idx]);
      return val === p[idx];
    });
  });
};

let p1: number[][] = [];
let p2: number[][] = [];
app.post("/click", (req: Request, res: Response): void => {
  const coor = req.body.coor;
  if (coor.some((val: number) => val < 0 || val > 3)) {
    console.log("INVALID MOVE");
    res.send(board + "\n INVALID MOVE\n");
    return;
  }
  if (checkMatch(coor, p1) || checkMatch(coor, p2)) {
    console.log("INVALID MOVE");
    res.send(board + "\n INVALID MOVE\n");
    return;
  }

  player = player * -1;
  if (player === 1) {
    p1.push(coor);
  } else if (player === -1) {
    p2.push(coor);
  }
  board[coor[0]][coor[1]] = player;
  console.log("VALID MOVE");
  console.table(board);
  res.send(board + "\n");
});

app.listen(3000, () => {
  console.log("Listening...");
});
