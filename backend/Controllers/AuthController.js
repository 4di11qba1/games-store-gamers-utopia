import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addMemberToChat } from "./ChatController.js";

// Register new user
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { username } = req.body;

  try {
    // Check if the user already exists
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ message: "User Already Exists." });
    }

    // Save the new user
    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );

    // Add the new user to the chat
    const chatId = "665f47aee73af55c0f014316";
    const result = await addMemberToChat(chatId, user._id.toString());
    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

// Changed
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("Wrong Password.");
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not Found.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
