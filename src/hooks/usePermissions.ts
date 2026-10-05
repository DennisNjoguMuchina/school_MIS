import { useAuth } from '../context/AuthContext';
import { ROLE_PERMISSIONS } from '../types/auth';
import type { Permission } from '../types/auth';

// ============================================================
// PERMISSION HOOK
// Use this in components to check what the current user can do.
// Frontend only — the backend must enforce the real permissions.
// ============================================================

export function usePermissions() {
  const { role } = useAuth();

  const can = (permission: Permission): boolean => {
    if (!role) return false;
    return ROLE_PERMISSIONS[role].includes(permission);
  };

  const canAny = (permissions: Permission[]): boolean => {
    return permissions.some(p => can(p));
  };

  const canAll = (permissions: Permission[]): boolean => {
    return permissions.every(p => can(p));
  };

  return { can, canAny, canAll, role };
}
