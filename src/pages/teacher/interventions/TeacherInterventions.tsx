import { useState } from 'react';
import { 
  Plus, CheckCircle2, Clock, Wrench, Sparkles, X, 
  Users, BookOpen, AlertTriangle, ArrowRight, Save 
} from 'lucide-react';
import { INTERVENTIONS } from '../../../mock/performance';
import { STUDENTS } from '../../../mock/students';
import { StatusBadge, MetricCard } from '../../../components/common/index';
import type { Intervention, InterventionType } from '../../../types/index';

export default function TeacherInterventions() {
  const [interventionsList, setInterventionsList] = useState<Intervention[]>(
    INTERVENTIONS.filter(i => i.teacherId === 'teacher-1')
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Form state for new learner plan
  const [selectedStudentId, setSelectedStudentId] = useState(STUDENTS[2]?.id || 'stu-003'); // Peter Otieno
  const [targetSubject, setTargetSubject] = useState('Mathematics');
  const [targetTopic, setTargetTopic] = useState('Decimals & Fractions');
  const [strategyType, setStrategyType] = useState<InterventionType>('small_group');
  const [planTitle, setPlanTitle] = useState('Decimals & Fractions Remedial Group');
  const [identifiedIssue, setIdentifiedIssue] = useState('Scored 35% on CAT 1. Displays persistent confusion with unlike denominators and place values.');
  const [startDate, setStartDate] = useState('2026-10-06');
  const [planDuration, setPlanDuration] = useState('4 Weeks (2 sessions/week)');

  const handleCreatePlan = () => {
    const student = STUDENTS.find(s => s.id === selectedStudentId);
    const newPlan: Intervention = {
      id: `int-${Date.now()}`,
      studentId: selectedStudentId,
      teacherId: 'teacher-1',
      subjectId: targetSubject === 'Mathematics' ? 'subj-math' : 'subj-sci',
      subStrandName: targetTopic,
      type: strategyType,
      title: planTitle,
      description: `${student?.firstName || 'Learner'} will attend ${planDuration} focusing on ${targetTopic}.`,
      issue: identifiedIssue,
      startDate: startDate,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    setInterventionsList(prev => [newPlan, ...prev]);
    setIsModalOpen(false);
    setSavedNotice(`New remedial plan created for ${student?.firstName} ${student?.lastName}!`);
    setTimeout(() => setSavedNotice(null), 4000);
  };

  const activeCount = interventionsList.filter(i => i.status === 'active').length;
  const completedCount = interventionsList.filter(i => i.status === 'completed').length;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Classroom Remedial Plans
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Document small group interventions, individualized practice, and before-and-after learner recoveries.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <Plus size={16} /> New Learner Plan
        </button>
      </div>

      {/* Success notification banner */}
      {savedNotice && (
        <div style={{
          background: '#F0FDF4',
          border: '1px solid #86EFAC',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#166534',
          fontSize: '0.875rem'
        }}>
          <CheckCircle2 size={20} />
          <strong>{savedNotice}</strong>
        </div>
      )}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <MetricCard
          label="Active Remedial Plans"
          value={activeCount}
          icon={<Clock size={22} />}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          context="Currently receiving targeted instruction"
        />
        <MetricCard
          label="Completed Recoveries"
          value={completedCount}
          icon={<CheckCircle2 size={22} />}
          iconBg="#F0FDF4"
          iconColor="#16A34A"
          context="Brian Mwangi (+26 pp uplift)"
        />
        <MetricCard
          label="Average Growth"
          value="+26.0 pp"
          icon={<Sparkles size={22} />}
          iconBg="#FAF5FF"
          iconColor="#9333EA"
          context="Proven visual models impact"
        />
      </div>

      {/* Interventions Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
            Active & Completed Remedial Records ({interventionsList.length})
          </h3>
          <span className="badge badge-info">Term 3 · 2026</span>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Learner</th>
                <th>Intervention Strategy</th>
                <th>Topic / Sub-Strand</th>
                <th>Type</th>
                <th>Dates</th>
                <th>Status / Outcome</th>
              </tr>
            </thead>
            <tbody>
              {interventionsList.map(item => {
                const student = STUDENTS.find(s => s.id === item.studentId);
                return (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{student ? `${student.firstName} ${student.lastName}` : item.studentId}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        {student?.studentNumber || student?.admissionNumber || 'ADM-2020'}
                      </div>
                    </td>
                    <td>
                      <strong>{item.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', maxWidth: 360 }}>
                        {item.issue || item.description}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info">{item.subStrandName || 'Mathematics'}</span>
                    </td>
                    <td>
                      <span style={{ textTransform: 'capitalize', fontSize: '0.8125rem' }}>
                        {item.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                      {item.startDate} {item.endDate ? `→ ${item.endDate}` : ''}
                    </td>
                    <td>
                      {item.outcome ? (
                        <div>
                          <StatusBadge status={item.outcome.result} />
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-success)', marginTop: '0.2rem' }}>
                            {item.outcome.beforePercentage}% &rarr; {item.outcome.afterPercentage}% (+{item.outcome.improvement} pp)
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

      {/* Modal: New Learner Plan Form */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: 600,
            background: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)'
              }}
            >
              <X size={20} />
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="badge badge-warning">Remediation Wizard</span>
              </div>
              <h2 style={{ margin: 0, fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                Create Learner Remedial Plan
              </h2>
              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                Target specific learning gaps identified from CATs or classroom quizzes with evidence-based pedagogy.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                  Target Learner (Grade 6 East)
                </label>
                <select
                  className="input"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                >
                  {STUDENTS.slice(0, 15).map(s => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.studentNumber || s.admissionNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Subject Area
                  </label>
                  <select
                    className="input"
                    value={targetSubject}
                    onChange={(e) => setTargetSubject(e.target.value)}
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science & Technology">Science & Technology</option>
                    <option value="English">English</option>
                    <option value="Kiswahili">Kiswahili</option>
                    <option value="Social Studies">Social Studies</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Target Topic / Gap
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={targetTopic}
                    onChange={(e) => setTargetTopic(e.target.value)}
                    placeholder="e.g. Fractions, Decimals, Circuits"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Intervention Format
                  </label>
                  <select
                    className="input"
                    value={strategyType}
                    onChange={(e) => setStrategyType(e.target.value as any)}
                  >
                    <option value="small_group">Small Group Remediation</option>
                    <option value="one_on_one">One-on-One Guided Practice</option>
                    <option value="peer_support">Peer Tutoring / Study Pair</option>
                    <option value="parental_involvement">Home Practice / Parent Support</option>
                    <option value="remedial_class">After-School Remedial Class</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                  Plan Title
                </label>
                <input
                  type="text"
                  className="input"
                  value={planTitle}
                  onChange={(e) => setPlanTitle(e.target.value)}
                  placeholder="e.g. Fractions Visual Models Cycle"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                  Identified Misconception / Diagnosis
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={identifiedIssue}
                  onChange={(e) => setIdentifiedIssue(e.target.value)}
                  placeholder="Describe why this student requires support..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                  Proposed Cadence & Duration
                </label>
                <input
                  type="text"
                  className="input"
                  value={planDuration}
                  onChange={(e) => setPlanDuration(e.target.value)}
                  placeholder="e.g. 4 Weeks (2 sessions/week)"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlan}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                <Save size={16} /> Save & Activate Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
