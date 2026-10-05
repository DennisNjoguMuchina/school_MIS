import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, Users, ArrowRight, BarChart2, Target, Brain, FlaskConical, Layers } from 'lucide-react';
import { MetricCard, TrendChip, PerformanceBar, SectionHeader, DemoLabel, Breadcrumbs } from '../../components/common/index';
import { SCHOOL_PERFORMANCE, SCHOOL_TERM_TREND, GRADE6_MATH_TREND } from '../../mock/performance';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';

// ============================================================
// MANAGEMENT DASHBOARD — School Performance Intelligence
// Flagship analytics page with drill-down capability
// ============================================================

type DrillLevel = 'school' | 'grade' | 'subject';

export default function ManagementDashboard() {
  const navigate = useNavigate();
  const [drillLevel, setDrillLevel] = useState<DrillLevel>('school');
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);

  const selectedGrade = SCHOOL_PERFORMANCE.grades.find(g => g.gradeId === selectedGradeId);

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
              <h1 style={{ margin: 0 }}>School Performance Intelligence</h1>
              <DemoLabel />
            </div>
            <p>Greenfield Academy · 2026 · Term 3 · Comprehensive Analytics</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/management/whatif')}>
              <FlaskConical size={15} /> What-If Analysis
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/management/ai')}>
              <Brain size={15} /> AI Assistant
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="metric-grid" style={{ marginBottom: '2rem' }}>
        <MetricCard
          label="Overall Performance"
          value={`${SCHOOL_PERFORMANCE.overallPercentage}%`}
          change={SCHOOL_PERFORMANCE.overallPercentage - SCHOOL_PERFORMANCE.previousTermPercentage}
          changeLabel="vs last term"
          icon={<BarChart2 size={22} />}
          iconBg="#EFF6FF" iconColor="var(--color-blue)"
        />
        <MetricCard
          label="Total Students"
          value={SCHOOL_PERFORMANCE.totalStudents}
          icon={<Users size={22} />}
          iconBg="#ECFDF5" iconColor="var(--color-success)"
          context="Across all grades"
        />
        <MetricCard
          label="Requiring Support"
          value={SCHOOL_PERFORMANCE.studentsRequiringSupport}
          icon={<AlertTriangle size={22} />}
          iconBg="#FFF7ED" iconColor="var(--color-warning)"
          context="Moderate to high risk"
        />
        <MetricCard
          label="Previous Term"
          value={`${SCHOOL_PERFORMANCE.previousTermPercentage}%`}
          icon={<TrendingUp size={22} />}
          iconBg="#F0F9FF" iconColor="var(--color-info)"
          context="Term 2, 2026"
        />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* School Performance Trend */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <SectionHeader title="School Performance Trend" subtitle="Overall average across all grades" />
            <TrendChip trend={SCHOOL_PERFORMANCE.trend} />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={SCHOOL_TERM_TREND} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-blue)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--color-blue)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
              <YAxis domain={[55, 75]} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13 }} formatter={(v: any) => [`${v}%`]} />
              <Area type="monotone" dataKey="value" stroke="var(--color-blue)" strokeWidth={2.5} fill="url(#perfGrad)" dot={{ r: 4, fill: 'var(--color-blue)' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Learning Gaps */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <SectionHeader title="Key Learning Gaps" subtitle="Lowest topic averages" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {SCHOOL_PERFORMANCE.topLearningGaps.map(gap => (
              <div key={gap.subStrandId}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{gap.subStrandName}</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    {gap.studentsRequiringSupport} learners
                  </span>
                </div>
                <PerformanceBar value={gap.averagePercentage} />
              </div>
            ))}
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/management/gaps')} style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
              View All Gaps <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Grade Performance Drill-Down */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <Breadcrumbs items={[
            { label: 'School', onClick: drillLevel !== 'school' ? () => { setDrillLevel('school'); setSelectedGradeId(null); } : undefined },
            ...(selectedGrade ? [{ label: selectedGrade.gradeName }] : []),
          ]} />
          <SectionHeader
            title={drillLevel === 'school' ? 'Grade Performance' : `${selectedGrade?.gradeName} — Subject Performance`}
            subtitle={drillLevel === 'school' ? 'Click a grade to drill down' : 'Click a subject to see topic breakdown'}
            action={drillLevel !== 'school' ? (
              <button className="btn btn-ghost btn-sm" onClick={() => { setDrillLevel('school'); setSelectedGradeId(null); }}>
                ← All Grades
              </button>
            ) : undefined}
          />
        </div>

        {drillLevel === 'school' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {SCHOOL_PERFORMANCE.grades.map(grade => (
              <div
                key={grade.gradeId}
                className="card"
                style={{ cursor: 'pointer', border: '1.5px solid var(--color-border)', transition: 'all 150ms', margin: 0, padding: '1rem' }}
                onClick={() => { setSelectedGradeId(grade.gradeId); setDrillLevel('grade'); }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-blue)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-sm)'; }}
                tabIndex={0}
                role="button"
                aria-label={`View ${grade.gradeName} performance`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{grade.gradeName}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{grade.studentCount} students</div>
                  </div>
                  <TrendChip trend={grade.trend} compact />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: grade.averagePercentage < 55 ? 'var(--color-danger)' : grade.averagePercentage < 65 ? 'var(--color-warning)' : 'var(--color-success)', marginBottom: '0.5rem' }}>
                  {grade.averagePercentage}%
                </div>
                <PerformanceBar value={grade.averagePercentage} showLabel={false} />
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                  {grade.studentsRequiringSupport} {grade.studentsRequiringSupport === 1 ? 'learner' : 'learners'} requiring support
                </div>
              </div>
            ))}
          </div>
        )}

        {drillLevel === 'grade' && selectedGrade && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={selectedGrade.subjects} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="subjectName" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} unit="%" />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13 }} formatter={(v: any) => [`${v}%`]} />
                <Bar dataKey="averagePercentage" radius={[4, 4, 0, 0]}>
                  {selectedGrade.subjects.map(s => (
                    <Cell key={s.subjectId} fill={s.averagePercentage < 55 ? 'var(--color-danger)' : s.averagePercentage < 65 ? 'var(--color-warning)' : 'var(--color-blue)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {selectedGrade.subjects.map(subj => (
                <div
                  key={subj.subjectId}
                  className="card"
                  style={{ cursor: 'pointer', margin: 0, padding: '0.875rem', border: '1.5px solid var(--color-border)' }}
                  onClick={() => navigate(`/management/subjects?grade=${selectedGradeId}&subject=${subj.subjectId}`)}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-blue)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)'}
                  role="button" tabIndex={0}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{subj.subjectName}</span>
                    <TrendChip trend={subj.trend} compact />
                  </div>
                  <PerformanceBar value={subj.averagePercentage} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interventions Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #F0F9FF, #EFF6FF)', borderColor: 'var(--color-blue-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={20} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>3 Active Interventions</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Grade 6 Mathematics · Fractions</div>
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
            Fractions topic (43% avg) has triggered 3 learner interventions in Grade 6 East. One intervention shows significant improvement (+26 pp for Brian Mwangi).
          </p>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/management/interventions')}>
            View Interventions <ArrowRight size={14} />
          </button>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)', borderColor: '#C4B5FD' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={20} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Ask the AI Assistant</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>School Intelligence · Powered by mock data</div>
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
            "Which grade needs the most attention?" "What are the biggest learning gaps?" "Which learners require support?"
          </p>
          <button className="btn btn-sm" style={{ background: '#7C3AED', color: 'white', borderColor: '#7C3AED' }} onClick={() => navigate('/management/ai')}>
            Open AI Assistant <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
