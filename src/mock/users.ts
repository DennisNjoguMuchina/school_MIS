// ============================================================
// MOCK DATA — TEACHERS, PARENTS, USERS, DEMO ACCOUNTS
// ============================================================
import type { Teacher, TeachingAssignment } from '../types/teacher';
import type { Parent } from '../types/index';
import type { DemoUser } from '../types/auth';

export const TEACHERS: Teacher[] = [
  {
    id: 'teacher-1', employeeId: 'TCH-2024-001',
    firstName: 'Jane', lastName: 'Wanjiku',
    email: 'teacher@demo.school', phone: '+254 722 111 222',
    gender: 'female', status: 'active', joinDate: '2024-01-06',
    qualification: 'B.Ed Mathematics', specialization: ['Mathematics'],
  },
  {
    id: 'teacher-2', employeeId: 'TCH-2023-008',
    firstName: 'Daniel', lastName: 'Otieno',
    email: 'd.otieno@greenfield.ac.ke', phone: '+254 733 222 333',
    gender: 'male', status: 'active', joinDate: '2023-01-06',
    qualification: 'B.Ed Science', specialization: ['Science & Technology'],
  },
  {
    id: 'teacher-3', employeeId: 'TCH-2022-015',
    firstName: 'Mercy', lastName: 'Kamau',
    email: 'm.kamau@greenfield.ac.ke', phone: '+254 711 333 444',
    gender: 'female', status: 'active', joinDate: '2022-01-06',
    qualification: 'B.Ed English', specialization: ['English', 'Kiswahili'],
  },
  {
    id: 'teacher-4', employeeId: 'TCH-2021-003',
    firstName: 'Joseph', lastName: 'Muthoni',
    email: 'j.muthoni@greenfield.ac.ke',
    gender: 'male', status: 'active', joinDate: '2021-01-06',
    qualification: 'B.Ed Social Studies', specialization: ['Social Studies', 'CRE'],
  },
  {
    id: 'teacher-5', employeeId: 'TCH-2024-010',
    firstName: 'Purity', lastName: 'Njeri',
    email: 'p.njeri@greenfield.ac.ke',
    gender: 'female', status: 'active', joinDate: '2024-08-01',
    qualification: 'B.Ed Mathematics', specialization: ['Mathematics'],
  },
  {
    id: 'teacher-6', employeeId: 'TCH-2020-002',
    firstName: 'George', lastName: 'Kipchoge',
    email: 'g.kipchoge@greenfield.ac.ke',
    gender: 'male', status: 'inactive', joinDate: '2020-01-06',
    qualification: 'B.Ed Physical Education', specialization: ['Physical Education'],
  },
];

