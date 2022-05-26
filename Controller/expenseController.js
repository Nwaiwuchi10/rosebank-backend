import asyncHandler from "express-async-handler";
import Expense from "../models/ExpenseModel.js";

/// create income
const createexpenseCtrl = asyncHandler(async (req, res) => {
  const { title, amount, description, user } = req.body;

  try {
    const expense = await Expense.create({
      title,
      amount,
      description,
      user,
    });
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});
//////get expenses
const getexpenses = asyncHandler(async (req, res) => {
  const expense = await Expense.find({}).populate("user");
  res.json(expense);
});
//@desc Get income by ID
//@route GET/api/incomes/:id
//@acess Private/Admin

const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    res.json(income);
    // res.json({ jss1result: jss1result, hasError: false });
  } else {
    res.status(404).json({ message: "Expenses not found" });
  }
});
export { createexpenseCtrl, getexpenses, getExpenseById };
