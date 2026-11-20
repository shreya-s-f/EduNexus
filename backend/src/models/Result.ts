import mongoose, { Document, Schema } from 'mongoose';

export interface ISubjectGrade {
  subjectCode: string;
  subjectName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  maxMarks: number;
  grade: string;       // S, A, B, C, D, E, F
  gradePoint: number;  // 10, 9, 8, 7, etc.
  credits: number;
}

export interface IResult extends Document {
  studentUsn: string;
  studentName: string;
  department: string;
  semester: number;
  examType: string;
  academicYear: string;
  subjects: ISubjectGrade[];
  sgpa: number;
  cgpa: number;
  resultStatus: 'PASS' | 'FAIL' | 'WITHHELD';
  publishedDate: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubjectGradeSchema = new Schema<ISubjectGrade>(
  {
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    internalMarks: { type: Number, required: true },
    externalMarks: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    maxMarks: { type: Number, default: 100 },
    grade: { type: String, required: true },
    gradePoint: { type: Number, required: true },
    credits: { type: Number, required: true },
  },
  { _id: false }
);

const ResultSchema = new Schema<IResult>(
  {
    studentUsn: { type: String, required: true, uppercase: true, trim: true },
    studentName: { type: String, required: true },
    department: { type: String, required: true, uppercase: true },
    semester: { type: Number, required: true },
    examType: { type: String, default: 'Semester End Examination' },
    academicYear: { type: String, default: '2025-2026' },
    subjects: [SubjectGradeSchema],
    sgpa: { type: Number, required: true },
    cgpa: { type: Number, required: true },
    resultStatus: { type: String, enum: ['PASS', 'FAIL', 'WITHHELD'], default: 'PASS' },
    publishedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  },
  { timestamps: true }
);

ResultSchema.index({ studentUsn: 1, semester: 1 }, { unique: true });

export const Result = mongoose.model<IResult>('Result', ResultSchema);
