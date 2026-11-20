import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Award, CheckCircle, Calculator, ExternalLink, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const ScholarshipsPage: React.FC = () => {
  const { user } = useAuth();
  const [cgpaInput, setCgpaInput] = useState(8.5);
  const [incomeInput, setIncomeInput] = useState(4); // Lakhs/year
  const [categoryInput, setCategoryInput] = useState('General / Merit');

  const scholarships = [
    {
      id: 'sch_1',
      name: 'EduNexus Chancellor Academic Merit Scholarship',
      provider: 'EduNexus University Trust',
      amount: '₹50,000 / year (Full Tuition Waiver)',
      minCgpa: 8.5,
      maxIncome: 12,
      deadline: '2026-04-30',
      description: 'Awarded to top 5% academic performers across undergraduate engineering branches.',
    },
    {
      id: 'sch_2',
      name: 'State Post-Matric Merit-cum-Means Grant (SSP)',
      provider: 'Department of Higher Education, Karnataka',
      amount: '₹35,000 / year',
      minCgpa: 7.0,
      maxIncome: 6,
      deadline: '2026-03-31',
      description: 'Government scholarship scheme for eligible day-scholar and residential students.',
    },
    {
      id: 'sch_3',
      name: 'Google Women Techmakers Engineering Fellowship',
      provider: 'Google India & APAC',
      amount: '₹1,00,000 + Google Mentorship',
      minCgpa: 8.0,
      maxIncome: 20,
      deadline: '2026-05-15',
      description: 'Empowering future female computer scientists and software engineers with funding and technical mentorship.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="primary">Financial Aid & Merit Grants</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Scholarships & Institutional Grants
        </h1>
        <p className="text-xs text-slate-500">
          Find matching scholarships, calculate your eligibility score, and submit documentation.
        </p>
      </div>

      {/* Interactive Eligibility Checker */}
      <Card className="p-6 sm:p-8 space-y-6 bg-gradient-to-br from-brand-50/50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-600">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Smart Scholarship Eligibility Calculator
            </h3>
            <p className="text-xs text-slate-500">Adjust your CGPA and family income to instantly evaluate matched grants.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Your Current CGPA:</span>
              <span className="text-brand-600 font-bold">{cgpaInput}</span>
            </div>
            <input
              type="range"
              min={6.0}
              max={10.0}
              step={0.1}
              value={cgpaInput}
              onChange={(e) => setCgpaInput(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Annual Family Income:</span>
              <span className="text-emerald-600 font-bold">₹{incomeInput} Lakhs/Yr</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={incomeInput}
              onChange={(e) => setIncomeInput(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold mb-1">Quota / Category:</span>
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-brand-500"
            >
              <option>General / Merit</option>
              <option>OBC / Category 1/2A/2B/3A/3B</option>
              <option>SC / ST</option>
              <option>Women In Technology</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Scholarship Cards with Live Qualification Evaluator */}
      <div className="space-y-4">
        {scholarships.map((sch) => {
          const isEligible = cgpaInput >= sch.minCgpa && incomeInput <= sch.maxIncome;
          return (
            <Card key={sch.id} className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{sch.name}</h3>
                  <p className="text-xs text-slate-500">{sch.provider}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={isEligible ? 'success' : 'neutral'}>
                    {isEligible ? 'You Are Eligible!' : 'Criteria Not Met'}
                  </Badge>
                  <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                    {sch.amount}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{sch.description}</p>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 gap-4">
                <span>Prerequisites: Min CGPA {sch.minCgpa} • Income &lt;= ₹{sch.maxIncome}L</span>
                <span>Deadline: {sch.deadline}</span>
                <Button size="sm" disabled={!isEligible} className="gap-1.5">
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
