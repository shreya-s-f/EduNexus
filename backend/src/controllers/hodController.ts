import { Request, Response } from 'express';
import { Department } from '../models/Department';
import { Faculty } from '../models/Faculty';
import { Student } from '../models/Student';
import { Notice } from '../models/Notice';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getHodDashboard = async (req: Request, res: Response) => {
  try {
    const departmentCode = req.user?.department || 'ISE';

    if (isUsingMemoryStore) {
      const department = memoryStore.departments.find(
        (d) => d.code === departmentCode || d.name === departmentCode
      ) || memoryStore.departments[0];

      const facultyMembers = memoryStore.faculty.filter(
        (f) => f.department === departmentCode || f.department === department?.name
      );
      const students = memoryStore.students.filter(
        (s) => s.department === departmentCode || s.department === department?.name
      );
      const notices = memoryStore.notices.filter(
        (n) => n.department === departmentCode || n.department === 'ALL'
      );

      return sendSuccess(res, {
        department,
        stats: {
          totalFaculty: facultyMembers.length || 24,
          totalStudents: students.length || 480,
          averageAttendance: '88.4%',
          averageCgpa: '8.42',
          activeLabs: department?.labs?.length || 6,
          placementRate: '94.2%',
        },
        facultyList: facultyMembers,
        recentNotices: notices.slice(0, 5),
      });
    }

    const department = await Department.findOne({ code: departmentCode });
    const facultyMembers = await Faculty.find({ department: department?.name || departmentCode });
    const studentsCount = await Student.countDocuments({ department: department?.name || departmentCode });
    const notices = await Notice.find({ $or: [{ department: departmentCode }, { department: 'ALL' }] }).limit(5);

    return sendSuccess(res, {
      department,
      stats: {
        totalFaculty: facultyMembers.length || 24,
        totalStudents: studentsCount || 480,
        averageAttendance: '88.4%',
        averageCgpa: '8.42',
        activeLabs: department?.labs?.length || 6,
        placementRate: '94.2%',
      },
      facultyList: facultyMembers,
      recentNotices: notices,
    });
  } catch (error: any) {
    return sendError(res, 'Failed to fetch HOD dashboard: ' + error.message, 500);
  }
};
