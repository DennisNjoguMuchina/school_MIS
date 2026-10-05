import { useState } from 'react';
import { Layers, Calendar, GitBranch, BookOpen, Plus, Edit, CheckCircle2 } from 'lucide-react';
import { ACADEMIC_YEARS, TERMS, GRADES, STREAMS, SUBJECTS } from '../../../mock/academic';
import { StatusBadge } from '../../../components/common/index';

type Tab = 'years' | 'terms' | 'grades' | 'streams' | 'subjects';

export default function AcademicStructurePage({ initialTab = 'grades' }: { initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Academic Structure Configuration
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Manage academic calendars, grade levels, classroom streams, and CBC subjects.
          </p>
        </div>

        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Plus size={16} /> Add New Entry
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', overflowX: 'auto' }}>
        {[
          { key: 'grades', label: 'Grade Levels', count: GRADES.length },
          { key: 'streams', label: 'Streams & Classes', count: STREAMS.length },
          { key: 'subjects', label: 'Subjects & CBC Strands', count: SUBJECTS.length },
          { key: 'years', label: 'Academic Years', count: ACADEMIC_YEARS.length },
          { key: 'terms', label: 'Terms', count: TERMS.length },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as Tab)}
            className={`btn btn-sm ${tab === t.key ? 'btn-primary' : 'btn-secondary'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', whiteSpace: 'nowrap' }}
          >
            {t.label} <span style={{ opacity: 0.8, fontSize: '0.75rem' }}>({t.count})</span>
          </button>
        ))}
      </div>

      {/* 1. GRADES TAB */}
      {tab === 'grades' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Grade Level</th>
                  <th>Hierarchy Order</th>
                  <th>Streams Count</th>
                  <th>Enrolled Learners</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {GRADES.map(g => {
                  const streams = STREAMS.filter(s => s.gradeId === g.id);
                  const totalStudents = streams.reduce((acc, s) => acc + (s.currentEnrolment || 0), 0);

                  return (
                    <tr key={g.id}>
                      <td><strong>{g.name}</strong></td>
                      <td>Level {g.level}</td>
                      <td>{streams.length} Streams</td>
                      <td>{totalStudents > 0 ? `${totalStudents} Learners` : '—'}</td>
                      <td><span className="badge badge-success">Active</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. STREAMS TAB */}
      {tab === 'streams' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Stream Name</th>
                  <th>Grade Level</th>
                  <th>Capacity</th>
                  <th>Current Enrolment</th>
                  <th>Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {STREAMS.map(s => {
                  const grade = GRADES.find(g => g.id === s.gradeId);
                  const pct = Math.round(((s.currentEnrolment || 0) / s.capacity) * 100);

                  return (
                    <tr key={s.id}>
                      <td><strong>{s.displayName}</strong></td>
                      <td>{grade?.name}</td>
                      <td>{s.capacity} seats</td>
                      <td>{s.currentEnrolment || 0} learners</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: 600 }}>{pct}%</span>
                          <span className={`badge ${pct >= 90 ? 'badge-warning' : 'badge-success'}`}>
                            {pct >= 90 ? 'Near Capacity' : 'Available'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. SUBJECTS TAB */}
      {tab === 'subjects' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Applicable Grades</th>
                  <th>Examinable</th>
                  <th>Curriculum</th>
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map(subj => (
                  <tr key={subj.id}>
                    <td><code>{subj.code}</code></td>
                    <td><strong>{subj.name}</strong></td>
                    <td>{subj.gradeIds.length} Grade Levels</td>
                    <td>
                      <span className={`badge ${subj.isExaminable ? 'badge-primary' : 'badge-muted'}`}>
                        {subj.isExaminable ? 'Examinable' : 'Activity Area'}
                      </span>
                    </td>
                    <td>CBC Competency-Based</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. ACADEMIC YEARS TAB */}
      {tab === 'years' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Academic Year</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Current Status</th>
                </tr>
              </thead>
              <tbody>
                {ACADEMIC_YEARS.map(ay => (
                  <tr key={ay.id}>
                    <td><strong>{ay.name} Academic Year</strong></td>
                    <td>{ay.startDate}</td>
                    <td>{ay.endDate}</td>
                    <td>
                      {ay.isCurrent ? (
                        <span className="badge badge-success">Active Current Year</span>
                      ) : (
                        <span className="badge badge-muted">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TERMS TAB */}
      {tab === 'terms' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Term Name</th>
                  <th>Academic Year</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {TERMS.map(term => (
                  <tr key={term.id}>
                    <td><strong>{term.name}</strong></td>
                    <td>2026</td>
                    <td>{term.startDate}</td>
                    <td>{term.endDate}</td>
                    <td>
                      {term.isCurrent ? (
                        <span className="badge badge-success">Active Term</span>
                      ) : (
                        <span className="badge badge-muted">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
