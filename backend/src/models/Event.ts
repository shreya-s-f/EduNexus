import mongoose, { Document, Schema } from 'mongoose';

export type EventCategory =
  | 'Technical'
  | 'Cultural'
  | 'Sports'
  | 'Hackathons'
  | 'Workshops'
  | 'Seminars'
  | 'Guest lectures';

export interface IEvent extends Document {
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  registrationLimit: number;
  registeredCount: number;
  registrationDeadline: string;
  image?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  speakerOrChiefGuest?: string;
  contactPerson?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Technical', 'Cultural', 'Sports', 'Hackathons', 'Workshops', 'Seminars', 'Guest lectures'],
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    organizer: { type: String, required: true },
    registrationLimit: { type: Number, default: 200 },
    registeredCount: { type: Number, default: 0 },
    registrationDeadline: { type: String, required: true },
    image: { type: String, default: '' },
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
    speakerOrChiefGuest: { type: String, default: '' },
    contactPerson: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Event = mongoose.model<IEvent>('Event', EventSchema);
