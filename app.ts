import express from "express";
import morgan from "morgan";
import cors from "cors";
import postsRouter from "./routes/postsRoute";
import usersRouter from "./routes/usersRoute";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

export default app;
