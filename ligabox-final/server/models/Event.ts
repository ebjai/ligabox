import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEvent extends Document {
  eventName: string;
  slug: string;
  date: Date;
  location: string;
  status: 'upcoming' | 'live' | 'completed';
  ticketUrl?: string;
  streamUrl?: string;
  fights: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    eventName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'live', 'completed'],
      default: 'upcoming',
    },
    ticketUrl: String,
    streamUrl: String,
    fights: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Fight',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for slug-based queries
eventSchema.index({ slug: 1 });
// Index for filtering by status and date
eventSchema.index({ status: 1, date: -1 });

export default mongoose.model<IEvent>('Event', eventSchema);
