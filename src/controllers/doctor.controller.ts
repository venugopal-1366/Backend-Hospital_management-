import { Request, Response } from "express";
import * as service from "../services/doctor.service";

export const create = async (req: Request, res: Response) => {
  try {
    const doctor = await service.createDoctor(req.body);
    res.status(201).json(doctor);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  res.json(await service.getAllDoctors());
};

export const getById = async (req: Request, res: Response) => {
  res.json(await service.getDoctorById(+req.params.id));
};

export const update = async (req: Request, res: Response) => {
  res.json(await service.updateDoctor(+req.params.id, req.body));
};

export const remove = async (req: Request, res: Response) => {
  await service.deleteDoctor(+req.params.id);
  res.json({ message: "Doctor deleted" });
};
