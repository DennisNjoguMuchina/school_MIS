import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, Award, TrendingUp, Brain, Calendar, 
  MessageSquare, ChevronRight, CheckCircle2, AlertTriangle, Sparkles 
} from 'lucide-react';
import { STUDENTS } from '../../mock/students';
import { BRIAN_PERFORMANCE, GRACE_PERFORMANCE } from '../../mock/performance';
import { MetricCard, PerformanceBar, TrendChip } from '../../components/common/index';
import { useAuth } from '../../context/AuthContext';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mary Mwangi's children: Brian (stu-001) & Grace (stu-013)
  const [selectedChildId, setSelectedChildId] = useState<string>('stu-001');

  const brian = STUDENTS.find(s => s.id === 'stu-001');
  const grace = STUDENTS.find(s => s.id === 'stu-013');

  const activeStudent = selectedChildId === 'stu-001' ? brian : grace;
  const activePerf = selectedChildId === 'stu-001' ? BRIAN_PERFORMANCE : GRACE_PERFORMANCE;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #78350F 0%, #B45309 100%)',
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
          <div style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FDE68A', marginBottom: '0.25rem' }}>
            Greenfield Academy · Parent Portal
          </div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            Welcome, {user?.name || 'Mary Mwangi'}!
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#FEF3C7', fontSize: '0.9375rem' }}>
            Monitor academic growth, teacher feedback, and home practice activities for your children.
          </p>
        </div>

        <button
          onClick={() => navigate('/parent/ai')}
          className="btn btn-secondary"
          style={{ background: '#FFFFFF', color: '#B45309', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Brain size={16} /> Home Learning Assistant
        </button>
      </div>

      {/* Child Switcher Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div
          onClick={() => setSelectedChildId('stu-001')}
          className="card"
          style={{
            padding: '1.25rem',
            cursor: 'pointer',
            border: selectedChildId === 'stu-001' ? '2px solid #F59E0B' : '1px solid var(--color-border)',
            background: selectedChildId === 'stu-001' ? '#FFFBEB' : 'var(--color-bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: '#FDE68A', color: '#92400E',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.125rem'
            }}>
              BM
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
                Brian Mwangi
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                Grade 6 East · ADM-2020-001
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B45309' }}>61.5%</div>
            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Recovering</span>
          </div>
        </div>

        <div
          onClick={() => setSelectedChildId('stu-013')}
          className="card"
          style={{
            padding: '1.25rem',
            cursor: 'pointer',
            border: selectedChildId === 'stu-013' ? '2px solid #F59E0B' : '1px solid var(--color-border)',
            background: selectedChildId === 'stu-013' ? '#FFFBEB' : 'var(--color-bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: '#FDE68A', color: '#92400E',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.125rem'
            }}>
              GM
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
                Grace Mwangi
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                Grade 4 West · ADM-2022-014
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B45309' }}>78.5%</div>
            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Strong</span>
          </div>
        </div>
      </div>

      {/* Selected Child Progress Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <MetricCard
          label="Overall Mean Score"
          value={`${activePerf?.overallPercentage}%`}
          change={3.2}
          changeLabel="vs Term 2"
          icon={<Award size={22} />}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          context="Term 3 cumulative grade"
        />
        <MetricCard
          label="Attendance Rate"
          value={`${activePerf?.attendancePercentage}%`}
          icon={<Calendar size={22} />}
          iconBg="#F0FDF4"
          iconColor="#16A34A"
          context="54 out of 57 days attended"
        />
        <MetricCard
          label="Top Performing Subject"
          value="Kiswahili (76%)"
          icon={<TrendingUp size={22} />}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
          context="Consistent high achievement"
        />
        <MetricCard
          label="Active Remediation"
          value={selectedChildId === 'stu-001' ? '1 Program' : '0 (None needed)'}
          icon={<Sparkles size={22} />}
          iconBg="#FAF5FF"
          iconColor="#9333EA"
          context={selectedChildId === 'stu-001' ? 'Fractions Group (+26 pp uplift)' : 'Fully on track'}
        />
      </div>

      {/* Subject Performance Breakdown */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
              {activeStudent?.firstName}'s Subject Scores & Growth
            </h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Current academic term subject mastery
            </div>
          </div>
          <button onClick={() => navigate('/parent/subjects')} className="btn btn-sm btn-secondary">
            View Syllabus Details <ChevronRight size={14} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Mastery Level</th>
                <th>Previous Term</th>
                <th>Trajectory</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activePerf?.subjects.map(subj => (
                <tr key={subj.subjectId}>
                  <td style={{ fontWeight: 600 }}>{subj.subjectName}</td>
                  <td style={{ width: '35%' }}>
                    <PerformanceBar value={subj.averagePercentage} />
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{subj.previousTermPercentage}%</td>
                  <td>
                    <TrendChip trend={subj.trend} />
                  </td>
                  <td>
                    <span className={`badge ${subj.averagePercentage >= 70 ? 'badge-success' : subj.averagePercentage >= 50 ? 'badge-info' : 'badge-warning'}`}>
                      {subj.averagePercentage >= 70 ? 'Exceeding' : subj.averagePercentage >= 50 ? 'Meeting' : 'Needs Practice'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Remarks & Guidance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <MessageSquare size={18} color="#D97706" />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Teacher Remarks</h3>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {selectedChildId === 'stu-001' ? (
              <>&ldquo;Brian has shown remarkable dedication in Mathematics this term. The small group sessions on visual fractions helped him jump from 38% to 64%. We encourage daily 15-minute home review on decimals.&rdquo;</>
            ) : (
              <>&ldquo;Grace continues to be an exemplary student with top marks in languages and arts. She participates enthusiastically in class discussions.&rdquo;</>
            )}
          </p>
          <div style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Recorded by <strong>Jane Wanjiku</strong> (Class Teacher) · 2 weeks ago
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Brain size={18} color="#9333EA" />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Parent AI Recommendations</h3>
          </div>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            {selectedChildId === 'stu-001'
              ? 'Brian is working on decimals. Practice real-world shopping math: calculating change and comparing prices in the kitchen or supermarket.'
              : 'Encourage Grace to read longer English chapter books to expand her descriptive writing vocabulary.'}
          </p>
          <button
            onClick={() => navigate('/parent/ai')}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            Chat with Home Learning AI <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
