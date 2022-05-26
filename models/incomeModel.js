import mongoose from "mongoose";

const incomeSchema = mongoose.Schema(
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
      default: "income",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },

    transaction_date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
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

const Income = mongoose.model("Income", incomeSchema);

export default Income;
