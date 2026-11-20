import { Request, Response } from 'express';
import { Club } from '../models/Club';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getClubs = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.clubs];
      if (category && category !== 'ALL') {
        filtered = filtered.filter((c) => c.category.toLowerCase() === (category as string).toLowerCase());
      }
      if (search) {
        const query = (search as string).toLowerCase();
        filtered = filtered.filter(
          (c) => c.name.toLowerCase().includes(query) || c.shortDescription.toLowerCase().includes(query)
        );
      }
      return sendSuccess(res, filtered, 'Clubs retrieved');
    }

    const filter: any = {};
    if (category && category !== 'ALL') filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const clubs = await Club.find(filter);
    return sendSuccess(res, clubs, 'Clubs retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch clubs: ' + error.message, 500);
  }
};

export const joinClub = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.body;
    if (!clubId) {
      return sendError(res, 'Club ID is required', 400);
    }

    if (isUsingMemoryStore) {
      const club = memoryStore.clubs.find((c) => c._id === clubId);
      if (!club) {
        return sendError(res, 'Club not found', 404);
      }
      club.membersCount = (club.membersCount || 50) + 1;
      return sendSuccess(res, { clubName: club.name, membersCount: club.membersCount }, 'Joined club successfully!');
    }

    const club = await Club.findById(clubId);
    if (!club) {
      return sendError(res, 'Club not found', 404);
    }

    club.membersCount += 1;
    await club.save();

    return sendSuccess(res, { clubName: club.name, membersCount: club.membersCount }, 'Joined club successfully!');
  } catch (error: any) {
    return sendError(res, 'Failed to join club: ' + error.message, 500);
  }
};
