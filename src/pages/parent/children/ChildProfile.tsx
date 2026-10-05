import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain } from 'lucide-react';
import { STUDENTS } from '../../../mock/students';
import { BRIAN_PERFORMANCE, BRIAN_MATH_TREND } from '../../../mock/performance';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PerformanceBar } from '../../../components/common/index';
import { useAuth } from '../../../context/AuthContext';

export default function ChildProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Derive authorized children from the authenticated parent's relationship.
  // user.parentChildIds is set in the demo user record.
  // In Phase 4, this will be enforced by the backend parent_student relationship.
  const authorizedChildIds: string[] = user?.parentChildIds ?? [];

  // Default to the first authorized child for display.
  const student =
    STUDENTS.find(s => authorizedChildIds.includes(s.id) && s.id === 'stu-001') ??
    STUDENTS.find(s => authorizedChildIds.includes(s.id)) ??
    STUDENTS[0];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-sm btn-secondary">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {student.firstName} {student.lastName} — Academic Profile
          </h1>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            {/* studentNumber is the canonical field on the Student type */}
            Admission: {student.studentNumber} · Grade 6 East
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* Longitudinal recovery chart */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>
            Mathematics Progression (Deficit & Recovery)
          </h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={BRIAN_MATH_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis domain={[30, 70]} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'Score']} />
                <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{
            marginTop: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: '#F0FDF4', color: '#166534', fontSize: '0.8125rem'
          }}>
            <strong>Intervention Milestone:</strong> After declining to 38% in T2 2026, small group visual models facilitated an increase to 52% on the latest check-in.
          </div>
        </div>

        {/* Strengths & Focus Areas */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Learning Strengths & Support</h3>

          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-success)', marginBottom: '0.5rem' }}>
              ✓ Recognized Strengths
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {BRIAN_PERFORMANCE.strengths.map((str, idx) => (
                <span key={idx} className="badge badge-success">{str}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-danger)', marginBottom: '0.5rem' }}>
              ⚠ Priority Support Areas
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {BRIAN_PERFORMANCE.needsSupport.map((need, idx) => (
                <span key={idx} className="badge badge-warning">{need}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <button
              onClick={() => navigate('/parent/ai')}
              className="btn btn-primary"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#B45309', borderColor: '#B45309' }}
            >
              <Brain size={16} /> Ask AI How to Support at Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
