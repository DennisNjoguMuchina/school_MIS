// ============================================================
// TEACHER TYPES
// ============================================================

export type TeacherStatus = 'active' | 'inactive' | 'on_leave';

export interface Teacher {
  id: string;
  employeeId: string;          // e.g. TCH-2024-001
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender: 'male' | 'female';
  status: TeacherStatus;
  joinDate: string;
  photoUrl?: string;
  qualification?: string;
  specialization?: string[];
}

// Maps teacher → grade → stream → subject for a given academic year/term
export interface TeachingAssignment {
  id: string;
  teacherId: string;
  academicYearId: string;
  termId?: string;
  gradeId: string;
  streamId: string;
  subjectId: string;
  isClassTeacher: boolean;
}

export interface TeacherWithAssignments extends Teacher {
  assignments: TeachingAssignment[];
}
