import express from "express";
import { getPosts, upLikes, downLikes } from "../controllers/post.js";

const router = express.Router();

router.post("/get-posts", getPosts);
router.post("/up-likes", upLikes);
router.post("/down-likes", downLikes);

export default router;
