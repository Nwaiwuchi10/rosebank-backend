import express from "express";

const router = express.Router();

import {
  createIncomeCtrl,
  getIncomeById,
  getIncomes,
} from "../Controller/incomeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(createIncomeCtrl);
router.route("/").get(getIncomes);
router.route("/:id").get(getIncomeById);
export default router;
