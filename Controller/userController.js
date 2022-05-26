import asyncHandler from "express-async-handler";
import generateToken from "../Utils/generateToken.js";
import User from "../models/userModel.js";
import getRandom from "../Utils/utils.js";

//@desc Auth user & get token
//@route Post/api/users/login
//@acess Fetch Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      account_balance: user.account_balance,
      account_number: user.account_number,
      //  hasError: false,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Register a new user
//@route Post/api/users
//@acess Fetch Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, userRef } = req.body;

  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    phone,
    account_number: getRandom(11),
    account_balance: getRandom(5),
    userRef,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      name: user.name,
      email: user.email,
      phone: user.phone,
      account_balance: user.account_balance,
      account_number: user.account_number,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),

      hasError: false,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Get all users
//@route GET/api/users
//@acess Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc Get user by ID
//@route GET/api/users/:id
//@acess Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user profile
//@route PUT/api/users/profile
//@acess Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,

      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      account_balance: updatedUser.account_balance,
      account_number: updatedUser.account_number,

      token: generateToken(updatedUser._id),

      hasError: false,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Delete user
//@route DELETE/api/users/:id
//@acess Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user
//@route PUT/api/users/:id
//@acess Private

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get user profile
//@route GET/api/users/login
//@acess Private

const getUserProfile = asyncHandler(async (req, res) => {
  // res.send("success");
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      account_balance: user.account_balance,
      account_number: user.account_number,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  authUser,
  registerUser,
  getUsers,
  getUserById,
  updateUserProfile,
  updateUser,
  deleteUser,
  getUserProfile,
};
