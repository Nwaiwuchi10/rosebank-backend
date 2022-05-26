import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    type: {
      type: String,
      default: "expense",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },

    transaction_date: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtual: true,
    },
    toObject: {
      virtual: true,
    },
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
