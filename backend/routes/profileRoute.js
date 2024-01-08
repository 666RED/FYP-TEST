import express from "express";
import { getUserProfile, editProfile } from "../controllers/profile.js";

const router = express.Router();

router.get("/", getUserProfile);
router.post("/edit-profile", editProfile);

export default router;
