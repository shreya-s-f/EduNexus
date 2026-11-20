import mongoose, { Document, Schema } from 'mongoose';

export type LocationCategory =
  | 'Main gate'
  | 'Administrative block'
  | 'Academic blocks'
  | 'Library'
  | 'Labs'
  | 'Auditorium'
  | 'Canteen'
  | 'Hostel'
  | 'Sports ground'
  | 'Parking'
  | 'Medical center';

export interface ICampusLocation extends Document {
  name: string;
  category: LocationCategory;
  building: string;
  floor: string;
  roomNumber?: string;
  description: string;
  mapCoordinates: {
    x: number; // Percentage or grid coordinate 0-100
    y: number;
  };
  facilities: string[];
  timing: string;
  inCharge?: string;
  contactNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CampusLocationSchema = new Schema<ICampusLocation>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: [
        'Main gate',
        'Administrative block',
        'Academic blocks',
        'Library',
        'Labs',
        'Auditorium',
        'Canteen',
        'Hostel',
        'Sports ground',
        'Parking',
        'Medical center',
      ],
      required: true,
    },
    building: { type: String, required: true },
    floor: { type: String, default: 'Ground Floor' },
    roomNumber: { type: String, default: '' },
    description: { type: String, required: true },
    mapCoordinates: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 50 },
    },
    facilities: { type: [String], default: [] },
    timing: { type: String, default: '8:00 AM - 8:00 PM' },
    inCharge: { type: String, default: '' },
    contactNumber: { type: String, default: '' },
  },
  { timestamps: true }
);

export const CampusLocation = mongoose.model<ICampusLocation>('CampusLocation', CampusLocationSchema);
