import mongoose, { Schema, Document } from 'mongoose';

export interface IPatent extends Document {
  title: string;
  description?: string;
  date?: string;
}

const PatentSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String },
}, { timestamps: true });

export default mongoose.models.Patent || mongoose.model<IPatent>('Patent', PatentSchema);
