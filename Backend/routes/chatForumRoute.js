import express from "express";
import { sendMsg } from "../controllers/chatController.js";
const router = express.Router();

router.post("/", sendMsg);

export default router;
