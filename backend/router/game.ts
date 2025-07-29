import { Router } from "express";
import { Request, Response } from "express";
import { logMove } from "../game";
import { client } from "../server";
export const router = Router();

// router.get("/:id/", (req: Request, res: Response) => {
//   // res.send(req.params.id);
//   res.send("SESSION ID: " + req.sessionID);
// });

router.post("/move", async (req: Request, res: Response) => {
  req.session.visits = (req.session.visits ?? 0) + 1;
  const player = req.session.player ?? 0;
  const coor = req.body.coor;
  const id = req.sessionID;

  console.log(`Player: ${player}`);
  console.log(`Visits: ${req.session.visits}`);

  if (player > 1 || player < 0) {
    res.send("Invalid Player Number");
    return;
  }

  const WIN = await logMove(id, player, coor);
  if (WIN) {
    res.send(player + 1);
    req.session.destroy(() => console.log("GAME RESET"));
    return;
  }

  if (req.session.visits >= 9) {
    req.session.destroy(() => console.log("GAME RESET"));
    res.send(-1);
    return;
  }

  // change player
  req.session.player = Math.abs(player - 1);

  res.send(0);
});

router.get("/game", async (req: Request, res: Response) => {
  const result = await client.hGetAll(req.sessionID);
  res.send("RESULT: " + JSON.stringify(result));
  // res.send("TEST");
});

exports = router;

export default router;
