# Hospital Management System

A comprehensive hospital management system built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Admin, doctor, and patient role management
- **Doctor Management**: Doctor profiles, specializations, and availability
- **Patient Management**: Patient records and medical history
- **Appointment System**: Schedule and manage appointments
- **Prescription Management**: Create and manage patient prescriptions
- **API Documentation**: Swagger/OpenAPI documentation
- **Database**: PostgreSQL with proper schema design

## Project Structure

```
src/
├── config/
│   ├── db.ts              # PostgreSQL connection
│   └── env.ts             # Environment variables
├── modules/
│   ├── auth/              # Authentication module ✅
│   ├── users/             # User management
│   ├── doctors/           # Doctor management
│   ├── patients/          # Patient management
│   ├── appointments/      # Appointment management
│   └── prescriptions/     # Prescription management
├── middlewares/
│   ├── auth.middleware.ts # JWT verification ✅
│   ├── role.middleware.ts # Role-based access ✅
│   └── error.middleware.ts # Global error handler ✅
├── utils/
│   ├── jwt.ts             # JWT utilities
│   └── password.ts        # Password hashing
├── swagger/
│   └── swagger.ts         # Swagger configuration ✅
├── app.ts                 # Express app
└── server.ts              # App start
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up PostgreSQL database and create the database

5. Run database migrations (you'll need to create the schema)

6. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

Once the server is running, visit `http://localhost:3000/api-docs` to access the Swagger documentation.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm test` - Run tests

## Database Schema

The system uses the following main tables:
- `users` - User authentication and basic info
- `doctors` - Doctor-specific information
- `patients` - Patient-specific information
- `appointments` - Appointment scheduling
- `prescriptions` - Medical prescriptions

## Authentication

The system uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Roles

- **admin**: Full system access
- **doctor**: Can manage appointments, prescriptions, and view patient data
- **patient**: Can view own appointments and prescriptions

## Development

This project uses:
- TypeScript for type safety
- Express.js for the web framework
- PostgreSQL for the database
- JWT for authentication
- Swagger for API documentation
- ESLint for code linting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
