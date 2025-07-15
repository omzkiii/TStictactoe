import { Router } from "express";
import { Request, Response } from "express";
import { logMove } from "../game";
export const router = Router();

router.get("/:id/", (req: Request, res: Response) => {
  // res.send(req.params.id);
  res.send("SESSION ID: " + req.sessionID);
});

router.post("/move", async (req: Request, res: Response) => {
  req.session.visits = req.session.visits! + 1;
  const player = req.session.player!;
  const coor = req.body.coor;
  const id = req.sessionID;

  console.log(`Player: ${player}`);
  if (player > 1 || player < 0) res.send("Invalid Player Number");
  else {
    const WIN = await logMove(id, player, coor);
    if (WIN) {
      res.send(player + 1);
      req.session.destroy(() => console.log("GAME RESET"));
    } else {
      req.session.player = Math.abs(req.session.player! - 1);
      if (req.session.visits >= 9) {
        req.session.destroy(() => console.log("GAME RESET"));
        res.send(-1);
      } else res.send(0);
    }
  }
});
exports = router;

export default router;
