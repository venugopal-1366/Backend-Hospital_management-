import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hospital Management API",
      version: "1.0.0",
      description: "Hospital Management System Backend APIs",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    // TAG ORDER (THIS CONTROLS DISPLAY ORDER)
    tags: [
      { name: "Auth", description: "Authentication and Authorization APIs" },
      { name: "Doctors", description: "Doctor management APIs" },
      { name: "Patients", description: "Patient management APIs" },
      { name: "Appointments", description: "Appointment management APIs" },
      { name: "Prescriptions", description: "Prescription management APIs" },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // 👇 scan all routes
  apis: ["./src/modules/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerSetup = swaggerUi.serve;
export const swaggerDocs = swaggerUi.setup(swaggerSpec, {
  explorer: true,
});
