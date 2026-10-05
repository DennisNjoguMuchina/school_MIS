import { useState } from 'react';
import { 
  Wrench, CheckCircle2, Clock, AlertCircle, Plus, 
  TrendingUp, ArrowRight, Filter, Search, User, Sparkles
} from 'lucide-react';
import { INTERVENTIONS } from '../../../mock/performance';
import { STUDENTS } from '../../../mock/students';
import { TEACHERS } from '../../../mock/users';
import { MetricCard, StatusBadge, EmptyState, SectionHeader } from '../../../components/common/index';

export default function InterventionsOverview() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const completedCount = INTERVENTIONS.filter(i => i.status === 'completed').length;
  const activeCount = INTERVENTIONS.filter(i => i.status === 'active').length;
  
  // Calculate average improvement for completed ones with outcomes
  const completedWithOutcomes = INTERVENTIONS.filter(i => i.outcome?.improvement !== undefined);
  const avgImprovement = completedWithOutcomes.length > 0
    ? (completedWithOutcomes.reduce((acc, curr) => acc + (curr.outcome?.improvement || 0), 0) / completedWithOutcomes.length).toFixed(1)
    : '26.0';

  const filteredInterventions = INTERVENTIONS.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const student = STUDENTS.find(s => s.id === item.studentId);
      const studentName = student ? `${student.firstName} ${student.lastName}`.toLowerCase() : '';
      const title = item.title.toLowerCase();
      const topic = (item.subStrandName || '').toLowerCase();
      const q = searchQuery.toLowerCase();
      return studentName.includes(q) || title.includes(q) || topic.includes(q);
    }
    return true;
  });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              Interventions & Remediation Intelligence
            </h1>
            <span className="badge badge-primary">Impact Tracking</span>
          </div>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Measure student recovery, before-and-after score changes, and efficacy of remedial pedagogical strategies.
          </p>
        </div>

        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Plus size={16} /> New Intervention Plan
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <MetricCard
          label="Active Interventions"
          value={activeCount}
          icon={<Clock size={22} />}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          context="Currently under instruction"
        />
        <MetricCard
          label="Completed Cycles"
          value={completedCount}
          icon={<CheckCircle2 size={22} />}
          iconBg="#F0FDF4"
          iconColor="#16A34A"
          context="Outcomes measured & verified"
        />
        <MetricCard
          label="Mean Score Uplift"
          value={`+${avgImprovement} pp`}
          icon={<TrendingUp size={22} />}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
          context="Average before/after delta"
        />
        <MetricCard
          label="Success Rate"
          value="88%"
          icon={<Sparkles size={22} />}
          iconBg="#FAF5FF"
          iconColor="#9333EA"
          context="Learners reaching passing threshold"
        />
      </div>

      {/* Flagship Case Study: Brian Mwangi */}
      <div style={{
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
        border: '1px solid #BFDBFE',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span style={{
              background: '#2563EB', color: '#FFFFFF', padding: '0.2rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700
            }}>
              PROVEN EFFICACY SPOTLIGHT
            </span>
            <strong style={{ fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
              Fractions Support Group — Brian Mwangi (stu-001)
            </strong>
          </div>
          <span className="badge badge-success">Improved (+26 pp)</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Baseline Assessment</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-danger)' }}>38%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Term 2 Exam (Severe Deficit)</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              background: '#FFFFFF', padding: '0.5rem 1rem', borderRadius: 999, border: '1px solid #93C5FD', fontWeight: 700, color: '#1D4ED8', fontSize: '0.875rem'
            }}>
              4 Weeks of Small Group Visual Models →
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Post-Intervention Score</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-success)' }}>64%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Term 3 Quiz 2 (+26 percentage points)</div>
          </div>
        </div>

        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
          <strong>Teacher's Verified Note:</strong> &ldquo;Brian responded exceptionally well to physical fraction bars and area diagrams. Ready to progress to Decimals topic.&rdquo;
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {(['all', 'active', 'completed'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`btn btn-sm ${filterStatus === status ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {status}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.375rem 0.75rem', minWidth: 260 }}>
          <Search size={16} color="var(--color-text-muted)" style={{ marginRight: '0.5rem' }} />
          <input
            type="text"
            placeholder="Search student, topic, or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.875rem' }}
          />
        </div>
      </div>

      {/* Interventions Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Intervention Title</th>
                <th>Target Topic</th>
                <th>Format</th>
                <th>Teacher</th>
                <th>Timeline</th>
                <th>Status / Outcome</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterventions.map(item => {
                const student = STUDENTS.find(s => s.id === item.studentId);
                const teacher = TEACHERS.find(t => t.id === item.teacherId);

                return (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{student ? `${student.firstName} ${student.lastName}` : item.studentId}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{student?.admissionNumber}</div>
                    </td>
                    <td>
                      <strong>{item.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{item.issue}</div>
                    </td>
                    <td>
                      <span className="badge badge-info">{item.subStrandName || 'Mathematics'}</span>
                    </td>
                    <td>
                      <span style={{ textTransform: 'capitalize', fontSize: '0.8125rem' }}>
                        {item.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Teacher'}</td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                      {item.startDate} {item.endDate ? `→ ${item.endDate}` : ''}
                    </td>
                    <td>
                      {item.outcome ? (
                        <div>
                          <StatusBadge status={item.outcome.result} />
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-success)', marginTop: '0.2rem' }}>
                            {item.outcome.beforePercentage}% → {item.outcome.afterPercentage}% (+{item.outcome.improvement} pp)
                          </div>
                        </div>
                      ) : (
                        <StatusBadge status={item.status} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
