import { Request, Response } from "express";
import * as service from "../services/prescription.service";

export const create = async (req: Request, res: Response) => {
  try {
    const prescription = await service.createPrescription(req.body);
    res.status(201).json(prescription);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const prescriptions = await service.getAllPrescriptions();
  res.json(prescriptions);
};


export const getByAppointment = async (req: Request, res: Response) => {
  res.json(
    await service.getPrescriptionsByAppointment(
      +req.params.appointmentId
    )
  );
};

export const update = async (req: Request, res: Response) => {
  res.json(
    await service.updatePrescription(+req.params.id, req.body)
  );
};

export const remove = async (req: Request, res: Response) => {
  await service.deletePrescription(+req.params.id);
  res.json({ message: "Prescription deleted" });
};
