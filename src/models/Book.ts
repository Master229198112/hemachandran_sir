import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  publisher: string;
  publishedDate: string;
  coverImage: string;
  amazonLink?: string;
  publisherLink?: string;
  format: string;
  publishedIn?: string;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  publisher: { type: String, required: true },
  publishedDate: { type: String, required: true },
  coverImage: { type: String, required: true },
  amazonLink: { type: String },
  publisherLink: { type: String },
  format: { type: String, default: 'Paperback' },
  publishedIn: { type: String },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
