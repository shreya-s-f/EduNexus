import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  user: mongoose.Types.ObjectId;
  usn: string;
  name: string;
  email: string;
  department: string;
  semester: number;
  section: string;
  admissionYear: number;
  cgpa: number;
  attendancePercentage: number;
  credits: number;
  phone?: string;
  address?: string;
  dob?: string;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    link?: string;
    techStack?: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    issueDate?: string;
    url?: string;
    verified: boolean;
  }>;
  achievements: Array<{
    title: string;
    type: 'hackathon' | 'internship' | 'project' | 'paper' | 'award';
    date: string;
    description: string;
  }>;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    usn: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
    section: { type: String, default: 'A' },
    admissionYear: { type: Number, default: 2023 },
    cgpa: { type: Number, default: 8.5, min: 0, max: 10 },
    attendancePercentage: { type: Number, default: 85, min: 0, max: 100 },
    credits: { type: Number, default: 110 },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    dob: { type: String, default: '' },
    skills: { type: [String], default: [] },
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, default: '' },
        link: { type: String, default: '' },
        techStack: { type: [String], default: [] },
      },
    ],
    certifications: [
      {
        name: { type: String, required: true },
        issuer: { type: String, required: true },
        issueDate: { type: String, default: '' },
        url: { type: String, default: '' },
        verified: { type: Boolean, default: false },
      },
    ],
    achievements: [
      {
        title: { type: String, required: true },
        type: {
          type: String,
          enum: ['hackathon', 'internship', 'project', 'paper', 'award'],
          default: 'project',
        },
        date: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
    avatar: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Student = mongoose.model<IStudent>('Student', StudentSchema);
