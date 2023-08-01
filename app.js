import express from "express";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(errorHandler);

export default app;
