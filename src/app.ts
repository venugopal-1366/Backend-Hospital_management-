import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";
import { swaggerSetup, swaggerDocs } from "./swagger/swagger";
import { errorMiddleware } from "./middlewares/error.middleware";
import patientRoutes from "./routes/patient.routes";
import doctorRoutes from "./routes/doctor.routes";
import prescriptionRoutes from "./routes/prescription.routes";


const app = express();

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/prescriptions", prescriptionRoutes);


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use("/api-docs", swaggerSetup, swaggerDocs);
app.use(errorMiddleware);

export default app;
