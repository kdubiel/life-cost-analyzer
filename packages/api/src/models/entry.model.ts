import { Document, model, Schema } from 'mongoose';
import { Entry } from 'shared';

const EntrySchema = new Schema({
  date: Date,
  category: String,
  description: String,
  value: Number,
});

export default model<Entry & Document>('Entry', EntrySchema, 'Entries');
