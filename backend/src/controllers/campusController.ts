import { Request, Response } from 'express';
import { CampusLocation } from '../models/CampusLocation';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getCampusLocations = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.campusLocations];
      if (category && category !== 'ALL') {
        filtered = filtered.filter((l) => l.category.toLowerCase() === (category as string).toLowerCase());
      }
      if (search) {
        const query = (search as string).toLowerCase();
        filtered = filtered.filter(
          (l) =>
            l.name.toLowerCase().includes(query) ||
            l.building.toLowerCase().includes(query) ||
            l.description.toLowerCase().includes(query)
        );
      }
      return sendSuccess(res, filtered, 'Campus locations retrieved');
    }

    const filter: any = {};
    if (category && category !== 'ALL') filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { building: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const locations = await CampusLocation.find(filter);
    return sendSuccess(res, locations, 'Campus locations retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch campus locations: ' + error.message, 500);
  }
};
