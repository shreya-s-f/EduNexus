import { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';
import { Submission } from '../models/Submission';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getAssignments = async (req: Request, res: Response) => {
  try {
    const { department = 'ISE', semester } = req.query;

    if (isUsingMemoryStore) {
      let list = [...memoryStore.assignments];
      if (department) {
        list = list.filter((a) => a.department.toLowerCase() === (department as string).toLowerCase());
      }
      return sendSuccess(res, list, 'Assignments retrieved');
    }

    const filter: any = {};
    if (department) filter.department = (department as string).toUpperCase();
    if (semester) filter.semester = Number(semester);

    const assignments = await Assignment.find(filter).sort({ dueDate: 1 });
    return sendSuccess(res, assignments, 'Assignments retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch assignments: ' + error.message, 500);
  }
};

export const createAssignment = async (req: Request, res: Response) => {
  try {
    const { title, description, department, semester, subjectCode, subjectName, dueDate, totalMarks, instructions } = req.body;

    if (!title || !description || !subjectCode || !dueDate) {
      return sendError(res, 'Title, description, subject code, and due date are required', 400);
    }

    const facultyName = req.user?.name || 'Faculty Member';
    const facultyEmail = req.user?.email || 'faculty@edunexus.demo';

    if (isUsingMemoryStore) {
      const newAssignment = {
        _id: 'assign_' + Date.now(),
        title,
        description,
        department: department || 'ISE',
        semester: Number(semester) || 6,
        subjectCode,
        subjectName: subjectName || subjectCode,
        facultyName,
        facultyEmail,
        dueDate,
        totalMarks: Number(totalMarks) || 20,
        instructions: instructions || 'Submit PDF report or project GitHub repository link.',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryStore.assignments.push(newAssignment);
      return sendSuccess(res, newAssignment, 'Assignment created successfully', 201);
    }

    const assignment = await Assignment.create({
      title,
      description,
      department: department || 'ISE',
      semester: Number(semester) || 6,
      subjectCode,
      subjectName: subjectName || subjectCode,
      facultyName,
      facultyEmail,
      dueDate,
      totalMarks: Number(totalMarks) || 20,
      instructions,
    });

    return sendSuccess(res, assignment, 'Assignment created successfully', 201);
  } catch (error: any) {
    return sendError(res, 'Failed to create assignment: ' + error.message, 500);
  }
};

export const submitAssignment = async (req: Request, res: Response) => {
  try {
    const { assignmentId, contentOrUrl } = req.body;

    if (!assignmentId || !contentOrUrl) {
      return sendError(res, 'Assignment ID and submission link/content are required', 400);
    }

    const studentUsn = req.user?.usn || '1EN21IS045';
    const studentName = req.user?.name || 'Rahul Sharma';
    const studentEmail = req.user?.email || 'student@edunexus.demo';

    if (isUsingMemoryStore) {
      const assignment = memoryStore.assignments.find((a) => a._id === assignmentId);
      const isLate = assignment && new Date(assignment.dueDate) < new Date();

      const existingIndex = memoryStore.submissions.findIndex(
        (s) => s.assignmentId === assignmentId && s.studentUsn === studentUsn
      );

      const submissionData = {
        _id: 'sub_' + Date.now(),
        assignmentId,
        assignmentTitle: assignment?.title || 'Assignment Submission',
        subjectCode: assignment?.subjectCode || '21IS51',
        studentUsn,
        studentName,
        studentEmail,
        submissionDate: new Date().toISOString().split('T')[0],
        contentOrUrl,
        status: isLate ? 'late' : 'submitted',
        createdAt: new Date(),
      };

      if (existingIndex !== -1) {
        memoryStore.submissions[existingIndex] = submissionData;
      } else {
        memoryStore.submissions.push(submissionData);
      }

      return sendSuccess(res, submissionData, 'Assignment submitted successfully');
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return sendError(res, 'Assignment not found', 404);
    }

    const isLate = new Date(assignment.dueDate) < new Date();

    const submission = await Submission.findOneAndUpdate(
      { assignmentId, studentUsn },
      {
        $set: {
          assignmentTitle: assignment.title,
          subjectCode: assignment.subjectCode,
          studentName,
          studentEmail,
          submissionDate: new Date().toISOString().split('T')[0],
          contentOrUrl,
          status: isLate ? 'late' : 'submitted',
        },
      },
      { upsert: true, new: true }
    );

    return sendSuccess(res, submission, 'Assignment submitted successfully');
  } catch (error: any) {
    return sendError(res, 'Failed to submit assignment: ' + error.message, 500);
  }
};

export const getStudentSubmissions = async (req: Request, res: Response) => {
  try {
    const studentUsn = req.user?.usn || '1EN21IS045';

    if (isUsingMemoryStore) {
      const subs = memoryStore.submissions.filter((s) => s.studentUsn === studentUsn);
      return sendSuccess(res, subs, 'Student submissions retrieved');
    }

    const subs = await Submission.find({ studentUsn });
    return sendSuccess(res, subs, 'Student submissions retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch student submissions: ' + error.message, 500);
  }
};
