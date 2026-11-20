import mongoose, { Document, Schema } from 'mongoose';

export type ComplaintCategory =
  | 'Classroom'
  | 'Lab'
  | 'Hostel'
  | 'Library'
  | 'Canteen'
  | 'Transport'
  | 'Wi-Fi'
  | 'Cleanliness'
  | 'Security'
  | 'Other';

export type ComplaintStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Assigned'
  | 'In Progress'
  | 'Resolved'
  | 'Closed';

export interface IComplaint extends Document {
  ticketId: string;
  studentUsn: string;
  studentName: string;
  studentEmail: string;
  category: ComplaintCategory;
  description: string;
  location: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  imageAttachment?: string;
  status: ComplaintStatus;
  assignedTo?: string;
  resolutionNotes?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    ticketId: { type: String, required: true, unique: true },
    studentUsn: { type: String, required: true, uppercase: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Classroom',
        'Lab',
        'Hostel',
        'Library',
        'Canteen',
        'Transport',
        'Wi-Fi',
        'Cleanliness',
        'Security',
        'Other',
      ],
      required: true,
    },
    description: { type: String, required: true },
    location: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High', 'Emergency'], default: 'Medium' },
    imageAttachment: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed'],
      default: 'Submitted',
    },
    assignedTo: { type: String, default: 'Facilities Management Desk' },
    resolutionNotes: { type: String, default: '' },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

export const Complaint = mongoose.model<IComplaint>('Complaint', ComplaintSchema);
