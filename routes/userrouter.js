import express from "express";
import { authenticateuser } from "../middleware/auth.js";
import { bookTicket, getbooking, gettrains } from "../controller/usercontroller.js";

const userrouter = express.Router();

userrouter.get("/getalltrains", authenticateuser, gettrains);
userrouter.get("/booking/:id", authenticateuser, getbooking);
userrouter.post("/bookticket", authenticateuser, bookTicket);

export default userrouter;
