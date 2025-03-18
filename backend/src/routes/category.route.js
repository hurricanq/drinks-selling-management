import express from "express";
import { createCategory, getAllCategories, deleteCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategory);

export default router;