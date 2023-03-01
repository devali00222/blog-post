import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI || "";
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
