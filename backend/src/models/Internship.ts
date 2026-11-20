import mongoose, { Document, Schema } from 'mongoose';

export interface IInternship extends Document {
  company: string;
  role: string;
  duration: string; // e.g. "3 Months", "6 Months"
  stipend: string;  // e.g. "₹35,000 / month"
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  eligibleDepartments: string[];
  minCgpa: number;
  skills: string[];
  deadline: string;
  description: string;
  openings: number;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const InternshipSchema = new Schema<IInternship>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, default: '6 Months' },
    stipend: { type: String, default: '₹30,000 / month' },
    location: { type: String, default: 'Bengaluru, India' },
    type: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], default: 'Hybrid' },
    eligibleDepartments: { type: [String], default: ['ISE', 'CSE', 'ECE'] },
    minCgpa: { type: Number, default: 7.5 },
    skills: { type: [String], default: [] },
    deadline: { type: String, required: true },
    description: { type: String, required: true },
    openings: { type: Number, default: 5 },
    contactEmail: { type: String, default: 'careers@company.com' },
  },
  { timestamps: true }
);

export const Internship = mongoose.model<IInternship>('Internship', InternshipSchema);
