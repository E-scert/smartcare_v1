# SmartCare

A hospital appointment and queue management system: patients register,
submit a quick symptom assessment, book an appointment, and are placed in a
priority-ordered queue. Staff manage patients, appointments, departments,
and the live queue from a dedicated dashboard.

## Stack

- **Frontend:** React (Create React App), React Router, Formik + Yup, Axios
- **Backend:** Node.js, Express, Sequelize (PostgreSQL)
- **Auth:** JWT-based, role-based access control (PATIENT, DOCTOR, NURSE,
  PHARMACIST, RECEPTIONIST, ADMIN)

## Project structure

```
smartcare/
├── backend/            Express API
│   └── src/
│       ├── config/      Database connection
│       ├── controllers/ Route handlers
│       ├── middleware/  Auth middleware
│       ├── models/      Sequelize models
│       └── routes/      Express routers
├── frontend/           React app
│   └── src/
│       ├── components/  Navbar, ProtectedRoute, etc.
│       ├── context/     Auth context
│       ├── pages/       Route-level pages
│       ├── services/    Axios API client
│       └── styles/      Shared design system (theme.css)
├── DATABASE_SETUP.md   Local + hosting database setup guide
└── SHAPPPSsql.sql      Reference schema (broader than current MVP)
```

## Quick start

See **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** for full setup instructions
(local Postgres first, then hosting). Short version:

```bash
# Backend
cd backend
cp .env.example .env   # fill in your local Postgres credentials
npm install
npm run dev

# Frontend (in a second terminal)
cd frontend
cp .env.example .env
npm install
npm start
```

The frontend runs at `http://localhost:3000`, the API at
`http://localhost:5000/api`.
