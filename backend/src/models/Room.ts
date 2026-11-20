import mongoose, { Document, Schema } from 'mongoose';

export interface IRoomOccupant {
  studentUsn: string;
  studentName: string;
  bedNumber: number;
}

export interface IRoom extends Document {
  hostelName: string;
  roomNumber: string;
  floor: number;
  capacity: number;
  occupiedCount: number;
  occupants: IRoomOccupant[];
  status: 'Available' | 'Full' | 'Maintenance';
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    hostelName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    floor: { type: Number, required: true },
    capacity: { type: Number, default: 2 },
    occupiedCount: { type: Number, default: 0 },
    occupants: [
      {
        studentUsn: { type: String, required: true },
        studentName: { type: String, required: true },
        bedNumber: { type: Number, required: true },
      },
    ],
    status: { type: String, enum: ['Available', 'Full', 'Maintenance'], default: 'Available' },
  },
  { timestamps: true }
);

RoomSchema.index({ hostelName: 1, roomNumber: 1 }, { unique: true });

export const Room = mongoose.model<IRoom>('Room', RoomSchema);
