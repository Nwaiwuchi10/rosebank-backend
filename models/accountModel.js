import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // how we associate each account with a user
    ref: "User",
  },
  accessToken: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  institutionId: {
    type: String,
    required: true,
  },
  institutionName: {
    type: String,
  },
  accountName: {
    type: String,
  },
  accountType: {
    type: String,
  },
  accountSubtype: {
    type: String,
  },
});
const Account = mongoose.model("Account", accountSchema);

export default Account;
