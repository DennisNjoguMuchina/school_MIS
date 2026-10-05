import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Users, BookOpen, ChevronRight, BarChart2, ClipboardList } from 'lucide-react';
import { STREAMS } from '../../../mock/academic';
import { PerformanceBar } from '../../../components/common/index';

export default function MyClasses() {
  const navigate = useNavigate();

  const myClasses = [
    {
      id: 'stream-6e',
      name: 'Grade 6 East',
      subject: 'Mathematics',
      learners: 38,
      capacity: 40,
      meanScore: 52.0,
      isClassTeacher: true,
      pendingAssessments: 0,
      atRiskCount: 8,
    },
    {
      id: 'stream-6w',
      name: 'Grade 6 West',
      subject: 'Mathematics',
      learners: 36,
      capacity: 40,
      meanScore: 49.8,
      isClassTeacher: false,
      pendingAssessments: 1,
      atRiskCount: 10,
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          My Assigned Classes
        </h1>
        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
          Overview of assigned streams, learner rosters, class mean scores, and pending assessments.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {myClasses.map((cls) => (
          <div
            key={cls.id}
            className="card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {cls.name}
                  </h2>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    Subject: <strong>{cls.subject}</strong>
                  </div>
                </div>
                {cls.isClassTeacher ? (
                  <span className="badge badge-success">Class Teacher</span>
                ) : (
                  <span className="badge badge-info">Subject Teacher</span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Learners</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{cls.learners} / {cls.capacity}</div>
                </div>
                <div style={{ padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>At-Risk Learners</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-danger)' }}>{cls.atRiskCount}</div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                  <span>Class Mean Score</span>
                  <strong>{cls.meanScore}%</strong>
                </div>
                <PerformanceBar value={cls.meanScore} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <button
                onClick={() => navigate('/teacher/learners')}
                className="btn btn-secondary"
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.375rem' }}
              >
                <Users size={15} /> Roster
              </button>
              <button
                onClick={() => navigate('/teacher/enter-marks')}
                className="btn btn-secondary"
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.375rem' }}
              >
                <ClipboardList size={15} /> Enter Marks
              </button>
              <button
                onClick={() => navigate('/teacher/performance')}
                className="btn btn-primary"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.5rem 0.75rem' }}
                title="Class Performance"
              >
                <BarChart2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
