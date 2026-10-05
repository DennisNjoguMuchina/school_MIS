// ============================================================
// MOCK DATA — STUDENTS
// Fictional Kenyan student profiles for Greenfield Academy
// Internally consistent: IDs, parents, enrolments all match
// ============================================================
import type { Student, Enrolment } from '../types/student';

export const STUDENTS: Student[] = [
  // Grade 6 East students
  {
    id: 'stu-001', studentNumber: 'STU-2026-00142', firstName: 'Brian', lastName: 'Mwangi',
    gender: 'male', dateOfBirth: '2014-03-15', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-1'], currentEnrolmentId: 'enr-001',
  },
  {
    id: 'stu-002', studentNumber: 'STU-2026-00143', firstName: 'Sharon', lastName: 'Njeri',
    gender: 'female', dateOfBirth: '2014-07-22', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-2'], currentEnrolmentId: 'enr-002',
  },
  {
    id: 'stu-003', studentNumber: 'STU-2026-00144', firstName: 'Peter', lastName: 'Otieno',
    gender: 'male', dateOfBirth: '2013-11-08', admissionDate: '2021-01-07',
    status: 'active', parentIds: ['parent-3'], currentEnrolmentId: 'enr-003',
  },
  {
    id: 'stu-004', studentNumber: 'STU-2026-00145', firstName: 'Mary', lastName: 'Akinyi',
    gender: 'female', dateOfBirth: '2014-05-30', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-4'], currentEnrolmentId: 'enr-004',
  },
  {
    id: 'stu-005', studentNumber: 'STU-2026-00146', firstName: 'Kevin', lastName: 'Kamau',
    gender: 'male', dateOfBirth: '2014-09-12', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-5'], currentEnrolmentId: 'enr-005',
  },
  {
    id: 'stu-006', studentNumber: 'STU-2026-00147', firstName: 'Faith', lastName: 'Wanjiku',
    gender: 'female', dateOfBirth: '2014-01-18', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-6'], currentEnrolmentId: 'enr-006',
  },
  {
    id: 'stu-007', studentNumber: 'STU-2026-00148', firstName: 'David', lastName: 'Kiptoo',
    gender: 'male', dateOfBirth: '2014-04-25', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-7'], currentEnrolmentId: 'enr-007',
  },
  {
    id: 'stu-008', studentNumber: 'STU-2026-00149', firstName: 'Amina', lastName: 'Hassan',
    gender: 'female', dateOfBirth: '2014-08-03', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-8'], currentEnrolmentId: 'enr-008',
  },
  {
    id: 'stu-009', studentNumber: 'STU-2026-00150', firstName: 'James', lastName: 'Odhiambo',
    gender: 'male', dateOfBirth: '2013-12-19', admissionDate: '2021-01-07',
    status: 'active', parentIds: ['parent-9'], currentEnrolmentId: 'enr-009',
  },
  {
    id: 'stu-010', studentNumber: 'STU-2026-00151', firstName: 'Esther', lastName: 'Mugo',
    gender: 'female', dateOfBirth: '2014-02-14', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-10'], currentEnrolmentId: 'enr-010',
  },
  // Grade 6 West students
  {
    id: 'stu-011', studentNumber: 'STU-2026-00152', firstName: 'Samuel', lastName: 'Njoroge',
    gender: 'male', dateOfBirth: '2014-06-07', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-11'], currentEnrolmentId: 'enr-011',
  },
  {
    id: 'stu-012', studentNumber: 'STU-2026-00153', firstName: 'Lydia', lastName: 'Chebet',
    gender: 'female', dateOfBirth: '2014-10-29', admissionDate: '2020-01-06',
    status: 'active', parentIds: ['parent-12'], currentEnrolmentId: 'enr-012',
  },
  // Mary Mwangi's children (parent-1 is Mary)
  // Brian (stu-001) is already listed above under parent-1
  {
    id: 'stu-013', studentNumber: 'STU-2026-00154', firstName: 'Grace', lastName: 'Mwangi',
    gender: 'female', dateOfBirth: '2017-04-10', admissionDate: '2023-01-09',
    status: 'active', parentIds: ['parent-1'], currentEnrolmentId: 'enr-013',
  },
  // Grade 7 students
  {
    id: 'stu-014', studentNumber: 'STU-2026-00100', firstName: 'Daniel', lastName: 'Waweru',
    gender: 'male', dateOfBirth: '2013-05-14', admissionDate: '2019-01-07',
    status: 'active', parentIds: ['parent-13'], currentEnrolmentId: 'enr-014',
  },
  {
    id: 'stu-015', studentNumber: 'STU-2026-00101', firstName: 'Miriam', lastName: 'Ndungu',
    gender: 'female', dateOfBirth: '2013-08-22', admissionDate: '2019-01-07',
    status: 'active', parentIds: ['parent-14'], currentEnrolmentId: 'enr-015',
  },
  // Transfer pending student
  {
    id: 'stu-016', studentNumber: 'STU-2026-00155', firstName: 'John', lastName: 'Muthoni',
    gender: 'male', dateOfBirth: '2014-11-30', admissionDate: '2020-01-06',
    status: 'transfer_pending', parentIds: ['parent-15'], currentEnrolmentId: 'enr-016',
  },
  // Grade 5 students
  {
    id: 'stu-017', studentNumber: 'STU-2026-00200', firstName: 'Stella', lastName: 'Kariuki',
    gender: 'female', dateOfBirth: '2015-02-18', admissionDate: '2021-01-07',
    status: 'active', parentIds: ['parent-16'], currentEnrolmentId: 'enr-017',
  },
  {
    id: 'stu-018', studentNumber: 'STU-2026-00201', firstName: 'Eric', lastName: 'Mutua',
    gender: 'male', dateOfBirth: '2015-07-04', admissionDate: '2021-01-07',
    status: 'active', parentIds: ['parent-17'], currentEnrolmentId: 'enr-018',
  },
];

