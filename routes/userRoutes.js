import express from "express";

const router = express.Router();

import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../Controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(getUsers);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

router.route("/:id").get(getUserById);
router
  .route("/:id")
  .delete(deleteUser)

  .put(updateUser);

export default router;
