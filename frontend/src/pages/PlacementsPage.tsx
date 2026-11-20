import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Briefcase, TrendingUp, Award, Building, CheckCircle, Calendar, ArrowRight, DollarSign } from 'lucide-react';
import api from '../services/api';
import { JobItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

export const PlacementsPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, statsRes] = await Promise.all([
          api.get('/placements/jobs'),
          api.get('/placements/analytics'),
        ]);
        setJobs(jobsRes.data.data || []);
        setAnalytics(statsRes.data.data || {});
      } catch (err) {
        console.error('Failed to load placement data', err);
      }
    };
    fetchData();
  }, []);

  const handleApply = async () => {
    if (!user) {
      addToast('warning', 'Login Required', 'Please log in as a student to apply for placement drives.');
      return;
    }
    if (!selectedJob) return;

    setIsSubmitting(true);
    try {
      await api.post('/placements/jobs/apply', {
        jobId: selectedJob._id,
        resumeUrl: resumeUrl || 'https://edunexus.edu/resumes/default-resume.pdf',
      });
      addToast('success', 'Application Submitted', `Applied for ${selectedJob.role} at ${selectedJob.companyName}!`);
      setIsApplyModalOpen(false);
    } catch (err: any) {
      addToast('error', 'Application Failed', err.response?.data?.message || 'Prerequisites not met.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="primary">Campus Placements & Corporate Relations</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Where Ambition Meets Global Industry
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Consistently achieving tier-1 corporate recruitments across software engineering, artificial intelligence,
          cloud systems, and core manufacturing.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 text-center">
          <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {analytics?.highestPackage || '₹48.0 LPA'}
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-1">Highest Package Offered</p>
        </Card>
        <Card className="p-6 text-center">
          <Award className="w-8 h-8 text-brand-500 mx-auto mb-2" />
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {analytics?.averagePackage || '₹9.4 LPA'}
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-1">Average CTC Across Campus</p>
        </Card>
        <Card className="p-6 text-center">
          <Building className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {analytics?.totalCompanies || 154}+
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-1">Visiting Corporate Partners</p>
        </Card>
        <Card className="p-6 text-center">
          <Briefcase className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {analytics?.placementPercentage || '96.4%'}
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-1">Placement Success Rate</p>
        </Card>
      </div>

      {/* Active Job Opportunities */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Active Placement Drives</h2>
          <p className="text-sm text-slate-500">Explore open full-time and internship offers currently accepting student applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job._id} hover className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                      <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{job.role}</h3>
                      <p className="text-xs text-slate-500">{job.companyName} • {job.location}</p>
                    </div>
                  </div>
                  <Badge variant="success">₹{job.packageLPA} LPA</Badge>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {job.jobDescription}
                </p>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex justify-between">
                    <span>Prerequisites:</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      Min CGPA: {job.minCgpa} • Backlogs: {job.maxBacklogs}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Eligible Branches:</span>
                    <span className="font-semibold text-brand-600 dark:text-brand-400">
                      {job.eligibleDepartments?.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Application Deadline:</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400">{job.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  onClick={() => {
                    setSelectedJob(job);
                    setIsApplyModalOpen(true);
                  }}
                  className="w-full"
                  size="sm"
                >
                  Apply For Placement Drive
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={selectedJob ? `Apply: ${selectedJob.role}` : 'Job Application'}
      >
        {selectedJob && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100">{selectedJob.companyName}</p>
              <p className="text-slate-500 text-xs">Offered Package: ₹{selectedJob.packageLPA} LPA</p>
              <p className="text-slate-500 text-xs">Required Minimum CGPA: {selectedJob.minCgpa}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Student USN / Identification
              </label>
              <input
                type="text"
                disabled
                value={user?.usn || '1EN21IS045'}
                className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Portfolio / Resume Link (PDF or Cloud URL)
              </label>
              <input
                type="url"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://drive.google.com/file/... or GitHub"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button variant="ghost" onClick={() => setIsApplyModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApply} isLoading={isSubmitting}>
                Confirm Application
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
