// ============================================================
// ACADEMIC STRUCTURE TYPES
// ============================================================

export interface School {
  id: string;
  name: string;
  motto?: string;
  logoUrl?: string;
  address: string;
  county: string;
  phone: string;
  email: string;
  website?: string;
  registrationNumber: string;
}

export interface AcademicYear {
  id: string;
  name: string;             // e.g. "2026"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: 'upcoming' | 'active' | 'completed';
}

export interface Term {
  id: string;
  academicYearId: string;
  name: string;             // e.g. "Term 1"
  termNumber: 1 | 2 | 3;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: 'upcoming' | 'active' | 'completed';
}

export interface Grade {
  id: string;
  name: string;             // e.g. "Grade 6"
  level: number;            // 1–9 (CBC) or 1–8 (8-4-4)
  description?: string;
}

export interface Stream {
  id: string;
  gradeId: string;
  name: string;             // e.g. "East", "West"
  displayName: string;      // e.g. "Grade 6 East"
  classTeacherId?: string;
  capacity: number;
  currentEnrolment: number;
}

export interface Subject {
  id: string;
  name: string;             // e.g. "Mathematics"
  code: string;             // e.g. "MATH"
  gradeIds: string[];       // Which grades offer this subject
  description?: string;
  isExaminable: boolean;
}

export interface Strand {
  id: string;
  subjectId: string;
  name: string;             // e.g. "Number"
  order: number;
}

export interface SubStrand {
  id: string;
  strandId: string;
  name: string;             // e.g. "Fractions"
  order: number;
}
