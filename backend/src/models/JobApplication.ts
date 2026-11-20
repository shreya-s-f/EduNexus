import mongoose, { Document, Schema } from 'mongoose';

export type ApplicationStatus =
  | 'Applied'
  | 'Shortlisted'
  | 'Assessment'
  | 'Interview'
  | 'Selected'
  | 'Rejected';

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  jobRole: string;
  companyName: string;
  studentUsn: string;
  studentName: string;
  studentEmail: string;
  studentDepartment: string;
  studentCgpa: number;
  resumeUrl: string;
  status: ApplicationStatus;
  appliedDate: string;
  feedback?: string;
  interviewDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    jobRole: { type: String, required: true },
    companyName: { type: String, required: true },
    studentUsn: { type: String, required: true, uppercase: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentDepartment: { type: String, required: true },
    studentCgpa: { type: Number, required: true },
    resumeUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Assessment', 'Interview', 'Selected', 'Rejected'],
      default: 'Applied',
    },
    appliedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    feedback: { type: String, default: '' },
    interviewDate: { type: String, default: '' },
  },
  { timestamps: true }
);

JobApplicationSchema.index({ jobId: 1, studentUsn: 1 }, { unique: true });

export const JobApplication = mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
