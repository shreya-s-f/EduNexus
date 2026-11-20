import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ArrowRight, Users, GraduationCap, FlaskConical } from 'lucide-react';
import api from '../services/api';
import { DepartmentItem } from '../types';

export const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get('/departments');
        setDepartments(res.data.data || []);
      } catch (err) {
        console.error('Failed to load departments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="primary">Academic Units</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Engineering & Technological Departments
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Six multidisciplinary departments offering undergraduate B.E., postgraduate M.Tech, and doctoral
          Ph.D. degree programs backed by industry centers of excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.code} hover className="overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-44 w-full relative overflow-hidden">
                <img
                  src={dept.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'}
                  alt={dept.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                    {dept.code}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{dept.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {dept.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-slate-400">
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Students</span>
                    </div>
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-200 mt-0.5">{dept.totalStudents}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-slate-400">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Faculty</span>
                    </div>
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-200 mt-0.5">{dept.totalFaculty}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-slate-400">
                      <FlaskConical className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Labs</span>
                    </div>
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-200 mt-0.5">{dept.labs?.length || 4}</p>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">HOD: </span>
                  {dept.hodName}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link to={`/departments/${dept.code}`}>
                <Button className="w-full justify-between" size="sm">
                  <span>View Department Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
