import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  imageUrl: string;
  type: 'client' | 'mou';
  order?: number;
}

const PartnerSchema: Schema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, required: true, enum: ['client', 'mou'] },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Partner || mongoose.model<IPartner>('Partner', PartnerSchema);
