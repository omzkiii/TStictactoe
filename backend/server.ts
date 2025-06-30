import express, { Request, Response } from "express";
import { createClient } from "redis";
import { randomUUID } from "crypto";
import session from "express-session";

const client = createClient({ url: "redis://valkey:6379" });
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
  req.session.visited = true;
  res.cookie;
  console.log(req.sessionID);
  console.log(req.session.visited);
  res.send(req.headers.cookie?.toString());
});
app.get("/get", async (req: Request, res: Response) => {
  console.log(req.sessionID);
  console.log(req.session.visited);
  res.send(req.headers.cookie?.toString());
});

app.post("/click", (req: Request, res: Response): void => {});

app.listen(3000, () => {
  console.log("Listening...");
});
