// ============================================================
// MOCK DATA — PERFORMANCE
// Internally consistent: trends match assessment data,
// interventions show before/after impact.
// ============================================================
import type { SchoolPerformanceSummary, StudentPerformanceSummary, SubjectPerformance, TrendDataPoint } from '../types/performance';
import type { Intervention, InterventionOutcome } from '../types/index';
import type { Assessment, StudentMark } from '../types/performance';
import type { AuditLogEntry } from '../types/index';

// ============================================================
// SCHOOL-WIDE PERFORMANCE SUMMARY
// ============================================================
export const SCHOOL_PERFORMANCE: SchoolPerformanceSummary = {
  academicYear: '2026',
  term: 'Term 3',
  overallPercentage: 68.4,
  previousTermPercentage: 65.1,
  trend: 'improving',
  totalStudents: 842,
  studentsRequiringSupport: 76,
  grades: [
    {
      gradeId: 'grade-6',
      gradeName: 'Grade 6',
      averagePercentage: 61.2,
      previousTermPercentage: 58.4,
      trend: 'improving',
      studentCount: 74,
      studentsRequiringSupport: 18,
      subjects: [
        { subjectId: 'subj-math', subjectName: 'Mathematics', averagePercentage: 52.0, previousTermPercentage: 49.0, trend: 'improving', studentCount: 74, assessmentCount: 6 },
        { subjectId: 'subj-eng', subjectName: 'English', averagePercentage: 68.5, previousTermPercentage: 66.0, trend: 'improving', studentCount: 74, assessmentCount: 5 },
        { subjectId: 'subj-kis', subjectName: 'Kiswahili', averagePercentage: 71.2, previousTermPercentage: 70.0, trend: 'stable', studentCount: 74, assessmentCount: 5 },
        { subjectId: 'subj-sci', subjectName: 'Science', averagePercentage: 59.4, previousTermPercentage: 57.0, trend: 'improving', studentCount: 74, assessmentCount: 4 },
        { subjectId: 'subj-sst', subjectName: 'Social Studies', averagePercentage: 64.0, previousTermPercentage: 63.0, trend: 'stable', studentCount: 74, assessmentCount: 4 },
      ],
    },
    {
      gradeId: 'grade-7',
      gradeName: 'Grade 7',
      averagePercentage: 66.8,
      previousTermPercentage: 64.0,
      trend: 'improving',
      studentCount: 68,
      studentsRequiringSupport: 12,
      subjects: [
        { subjectId: 'subj-math', subjectName: 'Mathematics', averagePercentage: 58.0, previousTermPercentage: 55.0, trend: 'improving', studentCount: 68, assessmentCount: 5 },
        { subjectId: 'subj-eng', subjectName: 'English', averagePercentage: 72.0, previousTermPercentage: 70.0, trend: 'improving', studentCount: 68, assessmentCount: 5 },
        { subjectId: 'subj-sci', subjectName: 'Science', averagePercentage: 63.0, previousTermPercentage: 62.0, trend: 'stable', studentCount: 68, assessmentCount: 4 },
      ],
    },
    {
      gradeId: 'grade-5',
      gradeName: 'Grade 5',
      averagePercentage: 72.5,
      previousTermPercentage: 70.0,
      trend: 'improving',
      studentCount: 77,
      studentsRequiringSupport: 10,
      subjects: [
        { subjectId: 'subj-math', subjectName: 'Mathematics', averagePercentage: 65.0, previousTermPercentage: 62.0, trend: 'improving', studentCount: 77, assessmentCount: 5 },
        { subjectId: 'subj-eng', subjectName: 'English', averagePercentage: 74.0, previousTermPercentage: 73.0, trend: 'stable', studentCount: 77, assessmentCount: 5 },
        { subjectId: 'subj-sci', subjectName: 'Science', averagePercentage: 70.0, previousTermPercentage: 68.0, trend: 'improving', studentCount: 77, assessmentCount: 4 },
      ],
    },
    {
      gradeId: 'grade-4',
      gradeName: 'Grade 4',
      averagePercentage: 70.1,
      previousTermPercentage: 68.5,
      trend: 'improving',
      studentCount: 77,
      studentsRequiringSupport: 14,
      subjects: [
        { subjectId: 'subj-math', subjectName: 'Mathematics', averagePercentage: 62.0, previousTermPercentage: 60.0, trend: 'improving', studentCount: 77, assessmentCount: 5 },
        { subjectId: 'subj-eng', subjectName: 'English', averagePercentage: 75.0, previousTermPercentage: 74.0, trend: 'stable', studentCount: 77, assessmentCount: 5 },
      ],
    },
  ],
  topLearningGaps: [
    { subStrandId: 'ss-fractions', subStrandName: 'Fractions', averagePercentage: 43.0, studentCount: 74, studentsRequiringSupport: 31 },
    { subStrandId: 'ss-decimals', subStrandName: 'Decimals', averagePercentage: 48.0, studentCount: 74, studentsRequiringSupport: 24 },
    { subStrandId: 'ss-percentages', subStrandName: 'Percentages', averagePercentage: 51.0, studentCount: 74, studentsRequiringSupport: 20 },
    { subStrandId: 'ss-algebra-basics', subStrandName: 'Basic Algebra', averagePercentage: 55.0, studentCount: 68, studentsRequiringSupport: 17 },
  ],
};

