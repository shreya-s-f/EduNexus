import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';
import { getSeedData } from './seedData';
import { User } from '../models/User';
import { Department } from '../models/Department';
import { Student } from '../models/Student';
import { Faculty } from '../models/Faculty';
import { Subject } from '../models/Subject';
import { Notice } from '../models/Notice';
import { Event } from '../models/Event';
import { Club } from '../models/Club';
import { Job } from '../models/Job';
import { Internship } from '../models/Internship';
import { LibraryBook } from '../models/LibraryBook';
import { Hostel } from '../models/Hostel';
import { Room } from '../models/Room';
import { Bus } from '../models/Bus';
import { CampusLocation } from '../models/CampusLocation';
import { Complaint } from '../models/Complaint';
import { Alumni } from '../models/Alumni';
import { FAQ } from '../models/FAQ';

export const seedDatabase = async () => {
  console.log('[Seed] Preparing database seeding with demo accounts and data...');
  const data = await getSeedData();

  if (isUsingMemoryStore) {
    console.log('[Seed] Populating in-memory fallback store...');
    memoryStore.users = data.users;
    memoryStore.departments = data.departments;
    memoryStore.students = data.students;
    memoryStore.faculty = data.faculty;
    memoryStore.subjects = data.subjects;
    memoryStore.notices = data.notices;
    memoryStore.events = data.events;
    memoryStore.clubs = data.clubs;
    memoryStore.jobs = data.jobs;
    memoryStore.internships = data.internships;
    memoryStore.books = data.books;
    memoryStore.hostels = data.hostels;
    memoryStore.rooms = data.rooms;
    memoryStore.buses = data.buses;
    memoryStore.campusLocations = data.campusLocations;
    memoryStore.complaints = data.complaints;
    memoryStore.alumni = data.alumni;
    memoryStore.faqs = data.faqs;
    console.log('[Seed] In-memory store successfully initialized with 6 demo accounts and campus modules.');
    return;
  }

  try {
    // Clear and populate collections
    await User.deleteMany({});
    await Department.deleteMany({});
    await Student.deleteMany({});
    await Faculty.deleteMany({});
    await Subject.deleteMany({});
    await Notice.deleteMany({});
    await Event.deleteMany({});
    await Club.deleteMany({});
    await Job.deleteMany({});
    await Internship.deleteMany({});
    await LibraryBook.deleteMany({});
    await Hostel.deleteMany({});
    await Room.deleteMany({});
    await Bus.deleteMany({});
    await CampusLocation.deleteMany({});
    await Complaint.deleteMany({});
    await Alumni.deleteMany({});
    await FAQ.deleteMany({});

    await User.insertMany(data.users);
    await Department.insertMany(data.departments);
    await Student.insertMany(data.students);
    await Faculty.insertMany(data.faculty);
    await Subject.insertMany(data.subjects);
    await Notice.insertMany(data.notices);
    await Event.insertMany(data.events);
    await Club.insertMany(data.clubs);
    await Job.insertMany(data.jobs);
    await Internship.insertMany(data.internships);
    await LibraryBook.insertMany(data.books);
    await Hostel.insertMany(data.hostels);
    await Room.insertMany(data.rooms);
    await Bus.insertMany(data.buses);
    await CampusLocation.insertMany(data.campusLocations);
    await Complaint.insertMany(data.complaints);
    await Alumni.insertMany(data.alumni);
    await FAQ.insertMany(data.faqs);

    console.log('[Seed] MongoDB database successfully seeded with EduNexus production dataset!');
  } catch (error: any) {
    console.error('[Seed Error] Failed to populate MongoDB: ' + error.message);
  }
};

if (require.main === module) {
  (async () => {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  })();
}
