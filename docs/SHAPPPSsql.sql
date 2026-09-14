



--Use UUID primary keys everywhere.
--Use PostgreSQL ENUM types for statuses.
--Keep patient and staff data separated from authentication.
--Don't implement priority_rules yet. For MVP, calculate rules in Java and store only the result. We can add a configurable rule engine later.
--Store chronic conditions and medical history in separate tables rather than a text field.
--1. Enums
CREATE TYPE user_role AS ENUM (
    'PATIENT',
    'DOCTOR',
    'NURSE',
    'PHARMACIST',
    'RECEPTIONIST',
    'ADMIN'
);

CREATE TYPE priority_level AS ENUM (
    'HIGH',
    'MEDIUM',
    'STANDARD'
);

CREATE TYPE appointment_status AS ENUM (
    'PENDING',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
    'NO_SHOW'
);

CREATE TYPE queue_status AS ENUM (
    'WAITING',
    'IN_PROGRESS',
    'COMPLETED',
    'SKIPPED'
);

CREATE TYPE notification_type AS ENUM (
    'EMAIL',
    'SMS'
);

--2. Users

--Authentication table.

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--3. Patients
CREATE TABLE patients (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    id_number VARCHAR(20) UNIQUE,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20),

    phone VARCHAR(20),
    address TEXT,

    disability_status BOOLEAN DEFAULT FALSE,
    pregnancy_status BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_patient_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

--4. Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);


--Sample departments:

--Emergency
--General Practice
--Pharmacy
--Nursing
--Laboratory

--5. Staff
CREATE TABLE staff (
    id UUID PRIMARY KEY,

    user_id UUID UNIQUE NOT NULL,
    department_id UUID NOT NULL,

    employee_number VARCHAR(50) UNIQUE NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    status VARCHAR(30) DEFAULT 'ACTIVE',

    CONSTRAINT fk_staff_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_staff_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
);

--6. Medical History
CREATE TABLE medical_history (
    id UUID PRIMARY KEY,

    patient_id UUID NOT NULL,

    condition_name VARCHAR(255) NOT NULL,
    diagnosis_date DATE,

    notes TEXT,

    CONSTRAINT fk_medical_history_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(id)
);


--Examples:

--Diabetes
--Hypertension
--Heart Disease
--Asthma

--7. Assessment Questions
CREATE TABLE assessment_questions (
    id UUID PRIMARY KEY,

    question_text TEXT NOT NULL,

    category VARCHAR(100),

    is_active BOOLEAN DEFAULT TRUE
);


---Examples:

----Do you have chest pain?
--Do you have difficulty breathing?
--Are you collecting medication?

--8. Assessments

--One submission from a patient.

CREATE TABLE assessments (
    id UUID PRIMARY KEY,

    patient_id UUID NOT NULL,

    priority_level priority_level NOT NULL,

    recommended_service VARCHAR(100) NOT NULL,

    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_assessment_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(id)
);

--9. Assessment Answers
CREATE TABLE assessment_answers (
    id UUID PRIMARY KEY,

    assessment_id UUID NOT NULL,
    question_id UUID NOT NULL,

    answer_value TEXT NOT NULL,

    CONSTRAINT fk_answer_assessment
        FOREIGN KEY (assessment_id)
        REFERENCES assessments(id),

    CONSTRAINT fk_answer_question
        FOREIGN KEY (question_id)
        REFERENCES assessment_questions(id)
);

--10. Appointments

--This is the heart of the system.

CREATE TABLE appointments (
    id UUID PRIMARY KEY,

    patient_id UUID NOT NULL,
    assessment_id UUID NOT NULL,

    assigned_staff_id UUID,
    department_id UUID NOT NULL,

    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,

    priority_level priority_level NOT NULL,

    status appointment_status DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_appointment_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(id),

    CONSTRAINT fk_appointment_assessment
        FOREIGN KEY (assessment_id)
        REFERENCES assessments(id),

    CONSTRAINT fk_appointment_staff
        FOREIGN KEY (assigned_staff_id)
        REFERENCES staff(id),

    CONSTRAINT fk_appointment_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
);

--11. Queue Entries

--The innovation piece.

CREATE TABLE queue_entries (
    id UUID PRIMARY KEY,

    appointment_id UUID NOT NULL,

    queue_number INTEGER NOT NULL,

    priority_score INTEGER NOT NULL,

    queue_date DATE NOT NULL,

    status queue_status DEFAULT 'WAITING',

    CONSTRAINT fk_queue_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(id)
);


--Example:

--Patient A
--Queue Number = 22
--Priority Score = 95

/*Patient B
Queue Number = 18
Priority Score = 30


The system can decide who gets called next using the score.*/

12. Staff Schedules
CREATE TABLE staff_schedules (
    id UUID PRIMARY KEY,

    staff_id UUID NOT NULL,

    work_date DATE NOT NULL,

    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    CONSTRAINT fk_schedule_staff
        FOREIGN KEY (staff_id)
        REFERENCES staff(id)
);

--13. Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY,

    patient_id UUID NOT NULL,

    appointment_id UUID,

    notification_type notification_type NOT NULL,

    message TEXT NOT NULL,

    sent_at TIMESTAMP,

    delivery_status VARCHAR(30),

    CONSTRAINT fk_notification_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(id),

    CONSTRAINT fk_notification_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(id)
);

/*Final ERD Structure
USERS
│
├── PATIENTS
│      │
│      ├── MEDICAL_HISTORY
│      │
│      ├── ASSESSMENTS
│      │      │
│      │      └── ASSESSMENT_ANSWERS
│      │
│      ├── APPOINTMENTS
│      │      │
│      │      └── QUEUE_ENTRIES
│      │
│      └── NOTIFICATIONS
│
└── STAFF
       │
       ├── DEPARTMENTS
       │
       └── STAFF_SCHEDULES


This schema is normalized, scalable, and directly supports the workflow:

Patient Registration → Symptom Assessment → Priority Determination → Appointment Booking → Queue Management → Notifications

*\