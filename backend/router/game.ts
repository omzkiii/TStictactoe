import { Router } from "express";
import { Request, Response } from "express";
import { logMove } from "../game";
import { client } from "../server";

export const router = Router();

router.get("/:id/", (req: Request, res: Response) => {
  // res.send(req.params.id);
  res.send("SESSION ID: " + req.sessionID);
});

router.post("/move", async (req: Request, res: Response) => {
  req.session.visits = req.session.visits! + 1;
  const player = req.body.player;
  const coor = req.body.coor;
  const id = req.sessionID;
  if (player > 1 || player < 0) res.send("Invalid Player Number");
  else {
    const WIN = await logMove(id, player, coor);
    // res.send(await client.hGet(id, `player${player}Lines`));
    if (WIN) {
      res.send({ winner: player });
    }
  }
  res.send(req.session.visits);
});
exports = router;

export default router;
