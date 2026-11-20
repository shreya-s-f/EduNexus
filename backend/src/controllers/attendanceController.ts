import { Request, Response } from 'express';
import { Attendance } from '../models/Attendance';
import { Student } from '../models/Student';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getStudentAttendanceSummary = async (req: Request, res: Response) => {
  try {
    const studentUsn = (req.query.usn as string) || req.user?.usn || '1EN21IS045';

    // Core realistic subject metrics
    const sampleSubjects = [
      { code: '21IS51', name: 'Database Management Systems', attended: 42, total: 48, faculty: 'Dr. K. S. Venkatesh' },
      { code: '21IS52', name: 'Artificial Intelligence & Machine Learning', attended: 39, total: 45, faculty: 'Prof. Ananya Rao' },
      { code: '21IS53', name: 'Computer Networks', attended: 35, total: 42, faculty: 'Dr. R. Ramanathan' },
      { code: '21IS54', name: 'Automata Theory & Computability', attended: 26, total: 38, faculty: 'Prof. Sneha Deshmukh' }, // < 75% for smart warning!
      { code: '21IS55', name: 'Software Architecture & Design Patterns', attended: 44, total: 48, faculty: 'Prof. Vikram Malhotra' },
      { code: '21ISL56', name: 'DBMS & Network Laboratory', attended: 22, total: 24, faculty: 'Dr. K. S. Venkatesh' },
    ];

    const subjectsSummary = sampleSubjects.map((sub) => {
      const percentage = Number(((sub.attended / sub.total) * 100).toFixed(1));
      let classesNeededFor75 = 0;
      let classesCanBunk = 0;

      if (percentage < 75) {
        // formula: (attended + x) / (total + x) >= 0.75
        // attended + x >= 0.75*total + 0.75*x
        // 0.25*x >= 0.75*total - attended
        // x >= (3*total - 4*attended)
        classesNeededFor75 = Math.max(0, Math.ceil(3 * sub.total - 4 * sub.attended));
      } else {
        // formula: attended / (total + y) >= 0.75
        // total + y <= attended / 0.75
        // y <= (attended / 0.75) - total
        classesCanBunk = Math.max(0, Math.floor(sub.attended / 0.75 - sub.total));
      }

      return {
        ...sub,
        percentage,
        isWarning: percentage < 75,
        classesNeededFor75,
        classesCanBunk,
        status: percentage >= 85 ? 'Excellent' : percentage >= 75 ? 'Good' : 'Critical Warning',
      };
    });

    const totalClassesHeld = subjectsSummary.reduce((acc, s) => acc + s.total, 0);
    const totalClassesAttended = subjectsSummary.reduce((acc, s) => acc + s.attended, 0);
    const overallPercentage = Number(((totalClassesAttended / totalClassesHeld) * 100).toFixed(1));

    const criticalSubjects = subjectsSummary.filter((s) => s.isWarning);

    return sendSuccess(res, {
      studentUsn,
      overall: {
        totalHeld: totalClassesHeld,
        totalAttended: totalClassesAttended,
        percentage: overallPercentage,
        status: overallPercentage >= 75 ? 'Eligible' : 'Attendance Shortage',
      },
      criticalSubjectsCount: criticalSubjects.length,
      warningMessage:
        criticalSubjects.length > 0
          ? `Warning: You have ${criticalSubjects.length} subject(s) with attendance below mandatory 75% threshold.`
          : 'Great job! Your attendance is well above the minimum university requirements.',
      subjects: subjectsSummary,
    });
  } catch (error: any) {
    return sendError(res, 'Failed to fetch attendance summary: ' + error.message, 500);
  }
};

export const markBatchAttendance = async (req: Request, res: Response) => {
  try {
    const { department, semester, section, subjectCode, subjectName, date, records } = req.body;

    if (!department || !semester || !subjectCode || !date || !records || !Array.isArray(records)) {
      return sendError(res, 'Department, semester, subject, date, and attendance records are required.', 400);
    }

    const facultyEmail = req.user?.email || 'faculty@edunexus.demo';
    const facultyName = req.user?.name || 'Faculty Member';

    if (isUsingMemoryStore) {
      records.forEach((rec: { studentUsn: string; studentName: string; status: 'present' | 'absent' }) => {
        const existingIdx = memoryStore.attendance.findIndex(
          (a) => a.studentUsn === rec.studentUsn && a.subjectCode === subjectCode && a.date === date
        );

        const newRec = {
          _id: 'att_' + Date.now() + '_' + Math.random(),
          studentUsn: rec.studentUsn,
          studentName: rec.studentName,
          subjectCode,
          subjectName,
          department,
          semester: Number(semester),
          section: section || 'A',
          date,
          status: rec.status,
          facultyEmail,
          facultyName,
          createdAt: new Date(),
        };

        if (existingIdx !== -1) {
          memoryStore.attendance[existingIdx] = newRec;
        } else {
          memoryStore.attendance.push(newRec);
        }
      });

      return sendSuccess(res, { markedCount: records.length }, 'Attendance marked successfully');
    }

    const bulkOps = records.map((rec: { studentUsn: string; studentName: string; status: 'present' | 'absent' }) => ({
      updateOne: {
        filter: { studentUsn: rec.studentUsn, subjectCode, date },
        update: {
          $set: {
            studentName: rec.studentName,
            subjectName,
            department,
            semester: Number(semester),
            section: section || 'A',
            status: rec.status,
            facultyEmail,
            facultyName,
          },
        },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(bulkOps);

    return sendSuccess(res, { markedCount: records.length }, 'Attendance marked successfully');
  } catch (error: any) {
    return sendError(res, 'Failed to mark attendance: ' + error.message, 500);
  }
};
