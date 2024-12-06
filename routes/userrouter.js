import express from "express";
import { authenticateuser } from "../middleware/auth.js";
import { addtrain } from "../controller/admincontroller.js";
import { bookTicket, getbooking } from "../controller/usercontroller.js";

const userrouter = express.Router();

userrouter.get("/getalltrains", authenticateuser, addtrain);
userrouter.get("/booking", authenticateuser, getbooking);
userrouter.get("/bookticket", authenticateuser, bookTicket);

export default userrouter;
