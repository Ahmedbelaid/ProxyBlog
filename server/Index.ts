import express from "express";
import { Request, Response, NextFunction } from "express";
const app = express();
import helmet from "helmet";
import bodyParser from "body-parser";
import connectorDb from "./Helper/Dbconnector";
import * as dotenv from "dotenv";
import WriterRoute from "./routes/writers";
import PostsRoute from "./routes/posts";
import AuthRoute from "./routes/auth";
import morgan from "morgan";
var cors = require('cors'); 

app.use(cors())
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan<Request, Response>("dev"));


const dbConnectionString: string = process.env.MONGO_URL ?? "";
const server_port = process.env.SERVER_PORT ?? "";


connectorDb(dbConnectionString);


app.use("/writers", WriterRoute);

app.use("/post", PostsRoute);

app.use("/auth", AuthRoute);





app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message =
      error.message ||
      "There was an error while processing your request, please try again";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
});

const port = server_port || 5000;
app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});



export default app;