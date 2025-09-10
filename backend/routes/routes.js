import express from "express";
import { getDonate, newDonate } from "../controllers/donateController.js";
import { loginUser } from "../controllers/loginController.js";  // নতুন Import

const router = express.Router();

router.get("/", getDonate);
router.post("/", newDonate);

router.post("/login", loginUser);  // নতুন Login রুট

export default router;
