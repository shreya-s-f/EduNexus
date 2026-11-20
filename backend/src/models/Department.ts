import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  code: string;
  name: string;
  shortName: string;
  description: string;
  hodName: string;
  hodEmail: string;
  hodPhoto?: string;
  vision: string;
  mission: string[];
  establishedYear: number;
  totalStudents: number;
  totalFaculty: number;
  programs: string[];
  labs: Array<{
    name: string;
    description: string;
    equipment: string[];
    capacity: number;
  }>;
  achievements: string[];
  contactEmail: string;
  contactPhone: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    hodName: { type: String, required: true },
    hodEmail: { type: String, required: true },
    hodPhoto: { type: String, default: '' },
    vision: { type: String, default: '' },
    mission: { type: [String], default: [] },
    establishedYear: { type: Number, default: 2000 },
    totalStudents: { type: Number, default: 480 },
    totalFaculty: { type: Number, default: 24 },
    programs: { type: [String], default: ['B.E. in Information Science & Engineering', 'M.Tech in Software Engineering'] },
    labs: [
      {
        name: { type: String, required: true },
        description: { type: String, default: '' },
        equipment: { type: [String], default: [] },
        capacity: { type: Number, default: 40 },
      },
    ],
    achievements: { type: [String], default: [] },
    contactEmail: { type: String, default: 'dept@edunexus.edu' },
    contactPhone: { type: String, default: '+91 80 2345 6789' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Department = mongoose.model<IDepartment>('Department', DepartmentSchema);
