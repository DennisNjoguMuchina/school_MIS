// ============================================================
// MOCK DATA — ACADEMIC STRUCTURE
// Fictional school: Greenfield Academy
// ============================================================
import type { School, AcademicYear, Term, Grade, Stream, Subject, Strand, SubStrand } from '../types/academic';

export const SCHOOL: School = {
  id: 'school-1',
  name: 'Greenfield Academy',
  motto: 'Excellence Through Knowledge',
  address: 'Kiambu Road, Kiambu',
  county: 'Kiambu',
  phone: '+254 712 345 678',
  email: 'info@greenfield.ac.ke',
  website: 'www.greenfield.ac.ke',
  registrationNumber: 'KEN/SCH/2019/0042',
};

export const ACADEMIC_YEARS: AcademicYear[] = [
  {
    id: 'ay-2024',
    name: '2024',
    startDate: '2024-01-05',
    endDate: '2024-11-30',
    isCurrent: false,
    status: 'completed',
  },
  {
    id: 'ay-2025',
    name: '2025',
    startDate: '2025-01-06',
    endDate: '2025-11-28',
    isCurrent: false,
    status: 'completed',
  },
  {
    id: 'ay-2026',
    name: '2026',
    startDate: '2026-01-06',
    endDate: '2026-11-27',
    isCurrent: true,
    status: 'active',
  },
];

export const TERMS: Term[] = [
  // 2026 Terms
  {
    id: 'term-2026-1',
    academicYearId: 'ay-2026',
    name: 'Term 1',
    termNumber: 1,
    startDate: '2026-01-06',
    endDate: '2026-04-04',
    isCurrent: false,
    status: 'completed',
  },
  {
    id: 'term-2026-2',
    academicYearId: 'ay-2026',
    name: 'Term 2',
    termNumber: 2,
    startDate: '2026-04-28',
    endDate: '2026-08-07',
    isCurrent: false,
    status: 'completed',
  },
  {
    id: 'term-2026-3',
    academicYearId: 'ay-2026',
    name: 'Term 3',
    termNumber: 3,
    startDate: '2026-08-31',
    endDate: '2026-11-27',
    isCurrent: true,
    status: 'active',
  },
];

export const GRADES: Grade[] = [
  { id: 'grade-1', name: 'Grade 1', level: 1 },
  { id: 'grade-2', name: 'Grade 2', level: 2 },
  { id: 'grade-3', name: 'Grade 3', level: 3 },
  { id: 'grade-4', name: 'Grade 4', level: 4 },
  { id: 'grade-5', name: 'Grade 5', level: 5 },
  { id: 'grade-6', name: 'Grade 6', level: 6 },
  { id: 'grade-7', name: 'Grade 7', level: 7 },
  { id: 'grade-8', name: 'Grade 8', level: 8 },
  { id: 'grade-9', name: 'Grade 9', level: 9 },
];

export const STREAMS: Stream[] = [
  // Grade 6 streams (primary demo grade)
  { id: 'stream-6e', gradeId: 'grade-6', name: 'East', displayName: 'Grade 6 East', capacity: 40, currentEnrolment: 38, classTeacherId: 'teacher-1' },
  { id: 'stream-6w', gradeId: 'grade-6', name: 'West', displayName: 'Grade 6 West', capacity: 40, currentEnrolment: 36, classTeacherId: 'teacher-2' },
  // Grade 7 streams
  { id: 'stream-7e', gradeId: 'grade-7', name: 'East', displayName: 'Grade 7 East', capacity: 40, currentEnrolment: 35, classTeacherId: 'teacher-3' },
  { id: 'stream-7w', gradeId: 'grade-7', name: 'West', displayName: 'Grade 7 West', capacity: 40, currentEnrolment: 33 },
  // Grade 5 streams
  { id: 'stream-5e', gradeId: 'grade-5', name: 'East', displayName: 'Grade 5 East', capacity: 40, currentEnrolment: 40 },
  { id: 'stream-5w', gradeId: 'grade-5', name: 'West', displayName: 'Grade 5 West', capacity: 40, currentEnrolment: 37 },
  // Grade 4 streams
  { id: 'stream-4e', gradeId: 'grade-4', name: 'East', displayName: 'Grade 4 East', capacity: 40, currentEnrolment: 39 },
  { id: 'stream-4w', gradeId: 'grade-4', name: 'West', displayName: 'Grade 4 West', capacity: 40, currentEnrolment: 38 },
  // Grade 3 streams
  { id: 'stream-3a', gradeId: 'grade-3', name: 'A', displayName: 'Grade 3A', capacity: 40, currentEnrolment: 36 },
  // Grade 2 streams
  { id: 'stream-2a', gradeId: 'grade-2', name: 'A', displayName: 'Grade 2A', capacity: 40, currentEnrolment: 34 },
  // Grade 1 streams
  { id: 'stream-1a', gradeId: 'grade-1', name: 'A', displayName: 'Grade 1A', capacity: 40, currentEnrolment: 30 },
  // Grade 8 streams
  { id: 'stream-8a', gradeId: 'grade-8', name: 'A', displayName: 'Grade 8A', capacity: 40, currentEnrolment: 32 },
  // Grade 9 streams
  { id: 'stream-9a', gradeId: 'grade-9', name: 'A', displayName: 'Grade 9A', capacity: 40, currentEnrolment: 28 },
];

