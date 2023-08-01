import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use("/users", userRouter);

app.use(errorHandler);

export default app;
