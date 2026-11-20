import mongoose, { Document, Schema } from 'mongoose';

export interface IFaculty extends Document {
  user: mongoose.Types.ObjectId;
  facultyId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  phone?: string;
  officeRoom?: string;
  assignedSubjects: string[];
  avatar?: string;
  isHod: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FacultySchema = new Schema<IFaculty>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    facultyId: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    qualification: { type: String, default: 'M.Tech, Ph.D' },
    specialization: { type: String, default: 'Computer Science' },
    experienceYears: { type: Number, default: 8 },
    phone: { type: String, default: '' },
    officeRoom: { type: String, default: 'Academic Block 1 - 204' },
    assignedSubjects: { type: [String], default: [] },
    avatar: { type: String, default: '' },
    isHod: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Faculty = mongoose.model<IFaculty>('Faculty', FacultySchema);
