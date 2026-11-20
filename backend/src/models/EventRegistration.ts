import mongoose, { Document, Schema } from 'mongoose';

export interface IEventRegistration extends Document {
  eventId: mongoose.Types.ObjectId;
  eventTitle: string;
  studentUsn: string;
  studentName: string;
  studentEmail: string;
  department: string;
  registeredAt: Date;
  confirmationCode: string;
  attended: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    eventTitle: { type: String, required: true },
    studentUsn: { type: String, required: true, uppercase: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    department: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    confirmationCode: { type: String, required: true },
    attended: { type: Boolean, default: false },
  },
  { timestamps: true }
);

EventRegistrationSchema.index({ eventId: 1, studentUsn: 1 }, { unique: true });

export const EventRegistration = mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);
