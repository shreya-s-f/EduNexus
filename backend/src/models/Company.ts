import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  logo: string;
  industry: string;
  website: string;
  description: string;
  tier: 'Dream / Tier 1' | 'Core' | 'Mass Recruiter' | 'Startup';
  packageRange: string; // e.g. "18 - 45 LPA"
  pastHiresCount: number;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String, default: '' },
    industry: { type: String, default: 'Information Technology' },
    website: { type: String, default: '' },
    description: { type: String, default: '' },
    tier: {
      type: String,
      enum: ['Dream / Tier 1', 'Core', 'Mass Recruiter', 'Startup'],
      default: 'Dream / Tier 1',
    },
    packageRange: { type: String, default: '12 - 25 LPA' },
    pastHiresCount: { type: Number, default: 20 },
    contactEmail: { type: String, default: 'recruitment@company.com' },
  },
  { timestamps: true }
);

export const Company = mongoose.model<ICompany>('Company', CompanySchema);
