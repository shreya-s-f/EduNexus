import mongoose, { Document, Schema } from 'mongoose';

export interface IAlumni extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  graduationYear: number;
  department: string;
  company: string;
  designation: string;
  location: string;
  skills: string[];
  linkedIn: string;
  email: string;
  avatar?: string;
  bio: string;
  isAvailableForMentorship: boolean;
  mentorshipTopics: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AlumniSchema = new Schema<IAlumni>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    graduationYear: { type: Number, required: true },
    department: { type: String, required: true },
    company: { type: String, required: true },
    designation: { type: String, required: true },
    location: { type: String, default: 'Bengaluru, India' },
    skills: { type: [String], default: [] },
    linkedIn: { type: String, default: '' },
    email: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    isAvailableForMentorship: { type: Boolean, default: true },
    mentorshipTopics: {
      type: [String],
      default: ['System Design', 'FAANG Interview Prep', 'Master’s Abroad', 'Resume Review'],
    },
  },
  { timestamps: true }
);

export const Alumni = mongoose.model<IAlumni>('Alumni', AlumniSchema);
