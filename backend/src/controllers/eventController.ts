import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { EventRegistration } from '../models/EventRegistration';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { category, status, search } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.events];
      if (category && category !== 'ALL') {
        filtered = filtered.filter((e) => e.category.toLowerCase() === (category as string).toLowerCase());
      }
      if (status) {
        filtered = filtered.filter((e) => e.status.toLowerCase() === (status as string).toLowerCase());
      }
      if (search) {
        const query = (search as string).toLowerCase();
        filtered = filtered.filter(
          (e) => e.title.toLowerCase().includes(query) || e.venue.toLowerCase().includes(query)
        );
      }
      return sendSuccess(res, filtered, 'Events retrieved');
    }

    const filter: any = {};
    if (category && category !== 'ALL') filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const events = await Event.find(filter).sort({ date: 1 });
    return sendSuccess(res, events, 'Events retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch events: ' + error.message, 500);
  }
};

export const registerForEvent = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.body;
    if (!eventId) {
      return sendError(res, 'Event ID is required', 400);
    }

    const studentUsn = req.user?.usn || '1EN21IS045';
    const studentName = req.user?.name || 'Rahul Sharma';
    const studentEmail = req.user?.email || 'student@edunexus.demo';
    const department = req.user?.department || 'ISE';

    const confirmationCode = 'EDUNEX-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    if (isUsingMemoryStore) {
      const event = memoryStore.events.find((e) => e._id === eventId);
      if (!event) {
        return sendError(res, 'Event not found', 404);
      }

      const alreadyRegistered = memoryStore.eventRegistrations.some(
        (r) => r.eventId === eventId && r.studentUsn === studentUsn
      );
      if (alreadyRegistered) {
        return sendError(res, 'You are already registered for this event.', 400);
      }

      event.registeredCount = (event.registeredCount || 0) + 1;

      const registration = {
        _id: 'reg_' + Date.now(),
        eventId,
        eventTitle: event.title,
        studentUsn,
        studentName,
        studentEmail,
        department,
        registeredAt: new Date(),
        confirmationCode,
        attended: false,
      };
      memoryStore.eventRegistrations.push(registration);

      return sendSuccess(
        res,
        { registration, confirmationCode, eventTitle: event.title },
        'Registered for event successfully! Confirmation code generated.',
        201
      );
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return sendError(res, 'Event not found', 404);
    }

    const existing = await EventRegistration.findOne({ eventId, studentUsn });
    if (existing) {
      return sendError(res, 'You are already registered for this event.', 400);
    }

    event.registeredCount += 1;
    await event.save();

    const registration = await EventRegistration.create({
      eventId,
      eventTitle: event.title,
      studentUsn,
      studentName,
      studentEmail,
      department,
      confirmationCode,
    });

    return sendSuccess(
      res,
      { registration, confirmationCode, eventTitle: event.title },
      'Registered for event successfully! Confirmation code generated.',
      201
    );
  } catch (error: any) {
    return sendError(res, 'Failed to register for event: ' + error.message, 500);
  }
};
