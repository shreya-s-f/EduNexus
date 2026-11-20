import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { ENV } from './config/env';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import { seedDatabase } from './seed/seedRunner';

// Import Routes
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import facultyRoutes from './routes/facultyRoutes';
import hodRoutes from './routes/hodRoutes';
import departmentRoutes from './routes/departmentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import timetableRoutes from './routes/timetableRoutes';
import examRoutes from './routes/examRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import noticeRoutes from './routes/noticeRoutes';
import eventRoutes from './routes/eventRoutes';
import clubRoutes from './routes/clubRoutes';
import placementRoutes from './routes/placementRoutes';
import libraryRoutes from './routes/libraryRoutes';
import hostelRoutes from './routes/hostelRoutes';
import transportRoutes from './routes/transportRoutes';
import complaintRoutes from './routes/complaintRoutes';
import campusRoutes from './routes/campusRoutes';
import alumniRoutes from './routes/alumniRoutes';
import adminRoutes from './routes/adminRoutes';
import aiRoutes from './routes/aiRoutes';

const app = express();

// Security and Headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS Configuration
const allowedOrigins = [
  ENV.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// Request Parsing & Logging
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(morgan('dev'));

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/hod', hodRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/hostel', hostelRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/campus', campusRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'EduNexus Campus API',
    version: '1.0.0',
    brand: 'EduNexus - Your Campus, Connected.',
    demoAccounts: [
      { role: 'Admin', email: 'admin@edunexus.demo', password: 'EduNexus@2026' },
      { role: 'Student', email: 'student@edunexus.demo', password: 'EduNexus@2026' },
      { role: 'Faculty', email: 'faculty@edunexus.demo', password: 'EduNexus@2026' },
      { role: 'HOD', email: 'hod@edunexus.demo', password: 'EduNexus@2026' },
      { role: 'Placement Officer', email: 'placement@edunexus.demo', password: 'EduNexus@2026' },
      { role: 'Alumni', email: 'alumni@edunexus.demo', password: 'EduNexus@2026' },
    ],
  });
});

// Global Error Handler
app.use(errorHandler);

// Server startup
const PORT = parseInt(ENV.PORT, 10) || 5000;

export const startServer = async () => {
  await connectDB();
  await seedDatabase();

  const server = app.listen(PORT, () => {
    console.log(`[EduNexus] Server running in ${ENV.NODE_ENV} mode on port ${PORT}`);
    console.log(`[EduNexus] API Base URL: http://localhost:${PORT}/api`);
    console.log(`[EduNexus] Health Check: http://localhost:${PORT}/api/health`);
  });
  return { app, server };
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
