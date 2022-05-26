import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    receipint_accountNumber: {
      type: String,
      required: true,
    },
    receipint_bank: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    derscription: {
      type: String,
      default: "",
    },
    account_number: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    transaction_date: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

transactionSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
transactionSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(4);
  this.password = await bcrypt.hash(this.password, salt);
});
const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
