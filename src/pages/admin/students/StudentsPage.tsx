import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, MoreHorizontal, GraduationCap, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge, EmptyState, SectionHeader } from '../../../components/common/index';
import { STUDENTS, ENROLMENTS } from '../../../mock/students';
import { GRADES, STREAMS } from '../../../mock/academic';

// ============================================================
// STUDENTS LIST PAGE (Admin)
// ============================================================

export default function StudentsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Build display list by joining student with current enrolment
  const displayStudents = STUDENTS.map(s => {
    const enrolment = ENROLMENTS.find(e => e.id === s.currentEnrolmentId);
    const grade = GRADES.find(g => g.id === enrolment?.gradeId);
    const stream = STREAMS.find(st => st.id === enrolment?.streamId);
    return { ...s, gradeName: grade?.name ?? '—', streamName: stream?.name ?? '—', displayClass: stream?.displayName ?? '—' };
  });

  const filtered = displayStudents.filter(s => {
    const matchSearch = search === '' || `${s.firstName} ${s.lastName} ${s.studentNumber}`.toLowerCase().includes(search.toLowerCase());
    const matchGrade = gradeFilter === '' || s.gradeName === gradeFilter;
    const matchStatus = statusFilter === '' || s.status === statusFilter;
    return matchSearch && matchGrade && matchStatus;
  });

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>Students</h1>
            <p>{STUDENTS.length} students enrolled · 2026 Academic Year</p>
          </div>
          <button className="btn btn-primary" onClick={() => alert('Add Student form — coming in next build')}>
            <Plus size={16} /> Add Student
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-bar" style={{ maxWidth: 320 }}>
          <Search size={16} className="search-icon" />
          <input
            id="student-search"
            type="search"
            className="search-input"
            placeholder="Search students…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select
          id="grade-filter"
          className="form-select"
          style={{ width: 'auto' }}
          value={gradeFilter}
          onChange={e => setGradeFilter(e.target.value)}
        >
          <option value="">All Grades</option>
          {GRADES.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
        </select>

        <select
          id="status-filter"
          className="form-select"
          style={{ width: 'auto' }}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="transfer_pending">Transfer Pending</option>
          <option value="transferred">Transferred</option>
          <option value="withdrawn">Withdrawn</option>
        </select>

        {(search || gradeFilter || statusFilter) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setGradeFilter(''); setStatusFilter(''); }}>
            Clear filters
          </button>
        )}

        <span style={{ marginLeft: 'auto', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'student' : 'students'}
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<GraduationCap size={28} />}
          title="No students found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>ID</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Status</th>
                <th>Admission</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        background: `hsl(${(student.firstName.charCodeAt(0) * 15) % 360} 60% 88%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.875rem', fontWeight: 700,
                        color: `hsl(${(student.firstName.charCodeAt(0) * 15) % 360} 60% 35%)`,
                      }}>
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{student.firstName} {student.lastName}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{student.studentNumber}</td>
                  <td style={{ textTransform: 'capitalize', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{student.gender}</td>
                  <td>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{student.displayClass}</span>
                  </td>
                  <td><StatusBadge status={student.status} /></td>
                  <td style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {new Date(student.admissionDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-ghost btn-sm btn-icon"
                        title="View profile"
                        onClick={() => navigate(`/admin/students/${student.id}`)}
                      >
                        <Eye size={15} />
                      </button>
                      <button className="btn btn-ghost btn-sm btn-icon" title="Edit student">
                        <Edit size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
