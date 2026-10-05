import { useState } from 'react';
import { ClipboardList, Plus, Trash2, Edit, CheckCircle2 } from 'lucide-react';
import { TEACHING_ASSIGNMENTS, TEACHERS } from '../../../mock/users';
import { GRADES, STREAMS, SUBJECTS } from '../../../mock/academic';

export default function TeacherAssignmentsPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Teacher Subject & Class Allocations
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Map teachers to specific grades, classroom streams, and subjects for the 2026 Academic Year.
          </p>
        </div>

        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Plus size={16} /> Assign Teacher to Class
        </button>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Assigned Class</th>
                <th>Subject</th>
                <th>Role</th>
                <th>Academic Term</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {TEACHING_ASSIGNMENTS.map(assignment => {
                const teacher = TEACHERS.find(t => t.id === assignment.teacherId);
                const stream = STREAMS.find(s => s.id === assignment.streamId);
                const subject = SUBJECTS.find(s => s.id === assignment.subjectId);

                return (
                  <tr key={assignment.id}>
                    <td>
                      <strong>{teacher?.firstName} {teacher?.lastName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{teacher?.employeeId}</div>
                    </td>
                    <td>
                      <span className="badge badge-info">{stream?.displayName || 'Grade 6'}</span>
                    </td>
                    <td>{subject?.name || 'Mathematics'}</td>
                    <td>
                      {assignment.isClassTeacher ? (
                        <span className="badge badge-success">Class Teacher</span>
                      ) : (
                        <span className="badge badge-muted">Subject Teacher</span>
                      )}
                    </td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>2026 Term 3</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-sm btn-secondary">
                        Edit
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
