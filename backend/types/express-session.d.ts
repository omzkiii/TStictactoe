import "express-session";
import "express";

declare module "express-session" {
  interface SessionData {
    visits?: number;
    player?: number;
  }
}
