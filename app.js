import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoute from './routes/user.js';
import taskRoute from './routes/task.js';

// initialise a new express app
const app = express();
dotenv.config()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

app.get("/", function (req, res) {
  res.send("hello");
});

app.use("/api/auth/user", userRoute);
app.use("/api/task", taskRoute);

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));