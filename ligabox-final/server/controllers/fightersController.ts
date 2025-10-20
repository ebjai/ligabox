import { Request, Response } from 'express';
import Fighter from '../models/Fighter';
import Fight from '../models/Fight';

export const getAllFighters = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      weightClass,
      status,
      limit = '10',
      page = '1',
      withPhotos = 'false',
    } = req.query;

    const query: any = {};

    if (weightClass) {
      query.weightClass = weightClass;
    }

    if (status) {
      query.status = status;
    }

    if (withPhotos === 'true') {
      query['media.profileImage'] = { $exists: true, $ne: '' };
    }

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [fighters, total] = await Promise.all([
      Fighter.find(query)
        .populate('weightClass', 'name')
        .limit(limitNum)
        .skip(skip)
        .lean(),
      Fighter.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      data: fighters.map((fighter: any) => ({
        id: fighter._id.toString(),
        firstName: fighter.firstName,
        lastName: fighter.lastName,
        nickname: fighter.nickname,
        slug: fighter.slug,
        weightClass: {
          id: fighter.weightClass._id.toString(),
          name: fighter.weightClass.name,
        },
        status: fighter.status,
        stats: fighter.stats,
        physical: fighter.physical,
        media: fighter.media,
      })),
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages,
      },
    });
  } catch (error) {
    console.error('Get all fighters error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};

export const getSingleFighter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;

    const fighter = await Fighter.findOne({ slug })
      .populate('weightClass', 'name weight_lbs')
      .lean();

    if (!fighter) {
      res.status(404).json({
        error: 'Not Found',
        message: 'Fighter not found',
        statusCode: 404,
      });
      return;
    }

    // Get fight history for this fighter
    const fights = await Fight.find({
      fighters: fighter._id,
      'result.winner': { $exists: true },
    })
      .populate('fighters', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const fightHistory = fights.map((fight: any) => {
      const opponent = fight.fighters.find(
        (f: any) => f._id.toString() !== fighter._id.toString()
      );
      const isWinner = fight.result?.winner?.toString() === fighter._id.toString();

      return {
        id: fight._id.toString(),
        opponent: opponent ? `${opponent.firstName} ${opponent.lastName}` : 'Unknown',
        date: fight.createdAt,
        result: isWinner ? 'win' : 'loss',
        method: fight.result?.method || '',
        round: fight.result?.finalRound || 0,
      };
    });

    res.status(200).json({
      id: fighter._id.toString(),
      firstName: fighter.firstName,
      lastName: fighter.lastName,
      nickname: fighter.nickname,
      slug: fighter.slug,
      weightClass: {
        id: (fighter.weightClass as any)._id.toString(),
        name: (fighter.weightClass as any).name,
        weight_lbs: (fighter.weightClass as any).weight_lbs,
      },
      status: fighter.status,
      bio: fighter.bio,
      stats: fighter.stats,
      physical: fighter.physical,
      media: fighter.media,
      fightHistory,
      createdAt: fighter.createdAt,
      updatedAt: fighter.updatedAt,
    });
  } catch (error) {
    console.error('Get single fighter error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};

export const getFightersWithPhotos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit = '20', page = '1' } = req.query;

    const query = {
      'media.profileImage': { $exists: true, $ne: '' },
    };

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const [fighters, total] = await Promise.all([
      Fighter.find(query)
        .populate('weightClass', 'name')
        .limit(limitNum)
        .skip(skip)
        .lean(),
      Fighter.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      data: fighters.map((fighter: any) => ({
        id: fighter._id.toString(),
        firstName: fighter.firstName,
        lastName: fighter.lastName,
        nickname: fighter.nickname,
        slug: fighter.slug,
        weightClass: {
          id: fighter.weightClass._id.toString(),
          name: fighter.weightClass.name,
        },
        status: fighter.status,
        stats: fighter.stats,
        physical: fighter.physical,
        media: fighter.media,
      })),
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages,
      },
    });
  } catch (error) {
    console.error('Get fighters with photos error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};
