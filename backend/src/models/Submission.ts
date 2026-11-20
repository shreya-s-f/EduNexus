import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
  assignmentId: mongoose.Types.ObjectId;
  assignmentTitle: string;
  subjectCode: string;
  studentUsn: string;
  studentName: string;
  studentEmail: string;
  submissionDate: string;
  contentOrUrl: string;
  status: 'pending' | 'submitted' | 'late' | 'evaluated';
  marksAwarded?: number;
  feedback?: string;
  evaluatedBy?: string;
  evaluatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    assignmentTitle: { type: String, required: true },
    subjectCode: { type: String, required: true },
    studentUsn: { type: String, required: true, uppercase: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    submissionDate: { type: String, required: true },
    contentOrUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'submitted', 'late', 'evaluated'],
      default: 'submitted',
    },
    marksAwarded: { type: Number },
    feedback: { type: String, default: '' },
    evaluatedBy: { type: String, default: '' },
    evaluatedAt: { type: Date },
  },
  { timestamps: true }
);

SubmissionSchema.index({ assignmentId: 1, studentUsn: 1 }, { unique: true });

export const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);
