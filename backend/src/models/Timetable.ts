import mongoose, { Document, Schema } from 'mongoose';

export interface ITimetableSlot {
  periodNumber: number;
  startTime: string; // e.g. "09:00 AM"
  endTime: string;   // e.g. "10:00 AM"
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  roomNumber: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface ITimetable extends Document {
  department: string;
  semester: number;
  section: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  slots: ITimetableSlot[];
  createdAt: Date;
  updatedAt: Date;
}

const TimetableSlotSchema = new Schema<ITimetableSlot>(
  {
    periodNumber: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    facultyName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    type: { type: String, enum: ['Lecture', 'Lab', 'Tutorial'], default: 'Lecture' },
  },
  { _id: false }
);

const TimetableSchema = new Schema<ITimetable>(
  {
    department: { type: String, required: true, uppercase: true },
    semester: { type: Number, required: true },
    section: { type: String, default: 'A' },
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      required: true,
    },
    slots: [TimetableSlotSchema],
  },
  { timestamps: true }
);

TimetableSchema.index({ department: 1, semester: 1, section: 1, day: 1 }, { unique: true });

export const Timetable = mongoose.model<ITimetable>('Timetable', TimetableSchema);
