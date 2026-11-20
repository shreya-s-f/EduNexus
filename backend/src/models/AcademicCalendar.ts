import mongoose, { Document, Schema } from 'mongoose';

export type CalendarEventType =
  | 'Semester start'
  | 'Internal exams'
  | 'Practical exams'
  | 'Semester exams'
  | 'Holidays'
  | 'Workshops'
  | 'Hackathons'
  | 'Seminars'
  | 'Assignment deadlines';

export interface IAcademicCalendar extends Document {
  title: string;
  eventType: CalendarEventType;
  startDate: string;
  endDate: string;
  description: string;
  isHoliday: boolean;
  department: string;
  semester?: number;
  createdAt: Date;
  updatedAt: Date;
}

const AcademicCalendarSchema = new Schema<IAcademicCalendar>(
  {
    title: { type: String, required: true },
    eventType: {
      type: String,
      enum: [
        'Semester start',
        'Internal exams',
        'Practical exams',
        'Semester exams',
        'Holidays',
        'Workshops',
        'Hackathons',
        'Seminars',
        'Assignment deadlines',
      ],
      required: true,
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, default: '' },
    isHoliday: { type: Boolean, default: false },
    department: { type: String, default: 'ALL' },
    semester: { type: Number },
  },
  { timestamps: true }
);

export const AcademicCalendar = mongoose.model<IAcademicCalendar>('AcademicCalendar', AcademicCalendarSchema);
