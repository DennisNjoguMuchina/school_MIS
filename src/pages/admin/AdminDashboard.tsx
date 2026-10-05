import { useState } from 'react';
import {
  GraduationCap, Users, UserCheck, UserCog, Layers, GitBranch,
  Plus, ArrowRight, ClipboardList, ArrowLeftRight, TrendingUp,
  Shield, Activity, BarChart2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MetricCard, StatusBadge, SectionHeader } from '../../components/common/index';
import { useAuth } from '../../context/AuthContext';
import { AUDIT_LOG } from '../../mock/performance';
import { STUDENTS } from '../../mock/students';
import { TEACHERS } from '../../mock/users';
import { PARENTS } from '../../mock/users';

// ============================================================
// ADMIN DASHBOARD
// ============================================================

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const activeStudents = STUDENTS.filter(s => s.status === 'active').length;
  const activeTeachers = TEACHERS.filter(t => t.status === 'active').length;

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.name?.split(' ')[0]}. Here's your school overview.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/admin/students')}>
              <GraduationCap size={15} /> View Students
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin/students')}>
              <Plus size={15} /> Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="metric-grid" style={{ marginBottom: '2rem' }}>
        <MetricCard
          label="Total Students" value={activeStudents}
          icon={<GraduationCap size={22} />} iconBg="#EFF6FF" iconColor="var(--color-blue)"
          context="Active enrolments 2026"
          onClick={() => navigate('/admin/students')}
        />
        <MetricCard
          label="Teachers" value={activeTeachers}
          icon={<UserCheck size={22} />} iconBg="#ECFDF5" iconColor="var(--color-success)"
          context="Active staff members"
          onClick={() => navigate('/admin/teachers')}
        />
        <MetricCard
          label="Parents" value={PARENTS.length}
          icon={<Users size={22} />} iconBg="#FFF7ED" iconColor="#EA580C"
          context="Linked accounts"
          onClick={() => navigate('/admin/parents')}
        />
        <MetricCard
          label="Grades" value={9}
          icon={<Layers size={22} />} iconBg="#F5F3FF" iconColor="#7C3AED"
          context="Grade 1 – Grade 9"
        />
        <MetricCard
          label="Streams" value={13}
          icon={<GitBranch size={22} />} iconBg="#FFF7ED" iconColor="#D97706"
          context="Across all grades"
        />
        <MetricCard
          label="Management Users" value={2}
          icon={<UserCog size={22} />} iconBg="#F0F9FF" iconColor="var(--color-info)"
          context="Analytics & decisions"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Academic Year */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Current Academic Period</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>Greenfield Academy · 2026</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto' }}>
              <span className="badge badge-success">Term 3 · Active</span>
              <span className="badge badge-info">Aug 31 – Nov 27, 2026</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { term: 'Term 1', dates: 'Jan 6 – Apr 4', status: 'completed' },
              { term: 'Term 2', dates: 'Apr 28 – Aug 7', status: 'completed' },
              { term: 'Term 3', dates: 'Aug 31 – Nov 27', status: 'active' },
            ].map(t => (
              <div key={t.term} style={{
                padding: '1rem', borderRadius: 'var(--radius-md)',
                background: t.status === 'active' ? 'var(--color-blue-lighter)' : 'var(--color-surface)',
                border: `1px solid ${t.status === 'active' ? 'var(--color-blue-light)' : 'var(--color-border)'}`,
              }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: t.status === 'active' ? 'var(--color-blue)' : 'var(--color-text-primary)' }}>{t.term}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{t.dates}</div>
                <div style={{ marginTop: '0.5rem' }}><StatusBadge status={t.status} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <SectionHeader title="Quick Actions" subtitle="Common administrative tasks" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Add Student', icon: <GraduationCap size={16} />, to: '/admin/students', color: 'var(--color-blue)' },
              { label: 'Add Teacher', icon: <UserCheck size={16} />, to: '/admin/teachers', color: 'var(--color-success)' },
              { label: 'Create Grade / Stream', icon: <Layers size={16} />, to: '/admin/grades', color: '#7C3AED' },
              { label: 'Assign Teacher', icon: <ClipboardList size={16} />, to: '/admin/assignments', color: '#D97706' },
              { label: 'Review Transfers', icon: <ArrowLeftRight size={16} />, to: '/admin/transfers', color: 'var(--color-danger)' },
              { label: 'Review Promotions', icon: <TrendingUp size={16} />, to: '/admin/promotions', color: 'var(--color-info)' },
            ].map(action => (
              <button
                key={action.label}
                className="nav-item w-full"
                onClick={() => navigate(action.to)}
                style={{ justifyContent: 'space-between' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: action.color }}>
                  {action.icon}
                  <span style={{ color: 'var(--color-text-primary)' }}>{action.label}</span>
                </span>
                <ArrowRight size={14} style={{ color: 'var(--color-text-muted)' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <SectionHeader title="Recent Activity" />
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/audit-log')}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {AUDIT_LOG.slice(0, 6).map(entry => (
              <div key={entry.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 'var(--radius-full)',
                  background: 'var(--color-surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Activity size={14} style={{ color: 'var(--color-text-muted)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', lineHeight: 1.4 }} className="truncate">
                    {entry.description}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
                    {entry.userName} · {new Date(entry.timestamp).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Alerts */}
        <div className="card" style={{ gridColumn: 'span 2', background: 'linear-gradient(135deg, #FFFBEB, #FEFCE8)', borderColor: 'var(--color-warning-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <ArrowLeftRight size={20} style={{ color: 'var(--color-warning)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>1 Pending Transfer Request</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>John Muthoni · Grade 6 West · Family relocation</div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigate('/admin/transfers')}>
              Review Request <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
