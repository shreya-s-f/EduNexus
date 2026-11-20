// In-memory persistent data store fallback for dev/demo mode when MongoDB daemon is not running locally.
export interface MemoryStoreData {
  users: any[];
  departments: any[];
  students: any[];
  faculty: any[];
  subjects: any[];
  attendance: any[];
  timetables: any[];
  exams: any[];
  results: any[];
  assignments: any[];
  submissions: any[];
  notices: any[];
  events: any[];
  eventRegistrations: any[];
  clubs: any[];
  books: any[];
  bookIssues: any[];
  companies: any[];
  jobs: any[];
  jobApplications: any[];
  internships: any[];
  internshipApplications: any[];
  complaints: any[];
  certificates: any[];
  hostels: any[];
  rooms: any[];
  buses: any[];
  routes: any[];
  alumni: any[];
  notifications: any[];
  campusLocations: any[];
  faqs: any[];
}

export const memoryStore: MemoryStoreData = {
  users: [],
  departments: [],
  students: [],
  faculty: [],
  subjects: [],
  attendance: [],
  timetables: [],
  exams: [],
  results: [],
  assignments: [],
  submissions: [],
  notices: [],
  events: [],
  eventRegistrations: [],
  clubs: [],
  books: [],
  bookIssues: [],
  companies: [],
  jobs: [],
  jobApplications: [],
  internships: [],
  internshipApplications: [],
  complaints: [],
  certificates: [],
  hostels: [],
  rooms: [],
  buses: [],
  routes: [],
  alumni: [],
  notifications: [],
  campusLocations: [],
  faqs: [],
};

export let isUsingMemoryStore = false;
export const setUsingMemoryStore = (val: boolean) => {
  isUsingMemoryStore = val;
};
