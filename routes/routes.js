import express from "express";
import { getDonate, newDonate } from "../controllers/donateController.js";

const router = express.Router();

router.get("/",getDonate);
router.post("/",newDonate);

export default router; 