import { Request, Response } from 'express';
import { Student } from '../models/Student';
import { Attendance } from '../models/Attendance';
import { Assignment } from '../models/Assignment';
import { Submission } from '../models/Submission';
import { Event } from '../models/Event';
import { Notice } from '../models/Notice';
import { Job } from '../models/Job';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getStudentDashboard = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email;
    const userUsn = req.user?.usn;

    if (isUsingMemoryStore) {
      const student = memoryStore.students.find(
        (s) => s.email === userEmail || (userUsn && s.usn === userUsn)
      ) || memoryStore.students[0];

      const notices = memoryStore.notices.slice(0, 5);
      const events = memoryStore.events.filter((e) => e.status === 'Upcoming').slice(0, 4);
      const jobs = memoryStore.jobs.filter((j) => j.status === 'Open').slice(0, 4);

      // Attendance statistics
      const studentAttendance = memoryStore.attendance.filter(
        (a) => a.studentUsn === (student ? student.usn : userUsn)
      );
      const totalClasses = studentAttendance.length || 48;
      const presentClasses = studentAttendance.filter((a) => a.status === 'present').length || 42;
      const attendancePercentage = student?.attendancePercentage || Math.round((presentClasses / totalClasses) * 100);

      const dashboardData = {
        student: student || {
          name: req.user?.name || 'Rahul Sharma',
          usn: req.user?.usn || '1EN21IS045',
          department: req.user?.department || 'Information Science & Engineering',
          semester: 6,
          section: 'A',
          cgpa: 8.7,
          attendancePercentage: 87.5,
          credits: 114,
        },
        stats: {
          attendance: `${attendancePercentage}%`,
          attendanceNumeric: attendancePercentage,
          cgpa: student?.cgpa?.toString() || '8.7',
          assignments: '8/10',
          certificates: student?.certifications?.length?.toString() || '12',
          projects: student?.projects?.length?.toString() || '5',
          hackathons: student?.achievements?.filter((a: any) => a.type === 'hackathon')?.length?.toString() || '3',
          credits: student?.credits || 114,
        },
        recentNotices: notices,
        upcomingEvents: events,
        placementOpportunities: jobs,
      };

      return sendSuccess(res, dashboardData, 'Student dashboard retrieved');
    }

    // Database lookup
    const student = await Student.findOne({
      $or: [{ email: userEmail }, { usn: userUsn }],
    });

    const notices = await Notice.find().sort({ createdAt: -1 }).limit(5);
    const events = await Event.find({ status: 'Upcoming' }).sort({ date: 1 }).limit(4);
    const jobs = await Job.find({ status: 'Open' }).sort({ deadline: 1 }).limit(4);

    const dashboardData = {
      student: student || {
        name: req.user?.name || 'Rahul Sharma',
        usn: req.user?.usn || '1EN21IS045',
        department: req.user?.department || 'Information Science & Engineering',
        semester: 6,
        section: 'A',
        cgpa: 8.7,
        attendancePercentage: 87.5,
        credits: 114,
      },
      stats: {
        attendance: `${student?.attendancePercentage || 87.5}%`,
        attendanceNumeric: student?.attendancePercentage || 87.5,
        cgpa: student?.cgpa?.toString() || '8.7',
        assignments: '8/10',
        certificates: student?.certifications?.length?.toString() || '12',
        projects: student?.projects?.length?.toString() || '5',
        hackathons: student?.achievements?.filter((a: any) => a.type === 'hackathon')?.length?.toString() || '3',
        credits: student?.credits || 114,
      },
      recentNotices: notices,
      upcomingEvents: events,
      placementOpportunities: jobs,
    };

    return sendSuccess(res, dashboardData, 'Student dashboard retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch student dashboard: ' + error.message, 500);
  }
};

export const updateStudentProfile = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email;
    const { phone, address, dob, skills, projects, certifications, achievements } = req.body;

    if (isUsingMemoryStore) {
      const idx = memoryStore.students.findIndex((s) => s.email === userEmail);
      if (idx !== -1) {
        if (phone) memoryStore.students[idx].phone = phone;
        if (address) memoryStore.students[idx].address = address;
        if (dob) memoryStore.students[idx].dob = dob;
        if (skills) memoryStore.students[idx].skills = skills;
        if (projects) memoryStore.students[idx].projects = projects;
        if (certifications) memoryStore.students[idx].certifications = certifications;
        if (achievements) memoryStore.students[idx].achievements = achievements;
        return sendSuccess(res, memoryStore.students[idx], 'Profile updated successfully');
      }
      return sendError(res, 'Student record not found', 404);
    }

    const student = await Student.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          phone,
          address,
          dob,
          skills,
          projects,
          certifications,
          achievements,
        },
      },
      { new: true }
    );

    if (!student) {
      return sendError(res, 'Student record not found', 404);
    }

    return sendSuccess(res, student, 'Profile updated successfully');
  } catch (error: any) {
    return sendError(res, 'Failed to update student profile: ' + error.message, 500);
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const { department, semester, search } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.students];
      if (department) {
        filtered = filtered.filter((s) => s.department.toLowerCase() === (department as string).toLowerCase());
      }
      if (semester) {
        filtered = filtered.filter((s) => s.semester === Number(semester));
      }
      if (search) {
        const query = (search as string).toLowerCase();
        filtered = filtered.filter(
          (s) => s.name.toLowerCase().includes(query) || s.usn.toLowerCase().includes(query)
        );
      }
      return sendSuccess(res, filtered, 'Students retrieved successfully');
    }

    const filter: any = {};
    if (department) filter.department = department;
    if (semester) filter.semester = Number(semester);
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { usn: { $regex: search, $options: 'i' } },
      ];
    }

    const students = await Student.find(filter).sort({ name: 1 });
    return sendSuccess(res, students, 'Students retrieved successfully');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch students: ' + error.message, 500);
  }
};
