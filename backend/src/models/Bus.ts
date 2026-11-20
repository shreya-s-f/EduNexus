import mongoose, { Document, Schema } from 'mongoose';

export interface IBusStop {
  stopName: string;
  morningTime: string;   // e.g. "07:30 AM"
  eveningTime: string;   // e.g. "05:15 PM"
  landmark: string;
}

export interface IBus extends Document {
  busNumber: string;
  routeNumber: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  stops: IBusStop[];
  status: 'On Route' | 'At Campus' | 'In Depot' | 'Maintenance';
  liveLocation?: {
    latitude: number;
    longitude: number;
    updatedAt: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BusSchema = new Schema<IBus>(
  {
    busNumber: { type: String, required: true, unique: true },
    routeNumber: { type: String, required: true },
    routeName: { type: String, required: true },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    capacity: { type: Number, default: 50 },
    stops: [
      {
        stopName: { type: String, required: true },
        morningTime: { type: String, required: true },
        eveningTime: { type: String, required: true },
        landmark: { type: String, default: '' },
      },
    ],
    status: {
      type: String,
      enum: ['On Route', 'At Campus', 'In Depot', 'Maintenance'],
      default: 'At Campus',
    },
    liveLocation: {
      latitude: { type: Number, default: 12.9716 },
      longitude: { type: Number, default: 77.5946 },
      updatedAt: { type: String, default: () => new Date().toISOString() },
    },
  },
  { timestamps: true }
);

export const Bus = mongoose.model<IBus>('Bus', BusSchema);
