import mongoose, { Document, Schema } from 'mongoose';

export interface IBookIssue extends Document {
  bookId: mongoose.Types.ObjectId;
  bookTitle: string;
  isbn: string;
  studentUsn: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Issued' | 'Returned' | 'Overdue';
  fineAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookIssueSchema = new Schema<IBookIssue>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: 'LibraryBook', required: true },
    bookTitle: { type: String, required: true },
    isbn: { type: String, required: true },
    studentUsn: { type: String, required: true, uppercase: true },
    studentName: { type: String, required: true },
    issueDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    returnDate: { type: String, default: '' },
    status: { type: String, enum: ['Issued', 'Returned', 'Overdue'], default: 'Issued' },
    fineAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const BookIssue = mongoose.model<IBookIssue>('BookIssue', BookIssueSchema);
