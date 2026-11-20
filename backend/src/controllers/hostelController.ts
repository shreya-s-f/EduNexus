import { Request, Response } from 'express';
import { Hostel } from '../models/Hostel';
import { Room } from '../models/Room';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getHostels = async (_req: Request, res: Response) => {
  try {
    if (isUsingMemoryStore) {
      return sendSuccess(res, memoryStore.hostels, 'Hostels retrieved');
    }
    const hostels = await Hostel.find();
    return sendSuccess(res, hostels, 'Hostels retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch hostels: ' + error.message, 500);
  }
};

export const getRooms = async (req: Request, res: Response) => {
  try {
    const { hostelName } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.rooms];
      if (hostelName) {
        filtered = filtered.filter((r) => r.hostelName.toLowerCase() === (hostelName as string).toLowerCase());
      }
      return sendSuccess(res, filtered, 'Rooms retrieved');
    }

    const filter: any = {};
    if (hostelName) filter.hostelName = hostelName;

    const rooms = await Room.find(filter);
    return sendSuccess(res, rooms, 'Rooms retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch rooms: ' + error.message, 500);
  }
};

export const applyHostelRoom = async (req: Request, res: Response) => {
  try {
    const { hostelName, roomNumber } = req.body;
    const studentUsn = req.user?.usn || '1EN21IS045';
    const studentName = req.user?.name || 'Rahul Sharma';

    if (!hostelName || !roomNumber) {
      return sendError(res, 'Hostel name and room number are required', 400);
    }

    if (isUsingMemoryStore) {
      const room = memoryStore.rooms.find(
        (r) => r.hostelName === hostelName && r.roomNumber === roomNumber
      );
      if (!room) {
        return sendError(res, 'Room not found', 404);
      }
      if (room.occupiedCount >= room.capacity) {
        return sendError(res, 'Selected room is already fully occupied.', 400);
      }

      room.occupiedCount += 1;
      room.occupants.push({
        studentUsn,
        studentName,
        bedNumber: room.occupiedCount,
      });
      if (room.occupiedCount >= room.capacity) {
        room.status = 'Full';
      }

      return sendSuccess(
        res,
        { hostelName, roomNumber, bedNumber: room.occupiedCount },
        'Hostel room allocation requested and approved!',
        201
      );
    }

    const room = await Room.findOne({ hostelName, roomNumber });
    if (!room) {
      return sendError(res, 'Room not found', 404);
    }

    if (room.occupiedCount >= room.capacity) {
      return sendError(res, 'Selected room is already fully occupied.', 400);
    }

    room.occupiedCount += 1;
    room.occupants.push({
      studentUsn,
      studentName,
      bedNumber: room.occupiedCount,
    });
    if (room.occupiedCount >= room.capacity) {
      room.status = 'Full';
    }
    await room.save();

    return sendSuccess(
      res,
      { hostelName, roomNumber, bedNumber: room.occupiedCount },
      'Hostel room allocation requested and approved!',
      201
    );
  } catch (error: any) {
    return sendError(res, 'Failed to apply for hostel room: ' + error.message, 500);
  }
};
