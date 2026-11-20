import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  companyName: string;
  companyLogo: string;
  role: string;
  jobType: 'Full Time' | 'Internship + PPO' | 'Apprenticeship';
  packageLPA: number;
  stipendPerMonth?: number;
  location: string;
  eligibleDepartments: string[];
  minCgpa: number;
  maxBacklogs: number;
  requiredSkills: string[];
  selectionProcess: string[];
  deadline: string;
  jobDescription: string;
  status: 'Open' | 'Closed' | 'Interview Scheduled';
  openings: number;
  applicantsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    companyName: { type: String, required: true },
    companyLogo: { type: String, default: '' },
    role: { type: String, required: true },
    jobType: {
      type: String,
      enum: ['Full Time', 'Internship + PPO', 'Apprenticeship'],
      default: 'Full Time',
    },
    packageLPA: { type: Number, required: true },
    stipendPerMonth: { type: Number, default: 0 },
    location: { type: String, required: true },
    eligibleDepartments: { type: [String], default: ['ISE', 'CSE', 'ECE'] },
    minCgpa: { type: Number, default: 7.0 },
    maxBacklogs: { type: Number, default: 0 },
    requiredSkills: { type: [String], default: [] },
    selectionProcess: {
      type: [String],
      default: ['Online Coding Test', 'Technical Interview 1', 'Managerial Interview', 'HR Round'],
    },
    deadline: { type: String, required: true },
    jobDescription: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Closed', 'Interview Scheduled'], default: 'Open' },
    openings: { type: Number, default: 10 },
    applicantsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>('Job', JobSchema);
