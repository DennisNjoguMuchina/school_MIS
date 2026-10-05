// ============================================================
// AUTH TYPES
// Defines user roles, sessions, and permission strings.
// These will eventually be validated by the backend/n8n.
// ============================================================

export type UserRole = 'admin' | 'management' | 'teacher' | 'parent' | 'student';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: UserStatus;
  // Role-specific context
  teacherAssignments?: string[];   // IDs of teaching assignments
  parentChildIds?: string[];       // IDs of children (for parent role)
  studentId?: string;              // For student role
}

export interface AuthSession {
  user: DemoUser;
  token: string;                   // Will be a real JWT in Phase 4
  expiresAt: string;
  isDemoMode: boolean;
}

// ============================================================
// PERMISSION STRINGS
// All permission checks must use these constants.
// Never hard-code permission strings in components.
// ============================================================
export const PERMISSIONS = {
  // Student management
  STUDENTS_VIEW: 'students.view',
  STUDENTS_CREATE: 'students.create',
  STUDENTS_EDIT: 'students.edit',
  STUDENTS_DELETE: 'students.delete',

  // Teacher management
  TEACHERS_VIEW: 'teachers.view',
  TEACHERS_CREATE: 'teachers.create',
  TEACHERS_EDIT: 'teachers.edit',

  // Parent management
  PARENTS_VIEW: 'parents.view',
  PARENTS_CREATE: 'parents.create',
  PARENTS_EDIT: 'parents.edit',

  // Marks
  MARKS_VIEW: 'marks.view',
  MARKS_CREATE: 'marks.create',
  MARKS_EDIT: 'marks.edit',
  MARKS_VERIFY: 'marks.verify',

  // Analytics
  ANALYTICS_SCHOOL: 'analytics.school.view',
  ANALYTICS_GRADE: 'analytics.grade.view',
  ANALYTICS_CLASS: 'analytics.class.view',
  ANALYTICS_OWN_CHILDREN: 'analytics.own_children.view',

  // Interventions
  INTERVENTIONS_VIEW: 'interventions.view',
  INTERVENTIONS_CREATE: 'interventions.create',
  INTERVENTIONS_EDIT: 'interventions.edit',

  // AI
  AI_SCHOOL: 'ai.school',
  AI_CLASS: 'ai.class',
  AI_OWN_CHILDREN: 'ai.own_children',

  // Admin
  USERS_MANAGE: 'users.manage',
  ROLES_MANAGE: 'roles.manage',
  AUDIT_LOGS_VIEW: 'audit_logs.view',
  ACADEMIC_STRUCTURE_MANAGE: 'academic_structure.manage',
  WHATIF_VIEW: 'whatif.view',
  ASSIGNMENTS_MANAGE: 'assignments.manage',
  TRANSFERS_MANAGE: 'transfers.manage',
  PROMOTIONS_MANAGE: 'promotions.manage',
  SETTINGS_MANAGE: 'settings.manage',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role → Permission mapping (frontend reflection only; backend enforces truth)
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: Object.values(PERMISSIONS) as Permission[],

  management: [
    PERMISSIONS.STUDENTS_VIEW,
    PERMISSIONS.TEACHERS_VIEW,
    PERMISSIONS.PARENTS_VIEW,
    PERMISSIONS.MARKS_VIEW,
    PERMISSIONS.ANALYTICS_SCHOOL,
    PERMISSIONS.ANALYTICS_GRADE,
    PERMISSIONS.ANALYTICS_CLASS,
    PERMISSIONS.INTERVENTIONS_VIEW,
    PERMISSIONS.AI_SCHOOL,
    PERMISSIONS.WHATIF_VIEW,
    PERMISSIONS.AUDIT_LOGS_VIEW,
  ],

  teacher: [
    PERMISSIONS.STUDENTS_VIEW,
    PERMISSIONS.MARKS_VIEW,
    PERMISSIONS.MARKS_CREATE,
    PERMISSIONS.MARKS_EDIT,
    PERMISSIONS.MARKS_VERIFY,
    PERMISSIONS.ANALYTICS_CLASS,
    PERMISSIONS.INTERVENTIONS_VIEW,
    PERMISSIONS.INTERVENTIONS_CREATE,
    PERMISSIONS.INTERVENTIONS_EDIT,
    PERMISSIONS.AI_CLASS,
  ],

  parent: [
    PERMISSIONS.ANALYTICS_OWN_CHILDREN,
    PERMISSIONS.INTERVENTIONS_VIEW,
    PERMISSIONS.AI_OWN_CHILDREN,
  ],

  student: [
    PERMISSIONS.ANALYTICS_OWN_CHILDREN,
  ],
};
