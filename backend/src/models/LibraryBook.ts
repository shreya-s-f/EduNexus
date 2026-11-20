import mongoose, { Document, Schema } from 'mongoose';

export interface ILibraryBook extends Document {
  title: string;
  author: string;
  isbn: string;
  category: string;
  department: string;
  totalCopies: number;
  availableCopies: number;
  rackLocation: string; // e.g. "Rack B-04"
  eResourceUrl?: string;
  coverImage?: string;
  publisher?: string;
  edition?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LibraryBookSchema = new Schema<ILibraryBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    department: { type: String, default: 'ALL' },
    totalCopies: { type: Number, default: 5 },
    availableCopies: { type: Number, default: 5 },
    rackLocation: { type: String, default: 'Floor 1, Shelf A' },
    eResourceUrl: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    publisher: { type: String, default: 'Pearson / McGraw-Hill' },
    edition: { type: String, default: '4th Edition' },
  },
  { timestamps: true }
);

export const LibraryBook = mongoose.model<ILibraryBook>('LibraryBook', LibraryBookSchema);
