// ============================================================
// STUDENT TYPES
// Designed to support academic history (enrolment model),
// not a simple student.grade field.
// This matches the eventual PostgreSQL enrolment table structure.
// ============================================================

export type StudentStatus =
  | 'active'
  | 'transfer_pending'
  | 'transferred'
  | 'graduated'
  | 'withdrawn'
  | 'suspended';

export type Gender = 'male' | 'female';

export interface Student {
  id: string;
  studentNumber: string;         // e.g. STU-2026-00142
  admissionNumber?: string;      // Alias for studentNumber
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;           // ISO date
  admissionDate: string;         // ISO date
  status: StudentStatus;
  photoUrl?: string;
  currentEnrolmentId?: string;   // Points to active enrolment
  parentIds: string[];           // Linked parent user IDs
}

// Enrolment = student in a specific grade/stream for a specific academic year
// This is how we track academic history — NOT by mutating student.grade
export interface Enrolment {
  id: string;
  studentId: string;
  academicYearId: string;
  gradeId: string;
  streamId: string;
  status: 'active' | 'completed' | 'withdrawn' | 'transferred';
  enrolledDate: string;
  completedDate?: string;
}

export interface StudentWithEnrolment extends Student {
  currentEnrolment?: Enrolment;
  gradeName?: string;
  streamName?: string;
  academicYear?: string;
}
