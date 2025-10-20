import { Request, Response } from 'express';
import Fight from '../models/Fight';
import Fighter from '../models/Fighter';

export const getSingleFight = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const fight = await Fight.findById(id)
      .populate('fighters', 'firstName lastName')
      .lean();

    if (!fight) {
      res.status(404).json({
        error: 'Not Found',
        message: 'Fight not found',
        statusCode: 404,
      });
      return;
    }

    res.status(200).json({
      id: fight._id.toString(),
      fighters: (fight.fighters as any[]).map((fighter: any) => ({
        id: fighter._id.toString(),
        name: `${fighter.firstName} ${fighter.lastName}`,
      })),
      weightClass: fight.weightClass,
      isTitleFight: fight.isTitleFight,
      rounds: fight.rounds,
      result: fight.result
        ? {
            winner: fight.result.winner.toString(),
            method: fight.result.method,
            finalRound: fight.result.finalRound,
          }
        : null,
    });
  } catch (error) {
    console.error('Get single fight error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};

export const updateFightResult = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { winnerId, method, finalRound } = req.body;

    if (!winnerId || !method || !finalRound) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'winnerId, method, and finalRound are required',
        statusCode: 400,
      });
      return;
    }

    const fight = await Fight.findById(id);

    if (!fight) {
      res.status(404).json({
        error: 'Not Found',
        message: 'Fight not found',
        statusCode: 404,
      });
      return;
    }

    // Verify winner is one of the fighters
    const winnerExists = fight.fighters.some(
      (fighterId) => fighterId.toString() === winnerId
    );

    if (!winnerExists) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Winner must be one of the fighters in this fight',
        statusCode: 400,
      });
      return;
    }

    fight.result = {
      winner: winnerId,
      method,
      finalRound,
    };

    await fight.save();

    // Update fighter stats
    const winner = await Fighter.findById(winnerId);
    if (winner) {
      winner.stats.wins += 1;
      if (method === 'KO' || method === 'TKO') {
        winner.stats.knockouts += 1;
      }
      await winner.save();
    }

    // Update loser stats
    const loserId = fight.fighters.find(
      (fighterId) => fighterId.toString() !== winnerId
    );
    if (loserId) {
      const loser = await Fighter.findById(loserId);
      if (loser) {
        loser.stats.losses += 1;
        await loser.save();
      }
    }

    res.status(200).json({
      message: 'Fight result updated successfully',
      fight: {
        id: (fight._id as any).toString(),
        result: {
          winner: (fight.result.winner as any).toString(),
          method: fight.result.method,
          finalRound: fight.result.finalRound,
        },
      },
    });
  } catch (error) {
    console.error('Update fight result error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};
