import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";

/// create income
const createTransCtrl = asyncHandler(async (req, res) => {
  const {
    account_number,
    description,
    password,
    receipint_accountNumber,
    receipint_bank,
    amount,
    user,
  } = req.body;

  try {
    const transaction = await Transaction.create({
      receipint_accountNumber,
      account_number,
      description,
      receipint_bank,
      amount,
      user,
      password,
    });
    res.json(transaction);
  } catch (error) {
    res.json(error);
  }
});
export { createTransCtrl };
