import express from "express";
import dotenv from "dotenv";
import authrouter from "./routes/authrouter.js";
import adminrouter from "./routes/adminrouter.js";
import userrouter from "./routes/userrouter.js";
dotenv.config();
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authrouter);
app.use("/api", adminrouter);
app.use("/api",userrouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})