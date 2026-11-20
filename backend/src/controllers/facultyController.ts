import { Request, Response } from 'express';
import { Faculty } from '../models/Faculty';
import { Subject } from '../models/Subject';
import { Assignment } from '../models/Assignment';
import { Submission } from '../models/Submission';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getFacultyDashboard = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email;

    if (isUsingMemoryStore) {
      const faculty = memoryStore.faculty.find((f) => f.email === userEmail) || memoryStore.faculty[0];
      const subjects = memoryStore.subjects.filter((s) => s.department === (faculty ? faculty.department : 'ISE'));
      const assignments = memoryStore.assignments.filter((a) => a.facultyEmail === userEmail);
      const pendingSubmissions = memoryStore.submissions.filter((s) => s.status === 'submitted');

      return sendSuccess(res, {
        faculty: faculty || {
          name: req.user?.name || 'Dr. K. S. Venkatesh',
          email: userEmail,
          department: 'Information Science & Engineering',
          designation: 'Associate Professor',
          facultyId: 'FAC102',
        },
        assignedSubjects: subjects.slice(0, 3),
        stats: {
          totalStudentsTaught: 128,
          activeSubjects: subjects.length || 3,
          pendingEvaluations: pendingSubmissions.length || 6,
          announcementsPublished: 8,
        },
        todaySchedule: [
          { time: '09:00 - 10:00 AM', subject: 'Database Management Systems (21IS51)', room: 'LH-201', type: 'Lecture' },
          { time: '11:15 - 01:15 PM', subject: 'DBMS Laboratory (21ISL56)', room: 'Lab 3 (Ground Floor)', type: 'Lab' },
          { time: '02:00 - 03:00 PM', subject: 'Artificial Intelligence & ML (21IS52)', room: 'LH-201', type: 'Lecture' },
        ],
        recentAssignments: assignments,
      });
    }

    const faculty = await Faculty.findOne({ email: userEmail });
    const subjects = await Subject.find({ department: faculty?.department || 'ISE' });
    const assignments = await Assignment.find({ facultyEmail: userEmail });
    const pendingSubmissions = await Submission.find({ status: 'submitted' });

    return sendSuccess(res, {
      faculty: faculty || {
        name: req.user?.name || 'Dr. K. S. Venkatesh',
        email: userEmail,
        department: 'Information Science & Engineering',
        designation: 'Associate Professor',
        facultyId: 'FAC102',
      },
      assignedSubjects: subjects.slice(0, 3),
      stats: {
        totalStudentsTaught: 128,
        activeSubjects: subjects.length || 3,
        pendingEvaluations: pendingSubmissions.length || 6,
        announcementsPublished: 8,
      },
      todaySchedule: [
        { time: '09:00 - 10:00 AM', subject: 'Database Management Systems (21IS51)', room: 'LH-201', type: 'Lecture' },
        { time: '11:15 - 01:15 PM', subject: 'DBMS Laboratory (21ISL56)', room: 'Lab 3 (Ground Floor)', type: 'Lab' },
        { time: '02:00 - 03:00 PM', subject: 'Artificial Intelligence & ML (21IS52)', room: 'LH-201', type: 'Lecture' },
      ],
      recentAssignments: assignments,
    });
  } catch (error: any) {
    return sendError(res, 'Failed to fetch faculty dashboard: ' + error.message, 500);
  }
};

export const getAllFaculty = async (req: Request, res: Response) => {
  try {
    const { department } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.faculty];
      if (department) {
        filtered = filtered.filter((f) => f.department.toLowerCase() === (department as string).toLowerCase());
      }
      return sendSuccess(res, filtered, 'Faculty list retrieved');
    }

    const filter: any = {};
    if (department) filter.department = department;

    const facultyList = await Faculty.find(filter).sort({ name: 1 });
    return sendSuccess(res, facultyList, 'Faculty list retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch faculty: ' + error.message, 500);
  }
};
