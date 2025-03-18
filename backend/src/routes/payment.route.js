import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { momoPayment, callback, transactionStatus, sendEmail } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/momo", protectRoute, momoPayment);
router.post("/callback", protectRoute, callback);
router.post("/transaction-status", protectRoute, transactionStatus);
router.post("/email", protectRoute, sendEmail);

export default router;