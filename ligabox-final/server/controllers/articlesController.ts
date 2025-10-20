import { Request, Response } from 'express';
import Article from '../models/Article';

export const getAllArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status, limit = '10', page = '1' } = req.query;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [articles, total] = await Promise.all([
      Article.find(query)
        .select('-content')
        .sort({ publishedAt: -1, createdAt: -1 })
        .limit(limitNum)
        .skip(skip)
        .lean(),
      Article.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      data: articles.map((article) => ({
        id: article._id.toString(),
        title: article.title,
        slug: article.slug,
        author: article.author,
        featuredImage: article.featuredImage,
        excerpt: article.excerpt,
        tags: article.tags,
        status: article.status,
        publishedAt: article.publishedAt,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      })),
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages,
      },
    });
  } catch (error) {
    console.error('Get all articles error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};

export const getSingleArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;

    const article = await Article.findOne({ slug }).lean();

    if (!article) {
      res.status(404).json({
        error: 'Not Found',
        message: 'Article not found',
        statusCode: 404,
      });
      return;
    }

    // Get related articles
    const relatedArticles = await Article.find({
      _id: { $ne: article._id },
      tags: { $in: article.tags },
      status: 'published',
    })
      .select('title slug')
      .limit(3)
      .lean();

    res.status(200).json({
      id: article._id.toString(),
      title: article.title,
      slug: article.slug,
      author: article.author,
      content: article.content,
      featuredImage: article.featuredImage,
      tags: article.tags,
      status: article.status,
      publishedAt: article.publishedAt,
      relatedArticles: relatedArticles.map((rel) => ({
        id: rel._id.toString(),
        title: rel.title,
        slug: rel.slug,
      })),
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    });
  } catch (error) {
    console.error('Get single article error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};
