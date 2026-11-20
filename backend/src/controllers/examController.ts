import { Request, Response } from 'express';
import { Exam } from '../models/Exam';
import { Result } from '../models/Result';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getExams = async (req: Request, res: Response) => {
  try {
    const defaultExams = [
      {
        _id: 'exam_internal_2',
        title: 'Continuous Internal Evaluation (CIE - II)',
        type: 'Internal 2',
        department: 'ISE',
        semester: 6,
        academicYear: '2025-2026',
        startDate: '2026-03-16',
        endDate: '2026-03-21',
        timetable: [
          { date: '2026-03-16', time: '10:00 AM - 11:30 AM', subjectCode: '21IS51', subjectName: 'Database Management Systems', maxMarks: 50, roomNumber: 'Block 2, Room 301' },
          { date: '2026-03-17', time: '10:00 AM - 11:30 AM', subjectCode: '21IS52', subjectName: 'Artificial Intelligence & ML', maxMarks: 50, roomNumber: 'Block 2, Room 301' },
          { date: '2026-03-18', time: '10:00 AM - 11:30 AM', subjectCode: '21IS53', subjectName: 'Computer Networks', maxMarks: 50, roomNumber: 'Block 2, Room 301' },
          { date: '2026-03-19', time: '10:00 AM - 11:30 AM', subjectCode: '21IS54', subjectName: 'Automata Theory & Computability', maxMarks: 50, roomNumber: 'Block 2, Room 301' },
          { date: '2026-03-20', time: '10:00 AM - 11:30 AM', subjectCode: '21IS55', subjectName: 'Software Architecture', maxMarks: 50, roomNumber: 'Block 2, Room 301' },
        ],
        instructions: [
          'Possession of college ID and exam hall ticket is mandatory.',
          'Electronic gadgets and programmable calculators are strictly prohibited.',
        ],
      },
      {
        _id: 'exam_see',
        title: 'Semester End Examination (SEE Theory)',
        type: 'Semester End',
        department: 'ISE',
        semester: 6,
        academicYear: '2025-2026',
        startDate: '2026-05-18',
        endDate: '2026-06-02',
        timetable: [
          { date: '2026-05-18', time: '02:00 PM - 05:00 PM', subjectCode: '21IS51', subjectName: 'Database Management Systems', maxMarks: 100, roomNumber: 'Exam Hall Central' },
          { date: '2026-05-21', time: '02:00 PM - 05:00 PM', subjectCode: '21IS52', subjectName: 'Artificial Intelligence & ML', maxMarks: 100, roomNumber: 'Exam Hall Central' },
          { date: '2026-05-25', time: '02:00 PM - 05:00 PM', subjectCode: '21IS53', subjectName: 'Computer Networks', maxMarks: 100, roomNumber: 'Exam Hall Central' },
        ],
        instructions: ['Standard university regulations apply. Reporting time: 30 minutes prior.'],
      },
    ];

    if (isUsingMemoryStore) {
      const exams = memoryStore.exams.length > 0 ? memoryStore.exams : defaultExams;
      return sendSuccess(res, exams, 'Exams retrieved');
    }

    const exams = await Exam.find().sort({ startDate: 1 });
    return sendSuccess(res, exams.length > 0 ? exams : defaultExams, 'Exams retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch exams: ' + error.message, 500);
  }
};

export const getStudentResults = async (req: Request, res: Response) => {
  try {
    const studentUsn = (req.query.usn as string) || req.user?.usn || '1EN21IS045';

    const defaultResult = {
      studentUsn,
      studentName: req.user?.name || 'Rahul Sharma',
      department: 'Information Science & Engineering',
      semester: 5,
      examType: 'Semester End Examination (Jan 2026)',
      academicYear: '2025-2026',
      publishedDate: '2026-02-14',
      sgpa: 8.85,
      cgpa: 8.72,
      resultStatus: 'PASS',
      semesterHistory: [
        { semester: 'Sem 1', sgpa: 8.4 },
        { semester: 'Sem 2', sgpa: 8.55 },
        { semester: 'Sem 3', sgpa: 8.7 },
        { semester: 'Sem 4', sgpa: 8.65 },
        { semester: 'Sem 5', sgpa: 8.85 },
      ],
      subjects: [
        { subjectCode: '21IS51', subjectName: 'Database Management Systems', internalMarks: 46, externalMarks: 88, totalMarks: 134, maxMarks: 150, grade: 'S', gradePoint: 10, credits: 4 },
        { subjectCode: '21IS52', subjectName: 'Artificial Intelligence & ML', internalMarks: 44, externalMarks: 82, totalMarks: 126, maxMarks: 150, grade: 'A', gradePoint: 9, credits: 4 },
        { subjectCode: '21IS53', subjectName: 'Computer Networks', internalMarks: 42, externalMarks: 84, totalMarks: 126, maxMarks: 150, grade: 'A', gradePoint: 9, credits: 4 },
        { subjectCode: '21IS54', subjectName: 'Automata Theory & Computability', internalMarks: 40, externalMarks: 76, totalMarks: 116, maxMarks: 150, grade: 'B', gradePoint: 8, credits: 3 },
        { subjectCode: '21IS55', subjectName: 'Software Architecture & Design', internalMarks: 48, externalMarks: 90, totalMarks: 138, maxMarks: 150, grade: 'S', gradePoint: 10, credits: 3 },
        { subjectCode: '21ISL56', subjectName: 'DBMS & Network Laboratory', internalMarks: 49, externalMarks: 48, totalMarks: 97, maxMarks: 100, grade: 'S', gradePoint: 10, credits: 2 },
      ],
    };

    if (isUsingMemoryStore) {
      const resRecord = memoryStore.results.find((r) => r.studentUsn === studentUsn);
      return sendSuccess(res, resRecord || defaultResult, 'Results retrieved');
    }

    const result = await Result.findOne({ studentUsn }).sort({ semester: -1 });
    return sendSuccess(res, result || defaultResult, 'Results retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch results: ' + error.message, 500);
  }
};
