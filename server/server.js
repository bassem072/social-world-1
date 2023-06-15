import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "express-jwt";
import userRoutes from "./routes/user.js";
import authJWT from "./middlewares/authJWT.js";
import role from "./middlewares/role.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', userRoutes);
app.use(jwt.expressjwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] }));
app.get('/', (req, res) => {
  return res.json({message : "Hi"});
});

mongoose.set("strictQuery", false);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log("listening on port " + PORT)))
  .catch((error) => handleError(error));

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});
