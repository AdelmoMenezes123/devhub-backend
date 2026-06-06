import "express-async-errors";

import cors from "cors";
import express from "express";

import { errorMiddleware } from "./shared/infra/http/middlewares/error";
import { routes } from "./shared/infra/http/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

export { app };
