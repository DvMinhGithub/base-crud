import { Request, Response } from "express";
import UserModel, { IUser } from "../models/user.model";

class UserController {
  // Get all users
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users: IUser[] = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  // Get a single user by ID
  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser | null = await UserModel.findById(req.params.id);
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  // Create a new user
  public async create(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const user: IUser = new UserModel(req.body);
      const result: IUser = await user.save();
      res.status(201).json({ body: req.body, result });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).send("Internal server error");
    }
  }

  // Update an existing user by ID
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser | null = await UserModel.findById(req.params.id);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      const updatedUser: IUser = Object.assign(user, req.body);
      const result: IUser = await updatedUser.save();
      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  // Delete a user by ID
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const result: IUser | null = await UserModel.findByIdAndDelete(
        req.params.id
      );
      if (!result) {
        res.status(404).send("User not found");
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}

export default new UserController();
