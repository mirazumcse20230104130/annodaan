import Donate from "../models/Donate.js";

export const getDonate = async(req, res) =>
{
    try {
        const donates = await Donate.find();
        res.json(donates);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};


export const newDonate =async(req,res) =>
{
    try {
        const {name,quantity} = req.body;
        const donate = new Donate({name, quantity});
        await donate.save();
        res.status(201).json(donate);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}
