import { useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { TopBar, Sidebar } from '../components/navigation/Navigation';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';

// ============================================================
// APPLICATION SHELL
// Wraps all authenticated pages with TopBar + Sidebar
// ============================================================

const ROLE_DEFAULT_ROUTES: Record<UserRole, string> = {
  admin: '/admin',
  management: '/management',
  teacher: '/teacher',
  parent: '/parent',
  student: '/student',
};

export function AppShell() {
  const { isAuthenticated, role } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      <TopBar onMenuToggle={() => setSidebarOpen(o => !o)} />
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app-content" id="main-content">
          <Outlet />
        </main>
      </div>
      {import.meta.env.DEV && <DevBanner />}
    </div>
  );
}

// ============================================================
// AUTH GUARD — redirect to login if not authenticated
// ============================================================
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// ============================================================
// ROLE GUARD — redirect to correct dashboard if wrong role
// ============================================================
export function RequireRole({ role: requiredRole, children }: { role: UserRole; children: React.ReactNode }) {
  const { role } = useAuth();
  if (!role) return <Navigate to="/login" replace />;
  if (role !== requiredRole) {
    return <Navigate to={ROLE_DEFAULT_ROUTES[role]} replace />;
  }
  return <>{children}</>;
}

// ============================================================
// ROOT REDIRECT — lands user on their role's dashboard
// ============================================================
export function RoleRedirect() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!role) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_DEFAULT_ROUTES[role]} replace />;
}

// ============================================================
// DEV BANNER — only shown in development builds
// Never renders in production (Vite strips import.meta.env.DEV)
// ============================================================
function DevBanner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="dev-banner" role="complementary" aria-label="Development mode indicator">
      <span>⚠ DEVELOPMENT MODE</span>
      <span className="topbar-divider" style={{ background: 'rgba(255,255,255,0.2)', height: 16 }} />
      <span>Signed in as: <strong>{user?.name}</strong> ({user?.role})</span>
      <button className="dev-banner-link" onClick={() => navigate('/dev/accounts')}>
        Switch Account
      </button>
    </div>
  );
}

// React import needed for JSX
import React from 'react';
