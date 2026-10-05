// ============================================================
// INTERVENTION TYPES
// ============================================================

export type InterventionStatus = 'planned' | 'active' | 'completed' | 'cancelled';

export type InterventionType =
  | 'small_group'
  | 'one_on_one'
  | 'peer_support'
  | 'parental_involvement'
  | 'additional_resources'
  | 'remedial_class'
  | 'referral';

export interface Intervention {
  id: string;
  studentId: string;
  teacherId: string;
  subjectId?: string;
  subStrandId?: string;         // Specific topic
  subStrandName?: string;
  type: InterventionType;
  title: string;
  description: string;
  issue: string;
  startDate: string;
  endDate?: string;
  status: InterventionStatus;
  createdAt: string;
  outcome?: InterventionOutcome;
}

export interface InterventionOutcome {
  id: string;
  interventionId: string;
  beforePercentage: number;
  afterPercentage: number;
  improvement: number;          // percentage points
  result: 'improved' | 'no_change' | 'declined';
  notes?: string;
  recordedAt: string;
}

// ============================================================
// PARENT TYPES
// ============================================================

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender: 'male' | 'female';
  relationship: 'father' | 'mother' | 'guardian';
  childIds: string[];           // Student IDs
  status: 'active' | 'inactive';
  createdAt: string;
}

// ============================================================
// AUDIT LOG TYPES
// ============================================================

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  entity: string;
  entityId?: string;
  oldValue?: string;
  newValue?: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
}

// ============================================================
// AI CHAT TYPES
// ============================================================

export type AIMessageRole = 'user' | 'assistant';

export interface AIMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  timestamp: string;
  evidence?: AIEvidence[];
  recommendedActions?: AIRecommendedAction[];
  isDemoResponse: boolean;
}

export interface AIEvidence {
  label: string;
  value: string;
  trend?: 'improving' | 'declining' | 'stable';
}

export interface AIRecommendedAction {
  label: string;
  action: string;   // e.g. route path or action identifier
}

export interface AIChatSession {
  id: string;
  userId: string;
  userRole: string;
  scope: 'school' | 'class' | 'own_children';
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// ADMIN TRANSFER / PROMOTION TYPES
// ============================================================

export type TransferStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Transfer {
  id: string;
  studentId: string;
  fromGradeId: string;
  fromStreamId: string;
  toSchool?: string;
  reason: string;
  requestedBy: string;
  requestDate: string;
  status: TransferStatus;
  adminNotes?: string;
  resolvedDate?: string;
}

export type PromotionStatus = 'pending_review' | 'approved' | 'retained' | 'transferred';

export interface PromotionRecord {
  id: string;
  studentId: string;
  academicYearId: string;
  fromGradeId: string;
  toGradeId?: string;
  status: PromotionStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
}