export const ENROLMENTS: Enrolment[] = [
  // Grade 6 East (2026)
  { id: 'enr-001', studentId: 'stu-001', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-06' },
  { id: 'enr-002', studentId: 'stu-002', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-06' },
  { id: 'enr-003', studentId: 'stu-003', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-07' },
  { id: 'enr-004', studentId: 'stu-004', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-06' },
  { id: 'enr-005', studentId: 'stu-005', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-06' },
  { id: 'enr-006', studentId: 'stu-006', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-06' },
  { id: 'enr-007', studentId: 'stu-007', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-06' },
  { id: 'enr-008', studentId: 'stu-008', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-06' },
  { id: 'enr-009', studentId: 'stu-009', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-07' },
  { id: 'enr-010', studentId: 'stu-010', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6e', status: 'active', enrolledDate: '2026-01-06' },
  // Grade 6 West (2026)
  { id: 'enr-011', studentId: 'stu-011', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6w', status: 'active', enrolledDate: '2026-01-06' },
  { id: 'enr-012', studentId: 'stu-012', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6w', status: 'active', enrolledDate: '2026-01-06' },
  // Grade 3 (Grace Mwangi)
  { id: 'enr-013', studentId: 'stu-013', academicYearId: 'ay-2026', gradeId: 'grade-3', streamId: 'stream-3a', status: 'active', enrolledDate: '2026-01-09' },
  // Grade 7
  { id: 'enr-014', studentId: 'stu-014', academicYearId: 'ay-2026', gradeId: 'grade-7', streamId: 'stream-7e', status: 'active', enrolledDate: '2026-01-06' },
  { id: 'enr-015', studentId: 'stu-015', academicYearId: 'ay-2026', gradeId: 'grade-7', streamId: 'stream-7e', status: 'active', enrolledDate: '2026-01-06' },
  // Transfer pending
  { id: 'enr-016', studentId: 'stu-016', academicYearId: 'ay-2026', gradeId: 'grade-6', streamId: 'stream-6w', status: 'active', enrolledDate: '2026-01-06' },
  // Grade 5
  { id: 'enr-017', studentId: 'stu-017', academicYearId: 'ay-2026', gradeId: 'grade-5', streamId: 'stream-5e', status: 'active', enrolledDate: '2026-01-07' },
  { id: 'enr-018', studentId: 'stu-018', academicYearId: 'ay-2026', gradeId: 'grade-5', streamId: 'stream-5e', status: 'active', enrolledDate: '2026-01-07' },

  // Historical enrolments for Brian Mwangi (stu-001)
  { id: 'enr-h-001-5', studentId: 'stu-001', academicYearId: 'ay-2025', gradeId: 'grade-5', streamId: 'stream-5e', status: 'completed', enrolledDate: '2025-01-06', completedDate: '2025-11-28' },
  { id: 'enr-h-001-4', studentId: 'stu-001', academicYearId: 'ay-2024', gradeId: 'grade-4', streamId: 'stream-4e', status: 'completed', enrolledDate: '2024-01-05', completedDate: '2024-11-30' },
];
