import mongoose, { Document, Schema } from 'mongoose';

export type FAQCategory =
  | 'Admissions'
  | 'Academics'
  | 'Hostel'
  | 'Placements'
  | 'Library'
  | 'Examinations'
  | 'Campus Life'
  | 'General';

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category: FAQCategory;
  keywords: string[];
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: {
      type: String,
      enum: ['Admissions', 'Academics', 'Hostel', 'Placements', 'Library', 'Examinations', 'Campus Life', 'General'],
      default: 'General',
    },
    keywords: { type: [String], default: [] },
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FAQ = mongoose.model<IFAQ>('FAQ', FAQSchema);
