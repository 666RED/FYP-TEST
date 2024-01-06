import express from "express";
import {
	authEmail,
	removeCode,
	authVerificationCode,
	autoClearCode,
	resendCode,
	resetPassword,
} from "../controllers/recoverPassword.js";

const router = express.Router();

router.post("/auth-email", authEmail);
router.post("/remove-code", removeCode);
router.post("/auth-verification-code", authVerificationCode);
router.post("/auto-clear-code", autoClearCode);
router.post("/resend-code", resendCode);
router.post("/reset-password", resetPassword);

export default router;