export const TEACHING_ASSIGNMENTS: TeachingAssignment[] = [
  // Jane Wanjiku — Mathematics, Grade 6 East + West
  { id: 'ta-001', teacherId: 'teacher-1', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-6', streamId: 'stream-6e', subjectId: 'subj-math', isClassTeacher: true },
  { id: 'ta-002', teacherId: 'teacher-1', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-6', streamId: 'stream-6w', subjectId: 'subj-math', isClassTeacher: false },
  // Daniel Otieno — Science, Grade 6 East + West + Grade 7 East
  { id: 'ta-003', teacherId: 'teacher-2', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-6', streamId: 'stream-6e', subjectId: 'subj-sci', isClassTeacher: false },
  { id: 'ta-004', teacherId: 'teacher-2', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-6', streamId: 'stream-6w', subjectId: 'subj-sci', isClassTeacher: false },
  { id: 'ta-005', teacherId: 'teacher-2', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-7', streamId: 'stream-7e', subjectId: 'subj-sci', isClassTeacher: false },
  // Mercy Kamau — English + Kiswahili, Grade 6 East
  { id: 'ta-006', teacherId: 'teacher-3', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-6', streamId: 'stream-6e', subjectId: 'subj-eng', isClassTeacher: false },
  { id: 'ta-007', teacherId: 'teacher-3', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-6', streamId: 'stream-6e', subjectId: 'subj-kis', isClassTeacher: false },
  { id: 'ta-008', teacherId: 'teacher-3', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-7', streamId: 'stream-7e', subjectId: 'subj-eng', isClassTeacher: true },
  // Purity Njeri — Mathematics, Grade 5
  { id: 'ta-009', teacherId: 'teacher-5', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-5', streamId: 'stream-5e', subjectId: 'subj-math', isClassTeacher: true },
  { id: 'ta-010', teacherId: 'teacher-5', academicYearId: 'ay-2026', termId: 'term-2026-3', gradeId: 'grade-5', streamId: 'stream-5w', subjectId: 'subj-math', isClassTeacher: false },
];

export const PARENTS: Parent[] = [
  {
    id: 'parent-1', firstName: 'Mary', lastName: 'Mwangi',
    email: 'parent@demo.school', phone: '+254 722 001 001',
    gender: 'female', relationship: 'mother',
    childIds: ['stu-001', 'stu-013'],  // Brian + Grace
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-2', firstName: 'Alice', lastName: 'Njeri',
    email: 'a.njeri@email.ke', phone: '+254 733 002 002',
    gender: 'female', relationship: 'mother',
    childIds: ['stu-002'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-3', firstName: 'Charles', lastName: 'Otieno',
    email: 'c.otieno@email.ke',
    gender: 'male', relationship: 'father',
    childIds: ['stu-003'],
    status: 'active', createdAt: '2021-01-07',
  },
  {
    id: 'parent-4', firstName: 'Susan', lastName: 'Akinyi',
    email: 's.akinyi@email.ke',
    gender: 'female', relationship: 'mother',
    childIds: ['stu-004'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-5', firstName: 'Patrick', lastName: 'Kamau',
    email: 'p.kamau@email.ke',
    gender: 'male', relationship: 'father',
    childIds: ['stu-005'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-6', firstName: 'Ruth', lastName: 'Wanjiku',
    email: 'r.wanjiku@email.ke',
    gender: 'female', relationship: 'mother',
    childIds: ['stu-006'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-7', firstName: 'Joseph', lastName: 'Kiptoo',
    email: 'j.kiptoo@email.ke',
    gender: 'male', relationship: 'father',
    childIds: ['stu-007'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-8', firstName: 'Fatuma', lastName: 'Hassan',
    email: 'f.hassan@email.ke',
    gender: 'female', relationship: 'mother',
    childIds: ['stu-008'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-9', firstName: 'Thomas', lastName: 'Odhiambo',
    email: 't.odhiambo@email.ke',
    gender: 'male', relationship: 'father',
    childIds: ['stu-009'],
    status: 'active', createdAt: '2021-01-07',
  },
  {
    id: 'parent-10', firstName: 'Agnes', lastName: 'Mugo',
    email: 'a.mugo@email.ke',
    gender: 'female', relationship: 'mother',
    childIds: ['stu-010'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-11', firstName: 'Henry', lastName: 'Njoroge',
    email: 'h.njoroge@email.ke',
    gender: 'male', relationship: 'father',
    childIds: ['stu-011'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-12', firstName: 'Tabitha', lastName: 'Chebet',
    email: 't.chebet@email.ke',
    gender: 'female', relationship: 'mother',
    childIds: ['stu-012'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-13', firstName: 'Michael', lastName: 'Waweru',
    email: 'm.waweru@email.ke',
    gender: 'male', relationship: 'father',
    childIds: ['stu-014'],
    status: 'active', createdAt: '2019-01-07',
  },
  {
    id: 'parent-14', firstName: 'Catherine', lastName: 'Ndungu',
    email: 'c.ndungu@email.ke',
    gender: 'female', relationship: 'mother',
    childIds: ['stu-015'],
    status: 'active', createdAt: '2019-01-07',
  },
  {
    id: 'parent-15', firstName: 'Paul', lastName: 'Muthoni',
    email: 'p.muthoni@email.ke',
    gender: 'male', relationship: 'father',
    childIds: ['stu-016'],
    status: 'active', createdAt: '2020-01-06',
  },
  {
    id: 'parent-16', firstName: 'Caroline', lastName: 'Kariuki',
    email: 'c.kariuki@email.ke',
    gender: 'female', relationship: 'mother',
    childIds: ['stu-017'],
    status: 'active', createdAt: '2021-01-07',
  },
  {
    id: 'parent-17', firstName: 'Isaac', lastName: 'Mutua',
    email: 'i.mutua@email.ke',
    gender: 'male', relationship: 'father',
    childIds: ['stu-018'],
    status: 'active', createdAt: '2021-01-07',
  },
];

// ============================================================
// DEMO ACCOUNTS — Development use only
// These are used by the Development Account Center.
// Must NOT exist in production.
// ============================================================
export const DEMO_USERS: DemoUser[] = [
  {
    id: 'user-admin-1',
    name: 'Dennis Njogu',
    email: 'admin@demo.school',
    role: 'admin',
    status: 'active',
  },
  {
    id: 'user-mgmt-1',
    name: 'Grace Kamau',
    email: 'management@demo.school',
    role: 'management',
    status: 'active',
  },
  {
    id: 'user-teacher-1',
    name: 'Jane Wanjiku',
    email: 'teacher@demo.school',
    role: 'teacher',
    status: 'active',
    teacherAssignments: ['ta-001', 'ta-002'],
  },
  {
    id: 'user-parent-1',
    name: 'Mary Mwangi',
    email: 'parent@demo.school',
    role: 'parent',
    status: 'active',
    parentChildIds: ['stu-001', 'stu-013'],  // Brian + Grace
  },
  {
    id: 'user-student-1',
    name: 'Brian Mwangi',
    email: 'student@demo.school',
    role: 'student',
    status: 'active',
    studentId: 'stu-001',
  },
];
