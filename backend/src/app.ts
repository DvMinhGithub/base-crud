import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { config, connectToDatabase } from "./configs";
import router from "./routes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(
  morgan("tiny", {
    skip: (req: Request, res: Response) => res.statusCode < 400,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", router);

connectToDatabase();

app.listen(config.port, () => {
  console.log(`✅ server listening on config.port ${config.port}`);
});
