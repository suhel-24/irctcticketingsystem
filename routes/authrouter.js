import express from "express";
import { addnewuser,finduser } from "../controller/authcontroller.js";
const authrouter = express.Router();

// router.post("/register", adduser);
// router.post("/login", finduser);


authrouter.post("/register",addnewuser)
authrouter.post("/login",finduser)

export default authrouter;