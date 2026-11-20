import mongoose, { Document, Schema } from 'mongoose';

export interface ISubject extends Document {
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  type: 'core' | 'elective' | 'lab';
  facultyName?: string;
  facultyEmail?: string;
  syllabus?: string;
  totalHours: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema = new Schema<ISubject>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true, uppercase: true },
    semester: { type: Number, required: true, min: 1, max: 8 },
    credits: { type: Number, required: true, default: 4 },
    type: { type: String, enum: ['core', 'elective', 'lab'], default: 'core' },
    facultyName: { type: String, default: '' },
    facultyEmail: { type: String, default: '' },
    syllabus: { type: String, default: '' },
    totalHours: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export const Subject = mongoose.model<ISubject>('Subject', SubjectSchema);
