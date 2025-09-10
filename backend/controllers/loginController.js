import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Login successful", username });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
