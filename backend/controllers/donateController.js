import Donate from "../models/Donate.js";

export const getDonate = async (req, res) => {
  try {
    const donates = await Donate.find();
    res.json(donates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const newDonate = async (req, res) => {
  try {
    console.log("Received body:", req.body); // Debug log to check incoming data
    const { name, date, message, foodItems } = req.body;

    // Validate and parse foodItems
    const parsedFoodItems = (foodItems || []).filter(
      (item) => item?.type && item?.quantity !== undefined
    ).map((item) => ({
      type: item.type,
      quantity: parseInt(item.quantity) || 0,
    }));

    if (!name || !date) {
      return res.status(400).json({ message: "Name and date are required" });
    }

    if (parsedFoodItems.length === 0) {
      return res.status(400).json({ message: "At least one food item is required" });
    }

    const donate = new Donate({ name, date, message, foodItems: parsedFoodItems });
    const savedDonate = await donate.save();
    res.status(201).json(savedDonate);
  } catch (error) {
    console.error("Error saving donate:", error.message);
    res.status(500).json({ message: error.message });
  }
};
