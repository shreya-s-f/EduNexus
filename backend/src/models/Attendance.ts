import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
  studentUsn: string;
  studentName: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  semester: number;
  section: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent';
  facultyEmail: string;
  facultyName: string;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    studentUsn: { type: String, required: true, uppercase: true, trim: true },
    studentName: { type: String, required: true },
    subjectCode: { type: String, required: true, uppercase: true },
    subjectName: { type: String, required: true },
    department: { type: String, required: true, uppercase: true },
    semester: { type: Number, required: true },
    section: { type: String, default: 'A' },
    date: { type: String, required: true },
    status: { type: String, enum: ['present', 'absent'], required: true },
    facultyEmail: { type: String, required: true },
    facultyName: { type: String, default: '' },
    remarks: { type: String, default: '' },
  },
  { timestamps: true }
);

AttendanceSchema.index({ studentUsn: 1, subjectCode: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);
