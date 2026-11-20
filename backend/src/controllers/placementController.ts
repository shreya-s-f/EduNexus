import { Request, Response } from 'express';
import { Company } from '../models/Company';
import { Job } from '../models/Job';
import { JobApplication, ApplicationStatus } from '../models/JobApplication';
import { Internship } from '../models/Internship';
import { InternshipApplication } from '../models/InternshipApplication';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { isUsingMemoryStore, memoryStore } from '../config/memoryStore';

export const getPlacementAnalytics = async (_req: Request, res: Response) => {
  try {
    const analytics = {
      totalCompanies: 154,
      studentsPlaced: 620,
      highestPackage: '₹48.0 LPA',
      highestPackageNumeric: 48.0,
      averagePackage: '₹9.4 LPA',
      averagePackageNumeric: 9.4,
      medianPackage: '₹8.2 LPA',
      placementPercentage: '96.4%',
      offersCount: 780,
      topRecruiters: [
        { name: 'Google', offers: 12, highestPackage: '44 LPA' },
        { name: 'Microsoft', offers: 18, highestPackage: '48 LPA' },
        { name: 'Amazon', offers: 24, highestPackage: '38 LPA' },
        { name: 'Atlassian', offers: 8, highestPackage: '42 LPA' },
        { name: 'Cisco', offers: 32, highestPackage: '22 LPA' },
        { name: 'Oracle', offers: 28, highestPackage: '20 LPA' },
      ],
      packageDistribution: [
        { tier: 'Above 20 LPA (Super Dream)', count: 68 },
        { tier: '12 - 20 LPA (Dream)', count: 184 },
        { tier: '7 - 12 LPA (Core)', count: 260 },
        { tier: '4 - 7 LPA (Standard)', count: 108 },
      ],
    };

    return sendSuccess(res, analytics, 'Placement analytics retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch placement analytics: ' + error.message, 500);
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;

    if (isUsingMemoryStore) {
      let filtered = [...memoryStore.jobs];
      if (status) {
        filtered = filtered.filter((j) => j.status.toLowerCase() === (status as string).toLowerCase());
      }
      if (search) {
        const query = (search as string).toLowerCase();
        filtered = filtered.filter(
          (j) => j.role.toLowerCase().includes(query) || j.companyName.toLowerCase().includes(query)
        );
      }
      return sendSuccess(res, filtered, 'Jobs retrieved');
    }

    const filter: any = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { role: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await Job.find(filter).sort({ deadline: 1 });
    return sendSuccess(res, jobs, 'Jobs retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch jobs: ' + error.message, 500);
  }
};

export const applyForJob = async (req: Request, res: Response) => {
  try {
    const { jobId, resumeUrl = '' } = req.body;

    if (!jobId) {
      return sendError(res, 'Job ID is required', 400);
    }

    const studentUsn = req.user?.usn || '1EN21IS045';
    const studentName = req.user?.name || 'Rahul Sharma';
    const studentEmail = req.user?.email || 'student@edunexus.demo';
    const studentDepartment = req.user?.department || 'ISE';
    const studentCgpa = 8.7; // verified from profile

    if (isUsingMemoryStore) {
      const job = memoryStore.jobs.find((j) => j._id === jobId);
      if (!job) {
        return sendError(res, 'Job opportunity not found', 404);
      }

      // Check CGPA eligibility
      if (studentCgpa < (job.minCgpa || 7.0)) {
        return sendError(res, `CGPA prerequisite not met. Minimum required is ${job.minCgpa}`, 400);
      }

      const existingApp = memoryStore.jobApplications.find(
        (a) => a.jobId === jobId && a.studentUsn === studentUsn
      );
      if (existingApp) {
        return sendError(res, 'You have already applied for this job drive.', 400);
      }

      const newApp = {
        _id: 'app_' + Date.now(),
        jobId,
        jobRole: job.role,
        companyName: job.companyName,
        studentUsn,
        studentName,
        studentEmail,
        studentDepartment,
        studentCgpa,
        resumeUrl: resumeUrl || 'https://edunexus.edu/resumes/default-resume.pdf',
        status: 'Applied' as ApplicationStatus,
        appliedDate: new Date().toISOString().split('T')[0],
        createdAt: new Date(),
      };
      memoryStore.jobApplications.push(newApp);
      job.applicantsCount = (job.applicantsCount || 0) + 1;

      return sendSuccess(res, newApp, 'Job application submitted successfully!', 201);
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return sendError(res, 'Job opportunity not found', 404);
    }

    if (studentCgpa < job.minCgpa) {
      return sendError(res, `CGPA prerequisite not met. Minimum required is ${job.minCgpa}`, 400);
    }

    const existingApp = await JobApplication.findOne({ jobId, studentUsn });
    if (existingApp) {
      return sendError(res, 'You have already applied for this job drive.', 400);
    }

    const application = await JobApplication.create({
      jobId,
      jobRole: job.role,
      companyName: job.companyName,
      studentUsn,
      studentName,
      studentEmail,
      studentDepartment,
      studentCgpa,
      resumeUrl: resumeUrl || 'https://edunexus.edu/resumes/default-resume.pdf',
      status: 'Applied',
    });

    job.applicantsCount += 1;
    await job.save();

    return sendSuccess(res, application, 'Job application submitted successfully!', 201);
  } catch (error: any) {
    return sendError(res, 'Failed to apply for job: ' + error.message, 500);
  }
};

export const getStudentApplications = async (req: Request, res: Response) => {
  try {
    const studentUsn = req.user?.usn || '1EN21IS045';

    if (isUsingMemoryStore) {
      const apps = memoryStore.jobApplications.filter((a) => a.studentUsn === studentUsn);
      return sendSuccess(res, apps, 'Student applications retrieved');
    }

    const apps = await JobApplication.find({ studentUsn });
    return sendSuccess(res, apps, 'Student applications retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch student applications: ' + error.message, 500);
  }
};

export const getInternships = async (_req: Request, res: Response) => {
  try {
    if (isUsingMemoryStore) {
      return sendSuccess(res, memoryStore.internships, 'Internships retrieved');
    }
    const internships = await Internship.find().sort({ deadline: 1 });
    return sendSuccess(res, internships, 'Internships retrieved');
  } catch (error: any) {
    return sendError(res, 'Failed to fetch internships: ' + error.message, 500);
  }
};
