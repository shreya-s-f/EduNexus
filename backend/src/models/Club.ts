import mongoose, { Document, Schema } from 'mongoose';

export interface IClubLead {
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

export interface IClub extends Document {
  name: string;
  shortDescription: string;
  about: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Social' | 'Innovation';
  leads: IClubLead[];
  membersCount: number;
  bannerImage: string;
  logo: string;
  events: string[];
  achievements: string[];
  joinRequirements: string;
  meetingSchedule: string;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClubSchema = new Schema<IClub>(
  {
    name: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    about: { type: String, required: true },
    category: {
      type: String,
      enum: ['Technical', 'Cultural', 'Sports', 'Social', 'Innovation'],
      required: true,
    },
    leads: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        email: { type: String, required: true },
        avatar: { type: String, default: '' },
      },
    ],
    membersCount: { type: Number, default: 50 },
    bannerImage: { type: String, default: '' },
    logo: { type: String, default: '' },
    events: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    joinRequirements: { type: String, default: 'Open to all engineering students with genuine passion.' },
    meetingSchedule: { type: String, default: 'Every Saturday, 2:00 PM - 4:00 PM' },
    contactEmail: { type: String, default: 'club@edunexus.edu' },
  },
  { timestamps: true }
);

export const Club = mongoose.model<IClub>('Club', ClubSchema);
