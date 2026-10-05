import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Plus, Wrench, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { STUDENTS, ENROLMENTS } from '../../../mock/students';
import { StatusBadge, PerformanceBar, SectionHeader } from '../../../components/common/index';

export default function MyLearners() {
  const navigate = useNavigate();
  const [selectedStream, setSelectedStream] = useState<string>('stream-6e');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Grade 6 East enrolments
  const classEnrolments = ENROLMENTS.filter(e => e.streamId === selectedStream && e.status === 'active');
  const studentIds = new Set(classEnrolments.map(e => e.studentId));
  
  const classStudents = STUDENTS.filter(s => studentIds.has(s.id));

  const filteredStudents = classStudents.filter(s => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const adm = (s.studentNumber || s.admissionNumber || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return fullName.includes(q) || adm.includes(q);
  });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            My Learners
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Roster of students enrolled in your teaching streams with performance indicators.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/teacher/interventions')}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Wrench size={16} /> Interventions
          </button>
        </div>
      </div>

      {/* Stream Tabs and Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setSelectedStream('stream-6e')}
            className={`btn btn-sm ${selectedStream === 'stream-6e' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Grade 6 East (38 Learners)
          </button>
          <button
            onClick={() => setSelectedStream('stream-6w')}
            className={`btn btn-sm ${selectedStream === 'stream-6w' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Grade 6 West (36 Learners)
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.375rem 0.75rem', minWidth: 260 }}>
          <Search size={16} color="var(--color-text-muted)" style={{ marginRight: '0.5rem' }} />
          <input
            type="text"
            placeholder="Search student or admission #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.875rem' }}
          />
        </div>
      </div>

      {/* Learners Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Admission #</th>
                <th>Learner Name</th>
                <th>Gender</th>
                <th>Mathematics Score</th>
                <th>Attendance</th>
                <th>Support Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                // Mock indicators for demo
                const isBrian = student.id === 'stu-001';
                const isPeter = student.id === 'stu-003';
                const mathScore = isBrian ? 52 : isPeter ? 35 : student.gender === 'female' ? 68 : 59;
                const atRisk = mathScore < 50;

                return (
                  <tr key={student.id}>
                    <td>
                      <code>{student.studentNumber || student.admissionNumber}</code>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{student.firstName} {student.lastName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>DOB: {student.dateOfBirth}</div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{student.gender}</td>
                    <td>
                      <PerformanceBar value={mathScore} />
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {isBrian ? '94%' : isPeter ? '88%' : '96%'}
                      </span>
                    </td>
                    <td>
                      {atRisk ? (
                        <span className="badge badge-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <AlertTriangle size={12} /> High Priority
                        </span>
                      ) : (
                        <span className="badge badge-success">On Track</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.375rem' }}>
                        <button
                          onClick={() => navigate(`/admin/students/${student.id}`)}
                          className="btn btn-sm btn-secondary"
                          title="Full Student Profile"
                        >
                          <Eye size={14} /> Profile
                        </button>
                      </div>
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
