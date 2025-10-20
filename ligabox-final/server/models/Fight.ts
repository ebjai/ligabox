import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFight extends Document {
  fighters: Types.ObjectId[];
  weightClass: string;
  isTitleFight: boolean;
  rounds: number;
  event?: Types.ObjectId;
  result?: {
    winner: Types.ObjectId;
    method: string;
    finalRound: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const fightSchema = new Schema<IFight>(
  {
    fighters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Fighter',
        required: true,
      },
    ],
    weightClass: {
      type: String,
      required: true,
    },
    isTitleFight: {
      type: Boolean,
      default: false,
    },
    rounds: {
      type: Number,
      default: 12,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    result: {
      winner: {
        type: Schema.Types.ObjectId,
        ref: 'Fighter',
      },
      method: String,
      finalRound: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFight>('Fight', fightSchema);