export const SUBJECTS: Subject[] = [
  { id: 'subj-math', name: 'Mathematics', code: 'MATH', gradeIds: ['grade-1','grade-2','grade-3','grade-4','grade-5','grade-6','grade-7','grade-8','grade-9'], isExaminable: true },
  { id: 'subj-eng', name: 'English', code: 'ENG', gradeIds: ['grade-1','grade-2','grade-3','grade-4','grade-5','grade-6','grade-7','grade-8','grade-9'], isExaminable: true },
  { id: 'subj-kis', name: 'Kiswahili', code: 'KIS', gradeIds: ['grade-1','grade-2','grade-3','grade-4','grade-5','grade-6','grade-7','grade-8','grade-9'], isExaminable: true },
  { id: 'subj-sci', name: 'Science & Technology', code: 'SCI', gradeIds: ['grade-4','grade-5','grade-6','grade-7','grade-8','grade-9'], isExaminable: true },
  { id: 'subj-sst', name: 'Social Studies', code: 'SST', gradeIds: ['grade-4','grade-5','grade-6','grade-7','grade-8','grade-9'], isExaminable: true },
  { id: 'subj-cre', name: 'CRE', code: 'CRE', gradeIds: ['grade-4','grade-5','grade-6','grade-7','grade-8','grade-9'], isExaminable: true },
  { id: 'subj-art', name: 'Creative Arts', code: 'ART', gradeIds: ['grade-1','grade-2','grade-3','grade-4','grade-5','grade-6'], isExaminable: false },
  { id: 'subj-pe', name: 'Physical Education', code: 'PE', gradeIds: ['grade-1','grade-2','grade-3','grade-4','grade-5','grade-6','grade-7','grade-8','grade-9'], isExaminable: false },
];

// Mathematics strands (Grade 6)
export const STRANDS: Strand[] = [
  { id: 'strand-math-num', subjectId: 'subj-math', name: 'Number', order: 1 },
  { id: 'strand-math-alg', subjectId: 'subj-math', name: 'Algebra', order: 2 },
  { id: 'strand-math-geo', subjectId: 'subj-math', name: 'Geometry', order: 3 },
  { id: 'strand-math-mea', subjectId: 'subj-math', name: 'Measurement', order: 4 },
  { id: 'strand-math-dat', subjectId: 'subj-math', name: 'Data Handling', order: 5 },
];

export const SUB_STRANDS: SubStrand[] = [
  // Number strand
  { id: 'ss-fractions', strandId: 'strand-math-num', name: 'Fractions', order: 1 },
  { id: 'ss-decimals', strandId: 'strand-math-num', name: 'Decimals', order: 2 },
  { id: 'ss-percentages', strandId: 'strand-math-num', name: 'Percentages', order: 3 },
  { id: 'ss-whole-numbers', strandId: 'strand-math-num', name: 'Whole Numbers', order: 4 },
  // Geometry strand
  { id: 'ss-geometry', strandId: 'strand-math-geo', name: 'Plane Shapes', order: 1 },
  { id: 'ss-solid-shapes', strandId: 'strand-math-geo', name: 'Solid Shapes', order: 2 },
  { id: 'ss-angles', strandId: 'strand-math-geo', name: 'Angles', order: 3 },
  // Measurement
  { id: 'ss-length', strandId: 'strand-math-mea', name: 'Length', order: 1 },
  { id: 'ss-area', strandId: 'strand-math-mea', name: 'Area & Perimeter', order: 2 },
  { id: 'ss-time', strandId: 'strand-math-mea', name: 'Time', order: 3 },
  // Algebra
  { id: 'ss-algebra-basics', strandId: 'strand-math-alg', name: 'Basic Algebra', order: 1 },
  { id: 'ss-patterns', strandId: 'strand-math-alg', name: 'Patterns & Sequences', order: 2 },
];
