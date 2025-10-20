import mongoose, { Document, Schema } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  author: string;
  content: string;
  featuredImage?: string;
  excerpt: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: Date;
  relatedArticles: string[];
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: String,
    excerpt: {
      type: String,
      required: true,
    },
    tags: [String],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: Date,
    relatedArticles: [String],
  },
  {
    timestamps: true,
  }
);

// Index for slug-based queries
articleSchema.index({ slug: 1 });
// Index for filtering by status
articleSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.model<IArticle>('Article', articleSchema);
