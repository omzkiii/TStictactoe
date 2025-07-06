import express, { Request, Response } from "express";
import { createClient } from "redis";
import { randomUUID } from "crypto";
import session from "express-session";
import game from "./router/game";

export const client = createClient({ url: "redis://valkey:6379" });
client.on("error", (err) => console.log(err));
client.connect();
const app = express();

app.use(express.json());

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
  res.send("HELLO");
});

app.get("/get", async (req: Request, res: Response) => {
  // const cID = await client.get("id");
  const id = req.sessionID;
  res.send(`ID - ${id}`);
});

app.post("/click", (req: Request, res: Response): void => {});

app.use(game);
app.listen(3000, () => {
  console.log("Listening...");
});
