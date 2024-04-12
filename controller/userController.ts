import { Request, Response } from "express";
import UserService from "../services/userService";
import jwt from "jsonwebtoken";

const userService = new UserService();

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  try {
    const newUser = await userService.createUser(username, password, role);
    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const newData = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, newData);
    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    await userService.deleteUser(userId);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { verificationToken } = req.body;
  try {
    await userService.verifyUser(verificationToken);
    return res.status(200).json({ message: "User verified successfully" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
