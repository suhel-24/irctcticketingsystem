
import express from "express";
import { addtrain } from "../controller/admincontroller.js";
import { verifyAdminApiKey } from "../middleware/auth.js";
const adminrouter = express.Router();

adminrouter.post("/addtrain",verifyAdminApiKey,addtrain)

export default adminrouter;