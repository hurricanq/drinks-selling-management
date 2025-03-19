import express from "express";
import { createCategory, getAllCategories, getCategory, deleteCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/category/:id", getCategory);
router.delete("/:id", deleteCategory);

export default router;