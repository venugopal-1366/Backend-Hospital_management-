import { Request, Response } from "express";
import * as service from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    res.status(201).json(await service.registerUser(req.body));
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await service.loginUser(
      req.body.email,
      req.body.password
    );
    res.json({ token });
  } catch (e: any) {
    res.status(401).json({ message: e.message });
  }
};
