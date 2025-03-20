import express from "express";
import { createDrink, getAllDrinks, getDrink, getDrinksByCategory, deleteDrink, rateDrink, createReview, getAllReviews, deleteReview } from "../controllers/drink.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createDrink);
router.get("/", getAllDrinks);
router.get("/drink/:id", getDrink);
router.get("/category/:categoryId", getDrinksByCategory);
router.delete("/:id", deleteDrink);

// Routes for Rating
router.post("/:id/rate", protectRoute, rateDrink);

// Routes for Review
router.post("/drink/:id/review", protectRoute, createReview);
router.get("/drink/:id/reviews", protectRoute, getAllReviews);
router.delete("/:drinkId/reviews/:reviewId", protectRoute, deleteReview);

export default router;