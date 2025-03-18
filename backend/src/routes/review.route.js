import express from "express";
import { createReview, getAllReviews, getReview, deleteReview } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/review/:id", getReview);
router.delete("/:id", deleteReview);

export default router;