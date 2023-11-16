import { Router } from "express";
import { addMessage, getMessages } from "../controllers/messages.js";

const router = Router();

router.get("/", getMessages);
router.post("/", addMessage);

export default router