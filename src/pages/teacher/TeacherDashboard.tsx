import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, ClipboardList, CheckCircle2, 
  Upload, AlertTriangle, ArrowRight, Brain, Plus, Calendar, Star
} from 'lucide-react';
import { TEACHERS, TEACHING_ASSIGNMENTS } from '../../mock/users';
import { ASSESSMENTS, INTERVENTIONS } from '../../mock/performance';
import { STUDENTS } from '../../mock/students';
import { MetricCard, SectionHeader, PerformanceBar, TrendChip } from '../../components/common/index';
import { useAuth } from '../../context/AuthContext';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Jane Wanjiku is the demo teacher
  const teacher = TEACHERS.find(t => t.email === user?.email) || TEACHERS[0];
  const assignments = TEACHING_ASSIGNMENTS.filter(ta => ta.teacherId === teacher.id);

  // Quick stats
  const totalClasses = assignments.length;
  const activeAssessments = ASSESSMENTS.filter(a => a.teacherId === teacher.id).length;
  const activeInterventions = INTERVENTIONS.filter(i => i.teacherId === teacher.id && i.status === 'active').length;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 100%)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#99F6E4', marginBottom: '0.25rem' }}>
            Term 3 · 2026 Academic Year
          </div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            Welcome back, {teacher.firstName}!
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#CCFBF1', fontSize: '0.9375rem' }}>
            Class Teacher for <strong>Grade 6 East</strong> · Teaching Mathematics across 2 streams (74 learners).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/teacher/enter-marks')}
            className="btn btn-secondary"
            style={{ background: '#FFFFFF', color: '#0F766E', border: 'none', fontWeight: 700 }}
          >
            <ClipboardList size={16} /> Enter Marks
          </button>
          <button
            onClick={() => navigate('/teacher/upload')}
            className="btn btn-secondary"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)', fontWeight: 600 }}
          >
            <Upload size={16} /> Upload Marksheet
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <MetricCard
          label="My Assigned Classes"
          value="2 Classes"
          icon={<BookOpen size={22} />}
          iconBg="#F0FDFA"
          iconColor="#0D9488"
          context="Grade 6 East (Class Teacher), Grade 6 West"
        />
        <MetricCard
          label="Total Active Learners"
          value="74"
          icon={<Users size={22} />}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
          context="Grade 6 East (38) · Grade 6 West (36)"
        />
        <MetricCard
          label="Assessments Recorded"
          value={activeAssessments}
          icon={<ClipboardList size={22} />}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          context="Latest: Geometry Test (Summative)"
        />
        <MetricCard
          label="Active Remedial Plans"
          value={activeInterventions}
          icon={<AlertTriangle size={22} />}
          iconBg="#FEF2F2"
          iconColor="#DC2626"
          context="Fractions & Decimals focus"
        />
      </div>

      {/* Quick Action Cards & Next Deadlines */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
        {/* Classes Overview Card */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>My Teaching Allocations</h3>
            <button onClick={() => navigate('/teacher/classes')} className="btn btn-sm btn-secondary">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-card)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
                    Grade 6 East
                  </span>
                  <span className="badge badge-success">Class Teacher</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  Subject: Mathematics · 38 Learners · Class Mean: <strong>52.0%</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => navigate('/teacher/enter-marks')}
                  className="btn btn-sm btn-secondary"
                >
                  Marks Entry
                </button>
                <button
                  onClick={() => navigate('/teacher/performance')}
                  className="btn btn-sm btn-primary"
                >
                  Analytics
                </button>
              </div>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-card)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
                    Grade 6 West
                  </span>
                  <span className="badge badge-info">Subject Teacher</span>
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  Subject: Mathematics · 36 Learners · Class Mean: <strong>49.8%</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => navigate('/teacher/enter-marks')}
                  className="btn btn-sm btn-secondary"
                >
                  Marks Entry
                </button>
                <button
                  onClick={() => navigate('/teacher/performance')}
                  className="btn btn-sm btn-primary"
                >
                  Analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Pedagogical Advisor Widget */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Brain size={20} color="#0D9488" />
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Teacher AI Assistant</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              AI analysis of your latest assessment in Grade 6 East identifies <strong>Equivalent Fractions</strong> as a common blocker.
            </p>

            <div style={{
              background: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '0.875rem',
              fontSize: '0.8125rem',
              borderLeft: '3px solid #0D9488',
              marginBottom: '1rem'
            }}>
              <strong>Suggested Remediation:</strong> Provide visual pie and bar models for learners scoring under 50% (Brian, Peter, and James).
            </div>
          </div>

          <button
            onClick={() => navigate('/teacher/ai')}
            className="btn btn-primary"
            style={{ width: '100%', background: '#0D9488', borderColor: '#0D9488' }}
          >
            Open Teaching AI Advisor <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Recent Assessment Logs Table */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Recent Classroom Assessments</h3>
          <button onClick={() => navigate('/teacher/assessments')} className="btn btn-sm btn-secondary">
            Manage Assessments
          </button>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Class / Stream</th>
                <th>Date</th>
                <th>Total Marks</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ASSESSMENTS.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.title}</td>
                  <td>
                    <span className="badge badge-info" style={{ textTransform: 'capitalize' }}>
                      {item.type}
                    </span>
                  </td>
                  <td>Grade 6 East</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{item.date}</td>
                  <td>{item.totalMarks} marks</td>
                  <td>
                    <span className={`badge ${item.status === 'verified' ? 'badge-success' : 'badge-warning'}`}>
                      {item.status === 'verified' ? 'Verified' : 'Draft / Active'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => navigate('/teacher/enter-marks')}
                      className="btn btn-sm btn-secondary"
                    >
                      Inspect Scores
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
