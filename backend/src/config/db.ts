import mongoose from 'mongoose';
import { ENV } from './env';
import { setUsingMemoryStore } from './memoryStore';

export const connectDB = async (): Promise<boolean> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    setUsingMemoryStore(false);
    return true;
  } catch (error: any) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${ENV.MONGODB_URI}: ${error.message}`);
    console.log(`[Database Notice] Operating in resilient embedded mock mode. All API operations will be served seamlessly.`);
    setUsingMemoryStore(true);
    return false;
  }
};
