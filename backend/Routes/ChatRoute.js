import express from "express";
import {
  createChat,
  findChat,
  userChats,
  addMemberInChat,
} from "../controllers/ChatController.js";
const router = express.Router();

router.post("/", createChat);
router.put("/:chatId", addMemberInChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
