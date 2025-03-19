import express from "express";
import { register, userLogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", userLogin);

export default router;