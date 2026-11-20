import { Request, Response } from 'express';
import { Alumni } from '../models/Alumni';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getAlumniDirectory = async (req: Request, res: Response) => {
  try {
    const { department, search } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.alumni];
      if (department) {
        filtered = filtered.filter((a) => a.department.toLowerCase() === (department as string).toLowerCase());
      }
      if (search) {
        const query = (search as string).toLowerCase();
        filtered = filtered.filter(
          (a) =>
            a.name.toLowerCase().includes(query) ||
            a.company.toLowerCase().includes(query) ||
            a.designation.toLowerCase().includes(query)
        );
      }
      return sendSuccess(res, filtered, 'Alumni directory retrieved');
    }

    const filter: any = {};
    if (department) filter.department = department;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
      ];
    }

    const alumni = await Alumni.find(filter).sort({ graduationYear: -1 });
    return sendSuccess(res, alumni, 'Alumni directory retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch alumni: ' + error.message, 500);
  }
};
