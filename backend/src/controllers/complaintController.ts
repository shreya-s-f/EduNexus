import { Request, Response } from 'express';
import { Complaint, ComplaintStatus } from '../models/Complaint';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const submitComplaint = async (req: Request, res: Response) => {
  try {
    const { category, description, location, priority = 'Medium', imageAttachment = '' } = req.body;

    if (!category || !description || !location) {
      return sendError(res, 'Category, description, and location are required.', 400);
    }

    const studentUsn = req.user?.usn || '1EN21IS045';
    const studentName = req.user?.name || 'Rahul Sharma';
    const studentEmail = req.user?.email || 'student@edunexus.demo';
    const ticketId = 'TKT-' + Date.now().toString().slice(-6);

    if (isUsingMemoryStore) {
      const newComplaint = {
        _id: 'complaint_' + Date.now(),
        ticketId,
        studentUsn,
        studentName,
        studentEmail,
        category,
        description,
        location,
        priority,
        imageAttachment,
        status: 'Submitted' as ComplaintStatus,
        assignedTo: 'Facilities Maintenance Desk',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryStore.complaints.unshift(newComplaint);
      return sendSuccess(res, newComplaint, `Grievance ticket #${ticketId} submitted successfully`, 201);
    }

    const complaint = await Complaint.create({
      ticketId,
      studentUsn,
      studentName,
      studentEmail,
      category,
      description,
      location,
      priority,
      imageAttachment,
      status: 'Submitted',
      assignedTo: 'Facilities Maintenance Desk',
    });

    return sendSuccess(res, complaint, `Grievance ticket #${ticketId} submitted successfully`, 201);
  } catch (error: any) {
    return sendError(res, 'Failed to submit grievance: ' + error.message, 500);
  }
};

export const getStudentComplaints = async (req: Request, res: Response) => {
  try {
    const studentUsn = req.user?.usn || '1EN21IS045';

    if (isUsingMemoryStore) {
      const list = memoryStore.complaints.filter((c) => c.studentUsn === studentUsn);
      return sendSuccess(res, list, 'Complaints retrieved');
    }

    const complaints = await Complaint.find({ studentUsn }).sort({ createdAt: -1 });
    return sendSuccess(res, complaints, 'Complaints retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch complaints: ' + error.message, 500);
  }
};

export const getAllComplaints = async (req: Request, res: Response) => {
  try {
    const { status, category, priority } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.complaints];
      if (status) filtered = filtered.filter((c) => c.status === status);
      if (category) filtered = filtered.filter((c) => c.category === category);
      if (priority) filtered = filtered.filter((c) => c.priority === priority);
      return sendSuccess(res, filtered, 'All complaints retrieved');
    }

    const filter: any = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, complaints, 'All complaints retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch complaints: ' + error.message, 500);
  }
};

export const updateComplaintStatus = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const { status, assignedTo, resolutionNotes } = req.body;

    if (isUsingMemoryStore) {
      const complaint = memoryStore.complaints.find((c) => c.ticketId === ticketId);
      if (!complaint) return sendError(res, 'Complaint ticket not found', 404);

      if (status) complaint.status = status;
      if (assignedTo) complaint.assignedTo = assignedTo;
      if (resolutionNotes) complaint.resolutionNotes = resolutionNotes;
      if (status === 'Resolved' || status === 'Closed') {
        complaint.resolvedAt = new Date();
      }

      return sendSuccess(res, complaint, `Ticket #${ticketId} updated successfully`);
    }

    const complaint = await Complaint.findOneAndUpdate(
      { ticketId },
      {
        $set: {
          status,
          assignedTo,
          resolutionNotes,
          resolvedAt: status === 'Resolved' || status === 'Closed' ? new Date() : undefined,
        },
      },
      { new: true }
    );

    if (!complaint) return sendError(res, 'Complaint ticket not found', 404);

    return sendSuccess(res, complaint, `Ticket #${ticketId} updated successfully`);
  } catch (error: any) {
    return sendError(res, 'Failed to update complaint: ' + error.message, 500);
  }
};
