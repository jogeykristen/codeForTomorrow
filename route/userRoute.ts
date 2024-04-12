import express from "express";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/userAuhentication";
import {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  getAllUsers,
} from "../controller/userController";

const router = express.Router();

router.get("/show/:id", authenticateToken, getUserById);
router.post("/create", authenticateToken, createUser);
router.put("/updateuser/:id", authenticateToken, updateUser);
router.delete("/deleteuser/:id", authenticateToken, authorizeAdmin, deleteUser);
router.post("/verify", verifyUser);
router.get("/showall", authenticateToken, getAllUsers);

export default router;
