import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DepartmentDetailPage } from './pages/DepartmentDetailPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { PlacementsPage } from './pages/PlacementsPage';
import { EventsPage } from './pages/EventsPage';
import { ClubsPage } from './pages/ClubsPage';
import { CampusGalleryPage } from './pages/CampusGalleryPage';
import { ContactPage } from './pages/ContactPage';
import { CampusMapPage } from './pages/CampusMapPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { TimetablePage } from './pages/TimetablePage';
import { NoticeBoardPage } from './pages/NoticeBoardPage';
import { ExamsResultsPage } from './pages/ExamsResultsPage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { LibraryPage } from './pages/LibraryPage';
import { ComplaintsPage } from './pages/ComplaintsPage';

// Dashboards
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { StudentAttendancePage } from './pages/student/StudentAttendancePage';
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { HodDashboard } from './pages/hod/HodDashboard';
import { PlacementOfficerDashboard } from './pages/placement/PlacementOfficerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages with PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/departments/:code" element={<DepartmentDetailPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/gallery" element={<CampusGalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/campus-map" element={<CampusMapPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/scholarships" element={<ScholarshipsPage />} />
        <Route path="/notices" element={<NoticeBoardPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/exams" element={<ExamsResultsPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Student Portal Routes */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="attendance" element={<StudentAttendancePage />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Faculty Portal Routes */}
      <Route
        path="/faculty/*"
        element={
          <ProtectedRoute allowedRoles={['FACULTY', 'HOD']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<FacultyDashboard />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* HOD Portal Routes */}
      <Route
        path="/hod/*"
        element={
          <ProtectedRoute allowedRoles={['HOD']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<HodDashboard />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Placement Officer Portal Routes */}
      <Route
        path="/placement/*"
        element={
          <ProtectedRoute allowedRoles={['PLACEMENT_OFFICER']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<PlacementOfficerDashboard />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Portal Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Alumni Portal Routes */}
      <Route
        path="/alumni/*"
        element={
          <ProtectedRoute allowedRoles={['ALUMNI']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
