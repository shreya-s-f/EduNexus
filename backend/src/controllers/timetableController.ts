import { Request, Response } from 'express';
import { Timetable } from '../models/Timetable';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

const defaultTimetable = [
  {
    day: 'Monday',
    slots: [
      { periodNumber: 1, startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: '21IS51', subjectName: 'Database Management Systems', facultyName: 'Dr. K. S. Venkatesh', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 2, startTime: '10:00 AM', endTime: '11:00 AM', subjectCode: '21IS52', subjectName: 'Artificial Intelligence & ML', facultyName: 'Prof. Ananya Rao', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 3, startTime: '11:15 AM', endTime: '01:15 PM', subjectCode: '21ISL56', subjectName: 'DBMS & Network Laboratory', facultyName: 'Dr. K. S. Venkatesh', roomNumber: 'Lab 3', type: 'Lab' },
      { periodNumber: 4, startTime: '02:00 PM', endTime: '03:00 PM', subjectCode: '21IS53', subjectName: 'Computer Networks', facultyName: 'Dr. R. Ramanathan', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 5, startTime: '03:00 PM', endTime: '04:00 PM', subjectCode: '21IS55', subjectName: 'Software Architecture', facultyName: 'Prof. Vikram Malhotra', roomNumber: 'LH-201', type: 'Tutorial' },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { periodNumber: 1, startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: '21IS54', subjectName: 'Automata Theory & Computability', facultyName: 'Prof. Sneha Deshmukh', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 2, startTime: '10:00 AM', endTime: '11:00 AM', subjectCode: '21IS51', subjectName: 'Database Management Systems', facultyName: 'Dr. K. S. Venkatesh', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 3, startTime: '11:15 AM', endTime: '12:15 PM', subjectCode: '21IS52', subjectName: 'Artificial Intelligence & ML', facultyName: 'Prof. Ananya Rao', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 4, startTime: '02:00 PM', endTime: '04:00 PM', subjectCode: '21IS57', subjectName: 'Cloud Computing Mini-Project', facultyName: 'Dr. R. Ramanathan', roomNumber: 'Lab 4', type: 'Lab' },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { periodNumber: 1, startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: '21IS53', subjectName: 'Computer Networks', facultyName: 'Dr. R. Ramanathan', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 2, startTime: '10:00 AM', endTime: '11:00 AM', subjectCode: '21IS55', subjectName: 'Software Architecture', facultyName: 'Prof. Vikram Malhotra', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 3, startTime: '11:15 AM', endTime: '01:15 PM', subjectCode: '21ISL58', subjectName: 'AI & Data Engineering Lab', facultyName: 'Prof. Ananya Rao', roomNumber: 'Lab 2', type: 'Lab' },
      { periodNumber: 4, startTime: '02:00 PM', endTime: '03:00 PM', subjectCode: '21IS54', subjectName: 'Automata Theory & Computability', facultyName: 'Prof. Sneha Deshmukh', roomNumber: 'LH-201', type: 'Lecture' },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { periodNumber: 1, startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: '21IS52', subjectName: 'Artificial Intelligence & ML', facultyName: 'Prof. Ananya Rao', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 2, startTime: '10:00 AM', endTime: '11:00 AM', subjectCode: '21IS51', subjectName: 'Database Management Systems', facultyName: 'Dr. K. S. Venkatesh', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 3, startTime: '11:15 AM', endTime: '12:15 PM', subjectCode: '21IS53', subjectName: 'Computer Networks', facultyName: 'Dr. R. Ramanathan', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 4, startTime: '02:00 PM', endTime: '04:00 PM', subjectCode: '21IS59', subjectName: 'Technical Seminar / Mentorship', facultyName: 'Dr. K. S. Venkatesh', roomNumber: 'Seminar Hall 1', type: 'Tutorial' },
    ],
  },
  {
    day: 'Friday',
    slots: [
      { periodNumber: 1, startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: '21IS55', subjectName: 'Software Architecture', facultyName: 'Prof. Vikram Malhotra', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 2, startTime: '10:00 AM', endTime: '11:00 AM', subjectCode: '21IS54', subjectName: 'Automata Theory & Computability', facultyName: 'Prof. Sneha Deshmukh', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 3, startTime: '11:15 AM', endTime: '01:15 PM', subjectCode: '21ISL56', subjectName: 'DBMS & Network Laboratory', facultyName: 'Dr. K. S. Venkatesh', roomNumber: 'Lab 3', type: 'Lab' },
      { periodNumber: 4, startTime: '02:00 PM', endTime: '04:00 PM', subjectCode: '21IS60', subjectName: 'Club Activities / Hackathon Practice', facultyName: 'Faculty Mentors', roomNumber: 'Innovation Hub', type: 'Tutorial' },
    ],
  },
  {
    day: 'Saturday',
    slots: [
      { periodNumber: 1, startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: '21IS53', subjectName: 'Computer Networks (Tutorial)', facultyName: 'Dr. R. Ramanathan', roomNumber: 'LH-201', type: 'Tutorial' },
      { periodNumber: 2, startTime: '10:00 AM', endTime: '11:00 AM', subjectCode: '21IS52', subjectName: 'Artificial Intelligence & ML', facultyName: 'Prof. Ananya Rao', roomNumber: 'LH-201', type: 'Lecture' },
      { periodNumber: 3, startTime: '11:15 AM', endTime: '01:00 PM', subjectCode: '21IS61', subjectName: 'Industry Guest Lecture / Career Talks', facultyName: 'Placement Cell', roomNumber: 'Auditorium 2', type: 'Lecture' },
    ],
  },
];

export const getWeeklyTimetable = async (req: Request, res: Response) => {
  try {
    const { department = 'ISE', semester = 6, section = 'A' } = req.query;

    if (isUsingMemoryStore) {
      const records = memoryStore.timetables.filter(
        (t) => t.department === department && t.semester === Number(semester)
      );
      if (records.length > 0) {
        return sendSuccess(res, records, 'Timetable retrieved');
      }
      return sendSuccess(res, defaultTimetable, 'Default weekly timetable retrieved');
    }

    const records = await Timetable.find({
      department: (department as string).toUpperCase(),
      semester: Number(semester),
      section,
    });

    if (records.length > 0) {
      return sendSuccess(res, records, 'Timetable retrieved');
    }

    return sendSuccess(res, defaultTimetable, 'Default weekly timetable retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch timetable: ' + error.message, 500);
  }
};

export const getTodaySchedule = async (req: Request, res: Response) => {
  try {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];

    const schedule = defaultTimetable.find((d) => d.day === currentDay) || defaultTimetable[0];

    return sendSuccess(res, { day: currentDay, slots: schedule.slots }, "Today's schedule retrieved");
  } catch (error: any) {
    return sendError(res, 'Failed to fetch today schedule: ' + error.message, 500);
  }
};
