// ============================================================
// PERFORMANCE & ASSESSMENT TYPES
// ============================================================

export type AssessmentType =
  | 'cat'
  | 'formative'
  | 'summative'
  | 'diagnostic'
  | 'assignment'
  | 'project'
  | 'exam';

export type AssessmentStatus =
  | 'draft'
  | 'active'
  | 'closed'
  | 'verified'
  | 'published';

export interface Assessment {
  id: string;
  title: string;
  type: AssessmentType;
  teacherId: string;
  subjectId: string;
  gradeId: string;
  streamId: string;
  academicYearId: string;
  termId: string;
  date: string;
  totalMarks: number;
  status: AssessmentStatus;
  subStrandId?: string;   // Topic coverage
  strandId?: string;
  description?: string;
}

export type MarkStatus =
  | 'draft'
  | 'submitted'
  | 'needs_review'
  | 'verified'
  | 'published';

export interface StudentMark {
  id: string;
  assessmentId: string;
  studentId: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  status: MarkStatus;
  isAbsent?: boolean;
  enteredBy: string;       // teacherId
  enteredAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
  // OCR fields
  ocrSource?: boolean;
  ocrConfidence?: 'high' | 'medium' | 'low';
  ocrRawValue?: string;
  teacherCorrected?: boolean;
}

// ============================================================
// PERFORMANCE AGGREGATES
// These mirror what PostgreSQL will eventually compute
// ============================================================

export interface SubjectPerformance {
  subjectId: string;
  subjectName: string;
  averagePercentage: number;
  previousTermPercentage?: number;
  trend: 'improving' | 'declining' | 'stable';
  studentCount: number;
  assessmentCount: number;
}

export interface StrandPerformance {
  strandId: string;
  strandName: string;
  subjectId: string;
  averagePercentage: number;
  subStrands: SubStrandPerformance[];
}

export interface SubStrandPerformance {
  subStrandId: string;
  subStrandName: string;
  averagePercentage: number;
  studentCount: number;
  studentsRequiringSupport: number;
}

export interface GradePerformance {
  gradeId: string;
  gradeName: string;
  averagePercentage: number;
  previousTermPercentage?: number;
  trend: 'improving' | 'declining' | 'stable';
  subjects: SubjectPerformance[];
  studentCount: number;
  studentsRequiringSupport: number;
}

export interface SchoolPerformanceSummary {
  academicYear: string;
  term: string;
  overallPercentage: number;
  previousTermPercentage: number;
  trend: 'improving' | 'declining' | 'stable';
  totalStudents: number;
  studentsRequiringSupport: number;
  grades: GradePerformance[];
  topLearningGaps: SubStrandPerformance[];
}

export interface StudentPerformanceSummary {
  studentId: string;
  overallPercentage: number;
  trend: 'improving' | 'declining' | 'stable';
  attendancePercentage: number;
  subjects: SubjectPerformance[];
  recentAssessments: StudentMark[];
  strengths: string[];          // e.g. ["Geometry", "English Comprehension"]
  needsSupport: string[];       // e.g. ["Fractions", "Decimals"]
}

// ============================================================
// OCR TYPES
// ============================================================

export type OCRConfidence = 'high' | 'medium' | 'low' | 'unclear';

export interface OCRResult {
  id: string;
  assessmentId: string;
  uploadedBy: string;
  uploadedAt: string;
  fileName: string;
  status: 'processing' | 'completed' | 'failed';
  detectedStudents: OCRStudentResult[];
  highConfidenceCount: number;
  needsReviewCount: number;
  unclearCount: number;
}

export interface OCRStudentResult {
  studentId?: string;
  studentName?: string;
  detectedName: string;
  detectedMark: number;
  confidence: OCRConfidence;
  isMatched: boolean;
  teacherCorrectedMark?: number;
  teacherVerified: boolean;
}

// ============================================================
// OCR LIFECYCLE STAGES
// ============================================================
export type OCRLifecycleStage =
  | 'uploaded'
  | 'processing'
  | 'detected'
  | 'needs_review'
  | 'teacher_verified'
  | 'final';

// ============================================================
// TREND DATA (for charts)
// ============================================================
export interface TrendDataPoint {
  label: string;   // e.g. "Term 1 2025"
  value: number;
  assessmentId?: string;
}
