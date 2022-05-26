import asyncHandler from "express-async-handler";

import Income from "../models/incomeModel.js";

/// create income
const createIncomeCtrl = asyncHandler(async (req, res) => {
  const { title, amount, description, user } = req.body;

  try {
    const income = await Income.create({
      title,
      amount,
      description,
      user,
    });
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});
//@desc Get all income
//@route GET/api/income
//@acess Private/Admin

const getIncomes = asyncHandler(async (req, res) => {
  const income = await Income.find({}).populate("user");
  res.json(income);
});

// //@desc Fetch all vendors
// //@route Get/api/vendors
// //@acess Fetch Public
// //@desc Fetch all vendors
// //@route Get/api/vendors
// //@acess Fetch Public

// const getJss1result = asyncHandler(async (req, res) => {
//     const pageSize = 20;
//     const page = Number(req.query.pageNumber) || 1;

//     const keyword = req.query.keyword
//       ? {
//           name: {
//             $regex: req.query.keyword,
//             $options: "i",
//           },
//         }
//       : {};

//     const count = await Jss1result.countDocuments({ ...keyword });

//     const jss1results = await Jss1result.find({ ...keyword })
//       .limit(pageSize)
//       .skip(pageSize * (page - 1));
//     res.json({ jss1results, page, pages: Math.ceil(count / pageSize) });
//   });

//@desc Get income by ID
//@route GET/api/incomes/:id
//@acess Private/Admin

const getIncomeById = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);

  if (income) {
    res.json(income);
    // res.json({ jss1result: jss1result, hasError: false });
  } else {
    res.status(404).json({ message: "Income not found" });
  }
});
export { createIncomeCtrl, getIncomeById, getIncomes };
