# EduNexus - "Your Campus, Connected."

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20Ready-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

EduNexus is a modern, production-quality, full-stack smart college campus information and management platform designed to connect students, distinguished faculty, heads of departments (HODs), administrators, corporate placement officers, and alumni into one cohesive, intelligent digital ecosystem.

> **Design Inspiration:** Premium college portal and hero carousel aesthetic inspired by [KIBCo College Website Hero Carousel](https://dribbble.com/shots/27821051-KIBCo-College-Website-Hero-Carousel).

---

## 🏛️ Key Features & Modules

### 1. 🌟 Public Experience & Hero Carousel
* **Hero Carousel:** High-impact hero carousel with slide transitions, floating metric cards (98.4% Placement Rate, ₹48 LPA Highest Package, 50+ Global Labs), category tags, and quick-action shortcuts.
* **Campus Statistics:** Live statistics counters (12,480+ Students, 640+ Faculty, 6 Engineering Departments, 150+ Recruiters, 40+ Clubs).
* **Department Showcases:** In-depth pages for ISE, CSE, ECE, ME, CV, and EEE with curriculum, research laboratories, HOD profiles, and program objectives.
* **Facilities & Amenities:** Digital library, residential hostels, 18-route campus transport fleet, Olympic sports arena, and 24/7 health center.
* **Campus Gallery:** Filterable visual archives across campus architecture, hackathons, concerts, and graduation.
* **Campus Emergency SOS:** Quick-dial helpline references for Medical Trauma Care, Security Control Room, Women Safety, and Anti-Ragging Cell.

### 2. 🔐 Authentication & Role-Based Access Control (RBAC)
* JWT Bearer token authentication with bcrypt password hashing.
* Role-specific navigation, route protection, and API authorization.
* **6 Dedicated Roles:**
  1. `STUDENT`: Dashboard, attendance predictor, timetable, SGPA/CGPA result cards, assignments, placements, grievance desk.
  2. `FACULTY`: Subject schedules, student rosters, interactive attendance marker, assignment creation.
  3. `HOD`: Department governance, faculty allocation, student counts, average attendance & result metrics.
  4. `ADMIN`: Executive control center with telemetry, complaint resolution pipelines, and system configuration.
  5. `PLACEMENT_OFFICER`: Corporate drives, candidate eligibility rules, applicant review, package analytics.
  6. `ALUMNI`: Alumni directory, student mentorship requests, and career prep discussions.

### 3. 📊 Smart Attendance & Predictive Engine
* Subject-wise classes held, attended, and percentage calculations.
* **Intelligent Shortage Warning:** Instant alerts whenever subject attendance falls below the mandatory 75% threshold.
* **Predictive Class Calculator:** Accurately computes how many consecutive classes are needed to reach 75%, or how many can be safely missed.
* **Interactive What-If Simulator:** Real-time slider allowing students to simulate attending future sessions.

### 4. 🤖 EduNexus AI Campus Assistant (Gemini API & RAG)
* Institutional virtual assistant trained on university knowledge, policies, exam schedules, and maps.
* Integrates with Google Gemini API when configured, with a resilient local domain RAG engine fallback ensuring 100% availability offline.
* Answers natural queries like:
  * *"Where is the library?"*
  * *"What is today's timetable?"*
  * *"When is the next internal exam?"*
  * *"Who is the ISE HOD?"*
  * *"What are the upcoming events?"*
  * *"Show placement opportunities."*

### 5. 💼 Placement & Internship Funnel
* Active job drives with compensation (e.g. Google Cloud ₹44 LPA, Microsoft ₹48 LPA, Amazon ₹38 LPA).
* Application workflow: `Applied` ➔ `Shortlisted` ➔ `Assessment` ➔ `Interview` ➔ `Selected` / `Rejected`.
* Corporate recruitment analytics with package distribution tiers.

### 6. 🗺️ Interactive Campus Map & Wayfinding
* Visual campus map with pin markers and building coordinates.
* **Precise Wayfinding:** Search for any location to obtain `Building` ➔ `Floor` ➔ `Room Number` directions.

### 7. 📑 Academics, Timetable, Exams & Grievance Desk
* Weekly Monday–Saturday visual timetable with period slots, faculty names, and hall assignments.
* Semester results breakdown with internal marks, external marks, total score, letter grades (S, A, B), and credits.
* Grievance ticketing pipeline (`Submitted` ➔ `Under Review` ➔ `Assigned` ➔ `In Progress` ➔ `Resolved` ➔ `Closed`).
* Scholarship eligibility checker with instant CGPA and family income filter.

---

## 🔑 Demo Accounts Credentials

The database seeder automatically initializes realistic accounts with the default demo password:

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@edunexus.demo` | `EduNexus@2026` | Full University Oversight & Telemetry |
| **Student** | `student@edunexus.demo` | `EduNexus@2026` | Academics, Attendance, Placements & AI |
| **Faculty** | `faculty@edunexus.demo` | `EduNexus@2026` | Teaching Schedule, Attendance Marker |
| **HOD** | `hod@edunexus.demo` | `EduNexus@2026` | Department Governance & Faculty Roster |
| **Placement Officer** | `placement@edunexus.demo` | `EduNexus@2026` | Corporate Drives & Placement Funnel |
| **Alumni** | `alumni@edunexus.demo` | `EduNexus@2026` | Alumni Directory & Mentorship |

> *Tip: On the Login screen, click any of the 6 **One-Click Demo Portals** buttons to log in instantly without typing!*

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Framer Motion, Recharts, Lucide React, Axios |
| **Backend** | Node.js, Express.js, TypeScript, Mongoose, JWT, bcryptjs, Helmet, CORS, Express Rate Limit, Morgan |
| **Database** | MongoDB Atlas / Local MongoDB (with resilient in-memory fallback store) |
| **AI Integration** | Google Gemini API (with institutional RAG knowledge base fallback) |

---

## 📂 Project Architecture

```
EduNexus/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection, env, and memoryStore fallback
│   │   ├── controllers/     # Auth, Student, Faculty, HOD, Admin, Placements, AI, etc.
│   │   ├── middleware/      # JWT Authentication, RBAC, Error Handler
│   │   ├── models/          # Mongoose Schemas (User, Student, Faculty, Dept, Job, etc.)
│   │   ├── routes/          # Express REST API route definitions
│   │   ├── seed/            # Comprehensive seed data and runner script
│   │   ├── services/        # AI Service with Gemini API & RAG retrieval
│   │   ├── utils/           # JWT token generator, bcrypt passwords, API responses
│   │   └── server.ts        # Express app entrypoint & API mounting
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Footer, HeroCarousel, Modals, Badges, Search
│   │   ├── contexts/        # AuthContext, ThemeContext, NotificationContext
│   │   ├── layouts/         # PublicLayout, DashboardLayout
│   │   ├── pages/           # Public pages, Student portal, Faculty, HOD, Admin, etc.
│   │   ├── services/        # Axios API client
│   │   ├── types/           # Full TypeScript data contracts
│   │   ├── App.tsx          # Router configuration
│   │   └── main.tsx         # React root mounting
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MongoDB** (Optional: the backend automatically uses its resilient embedded fallback if local MongoDB is not running!)

### 1. Installation
Clone the repository and install all dependencies:

```bash
git clone https://github.com/shreya-s-f/EduNexus.git
cd EduNexus

# Install root, backend, and frontend dependencies
npm run install:all
```

### 2. Environment Variables
Copy `.env.example` to `.env` in the `backend/` directory:

```bash
cp backend/.env.example backend/.env
```

Configurable variables:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/edunexus
JWT_SECRET=edunexus_jwt_secret_super_key_2026_production_grade
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Servers
Start both backend and frontend concurrently:

```bash
npm run dev
```

* **Frontend:** `http://localhost:5173`
* **Backend API:** `http://localhost:5000/api`
* **API Health Check:** `http://localhost:5000/api/health`

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user and receive JWT token |
| `POST` | `/api/auth/register` | Register new user and academic profile |
| `GET` | `/api/auth/me` | Retrieve authenticated user profile |
| `GET` | `/api/students/dashboard` | Student metrics, CGPA, assignments & alerts |
| `PUT` | `/api/students/profile` | Update student profile, address & skills |
| `GET` | `/api/attendance/summary` | Subject attendance & shortage prediction |
| `POST` | `/api/attendance/mark` | Batch mark attendance for class session |
| `GET` | `/api/timetable/weekly` | Weekly timetable Monday to Saturday |
| `GET` | `/api/exams` | Examination timetable and instructions |
| `GET` | `/api/exams/results` | Student semester grades & SGPA |
| `GET` | `/api/placements/analytics` | Highest package, average CTC, recruiter stats |
| `GET` | `/api/placements/jobs` | Browse active placement opportunities |
| `POST` | `/api/placements/jobs/apply` | Apply for placement drive with resume |
| `GET` | `/api/events` | Browse upcoming hackathons, fests & workshops |
| `POST` | `/api/events/register` | Register for event and get entry pass code |
| `GET` | `/api/clubs` | Student clubs and society chapters |
| `GET` | `/api/library/books` | Search library catalog & check availability |
| `POST` | `/api/library/issue` | Request book checkout |
| `GET` | `/api/campus/locations` | Interactive map coordinates and wayfinding |
| `POST` | `/api/complaints` | Submit grievance ticket |
| `POST` | `/api/ai/ask` | EduNexus AI assistant query response |

---

## 🚢 Deployment Ready

* **Frontend:** Ready for one-click deployment on **Vercel** or **Netlify** with `npm run build`.
* **Backend:** Ready for deployment on **Render**, **Railway**, or **AWS ECS**.
* **Database:** Connect effortlessly to **MongoDB Atlas** by supplying your Atlas connection string to `MONGODB_URI`.

---

## 📄 License
This project is licensed under the MIT License. Built with passion by Shreya for the EduNexus Digital Campus.
