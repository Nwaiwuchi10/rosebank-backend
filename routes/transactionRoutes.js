import express from "express";

const router = express.Router();

import { createTransCtrl } from "../Controller/transactionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(createTransCtrl);

export default router;
