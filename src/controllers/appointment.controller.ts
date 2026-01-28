import { Request, Response } from "express";
import * as service from "../services/appointment.service";

export const getAll = async (_req: Request, res: Response) => {
  res.json(await service.getAppointments());
};

export const getById = async (req: Request, res: Response) => {
  res.json(await service.getAppointmentById(+req.params.id));
};

export const create = async (req: Request, res: Response) => {
  res.status(201).json(await service.createAppointment(req.body));
};

export const update = async (req: Request, res: Response) => {
  res.json(await service.updateAppointment(+req.params.id, req.body));
};

export const remove = async (req: Request, res: Response) => {
  await service.deleteAppointment(+req.params.id);
  res.json({ message: "Appointment deleted" });
};
