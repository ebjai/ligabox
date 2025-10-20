import mongoose, { Document, Schema } from 'mongoose';

export interface IWeightClass extends Document {
  name: string;
  weight_lbs: number;
  createdAt: Date;
  updatedAt: Date;
}

const weightClassSchema = new Schema<IWeightClass>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    weight_lbs: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWeightClass>('WeightClass', weightClassSchema);
