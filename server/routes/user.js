import express from "express";
import { login, register } from "../controllers/auth.controllers.js";
import checkEmailService from "../services/checkEmail.service.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/check', checkEmailService);

export default router;