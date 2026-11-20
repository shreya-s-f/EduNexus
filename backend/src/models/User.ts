import mongoose, { Document, Schema } from 'mongoose';

export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN' | 'PLACEMENT_OFFICER' | 'ALUMNI';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  department?: string;
  usn?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['STUDENT', 'FACULTY', 'HOD', 'ADMIN', 'PLACEMENT_OFFICER', 'ALUMNI'],
      default: 'STUDENT',
    },
    avatar: { type: String, default: '' },
    phone: { type: String, default: '' },
    department: { type: String, default: '' },
    usn: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
