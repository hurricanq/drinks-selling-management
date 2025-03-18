import express from "express";
import { createDrink, getAllDrinks, getDrink, getDrinksByCategory, deleteDrink, rateDrink } from "../controllers/drink.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createDrink);
router.get("/", getAllDrinks);
router.get("/drink/:id", getDrink);
router.get("/category/:category", getDrinksByCategory);
router.delete("/:id", deleteDrink);

router.post("/:id/rate", protectRoute, rateDrink);

export default router;