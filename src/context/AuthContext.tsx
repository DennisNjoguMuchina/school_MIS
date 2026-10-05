import React, { createContext, useContext, useState, useCallback } from 'react';
import type { DemoUser, AuthSession, UserRole } from '../types/auth';
import { DEMO_USERS } from '../mock/users';

// ============================================================
// AUTH CONTEXT
// Manages the current user session.
// In Phase 1 this uses demo accounts.
// In Phase 4 this will consume real JWT sessions from the backend.
// ============================================================

interface AuthContextValue {
  session: AuthSession | null;
  user: DemoUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAs: (userId: string) => void;   // Dev account switcher only
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => {
    // Restore session from sessionStorage (not localStorage for security)
    const stored = sessionStorage.getItem('spi_demo_session');
    if (stored) {
      try { return JSON.parse(stored); } catch { return null; }
    }
    return null;
  });

  const createSession = useCallback((user: DemoUser): AuthSession => {
    const sess: AuthSession = {
      user,
      token: `demo-token-${user.id}-${Date.now()}`,
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8h
      isDemoMode: true,
    };
    sessionStorage.setItem('spi_demo_session', JSON.stringify(sess));
    return sess;
  }, []);

  // Demo login: matches by email against demo users only
  const login = useCallback(async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network latency
    await new Promise(r => setTimeout(r, 600));

    const user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, error: 'No account found with that email address.' };
    }

    // In demo mode any password works — clearly labelled as demo
    const sess = createSession(user);
    setSession(sess);
    return { success: true };
  }, [createSession]);

  const loginAs = useCallback((userId: string) => {
    const user = DEMO_USERS.find(u => u.id === userId);
    if (!user) return;
    const sess = createSession(user);
    setSession(sess);
  }, [createSession]);

  const loginAsRole = useCallback((role: UserRole) => {
    const user = DEMO_USERS.find(u => u.role === role);
    if (!user) return;
    const sess = createSession(user);
    setSession(sess);
  }, [createSession]);

  const logout = useCallback(() => {
    sessionStorage.removeItem('spi_demo_session');
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user ?? null,
      role: session?.user.role ?? null,
      isAuthenticated: !!session,
      login,
      loginAs,
      loginAsRole,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
