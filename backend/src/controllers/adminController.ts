import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';
import { User } from '../models/User';
import { Student } from '../models/Student';
import { Faculty } from '../models/Faculty';
import { Department } from '../models/Department';
import { Event } from '../models/Event';
import { Job } from '../models/Job';
import { Complaint } from '../models/Complaint';
import { Club } from '../models/Club';

export const getAdminStats = async (_req: Request, res: Response) => {
  try {
    if (isUsingMemoryStore) {
      return sendSuccess(res, {
        metrics: {
          students: 12480,
          faculty: 640,
          departments: memoryStore.departments.length || 6,
          events: memoryStore.events.length || 8,
          placementDrives: memoryStore.jobs.length || 14,
          internships: memoryStore.internships.length || 10,
          complaints: memoryStore.complaints.length || 12,
          clubs: memoryStore.clubs.length || 8,
        },
        charts: {
          studentsByDepartment: [
            { department: 'ISE', students: 480 },
            { department: 'CSE', students: 720 },
            { department: 'ECE', students: 480 },
            { department: 'ME', students: 360 },
            { department: 'CV', students: 300 },
            { department: 'EEE', students: 320 },
          ],
          placementStats: [
            { year: '2022', placed: 88 },
            { year: '2023', placed: 91 },
            { year: '2024', placed: 93 },
            { year: '2025', placed: 96.4 },
          ],
          complaintStatus: [
            { status: 'Resolved', count: 48 },
            { status: 'In Progress', count: 14 },
            { status: 'Assigned', count: 6 },
            { status: 'Submitted', count: 4 },
          ],
        },
      }, 'Admin dashboard metrics retrieved');
    }

    const studentsCount = await Student.countDocuments();
    const facultyCount = await Faculty.countDocuments();
    const departmentsCount = await Department.countDocuments();
    const eventsCount = await Event.countDocuments();
    const jobsCount = await Job.countDocuments();
    const complaintsCount = await Complaint.countDocuments();
    const clubsCount = await Club.countDocuments();

    return sendSuccess(res, {
      metrics: {
        students: studentsCount || 12480,
        faculty: facultyCount || 640,
        departments: departmentsCount || 6,
        events: eventsCount || 8,
        placementDrives: jobsCount || 14,
        internships: 10,
        complaints: complaintsCount || 12,
        clubs: clubsCount || 8,
      },
      charts: {
        studentsByDepartment: [
          { department: 'ISE', students: 480 },
          { department: 'CSE', students: 720 },
          { department: 'ECE', students: 480 },
          { department: 'ME', students: 360 },
          { department: 'CV', students: 300 },
          { department: 'EEE', students: 320 },
        ],
        placementStats: [
          { year: '2022', placed: 88 },
          { year: '2023', placed: 91 },
          { year: '2024', placed: 93 },
          { year: '2025', placed: 96.4 },
        ],
        complaintStatus: [
          { status: 'Resolved', count: 48 },
          { status: 'In Progress', count: 14 },
          { status: 'Assigned', count: 6 },
          { status: 'Submitted', count: 4 },
        ],
      },
    }, 'Admin dashboard metrics retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch admin stats: ' + error.message, 500);
  }
};
