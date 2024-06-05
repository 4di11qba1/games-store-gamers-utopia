import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addMemberToChat = async (chatId, memberId) => {
  try {
    const chat = await ChatModel.findById(chatId);
    if (chat) {
      if (chat.members.includes(memberId)) {
        return { status: 400, message: "Already in the chat." };
      } else {
        await chat.updateOne({
          $push: {
            members: memberId,
          },
        });
        return { status: 200, message: "Member added." };
      }
    } else {
      return { status: 404, message: "Chat not found." };
    }
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

// Existing addMemberInChat API endpoint
export const addMemberInChat = async (req, res) => {
  const { chatId } = req.params;
  const { memberId } = req.body;

  const result = await addMemberToChat(chatId, memberId);
  res.status(result.status).json(result.message);
};

export const getChatUsers = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const chat = await ChatModel.findById(chatId);
    res.status(200).json(chat.members);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
