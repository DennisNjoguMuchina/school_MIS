import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, Lock, Mail, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ============================================================
// LOGIN PAGE
// Demo mode: any password works for demo accounts
// ============================================================

export default function LoginPage() {
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Already logged in? Redirect
  if (isAuthenticated && role) {
    const routes: Record<string, string> = {
      admin: '/admin', management: '/management',
      teacher: '/teacher', parent: '/parent', student: '/student',
    };
    return <Navigate to={routes[role] ?? '/admin'} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (!password.trim()) { setError('Please enter your password.'); return; }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      // Navigate to role-specific dashboard
      const roles = await new Promise<string>(resolve => {
        // Small delay to let session state settle
        setTimeout(() => resolve('done'), 50);
      });
      navigate('/', { replace: true });
    } else {
      setError(result.error ?? 'Login failed. Please try again.');
    }
  };

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo1234');
    setError('');
  };

  return (
    <div className="login-page" style={{ minHeight: '100vh', display: 'flex', background: 'var(--color-navy)' }}>
      {/* Left panel — branding */}
      <div className="login-left" style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '3rem', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, var(--color-navy-dark) 0%, var(--color-navy) 40%, var(--color-navy-light) 100%)',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: 300, height: 300, borderRadius: '50%', background: 'rgb(26 86 219 / 0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-40px', width: 240, height: 240, borderRadius: '50%', background: 'rgb(212 168 67 / 0.06)' }} />

        <div style={{ position: 'relative', maxWidth: 480 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '3rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, var(--color-blue), var(--color-blue-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={26} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.125rem', color: 'white' }}>Greenfield Academy</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>Excellence Through Knowledge</div>
            </div>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            School Performance<br />
            <span style={{ color: 'var(--color-gold)' }}>Intelligence</span> Platform
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Helping your school understand what is happening, why it is happening, and who needs support.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '📊', label: 'AI-powered performance analytics' },
              { icon: '🎯', label: 'Targeted learning gap identification' },
              { icon: '🔔', label: 'Intervention tracking & outcomes' },
              { icon: '👨‍👩‍👧', label: 'Parent engagement & communication' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <span style={{ fontSize: '1.25rem', width: 28, textAlign: 'center' }}>{item.icon}</span>
                <span style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="login-right" style={{
        width: '100%', maxWidth: 480,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '2.5rem', background: 'var(--color-surface)', overflowY: 'auto',
      }}>
        <div style={{ maxWidth: 400, margin: '0 auto', width: '100%' }}>
          {import.meta.env.DEV && (
            <div style={{ background: '#F5F3FF', border: '1.5px solid #7C3AED', borderRadius: 'var(--radius-lg)', padding: '1rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                <Shield size={15} style={{ color: '#7C3AED' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Development Mode — Demo Accounts</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {[
                  { label: 'Admin', email: 'admin@demo.school', color: '#1A56DB' },
                  { label: 'Management', email: 'management@demo.school', color: '#059669' },
                  { label: 'Teacher', email: 'teacher@demo.school', color: '#D97706' },
                  { label: 'Parent', email: 'parent@demo.school', color: '#DC2626' },
                ].map(acc => (
                  <button
                    key={acc.label}
                    onClick={() => quickLogin(acc.email)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.375rem 0.625rem', borderRadius: 'var(--radius-md)',
                      border: '1px solid transparent', background: 'transparent',
                      cursor: 'pointer', transition: 'background 150ms',
                      fontSize: '0.8125rem',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgb(0 0 0 / 0.04)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ fontWeight: 600, color: acc.color }}>{acc.label}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace', fontSize: '0.75rem' }}>{acc.email}</span>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                Any password works in demo mode.
              </div>
            </div>
          )}

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.625rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
            Welcome back
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', marginBottom: '2rem' }}>
            Sign in to your account
          </p>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-light)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
              <AlertCircle size={16} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', color: '#991B1B' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            <div className="form-group">
              <label htmlFor="login-email" className="form-label required">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="your@email.address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                <label htmlFor="login-password" className="form-label required" style={{ margin: 0 }}>Password</label>
                <button type="button" style={{ fontSize: '0.8125rem', color: 'var(--color-blue)', fontWeight: 500 }}>
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', padding: 2 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full"
              disabled={isLoading}
              style={{ marginTop: '0.5rem', justifyContent: 'center' }}
            >
              {isLoading ? (
                <>
                  <span className="spin" style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <Shield size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              This platform handles learner information including minors. Access is restricted to authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
