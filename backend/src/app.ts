// import bodyParser from "body-parser";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import Database from "./configs/db";
import UserRouter from "./routes/user.router";

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRouters();
    this.connectDatabase();
  }

  protected initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(
      morgan("tiny", {
        skip: (req: Request, res: { statusCode: number }) =>
          res.statusCode < 100,
      })
    );
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  protected connectDatabase(): void {
    Database.connect();
  }

  protected initializeRouters(): void {
    this.app.use("/api/v1/users", UserRouter.router);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`✅ server listening on port ${this.port}`);
    });
  }
}

const app = new App(8080);

app.start();
