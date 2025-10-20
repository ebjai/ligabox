import { Request, Response } from 'express';
import Event from '../models/Event';
import Fight from '../models/Fight';

export const getAllEvents = async (
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

    const [events, total] = await Promise.all([
      Event.find(query)
        .populate({
          path: 'fights',
          populate: {
            path: 'fighters',
            select: 'firstName lastName',
          },
        })
        .sort({ date: -1 })
        .limit(limitNum)
        .skip(skip)
        .lean(),
      Event.countDocuments(query),
    ]);

    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      data: events.map((event: any) => ({
        id: event._id.toString(),
        eventName: event.eventName,
        slug: event.slug,
        date: event.date,
        location: event.location,
        status: event.status,
        ticketUrl: event.ticketUrl,
        streamUrl: event.streamUrl,
        fights: event.fights.map((fight: any) => ({
          id: fight._id.toString(),
          fighters: fight.fighters.map((fighter: any) => ({
            id: fighter._id.toString(),
            name: `${fighter.firstName} ${fighter.lastName}`,
          })),
          weightClass: fight.weightClass,
          isTitleFight: fight.isTitleFight,
        })),
      })),
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages,
      },
    });
  } catch (error) {
    console.error('Get all events error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};

export const getSingleEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug })
      .populate({
        path: 'fights',
        populate: {
          path: 'fighters',
          select: 'firstName lastName nickname stats',
        },
      })
      .lean();

    if (!event) {
      res.status(404).json({
        error: 'Not Found',
        message: 'Event not found',
        statusCode: 404,
      });
      return;
    }

    res.status(200).json({
      id: event._id.toString(),
      eventName: event.eventName,
      slug: event.slug,
      date: event.date,
      location: event.location,
      status: event.status,
      ticketUrl: event.ticketUrl,
      streamUrl: event.streamUrl,
      fights: (event.fights as any[]).map((fight: any) => ({
        id: fight._id.toString(),
        fighters: fight.fighters.map((fighter: any) => ({
          id: fighter._id.toString(),
          firstName: fighter.firstName,
          lastName: fighter.lastName,
          nickname: fighter.nickname,
          stats: fighter.stats,
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
      })),
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    });
  } catch (error) {
    console.error('Get single event error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    });
  }
};
