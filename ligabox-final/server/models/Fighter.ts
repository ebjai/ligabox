import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFighter extends Document {
  firstName: string;
  lastName: string;
  nickname?: string;
  slug: string;
  weightClass: Types.ObjectId;
  status: 'active' | 'inactive' | 'champion';
  bio?: string;
  stats: {
    wins: number;
    losses: number;
    draws: number;
    knockouts: number;
  };
  physical: {
    height_cm: number;
    reach_cm: number;
    stance: 'orthodox' | 'southpaw';
  };
  media: {
    profileImage?: string;
    heroImage?: string;
    gallery: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const fighterSchema = new Schema<IFighter>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    nickname: String,
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    weightClass: {
      type: Schema.Types.ObjectId,
      ref: 'WeightClass',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'champion'],
      default: 'active',
    },
    bio: String,
    stats: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
      knockouts: { type: Number, default: 0 },
    },
    physical: {
      height_cm: { type: Number, required: true },
      reach_cm: { type: Number, required: true },
      stance: {
        type: String,
        enum: ['orthodox', 'southpaw'],
        default: 'orthodox',
      },
    },
    media: {
      profileImage: String,
      heroImage: String,
      gallery: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Index for slug-based queries
fighterSchema.index({ slug: 1 });
// Index for filtering
fighterSchema.index({ weightClass: 1, status: 1 });

export default mongoose.model<IFighter>('Fighter', fighterSchema);
