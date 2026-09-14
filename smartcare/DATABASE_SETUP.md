# SmartCare — Database Setup Guide

SmartCare uses **PostgreSQL** with **Sequelize** as the ORM. Sequelize builds
the tables for you from the models in `backend/src/models/` — you never need
to run the `.sql` file by hand, it's kept purely as design documentation.

---

## Part 1 — Local setup (on your own machine)

### 1. Install PostgreSQL

- **Windows:** download the installer from https://www.postgresql.org/download/windows/
  and run it. Remember the password you set for the `postgres` user.
- **Mac:** `brew install postgresql@16` then `brew services start postgresql@16`
- **Linux (Debian/Ubuntu):** `sudo apt install postgresql postgresql-contrib`
  then `sudo service postgresql start`

Verify it's running:
```bash
psql --version
```

### 2. Create the database

Open a terminal and log in to Postgres:
```bash
psql -U postgres
```
Then create a database for the project:
```sql
CREATE DATABASE smartcare;
\q
```

### 3. Configure the backend

Inside `backend/`, copy the example env file:
```bash
cd backend
cp .env.example .env
```
Open `.env` and fill in your real local values:
```
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=smartcare
DB_USER=postgres
DB_PASSWORD=your_actual_postgres_password
DB_SSL=false
DB_LOGGING=false

JWT_SECRET=some_long_random_string
```
Generate a good `JWT_SECRET` with:
```bash
openssl rand -base64 48
```

### 4. Install dependencies and start the backend

```bash
cd backend
npm install
npm run dev
```
You should see:
```
Server running on port 5000
✅ Database connected
✅ Models synced
```
"Models synced" means Sequelize just created all the tables (`users`,
`patients`, `staff`, `departments`, `appointments`, `assessments`,
`queue_entries`, `notifications`) inside your `smartcare` database
automatically — nothing more to do.

### 5. Configure and start the frontend

In a second terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm start
```
The app opens at `http://localhost:3000` and talks to the backend at
`http://localhost:5000/api` (set in `frontend/.env`).

### 6. Confirm it works

Register a user at `http://localhost:3000/register`, then check Postgres:
```bash
psql -U postgres -d smartcare -c "SELECT email, role FROM users;"
```
You should see the row you just created.

---

## Part 2 — Hosting it later

When you're ready to put SmartCare online, you need two things hosted: the
Postgres **database** and the Node **backend** (the React **frontend** is a
separate static build). A few good, low-cost options:

| Piece | Easy options |
|---|---|
| Postgres database | [Render](https://render.com), [Railway](https://railway.app), [Supabase](https://supabase.com), [Neon](https://neon.tech), or AWS RDS |
| Node backend (Express) | [Render](https://render.com), [Railway](https://railway.app), [Fly.io](https://fly.io) |
| React frontend | [Vercel](https://vercel.com), [Netlify](https://netlify.com), or served as static files from the same host as the backend |

The steps are the same shape everywhere:

### 1. Create a managed Postgres instance

Pick a provider, create a database, and copy the connection details it gives
you — host, port, database name, username, password. Most managed Postgres
providers require **SSL**.

### 2. Update the backend's environment variables

On your hosting provider's dashboard (not in a committed file), set:
```
DB_HOST=<host the provider gave you>
DB_PORT=5432
DB_NAME=<your db name>
DB_USER=<your db user>
DB_PASSWORD=<your db password>
DB_SSL=true          # almost always required for hosted Postgres
JWT_SECRET=<a long random string, different from your local one>
PORT=5000            # or whatever port the host expects
```
The `db.js` config already reads `DB_SSL` and enables SSL automatically when
it's `true` — no code changes needed.

### 3. Deploy the backend

Point the host at the `backend/` folder, with:
- Build/install command: `npm install`
- Start command: `npm start`

### 4. Point the frontend at the live backend

In the frontend's hosting provider (or in `frontend/.env` before building),
set:
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```
Then build and deploy:
```bash
cd frontend
npm run build
```
Deploy the resulting `build/` folder to your static host.

### 5. Never commit secrets

`.env` files are already excluded via `.gitignore` in both `backend/` and
`frontend/`. Only `.env.example` (with placeholder values) should ever be
committed. Set the real values directly in your hosting provider's
environment-variable settings.

---

## Notes on the schema

- Sequelize is set to `sequelize.sync({ alter: true })` in `server.js`,
  which is convenient for development (it updates tables to match your
  models automatically) but is **not** recommended for a live production
  database with real patient data, since `alter` can drop/rename columns.
  Before going to production, switch to proper
  [Sequelize migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
  instead of `sync({ alter: true })`.
- The original `SHAPPPSsql.sql` file describes a broader schema (medical
  history, assessment questions/answers, staff schedules) than what the
  current MVP code implements. It's kept as a reference for features you may
  want to build out next; it does not need to be run against the database.