// ============================================================
// GRADE 6 TERM TREND (for chart)
// ============================================================
export const GRADE6_MATH_TREND: TrendDataPoint[] = [
  { label: 'T1 2025', value: 44.0 },
  { label: 'T2 2025', value: 42.5 },
  { label: 'T3 2025', value: 47.0 },
  { label: 'T1 2026', value: 49.0 },
  { label: 'T2 2026', value: 50.5 },
  { label: 'T3 2026', value: 52.0 },
];

export const SCHOOL_TERM_TREND: TrendDataPoint[] = [
  { label: 'T1 2025', value: 62.0 },
  { label: 'T2 2025', value: 61.5 },
  { label: 'T3 2025', value: 63.8 },
  { label: 'T1 2026', value: 64.0 },
  { label: 'T2 2026', value: 65.1 },
  { label: 'T3 2026', value: 68.4 },
];

// ============================================================
// STUDENT PERFORMANCE — Brian Mwangi (stu-001)
// Shows declining then recovering after intervention
// ============================================================
export const BRIAN_PERFORMANCE: StudentPerformanceSummary = {
  studentId: 'stu-001',
  overallPercentage: 61.5,
  trend: 'improving',
  attendancePercentage: 94.0,
  strengths: ['Geometry', 'Kiswahili Composition'],
  needsSupport: ['Fractions', 'Decimals'],
  subjects: [
    { subjectId: 'subj-math', subjectName: 'Mathematics', averagePercentage: 52.0, previousTermPercentage: 47.0, trend: 'improving', studentCount: 1, assessmentCount: 6 },
    { subjectId: 'subj-eng', subjectName: 'English', averagePercentage: 72.0, previousTermPercentage: 69.0, trend: 'improving', studentCount: 1, assessmentCount: 5 },
    { subjectId: 'subj-kis', subjectName: 'Kiswahili', averagePercentage: 76.0, previousTermPercentage: 75.0, trend: 'stable', studentCount: 1, assessmentCount: 5 },
    { subjectId: 'subj-sci', subjectName: 'Science', averagePercentage: 64.0, previousTermPercentage: 60.0, trend: 'improving', studentCount: 1, assessmentCount: 4 },
    { subjectId: 'subj-sst', subjectName: 'Social Studies', averagePercentage: 68.0, previousTermPercentage: 67.0, trend: 'stable', studentCount: 1, assessmentCount: 4 },
  ],
  recentAssessments: [],
};

export const BRIAN_MATH_TREND: TrendDataPoint[] = [
  { label: 'T1 2025', value: 55 },
  { label: 'T2 2025', value: 53 },
  { label: 'T3 2025', value: 50 },
  { label: 'T1 2026', value: 47 },
  { label: 'T2 2026', value: 38 },
  // Intervention started after T2 2026
  { label: 'T3 2026 Assessment 1', value: 44 },
  { label: 'T3 2026 Assessment 2', value: 52 },
];

// ============================================================
// ASSESSMENTS
// ============================================================
export const ASSESSMENTS: Assessment[] = [
  {
    id: 'assess-001',
    title: 'Fractions Assessment',
    type: 'formative',
    teacherId: 'teacher-1',
    subjectId: 'subj-math',
    gradeId: 'grade-6',
    streamId: 'stream-6e',
    academicYearId: 'ay-2026',
    termId: 'term-2026-3',
    date: '2026-09-12',
    totalMarks: 20,
    status: 'verified',
    subStrandId: 'ss-fractions',
    strandId: 'strand-math-num',
    description: 'Equivalent fractions and simplification',
  },
  {
    id: 'assess-002',
    title: 'Decimals Quiz',
    type: 'formative',
    teacherId: 'teacher-1',
    subjectId: 'subj-math',
    gradeId: 'grade-6',
    streamId: 'stream-6e',
    academicYearId: 'ay-2026',
    termId: 'term-2026-3',
    date: '2026-09-26',
    totalMarks: 20,
    status: 'verified',
    subStrandId: 'ss-decimals',
    strandId: 'strand-math-num',
  },
  {
    id: 'assess-003',
    title: 'Geometry Test',
    type: 'summative',
    teacherId: 'teacher-1',
    subjectId: 'subj-math',
    gradeId: 'grade-6',
    streamId: 'stream-6e',
    academicYearId: 'ay-2026',
    termId: 'term-2026-3',
    date: '2026-10-03',
    totalMarks: 30,
    status: 'active',
    subStrandId: 'ss-geometry',
    strandId: 'strand-math-geo',
  },
];

