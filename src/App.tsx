import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppShell, RequireAuth, RequireRole, RoleRedirect } from './layouts/AppShell';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentsPage from './pages/admin/students/StudentsPage';
import StudentProfile from './pages/admin/students/StudentProfile';
import TeachersPage from './pages/admin/teachers/TeachersPage';
import TeacherProfile from './pages/admin/teachers/TeacherProfile';
import ParentsPage from './pages/admin/parents/ParentsPage';
import AcademicStructurePage from './pages/admin/academic/AcademicStructurePage';
import TeacherAssignmentsPage from './pages/admin/assignments/TeacherAssignmentsPage';
import StudentMovementPage from './pages/admin/movement/StudentMovementPage';
import RolesPermissionsPage from './pages/admin/security/RolesPermissionsPage';
import AuditLogPage from './pages/admin/security/AuditLogPage';
import SchoolDetailsPage from './pages/admin/SchoolDetailsPage';
import SettingsPage from './pages/admin/SettingsPage';

// Management Pages
import ManagementDashboard from './pages/management/ManagementDashboard';
import SchoolPerformance from './pages/management/performance/SchoolPerformance';
import InterventionsOverview from './pages/management/interventions/InterventionsOverview';
import WhatIfAnalysis from './pages/management/whatif/WhatIfAnalysis';
import ManagementAIAssistant from './pages/management/ManagementAIAssistant';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import MyClasses from './pages/teacher/classes/MyClasses';
import MyLearners from './pages/teacher/learners/MyLearners';
import AssessmentsPage from './pages/teacher/assessments/AssessmentsPage';
import EnterMarks from './pages/teacher/assessments/EnterMarks';
import UploadMarksheet from './pages/teacher/assessments/UploadMarksheet';
import OCRReview from './pages/teacher/assessments/OCRReview';
import ClassPerformance from './pages/teacher/performance/ClassPerformance';
import TeacherInterventions from './pages/teacher/interventions/TeacherInterventions';
import TeacherAIAssistant from './pages/teacher/ai/TeacherAIAssistant';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ChildProfile from './pages/parent/children/ChildProfile';
import ParentAIAssistant from './pages/parent/ai/ParentAIAssistant';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentAIAssistant from './pages/student/StudentAIAssistant';

