import bodyParser from "body-parser";
import express, { Application } from "express";
import Database from "./configs/db";
import UserRouter from "./routes/user.router";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.connectDatabase();
    this.setupRoutes();
    this.setupMiddleware();
  }

  private setupMiddleware(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  private connectDatabase(): void {
    Database.connect();
  }

  private setupRoutes(): void {
    const userRouter = new UserRouter();
    this.app.use("/api/v1/users", userRouter.router);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`✅ server listening on port ${port}`);
    });
  }
}

const port = 8080;
const app = new App();

app.start(port);