// Marks for Fractions Assessment (assess-001) — declining trend before intervention
export const MARKS_ASSESS_001: StudentMark[] = [
  { id: 'mark-001-001', assessmentId: 'assess-001', studentId: 'stu-001', marksObtained: 9, totalMarks: 20, percentage: 45, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
  { id: 'mark-001-002', assessmentId: 'assess-001', studentId: 'stu-002', marksObtained: 17, totalMarks: 20, percentage: 85, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
  { id: 'mark-001-003', assessmentId: 'assess-001', studentId: 'stu-003', marksObtained: 7, totalMarks: 20, percentage: 35, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
  { id: 'mark-001-004', assessmentId: 'assess-001', studentId: 'stu-004', marksObtained: 11, totalMarks: 20, percentage: 55, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
  { id: 'mark-001-005', assessmentId: 'assess-001', studentId: 'stu-005', marksObtained: 14, totalMarks: 20, percentage: 70, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
  { id: 'mark-001-006', assessmentId: 'assess-001', studentId: 'stu-006', marksObtained: 16, totalMarks: 20, percentage: 80, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
  { id: 'mark-001-007', assessmentId: 'assess-001', studentId: 'stu-007', marksObtained: 13, totalMarks: 20, percentage: 65, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
  { id: 'mark-001-008', assessmentId: 'assess-001', studentId: 'stu-008', marksObtained: 15, totalMarks: 20, percentage: 75, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
  { id: 'mark-001-009', assessmentId: 'assess-001', studentId: 'stu-009', marksObtained: 8, totalMarks: 20, percentage: 40, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
  { id: 'mark-001-010', assessmentId: 'assess-001', studentId: 'stu-010', marksObtained: 12, totalMarks: 20, percentage: 60, status: 'verified', enteredBy: 'teacher-1', enteredAt: '2026-09-13T10:00:00Z' },
];

// ============================================================
// INTERVENTIONS — Brian Mwangi (stu-001)
// Shows real before/after impact
// ============================================================
export const INTERVENTIONS: Intervention[] = [
  {
    id: 'int-001',
    studentId: 'stu-001',
    teacherId: 'teacher-1',
    subjectId: 'subj-math',
    subStrandId: 'ss-fractions',
    subStrandName: 'Equivalent Fractions',
    type: 'small_group',
    title: 'Fractions Support Group',
    description: 'Brian joined a small group of 4 learners for intensive fractions practice using visual models and practical examples.',
    issue: 'Consistent low performance across 3 fractions assessments. Score declined from 55% to 38%.',
    startDate: '2026-08-15',
    endDate: '2026-09-20',
    status: 'completed',
    createdAt: '2026-08-14T09:00:00Z',
    outcome: {
      id: 'out-001',
      interventionId: 'int-001',
      beforePercentage: 38,
      afterPercentage: 64,
      improvement: 26,
      result: 'improved',
      notes: 'Brian showed strong improvement after visual model approach. Recommend continuing with decimals topic.',
      recordedAt: '2026-09-22T14:00:00Z',
    },
  },
  {
    id: 'int-002',
    studentId: 'stu-003',
    teacherId: 'teacher-1',
    subjectId: 'subj-math',
    subStrandId: 'ss-fractions',
    subStrandName: 'Fractions',
    type: 'one_on_one',
    title: 'Peter — Fractions One-on-One',
    description: 'One-on-one remedial session for Peter Otieno on fractions fundamentals.',
    issue: 'Lowest performing student in fractions (35%). Did not respond to group intervention.',
    startDate: '2026-09-15',
    status: 'active',
    createdAt: '2026-09-14T11:00:00Z',
  },
  {
    id: 'int-003',
    studentId: 'stu-009',
    teacherId: 'teacher-1',
    subjectId: 'subj-math',
    subStrandId: 'ss-fractions',
    subStrandName: 'Fractions',
    type: 'parental_involvement',
    title: 'James — Parent Engagement',
    description: 'Meeting with parent to share fractions practice materials for home support.',
    issue: 'Moderate low performance (40%). Parent meeting scheduled.',
    startDate: '2026-09-18',
    status: 'active',
    createdAt: '2026-09-17T09:00:00Z',
  },
];

// ============================================================
// AUDIT LOG
// ============================================================
export const AUDIT_LOG: AuditLogEntry[] = [
  { id: 'audit-001', userId: 'user-teacher-1', userName: 'Jane Wanjiku', userRole: 'Teacher', action: 'MARK_UPDATED', entity: 'StudentMark', entityId: 'mark-001-003', oldValue: '7', newValue: '7', description: 'Mark submitted for Fractions Assessment — Peter Otieno', timestamp: '2026-09-13T10:15:00Z' },
  { id: 'audit-002', userId: 'user-admin-1', userName: 'Dennis Njogu', userRole: 'Admin', action: 'STUDENT_CREATED', entity: 'Student', entityId: 'stu-016', description: 'New student registered: John Muthoni', timestamp: '2026-09-02T09:00:00Z' },
  { id: 'audit-003', userId: 'user-admin-1', userName: 'Dennis Njogu', userRole: 'Admin', action: 'TRANSFER_REQUESTED', entity: 'Transfer', entityId: 'transfer-001', description: 'Transfer request created for John Muthoni', timestamp: '2026-09-30T14:00:00Z' },
  { id: 'audit-004', userId: 'user-teacher-1', userName: 'Jane Wanjiku', userRole: 'Teacher', action: 'INTERVENTION_CREATED', entity: 'Intervention', entityId: 'int-001', description: 'Intervention created for Brian Mwangi — Fractions', timestamp: '2026-08-14T09:05:00Z' },
  { id: 'audit-005', userId: 'user-admin-1', userName: 'Dennis Njogu', userRole: 'Admin', action: 'TEACHER_ASSIGNED', entity: 'TeachingAssignment', entityId: 'ta-001', description: 'Jane Wanjiku assigned to Grade 6 East Mathematics', timestamp: '2025-12-15T11:00:00Z' },
  { id: 'audit-006', userId: 'user-teacher-1', userName: 'Jane Wanjiku', userRole: 'Teacher', action: 'ASSESSMENT_VERIFIED', entity: 'Assessment', entityId: 'assess-001', description: 'Fractions Assessment marks verified for Grade 6 East', timestamp: '2026-09-13T10:30:00Z' },
  { id: 'audit-007', userId: 'user-admin-1', userName: 'Dennis Njogu', userRole: 'Admin', action: 'PARENT_ACCOUNT_CREATED', entity: 'Parent', entityId: 'parent-1', description: 'Parent account created: Mary Mwangi', timestamp: '2020-01-06T08:00:00Z' },
];

// ============================================================
// SUBJECT PERFORMANCE — GRADE 6 EAST (for teacher view)
// ============================================================
export const GRADE6_EAST_SUBJECT_PERFORMANCE: SubjectPerformance[] = [
  { subjectId: 'subj-math', subjectName: 'Mathematics', averagePercentage: 52.0, previousTermPercentage: 48.0, trend: 'improving', studentCount: 38, assessmentCount: 6 },
  { subjectId: 'subj-eng', subjectName: 'English', averagePercentage: 69.5, previousTermPercentage: 67.0, trend: 'improving', studentCount: 38, assessmentCount: 5 },
  { subjectId: 'subj-kis', subjectName: 'Kiswahili', averagePercentage: 72.0, previousTermPercentage: 71.0, trend: 'stable', studentCount: 38, assessmentCount: 5 },
  { subjectId: 'subj-sci', subjectName: 'Science', averagePercentage: 61.0, previousTermPercentage: 58.0, trend: 'improving', studentCount: 38, assessmentCount: 4 },
];

// ============================================================
// GRACE MWANGI (stu-013) performance — parent dashboard
// ============================================================
export const GRACE_PERFORMANCE: StudentPerformanceSummary = {
  studentId: 'stu-013',
  overallPercentage: 78.5,
  trend: 'improving',
  attendancePercentage: 98.0,
  strengths: ['English', 'Kiswahili'],
  needsSupport: ['Mathematics'],
  subjects: [
    { subjectId: 'subj-math', subjectName: 'Mathematics', averagePercentage: 65.0, previousTermPercentage: 62.0, trend: 'improving', studentCount: 1, assessmentCount: 4 },
    { subjectId: 'subj-eng', subjectName: 'English', averagePercentage: 84.0, previousTermPercentage: 82.0, trend: 'improving', studentCount: 1, assessmentCount: 4 },
    { subjectId: 'subj-kis', subjectName: 'Kiswahili', averagePercentage: 82.0, previousTermPercentage: 80.0, trend: 'stable', studentCount: 1, assessmentCount: 4 },
  ],
  recentAssessments: [],
};