// Dev Pages
import DevAccountCenter from './pages/dev/DevAccountCenter';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Authenticated Application Shell */}
          <Route element={<AppShell />}>
            <Route index element={<RoleRedirect />} />

              {/* ── Admin Routes (admin only) ── */}
            <Route path="/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />
            <Route path="/admin/school" element={<RequireRole role="admin"><SchoolDetailsPage /></RequireRole>} />
            <Route path="/admin/students" element={<RequireRole role="admin"><StudentsPage /></RequireRole>} />
            <Route path="/admin/students/:id" element={<RequireRole role="admin"><StudentProfile /></RequireRole>} />
            <Route path="/admin/teachers" element={<RequireRole role="admin"><TeachersPage /></RequireRole>} />
            <Route path="/admin/teachers/:id" element={<RequireRole role="admin"><TeacherProfile /></RequireRole>} />
            <Route path="/admin/parents" element={<RequireRole role="admin"><ParentsPage /></RequireRole>} />
            <Route path="/admin/management-users" element={<RequireRole role="admin"><TeachersPage /></RequireRole>} />
            <Route path="/admin/academic-years" element={<RequireRole role="admin"><AcademicStructurePage initialTab="years" /></RequireRole>} />
            <Route path="/admin/terms" element={<RequireRole role="admin"><AcademicStructurePage initialTab="terms" /></RequireRole>} />
            <Route path="/admin/grades" element={<RequireRole role="admin"><AcademicStructurePage initialTab="grades" /></RequireRole>} />
            <Route path="/admin/streams" element={<RequireRole role="admin"><AcademicStructurePage initialTab="streams" /></RequireRole>} />
            <Route path="/admin/subjects" element={<RequireRole role="admin"><AcademicStructurePage initialTab="subjects" /></RequireRole>} />
            <Route path="/admin/curriculum" element={<RequireRole role="admin"><AcademicStructurePage initialTab="subjects" /></RequireRole>} />
            <Route path="/admin/assignments" element={<RequireRole role="admin"><TeacherAssignmentsPage /></RequireRole>} />
            <Route path="/admin/admissions" element={<RequireRole role="admin"><StudentMovementPage initialTab="admissions" /></RequireRole>} />
            <Route path="/admin/promotions" element={<RequireRole role="admin"><StudentMovementPage initialTab="promotions" /></RequireRole>} />
            <Route path="/admin/transfers" element={<RequireRole role="admin"><StudentMovementPage initialTab="transfers" /></RequireRole>} />
            <Route path="/admin/roles" element={<RequireRole role="admin"><RolesPermissionsPage /></RequireRole>} />
            <Route path="/admin/audit-log" element={<RequireRole role="admin"><AuditLogPage /></RequireRole>} />
            <Route path="/admin/settings" element={<RequireRole role="admin"><SettingsPage /></RequireRole>} />

            {/* ── Management Routes (management only) ── */}
            <Route path="/management" element={<RequireRole role="management"><ManagementDashboard /></RequireRole>} />
            <Route path="/management/performance" element={<RequireRole role="management"><SchoolPerformance /></RequireRole>} />
            <Route path="/management/grades" element={<RequireRole role="management"><SchoolPerformance /></RequireRole>} />
            <Route path="/management/subjects" element={<RequireRole role="management"><SchoolPerformance /></RequireRole>} />
            <Route path="/management/gaps" element={<RequireRole role="management"><SchoolPerformance /></RequireRole>} />
            <Route path="/management/learners" element={<RequireRole role="management"><StudentsPage /></RequireRole>} />
            <Route path="/management/interventions" element={<RequireRole role="management"><InterventionsOverview /></RequireRole>} />
            <Route path="/management/whatif" element={<RequireRole role="management"><WhatIfAnalysis /></RequireRole>} />
            <Route path="/management/ai" element={<RequireRole role="management"><ManagementAIAssistant /></RequireRole>} />
            <Route path="/management/audit-log" element={<RequireRole role="management"><AuditLogPage /></RequireRole>} />

            {/* ── Teacher Routes (teacher only) ── */}
            <Route path="/teacher" element={<RequireRole role="teacher"><TeacherDashboard /></RequireRole>} />
            <Route path="/teacher/classes" element={<RequireRole role="teacher"><MyClasses /></RequireRole>} />
            <Route path="/teacher/learners" element={<RequireRole role="teacher"><MyLearners /></RequireRole>} />
            <Route path="/teacher/assessments" element={<RequireRole role="teacher"><AssessmentsPage /></RequireRole>} />
            <Route path="/teacher/enter-marks" element={<RequireRole role="teacher"><EnterMarks /></RequireRole>} />
            <Route path="/teacher/upload" element={<RequireRole role="teacher"><UploadMarksheet /></RequireRole>} />
            <Route path="/teacher/ocr-review" element={<RequireRole role="teacher"><OCRReview /></RequireRole>} />
            <Route path="/teacher/performance" element={<RequireRole role="teacher"><ClassPerformance /></RequireRole>} />
            <Route path="/teacher/interventions" element={<RequireRole role="teacher"><TeacherInterventions /></RequireRole>} />
            <Route path="/teacher/ai" element={<RequireRole role="teacher"><TeacherAIAssistant /></RequireRole>} />

            {/* ── Parent Routes (parent only) ── */}
            <Route path="/parent" element={<RequireRole role="parent"><ParentDashboard /></RequireRole>} />
            <Route path="/parent/performance" element={<RequireRole role="parent"><ChildProfile /></RequireRole>} />
            <Route path="/parent/subjects" element={<RequireRole role="parent"><ChildProfile /></RequireRole>} />
            <Route path="/parent/attendance" element={<RequireRole role="parent"><ChildProfile /></RequireRole>} />
            <Route path="/parent/feedback" element={<RequireRole role="parent"><ParentDashboard /></RequireRole>} />
            <Route path="/parent/interventions" element={<RequireRole role="parent"><ChildProfile /></RequireRole>} />
            <Route path="/parent/ai" element={<RequireRole role="parent"><ParentAIAssistant /></RequireRole>} />

            {/* ── Student Routes (student only) ── */}
            <Route path="/student" element={<RequireRole role="student"><StudentDashboard /></RequireRole>} />
            <Route path="/student/performance" element={<RequireRole role="student"><StudentDashboard /></RequireRole>} />
            <Route path="/student/subjects" element={<RequireRole role="student"><StudentDashboard /></RequireRole>} />
            <Route path="/student/ai" element={<RequireRole role="student"><StudentAIAssistant /></RequireRole>} />

            {/* ── Dev Account Center (development builds only — stripped by Vite in production) ── */}
            {import.meta.env.DEV && (
              <Route path="/dev/accounts" element={<RequireAuth><DevAccountCenter /></RequireAuth>} />
            )}
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
