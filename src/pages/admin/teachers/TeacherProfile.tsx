import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, BookOpen, Award, CheckCircle2, ClipboardList } from 'lucide-react';
import { TEACHERS, TEACHING_ASSIGNMENTS } from '../../../mock/users';
import { StatusBadge } from '../../../components/common/index';

export default function TeacherProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const teacher = TEACHERS.find(t => t.id === id) || TEACHERS[0];
  const assignments = TEACHING_ASSIGNMENTS.filter(a => a.teacherId === teacher.id);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-sm btn-secondary">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {teacher.firstName} {teacher.lastName}
          </h1>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            Employee ID: {teacher.employeeId} · Joined {teacher.joinDate}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Info card */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: '#EFF6FF', color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700
          }}>
            {teacher.firstName[0]}{teacher.lastName[0]}
          </div>

          <div>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700 }}>{teacher.firstName} {teacher.lastName}</h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              <StatusBadge status={teacher.status} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
              <Mail size={15} /> {teacher.email}
            </div>
            {teacher.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                <Phone size={15} /> {teacher.phone}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
              <Award size={15} /> {teacher.qualification}
            </div>
          </div>
        </div>

        {/* Assigned classes */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: 700 }}>
            Active Teaching Allocations
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {assignments.map(a => (
              <div
                key={a.id}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-secondary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Grade 6 {a.streamId === 'stream-6e' ? 'East' : 'West'}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    Subject: Mathematics · 2026 Term 3
                  </div>
                </div>
                {a.isClassTeacher && (
                  <span className="badge badge-success">Class Teacher</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
