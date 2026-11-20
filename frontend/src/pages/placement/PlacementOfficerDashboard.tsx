import React, { useEffect, useState } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Briefcase, TrendingUp, Users, Building, Plus, CheckCircle, Clock } from 'lucide-react';
import api from '../../services/api';
import { useNotification } from '../../contexts/NotificationContext';

export const PlacementOfficerDashboard: React.FC = () => {
  const { addToast } = useNotification();
  const [jobs, setJobs] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

  // New job state
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [packageLPA, setPackageLPA] = useState(12);
  const [location, setLocation] = useState('Bengaluru');
  const [minCgpa, setMinCgpa] = useState(7.0);
  const [deadline, setDeadline] = useState('2026-04-15');

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
        console.error('Failed to load placement dashboard data', err);
      }
    };
    fetchData();
  }, []);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const newDrive = {
      _id: 'job_' + Date.now(),
      companyName,
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=200',
      role,
      packageLPA: Number(packageLPA),
      location,
      minCgpa: Number(minCgpa),
      deadline,
      status: 'Open',
      applicantsCount: 0,
    };
    setJobs([newDrive, ...jobs]);
    setIsAddJobModalOpen(false);
    addToast('success', 'Placement Drive Created', `Active drive registered for ${companyName}.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="primary">University Placement Directorate</Badge>
          <h1 className="text-3xl font-extrabold">Corporate Relations & Placement Hub</h1>
          <p className="text-xs sm:text-sm text-emerald-200">
            Active Placement Season 2025-26 • Overall Campus Conversion: {analytics?.placementPercentage || '96.4%'}
          </p>
        </div>

        <Button onClick={() => setIsAddJobModalOpen(true)} className="gap-2 shadow-lg">
          <Plus className="w-4 h-4" />
          <span>Launch New Campus Drive</span>
        </Button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 text-center">
          <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {analytics?.highestPackage || '₹48.0 LPA'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Highest CTC Secured</p>
        </Card>
        <Card className="p-5 text-center">
          <Briefcase className="w-6 h-6 text-brand-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {analytics?.averagePackage || '₹9.4 LPA'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Average Campus CTC</p>
        </Card>
        <Card className="p-5 text-center">
          <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {analytics?.studentsPlaced || 620}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Graduates Placed</p>
        </Card>
        <Card className="p-5 text-center">
          <Building className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {analytics?.totalCompanies || 154}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Visiting Companies</p>
        </Card>
      </div>

      {/* Registered Companies & Active Drives */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Active Placement Drives & Eligibility Criteria
          </h3>
          <span className="text-xs text-slate-400">{jobs.length} Drives Registered</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {jobs.map((job) => (
            <div key={job._id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                  {job.companyName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{job.role}</h4>
                  <p className="text-slate-500">{job.companyName} • {job.location}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  ₹{job.packageLPA} LPA
                </span>
                <Badge variant="neutral">Min CGPA: {job.minCgpa}</Badge>
                <Badge variant="primary">{job.applicantsCount || 42} Applicants</Badge>
                <span className="text-slate-400 text-[11px]">Deadline: {job.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal for adding placement drive */}
      <Modal isOpen={isAddJobModalOpen} onClose={() => setIsAddJobModalOpen(false)} title="Register New Campus Drive">
        <form onSubmit={handleCreateJob} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Oracle India"
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Role</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Engineer - Cloud Infrastructure"
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Package (CTC in LPA)</label>
              <input
                type="number"
                required
                value={packageLPA}
                onChange={(e) => setPackageLPA(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Minimum CGPA</label>
              <input
                type="number"
                step="0.1"
                required
                value={minCgpa}
                onChange={(e) => setMinCgpa(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setIsAddJobModalOpen(false)}>Cancel</Button>
            <Button type="submit">Publish Placement Drive</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
