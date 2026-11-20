import mongoose, { Document, Schema } from 'mongoose';

export interface IMessMenu {
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
}

export interface IHostel extends Document {
  name: string;
  type: 'Boys' | 'Girls';
  totalRooms: number;
  availableRooms: number;
  wardenName: string;
  wardenPhone: string;
  wardenEmail: string;
  messMenu: IMessMenu;
  rules: string[];
  feePerSemester: number;
  facilities: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HostelSchema = new Schema<IHostel>(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ['Boys', 'Girls'], required: true },
    totalRooms: { type: Number, default: 120 },
    availableRooms: { type: Number, default: 24 },
    wardenName: { type: String, required: true },
    wardenPhone: { type: String, required: true },
    wardenEmail: { type: String, required: true },
    messMenu: {
      breakfast: { type: String, default: 'Idli, Vada, Sambar, Chutney, Tea/Coffee' },
      lunch: { type: String, default: 'Rice, Roti, Dal Tadka, Paneer Butter Masala, Curd' },
      snacks: { type: String, default: 'Samosa / Veg Puff, Biscuits, Hot Tea' },
      dinner: { type: String, default: 'Chapati, Mixed Veg Curry, Jeera Rice, Rasam' },
    },
    rules: {
      type: [String],
      default: [
        'Curfew time: 9:30 PM strictly',
        'Biometric check-in mandatory',
        'Visitors allowed only in common lounge till 7:00 PM',
      ],
    },
    feePerSemester: { type: Number, default: 45000 },
    facilities: {
      type: [String],
      default: ['High-speed Wi-Fi', '24/7 Security & CCTV', 'Solar Water Heaters', 'Gymnasium', 'Laundry Facility'],
    },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Hostel = mongoose.model<IHostel>('Hostel', HostelSchema);
