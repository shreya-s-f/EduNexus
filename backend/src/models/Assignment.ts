import mongoose, { Document, Schema } from 'mongoose';

export interface IAssignment extends Document {
  title: string;
  description: string;
  department: string;
  semester: number;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  facultyEmail: string;
  dueDate: string;
  totalMarks: number;
  attachmentUrl?: string;
  instructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String, required: true, uppercase: true },
    semester: { type: Number, required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    facultyName: { type: String, required: true },
    facultyEmail: { type: String, required: true },
    dueDate: { type: String, required: true },
    totalMarks: { type: Number, default: 20 },
    attachmentUrl: { type: String, default: '' },
    instructions: { type: String, default: 'Submit PDF or GitHub repository link before deadline.' },
  },
  { timestamps: true }
);

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
