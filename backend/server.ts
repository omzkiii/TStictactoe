import express, { Request, Response } from "express";
import { createClient } from "redis";
import session from "express-session";

const client = createClient({ url: "redis://valkey:6379" });
client.on("error", (err) => console.log(err));
client.connect();
const app = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("OK");
});
app.get("/get", async (req: Request, res: Response) => {
  const value = await client.get("player");
  res.send(value);
});

app.post("/click", (req: Request, res: Response): void => {});

app.listen(3000, () => {
  console.log("Listening...");
});
