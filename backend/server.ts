import express, { NextFunction, Request, Response } from "express";
import { createClient } from "redis";
import { randomUUID } from "crypto";
import session from "express-session";
import game from "./router/game";
import cors from "cors";

export const client = createClient({ url: "redis://valkey:6379" });
client.on("error", (err) => console.log(err));
client.connect();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      maxAge: 15000,
      secure: false,
    },
  }),
);

app.get("/", async (req: Request, res: Response) => {
  const id = req.sessionID;
  req.session.visits = 0;
  req.session.player = 0;
  res.send("HELLO");
});

app.get("/get", async (req: Request, res: Response) => {
  // const cID = await client.get("id");
  req.session.visits = 0;
  const id = req.sessionID;
  res.send(`ID - ${id}`);
});

app.post("/test", (req: Request, res: Response) => {
  const data = req.body.coor;
  res.send(data);
});

app.use(game);
app.listen(3000, () => {
  console.log("Listening...");
});
