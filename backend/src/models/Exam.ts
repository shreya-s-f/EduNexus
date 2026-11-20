import mongoose, { Document, Schema } from 'mongoose';

export interface IExamSlot {
  date: string;
  time: string;
  subjectCode: string;
  subjectName: string;
  maxMarks: number;
  roomNumber: string;
}

export interface IExam extends Document {
  title: string;
  type: 'Internal 1' | 'Internal 2' | 'Internal 3' | 'Practical' | 'Semester End';
  department: string;
  semester: number;
  academicYear: string;
  startDate: string;
  endDate: string;
  timetable: IExamSlot[];
  instructions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema<IExam>(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['Internal 1', 'Internal 2', 'Internal 3', 'Practical', 'Semester End'],
      required: true,
    },
    department: { type: String, required: true, uppercase: true },
    semester: { type: Number, required: true },
    academicYear: { type: String, default: '2025-2026' },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    timetable: [
      {
        date: { type: String, required: true },
        time: { type: String, required: true },
        subjectCode: { type: String, required: true },
        subjectName: { type: String, required: true },
        maxMarks: { type: Number, default: 50 },
        roomNumber: { type: String, default: 'Academic Hall A' },
      },
    ],
    instructions: { type: [String], default: ['Valid college ID mandatory', 'No electronic gadgets allowed in examination hall'] },
  },
  { timestamps: true }
);

export const Exam = mongoose.model<IExam>('Exam', ExamSchema);
