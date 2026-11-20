import mongoose, { Document, Schema } from 'mongoose';

export type CertificateType =
  | 'internship'
  | 'hackathon'
  | 'course'
  | 'nptel'
  | 'workshop'
  | 'award';

export interface ICertificate extends Document {
  studentUsn: string;
  studentName: string;
  title: string;
  type: CertificateType;
  issuer: string;
  issueDate: string;
  certificateUrl: string;
  credentialId?: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  verifiedBy?: string;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    studentUsn: { type: String, required: true, uppercase: true },
    studentName: { type: String, required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['internship', 'hackathon', 'course', 'nptel', 'workshop', 'award'],
      default: 'course',
    },
    issuer: { type: String, required: true },
    issueDate: { type: String, required: true },
    certificateUrl: { type: String, required: true },
    credentialId: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
    verifiedBy: { type: String, default: '' },
    comments: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);
