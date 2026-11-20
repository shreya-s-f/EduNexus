import mongoose, { Document, Schema } from 'mongoose';

export interface IAIKnowledgeDocument extends Document {
  title: string;
  docType: 'syllabus' | 'policy' | 'regulations' | 'handbook' | 'directory' | 'faq';
  department: string;
  content: string;
  keywords: string[];
  lastUpdated: string;
  createdAt: Date;
  updatedAt: Date;
}

const AIKnowledgeDocumentSchema = new Schema<IAIKnowledgeDocument>(
  {
    title: { type: String, required: true },
    docType: {
      type: String,
      enum: ['syllabus', 'policy', 'regulations', 'handbook', 'directory', 'faq'],
      default: 'handbook',
    },
    department: { type: String, default: 'ALL' },
    content: { type: String, required: true },
    keywords: { type: [String], default: [] },
    lastUpdated: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const AIKnowledgeDocument = mongoose.model<IAIKnowledgeDocument>(
  'AIKnowledgeDocument',
  AIKnowledgeDocumentSchema
);
