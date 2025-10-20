import { Request, Response } from 'express';
import WeightClass from '../models/WeightClass';
import Fighter from '../models/Fighter';

export const getAllRankings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const weightClasses = await WeightClass.find().lean();

    const rankingsData = await Promise.all(
      weightClasses.map(async (weightClass) => {
        // Get champion
        const champion = await Fighter.findOne({
          weightClass: weightClass._id,
          status: 'champion',
        })
          .select('firstName lastName stats')
          .lean();

        // Get top 10 ranked fighters (sorted by wins)
        const rankedFighters = await Fighter.find({
          weightClass: weightClass._id,
          status: { $in: ['active', 'champion'] },
        })
          .select('firstName lastName stats')
          .sort({ 'stats.wins': -1 })
          .limit(10)
          .lean();

        return {
          id: weightClass._id.toString(),
          name: weightClass.name,
          weight_lbs: weightClass.weight_lbs,
          champion: champion
            ? {
                id: champion._id.toString(),
                firstName: champion.firstName,
                lastName: champion.lastName,
                stats: champion.stats,
              }
            : null,
          rankings: rankedFighters.map((fighter, index) => ({
            rank: index + 1,
            fighter: {
              id: fighter._id.toString(),
              firstName: fighter.firstName,
              lastName: fighter.lastName,
              stats: fighter.stats,
            },
          })),
        };
      })
    );

    res.status(200).json({
      data: rankingsData,
    });
  } catch (error) {
    console.error('Get all rankings error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};

export const getSingleWeightClassRankings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { weightClass } = req.params;

    // Find weight class by name (case-insensitive)
    const weightClassDoc = await WeightClass.findOne({
      name: new RegExp(`^${weightClass}$`, 'i'),
    }).lean();

    if (!weightClassDoc) {
      res.status(404).json({
        error: 'Not Found',
        message: 'Weight class not found',
        statusCode: 404,
      });
      return;
    }

    // Get champion
    const champion = await Fighter.findOne({
      weightClass: weightClassDoc._id,
      status: 'champion',
    })
      .select('firstName lastName nickname stats')
      .lean();

    // Get top 10 ranked fighters
    const rankedFighters = await Fighter.find({
      weightClass: weightClassDoc._id,
      status: { $in: ['active', 'champion'] },
    })
      .select('firstName lastName stats')
      .sort({ 'stats.wins': -1 })
      .limit(10)
      .lean();

    res.status(200).json({
      id: weightClassDoc._id.toString(),
      name: weightClassDoc.name,
      weight_lbs: weightClassDoc.weight_lbs,
      champion: champion
        ? {
            id: champion._id.toString(),
            firstName: champion.firstName,
            lastName: champion.lastName,
            nickname: champion.nickname,
            stats: champion.stats,
          }
        : null,
      rankings: rankedFighters.map((fighter, index) => ({
        rank: index + 1,
        fighter: {
          id: fighter._id.toString(),
          firstName: fighter.firstName,
          lastName: fighter.lastName,
          stats: fighter.stats,
        },
      })),
    });
  } catch (error) {
    console.error('Get single weight class rankings error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};
