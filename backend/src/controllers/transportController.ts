import { Request, Response } from 'express';
import { Bus } from '../models/Bus';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getBuses = async (req: Request, res: Response) => {
  try {
    const { search, route } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.buses];
      if (route) {
        filtered = filtered.filter((b) => b.routeNumber === route || b.routeName.includes(route as string));
      }
      if (search) {
        const query = (search as string).toLowerCase();
        filtered = filtered.filter(
          (b) =>
            b.busNumber.toLowerCase().includes(query) ||
            b.routeName.toLowerCase().includes(query) ||
            b.stops.some((s: any) => s.stopName.toLowerCase().includes(query))
        );
      }
      return sendSuccess(res, filtered, 'Buses retrieved');
    }

    const filter: any = {};
    if (route) filter.$or = [{ routeNumber: route }, { routeName: { $regex: route, $options: 'i' } }];
    if (search) {
      filter.$or = [
        { busNumber: { $regex: search, $options: 'i' } },
        { routeName: { $regex: search, $options: 'i' } },
        { 'stops.stopName': { $regex: search, $options: 'i' } },
      ];
    }

    const buses = await Bus.find(filter);
    return sendSuccess(res, buses, 'Buses retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch buses: ' + error.message, 500);
  }
};

export const getBusLiveLocation = async (req: Request, res: Response) => {
  try {
    const { busNumber } = req.params;

    // Simulate real-time GPS coordinate drift along campus corridor
    const baseLat = 12.9716;
    const baseLng = 77.5946;
    const jitter = (Math.random() - 0.5) * 0.008;

    const liveData = {
      busNumber,
      latitude: Number((baseLat + jitter).toFixed(5)),
      longitude: Number((baseLng + jitter).toFixed(5)),
      speedKmH: Math.floor(25 + Math.random() * 20),
      heading: 'North-East towards Campus Gate 1',
      nextStop: 'Silk Board Junction',
      estimatedArrivalMin: 12,
      updatedAt: new Date().toISOString(),
    };

    return sendSuccess(res, liveData, 'Live bus telemetry retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch live bus location: ' + error.message, 500);
  }
};
