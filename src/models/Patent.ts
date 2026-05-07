import mongoose from 'mongoose';

export interface IPatent {
  title: string;
  number: string;
  inventor?: string;
  status: 'Patent issued' | 'Patent pending';
  date: string;
  link?: string;
  description: string;
  order?: number;
  publishedIn?: string;
  createdAt?: Date;
}

const PatentSchema = new mongoose.Schema<IPatent>(
  {
    title: { type: String, required: true },
    number: { type: String },
    inventor: { type: String },
    status: { type: String, enum: ['Patent issued', 'Patent pending'], default: 'Patent pending' },
    date: { type: String },
    link: { type: String },
    description: { type: String },
    order: { type: Number, default: 0 },
    publishedIn: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Patent || mongoose.model<IPatent>('Patent', PatentSchema);
