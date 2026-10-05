import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, User, Calendar, Award, BookOpen, Wrench, ClipboardList, Clock } from 'lucide-react';
import { STUDENTS, ENROLMENTS } from '../../../mock/students';
import { GRADES, STREAMS } from '../../../mock/academic';
import { BRIAN_PERFORMANCE, BRIAN_MATH_TREND, INTERVENTIONS } from '../../../mock/performance';
import { PerformanceBar, TrendChip, StatusBadge, Breadcrumbs, DemoLabel } from '../../../components/common/index';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ============================================================
// STUDENT PROFILE (Admin view)
// ============================================================

const TABS = ['Overview', 'Academic Performance', 'Assessments', 'Attendance', 'Interventions', 'History'];

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const student = STUDENTS.find(s => s.id === id);
  if (!student) return (
    <div className="page-container">
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}><ArrowLeft size={15} /> Back</button>
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Student not found.</div>
    </div>
  );

  const currentEnrolment = ENROLMENTS.find(e => e.id === student.currentEnrolmentId);
  const currentGrade = GRADES.find(g => g.id === currentEnrolment?.gradeId);
  const currentStream = STREAMS.find(s => s.id === currentEnrolment?.streamId);

  // Brian's performance — use detailed mock for stu-001, generic for others
  const perf = student.id === 'stu-001' ? BRIAN_PERFORMANCE : null;
  const trend = student.id === 'stu-001' ? BRIAN_MATH_TREND : [];
  const studentInterventions = INTERVENTIONS.filter(i => i.studentId === student.id);

  const historicalEnrolments = ENROLMENTS.filter(e => e.studentId === student.id && e.status !== 'active').sort(
    (a, b) => new Date(a.enrolledDate).getTime() - new Date(b.enrolledDate).getTime()
  );

  const initials = `${student.firstName[0]}${student.lastName[0]}`;

  return (
    <div className="page-container animate-fade-in">
      <Breadcrumbs items={[
        { label: 'Students', onClick: () => navigate('/admin/students') },
        { label: `${student.firstName} ${student.lastName}` },
      ]} />

      {/* Profile Header */}
      <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%)', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--color-blue), var(--color-blue-light))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 800, color: 'white',
          }}>{initials}</div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.375rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', margin: 0 }}>{student.firstName} {student.lastName}</h1>
              <StatusBadge status={student.status} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Student ID: <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.85)' }}>{student.studentNumber}</span>
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Class</div>
                <div style={{ fontWeight: 600, color: 'white' }}>{currentStream?.displayName ?? '—'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Admitted</div>
                <div style={{ fontWeight: 600, color: 'white' }}>{new Date(student.admissionDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              </div>
              {perf && (
                <>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Overall</div>
                    <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-gold)' }}>{perf.overallPercentage}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trend</div>
                    <TrendChip trend={perf.trend} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Attendance</div>
                    <div style={{ fontWeight: 600, color: 'white' }}>{perf.attendancePercentage}%</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        {TABS.map(tab => (
          <button key={tab} className={`tab-item${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Personal Info */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '1rem' }}>Personal Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { icon: <User size={15} />, label: 'Full Name', value: `${student.firstName} ${student.lastName}` },
                { icon: <User size={15} />, label: 'Gender', value: student.gender === 'male' ? 'Male' : 'Female' },
                { icon: <Calendar size={15} />, label: 'Date of Birth', value: new Date(student.dateOfBirth).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }) },
                { icon: <Award size={15} />, label: 'Student ID', value: student.studentNumber },
                { icon: <Calendar size={15} />, label: 'Admission Date', value: new Date(student.admissionDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }) },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-text-muted)', marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                    <div style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Support areas */}
          {perf && (
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <h3 className="card-title">Learning Profile</h3>
                <DemoLabel />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-success)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span>✓</span> Strengths
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {perf.strengths.map(s => (
                    <span key={s} className="badge badge-success">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-warning)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span>⚠</span> Needs Support
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {perf.needsSupport.map(s => (
                    <span key={s} className="badge badge-warning">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Academic Performance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <h3 className="card-title">Subject Performance — Term 3, 2026</h3>
              <DemoLabel />
            </div>
            {perf ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {perf.subjects.map(subj => (
                  <div key={subj.subjectId}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                      <span style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{subj.subjectName}</span>
                      <TrendChip trend={subj.trend} compact />
                    </div>
                    <PerformanceBar value={subj.averagePercentage} />
                    {subj.previousTermPercentage !== undefined && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                        Previous term: {subj.previousTermPercentage}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-secondary)' }}>Detailed performance data coming in next build for this student.</p>
            )}
          </div>

          {/* Math trend chart (Brian only) */}
          {student.id === 'stu-001' && trend.length > 0 && (
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <h3 className="card-title">Mathematics Trend</h3>
                <DemoLabel />
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                Note: Decline in T2 2026 triggered intervention. Score recovering after support.
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13 }}
                    formatter={(v: any) => [`${v}%`, 'Mathematics']}
                  />
                  <Line type="monotone" dataKey="value" stroke="var(--color-blue)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--color-blue)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Interventions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {studentInterventions.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <Wrench size={32} style={{ color: 'var(--color-text-muted)', margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--color-text-secondary)' }}>No interventions recorded for this student.</p>
            </div>
          ) : studentInterventions.map(intv => (
            <div key={intv.id} className="card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>{intv.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>
                    {intv.subStrandName} · Started {new Date(intv.startDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <StatusBadge status={intv.status} />
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>{intv.description}</p>
              <div style={{ fontSize: '0.8125rem', padding: '0.625rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-secondary)', marginBottom: intv.outcome ? '0.875rem' : 0 }}>
                <strong>Issue identified:</strong> {intv.issue}
              </div>
              {intv.outcome && (
                <div style={{ display: 'flex', gap: '1rem', padding: '0.875rem', background: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Before</div>
                    <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-danger)' }}>{intv.outcome.beforePercentage}%</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}>→</div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>After</div>
                    <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-success)' }}>{intv.outcome.afterPercentage}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Improvement</div>
                    <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-success)' }}>+{intv.outcome.improvement} pp</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Teacher Note</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{intv.outcome.notes}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'History' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <h3 className="card-title">Academic History</h3>
            <DemoLabel />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[...historicalEnrolments, ...(currentEnrolment ? [{ ...currentEnrolment, status: 'active' as const }] : [])].map((enr, i) => {
              const g = GRADES.find(g => g.id === enr.gradeId);
              const s = STREAMS.find(s => s.id === enr.streamId);
              const isActive = enr.status === 'active';
              return (
                <div key={enr.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', paddingBottom: '1.5rem' }}>
                  {/* Timeline dot */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: '50%', marginTop: 4,
                      background: isActive ? 'var(--color-blue)' : 'var(--color-border)',
                      border: `2px solid ${isActive ? 'var(--color-blue-light)' : 'var(--color-surface-alt)'}`,
                    }} />
                    {i < historicalEnrolments.length && (
                      <div style={{ width: 2, flex: 1, background: 'var(--color-border)', minHeight: 32 }} />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingTop: 2 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: isActive ? 'var(--color-blue)' : 'var(--color-text-primary)' }}>
                      {g?.name} {s ? `(${s.displayName})` : ''}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>
                      Academic Year: {enr.academicYearId.replace('ay-', '')}
                      {enr.completedDate ? ` · Completed ${new Date(enr.completedDate).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })}` : ''}
                    </div>
                    <div style={{ marginTop: '0.375rem' }}>
                      <StatusBadge status={enr.status} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!['Overview', 'Academic Performance', 'Interventions', 'History'].includes(activeTab) && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
          <Clock size={32} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
          <p>This section will be available in the next build.</p>
          <span className="badge badge-muted" style={{ marginTop: '0.75rem' }}>Coming Soon</span>
        </div>
      )}
    </div>
  );
}
