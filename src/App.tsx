import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppShell, RequireAuth, RoleRedirect } from './layouts/AppShell';

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

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/school" element={<SchoolDetailsPage />} />
            <Route path="/admin/students" element={<StudentsPage />} />
            <Route path="/admin/students/:id" element={<StudentProfile />} />
            <Route path="/admin/teachers" element={<TeachersPage />} />
            <Route path="/admin/teachers/:id" element={<TeacherProfile />} />
            <Route path="/admin/parents" element={<ParentsPage />} />
            <Route path="/admin/management-users" element={<TeachersPage />} />
            <Route path="/admin/academic-years" element={<AcademicStructurePage initialTab="years" />} />
            <Route path="/admin/terms" element={<AcademicStructurePage initialTab="terms" />} />
            <Route path="/admin/grades" element={<AcademicStructurePage initialTab="grades" />} />
            <Route path="/admin/streams" element={<AcademicStructurePage initialTab="streams" />} />
            <Route path="/admin/subjects" element={<AcademicStructurePage initialTab="subjects" />} />
            <Route path="/admin/curriculum" element={<AcademicStructurePage initialTab="subjects" />} />
            <Route path="/admin/assignments" element={<TeacherAssignmentsPage />} />
            <Route path="/admin/admissions" element={<StudentMovementPage initialTab="admissions" />} />
            <Route path="/admin/promotions" element={<StudentMovementPage initialTab="promotions" />} />
            <Route path="/admin/transfers" element={<StudentMovementPage initialTab="transfers" />} />
            <Route path="/admin/roles" element={<RolesPermissionsPage />} />
            <Route path="/admin/audit-log" element={<AuditLogPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />

            {/* Management Routes */}
            <Route path="/management" element={<ManagementDashboard />} />
            <Route path="/management/performance" element={<SchoolPerformance />} />
            <Route path="/management/grades" element={<SchoolPerformance />} />
            <Route path="/management/subjects" element={<SchoolPerformance />} />
            <Route path="/management/gaps" element={<SchoolPerformance />} />
            <Route path="/management/learners" element={<StudentsPage />} />
            <Route path="/management/interventions" element={<InterventionsOverview />} />
            <Route path="/management/whatif" element={<WhatIfAnalysis />} />
            <Route path="/management/ai" element={<ManagementAIAssistant />} />
            <Route path="/management/audit-log" element={<AuditLogPage />} />

            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/classes" element={<MyClasses />} />
            <Route path="/teacher/learners" element={<MyLearners />} />
            <Route path="/teacher/assessments" element={<AssessmentsPage />} />
            <Route path="/teacher/enter-marks" element={<EnterMarks />} />
            <Route path="/teacher/upload" element={<UploadMarksheet />} />
            <Route path="/teacher/ocr-review" element={<OCRReview />} />
            <Route path="/teacher/performance" element={<ClassPerformance />} />
            <Route path="/teacher/interventions" element={<TeacherInterventions />} />
            <Route path="/teacher/ai" element={<TeacherAIAssistant />} />

            {/* Parent Routes */}
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="/parent/performance" element={<ChildProfile />} />
            <Route path="/parent/subjects" element={<ChildProfile />} />
            <Route path="/parent/attendance" element={<ChildProfile />} />
            <Route path="/parent/feedback" element={<ParentDashboard />} />
            <Route path="/parent/interventions" element={<ChildProfile />} />
            <Route path="/parent/ai" element={<ParentAIAssistant />} />

            {/* Student Routes */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/performance" element={<StudentDashboard />} />
            <Route path="/student/subjects" element={<StudentDashboard />} />
            <Route path="/student/ai" element={<StudentAIAssistant />} />

            {/* Dev Center (Only active during dev) */}
            <Route path="/dev/accounts" element={<DevAccountCenter />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
