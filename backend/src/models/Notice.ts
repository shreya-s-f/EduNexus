import mongoose, { Document, Schema } from 'mongoose';

export type NoticeCategory =
  | 'General'
  | 'Academic'
  | 'Examination'
  | 'Placement'
  | 'Internship'
  | 'Events'
  | 'Department'
  | 'Emergency';

export interface INotice extends Document {
  title: string;
  content: string;
  summary?: string; // AI generated summary
  category: NoticeCategory;
  priority: 'High' | 'Medium' | 'Low';
  department?: string;
  publishedBy: string;
  authorRole: string;
  date: string;
  attachmentUrl?: string;
  isPinned: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, default: '' },
    category: {
      type: String,
      enum: ['General', 'Academic', 'Examination', 'Placement', 'Internship', 'Events', 'Department', 'Emergency'],
      default: 'General',
    },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    department: { type: String, default: 'ALL' },
    publishedBy: { type: String, required: true },
    authorRole: { type: String, default: 'Administrator' },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] },
    attachmentUrl: { type: String, default: '' },
    isPinned: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Notice = mongoose.model<INotice>('Notice', NoticeSchema);
