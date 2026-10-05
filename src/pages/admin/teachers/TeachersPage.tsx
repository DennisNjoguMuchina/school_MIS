import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Eye, Edit, UserCheck, Mail, Phone } from 'lucide-react';
import { TEACHERS, TEACHING_ASSIGNMENTS } from '../../../mock/users';
import { StatusBadge, SectionHeader } from '../../../components/common/index';

export default function TeachersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTeachers = TEACHERS.filter(t => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    const name = `${t.firstName} ${t.lastName}`.toLowerCase();
    const empId = t.employeeId.toLowerCase();
    const q = searchQuery.toLowerCase();
    return name.includes(q) || empId.includes(q);
  });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Teaching Staff Directory
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Faculty records, subject specializations, qualifications, and active class allocations.
          </p>
        </div>

        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Plus size={16} /> Add Teacher
        </button>
      </div>

      {/* Filters and search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'active', 'inactive'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-secondary'}`}
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
            placeholder="Search teacher by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.875rem' }}
          />
        </div>
      </div>

      {/* Teachers Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Teacher Name</th>
                <th>Specialization</th>
                <th>Qualification</th>
                <th>Contact</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map(teacher => {
                const assignments = TEACHING_ASSIGNMENTS.filter(a => a.teacherId === teacher.id);

                return (
                  <tr key={teacher.id}>
                    <td>
                      <code>{teacher.employeeId}</code>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{teacher.firstName} {teacher.lastName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        {assignments.length} assigned class allocations
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        {(teacher.specialization || []).map((spec, i) => (
                          <span key={i} className="badge badge-info">{spec}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8125rem' }}>{teacher.qualification}</td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                      <div>{teacher.email}</div>
                      {teacher.phone && <div>{teacher.phone}</div>}
                    </td>
                    <td>
                      <StatusBadge status={teacher.status} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => navigate(`/admin/teachers/${teacher.id}`)}
                        className="btn btn-sm btn-secondary"
                      >
                        <Eye size={14} /> Profile
                      </button>
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
