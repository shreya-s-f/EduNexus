import mongoose, { Document, Schema } from 'mongoose';

export type NotificationType =
  | 'notice'
  | 'exam'
  | 'assignment'
  | 'event'
  | 'placement'
  | 'attendance'
  | 'complaint'
  | 'system';

export interface INotification extends Document {
  recipientEmail: string; // or "ALL", or "ROLE:STUDENT"
  recipientRole?: string;
  title: string;
  message: string;
  type: NotificationType;
  linkUrl?: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    recipientEmail: { type: String, required: true },
    recipientRole: { type: String, default: '' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['notice', 'exam', 'assignment', 'event', 'placement', 'attendance', 'complaint', 'system'],
      default: 'system',
    },
    linkUrl: { type: String, default: '' },
    isRead: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
