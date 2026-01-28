import { Request, Response } from "express";
import * as service from "../services/patient.service";

export const create = async (req: Request, res: Response) => {
  try {
    const patient = await service.createPatient(req.body);
    res.status(201).json(patient);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  res.json(await service.getAllPatients());
};

export const getById = async (req: Request, res: Response) => {
  res.json(await service.getPatientById(+req.params.id));
};

export const update = async (req: Request, res: Response) => {
  res.json(await service.updatePatient(+req.params.id, req.body));
};

export const remove = async (req: Request, res: Response) => {
  await service.deletePatient(+req.params.id);
  res.json({ message: "Patient deleted" });
};
