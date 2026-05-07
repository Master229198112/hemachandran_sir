import mongoose, { Schema, Document } from 'mongoose';

export interface IPublication extends Document {
  title: string;
  authors: string;
  date: string;
  link: string;
  type: 'Journal' | 'Article';
  thumbnail?: string; // mostly for Articles
  description?: string; // mostly for Articles
  publishedIn?: string; // journal/conference/publisher name
}

const PublicationSchema: Schema = new Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, enum: ['Journal', 'Article'], required: true },
  thumbnail: { type: String },
  description: { type: String },
  publishedIn: { type: String },
}, { timestamps: true });

export default mongoose.models.Publication || mongoose.model<IPublication>('Publication', PublicationSchema);
