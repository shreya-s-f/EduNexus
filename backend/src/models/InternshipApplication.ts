import mongoose, { Document, Schema } from 'mongoose';

export interface IInternshipApplication extends Document {
  internshipId: mongoose.Types.ObjectId;
  company: string;
  role: string;
  studentUsn: string;
  studentName: string;
  studentEmail: string;
  resumeUrl: string;
  coverNote?: string;
  status: 'Applied' | 'Shortlisted' | 'Selected' | 'Rejected';
  appliedDate: string;
  createdAt: Date;
  updatedAt: Date;
}

const InternshipApplicationSchema = new Schema<IInternshipApplication>(
  {
    internshipId: { type: Schema.Types.ObjectId, ref: 'Internship', required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    studentUsn: { type: String, required: true, uppercase: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    resumeUrl: { type: String, default: '' },
    coverNote: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Selected', 'Rejected'],
      default: 'Applied',
    },
    appliedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  },
  { timestamps: true }
);

InternshipApplicationSchema.index({ internshipId: 1, studentUsn: 1 }, { unique: true });

export const InternshipApplication = mongoose.model<IInternshipApplication>(
  'InternshipApplication',
  InternshipApplicationSchema
);
