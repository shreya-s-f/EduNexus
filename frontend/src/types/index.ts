export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN' | 'PLACEMENT_OFFICER' | 'ALUMNI';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  usn?: string;
  avatar?: string;
  phone?: string;
}

export interface StudentProfile {
  _id: string;
  usn: string;
  name: string;
  email: string;
  department: string;
  semester: number;
  section: string;
  admissionYear: number;
  cgpa: number;
  attendancePercentage: number;
  credits: number;
  phone?: string;
  address?: string;
  dob?: string;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    link?: string;
    techStack?: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    issueDate?: string;
    url?: string;
    verified: boolean;
  }>;
  achievements: Array<{
    title: string;
    type: string;
    date: string;
    description: string;
  }>;
  avatar?: string;
}

export interface DepartmentItem {
  _id: string;
  code: string;
  name: string;
  shortName: string;
  description: string;
  hodName: string;
  hodEmail: string;
  hodPhoto?: string;
  vision: string;
  mission: string[];
  establishedYear: number;
  totalStudents: number;
  totalFaculty: number;
  programs: string[];
  labs: Array<{
    name: string;
    description: string;
    equipment: string[];
    capacity: number;
  }>;
  achievements: string[];
  contactEmail: string;
  contactPhone: string;
  image?: string;
}

export interface SubjectAttendance {
  code: string;
  name: string;
  attended: number;
  total: number;
  percentage: number;
  isWarning: boolean;
  classesNeededFor75: number;
  classesCanBunk: number;
  status: string;
  faculty: string;
}

export interface AttendanceSummary {
  studentUsn: string;
  overall: {
    totalHeld: number;
    totalAttended: number;
    percentage: number;
    status: string;
  };
  criticalSubjectsCount: number;
  warningMessage: string;
  subjects: SubjectAttendance[];
}

export interface TimetableSlot {
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  roomNumber: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface NoticeItem {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  department: string;
  publishedBy: string;
  authorRole: string;
  date: string;
  isPinned: boolean;
  tags: string[];
}

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  registrationLimit: number;
  registeredCount: number;
  registrationDeadline: string;
  image?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  speakerOrChiefGuest?: string;
  contactPerson?: string;
}

export interface ClubItem {
  _id: string;
  name: string;
  shortDescription: string;
  about: string;
  category: string;
  leads: Array<{ name: string; role: string; email: string; avatar?: string }>;
  membersCount: number;
  bannerImage: string;
  logo: string;
  events: string[];
  achievements: string[];
  joinRequirements: string;
  meetingSchedule: string;
  contactEmail: string;
}

export interface JobItem {
  _id: string;
  companyName: string;
  companyLogo: string;
  role: string;
  jobType: string;
  packageLPA: number;
  stipendPerMonth?: number;
  location: string;
  eligibleDepartments: string[];
  minCgpa: number;
  maxBacklogs: number;
  requiredSkills: string[];
  selectionProcess: string[];
  deadline: string;
  jobDescription: string;
  status: string;
  openings: number;
  applicantsCount: number;
}

export interface InternshipItem {
  _id: string;
  company: string;
  role: string;
  duration: string;
  stipend: string;
  location: string;
  type: string;
  eligibleDepartments: string[];
  minCgpa: number;
  skills: string[];
  deadline: string;
  description: string;
  openings: number;
}

export interface LibraryBookItem {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  department: string;
  totalCopies: number;
  availableCopies: number;
  rackLocation: string;
  publisher?: string;
  edition?: string;
}

export interface BusItem {
  _id: string;
  busNumber: string;
  routeNumber: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  status: string;
  stops: Array<{
    stopName: string;
    morningTime: string;
    eveningTime: string;
    landmark?: string;
  }>;
  liveLocation?: {
    latitude: number;
    longitude: number;
    updatedAt: string;
  };
}

export interface CampusLocationItem {
  _id: string;
  name: string;
  category: string;
  building: string;
  floor: string;
  roomNumber?: string;
  description: string;
  mapCoordinates: { x: number; y: number };
  facilities: string[];
  timing: string;
  inCharge?: string;
  contactNumber?: string;
}

export interface ComplaintItem {
  _id: string;
  ticketId: string;
  studentUsn: string;
  studentName: string;
  category: string;
  description: string;
  location: string;
  priority: string;
  status: string;
  assignedTo?: string;
  resolutionNotes?: string;
  resolvedAt?: string;
  createdAt: string;
}
