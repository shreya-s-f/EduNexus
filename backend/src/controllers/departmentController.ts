import { Request, Response } from 'express';
import { Department } from '../models/Department';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getDepartments = async (_req: Request, res: Response) => {
  try {
    if (isUsingMemoryStore) {
      return sendSuccess(res, memoryStore.departments, 'Departments retrieved');
    }
    const departments = await Department.find();
    return sendSuccess(res, departments, 'Departments retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch departments: ' + error.message, 500);
  }
};

export const getDepartmentByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const upperCode = code.toUpperCase();

    if (isUsingMemoryStore) {
      const dept = memoryStore.departments.find(
        (d) => d.code === upperCode || d.name.toLowerCase() === code.toLowerCase()
      );
      if (!dept) return sendError(res, 'Department not found', 404);
      return sendSuccess(res, dept, 'Department details retrieved');
    }

    const dept = await Department.findOne({ code: upperCode });
    if (!dept) return sendError(res, 'Department not found', 404);
    return sendSuccess(res, dept, 'Department details retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch department details: ' + error.message, 500);
  }
};
