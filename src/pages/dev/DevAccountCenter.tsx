import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, UserCheck, ShieldAlert, ArrowRight, CheckCircle2, 
  Sparkles, RefreshCw, KeyRound, Info, ExternalLink 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS } from '../../mock/users';
import type { UserRole } from '../../types/auth';

const ROLE_DETAILS: Record<UserRole, { badge: string; color: string; desc: string; focus: string }> = {
  admin: {
    badge: 'System Admin',
    color: '#3B82F6',
    desc: 'Full school administration, structure configuration, user management, audit logs, and movement workflows.',
    focus: 'Configuring grades, managing admissions, promoting students, teacher assignments.',
  },
  management: {
    badge: 'Headteacher / Director',
    color: '#8B5CF6',
    desc: 'Strategic academic intelligence, cohort trends, subject analysis, intervention impact, and what-if scenarios.',
    focus: 'Performance dashboards, curriculum gap tracking, evidence-backed AI advisor.',
  },
  teacher: {
    badge: 'Classroom Teacher',
    color: '#10B981',
    desc: 'Daily teaching workflows: recording scores, mark sheet OCR simulation, class analytics, and intervention logs.',
    focus: 'Grade 6 East Mathematics, marks entry, paper mark sheet OCR review.',
  },
  parent: {
    badge: 'Parent / Guardian',
    color: '#F59E0B',
    desc: 'Child academic progress monitoring, subject breakdowns, strengths, growth areas, and personalized home AI support.',
    focus: 'Viewing Brian Mwangi (Grade 6) and Grace Mwangi (Grade 4) performance.',
  },
  student: {
    badge: 'Learner',
    color: '#EC4899',
    desc: 'Student-facing reflection view, subject badges, goal setting, and interactive learning companion.',
    focus: 'Viewing personal progress, review suggestions, and curriculum milestones.',
  },
};

export default function DevAccountCenter() {
  const { user, loginAsRole, logout } = useAuth();
  const navigate = useNavigate();
  const [switching, setSwitching] = useState<string | null>(null);

  const handleSwitch = async (role: UserRole) => {
    setSwitching(role);
    await new Promise(r => setTimeout(r, 200));
    loginAsRole(role);
    setSwitching(null);
    const routes: Record<UserRole, string> = {
      admin: '/admin',
      management: '/management',
      teacher: '/teacher',
      parent: '/parent',
      student: '/student',
    };
    navigate(routes[role]);
  };

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Dev Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -30, right: -20, opacity: 0.1, pointerEvents: 'none'
        }}>
          <Code2 size={240} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{
            background: 'rgba(238, 242, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#A5B4FC',
            padding: '0.25rem 0.75rem',
            borderRadius: 999,
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}>
            <Sparkles size={12} /> Local Dev Sandbox
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.8125rem' }}>
            import.meta.env.DEV active
          </span>
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#FFFFFF' }}>
          Development Persona Switcher
        </h1>
        <p style={{ margin: 0, color: '#C7D2FE', fontSize: '0.9375rem', maxWidth: 640, lineHeight: 1.5 }}>
          Instantly simulate authenticated sessions across all 5 user tiers. 
          Permissions, side navigation, data scopes, and AI assistants dynamically adapt to each role.
        </p>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.8125rem', color: '#A5B4FC' }}>Currently active session:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginTop: '0.25rem' }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981'
              }} />
              <strong style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>{user?.name}</strong>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.125rem 0.5rem',
                borderRadius: 4,
                fontSize: '0.75rem',
                textTransform: 'capitalize'
              }}>
                {user?.role}
              </span>
              <span style={{ fontSize: '0.8125rem', color: '#C7D2FE' }}>({user?.email})</span>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/login'); }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'transparent',
              color: '#FFFFFF',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Sign Out to Login Page
          </button>
        </div>
      </div>

      {/* Security notice */}
      <div style={{
        background: '#FEF3C7',
        border: '1px solid #FCD34D',
        borderRadius: 'var(--radius-md)',
        padding: '0.875rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2rem',
        color: '#92400E',
        fontSize: '0.875rem'
      }}>
        <ShieldAlert size={20} style={{ flexShrink: 0 }} />
        <div>
          <strong>Guardrail Notice:</strong> This switcher is solely injected during local Vite development. 
          In production bundles, the route and triggers are excluded by dead code elimination.
        </div>
      </div>

      {/* Persona cards */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
        Available Personas & Scopes
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {DEMO_USERS.map((demoUser) => {
          const meta = ROLE_DETAILS[demoUser.role];
          const isCurrent = user?.role === demoUser.role;

          return (
            <div
              key={demoUser.id}
              style={{
                background: 'var(--color-bg-card, #FFFFFF)',
                border: isCurrent ? `2px solid ${meta.color}` : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: isCurrent ? '0 8px 24px -4px rgba(0,0,0,0.1)' : 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 200ms ease',
                position: 'relative'
              }}
            >
              {isCurrent && (
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: meta.color,
                  color: '#FFFFFF',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 999,
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <CheckCircle2 size={12} /> Active Persona
                </div>
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: `${meta.color}15`,
                    color: meta.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.125rem'
                  }}>
                    {demoUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {demoUser.name}
                    </h3>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: meta.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      {meta.badge}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                  <code>{demoUser.email}</code>
                </div>

                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-primary)', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                  {meta.desc}
                </p>

                <div style={{
                  background: 'var(--color-bg-secondary, #F8FAFC)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.625rem 0.75rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.25rem',
                  borderLeft: `3px solid ${meta.color}`
                }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Key Experience:</strong> {meta.focus}
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleSwitch(demoUser.role)}
                  disabled={switching === demoUser.role}
                  style={{
                    width: '100%',
                    padding: '0.625rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isCurrent ? 'var(--color-bg-secondary, #F1F5F9)' : meta.color,
                    color: isCurrent ? 'var(--color-text-primary)' : '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'opacity 150ms'
                  }}
                >
                  {switching === demoUser.role ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" /> Switching Session...
                    </>
                  ) : isCurrent ? (
                    <>
                      <span>Open Role Dashboard</span>
                      <ArrowRight size={15} />
                    </>
                  ) : (
                    <>
                      <span>Switch to this Role</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
