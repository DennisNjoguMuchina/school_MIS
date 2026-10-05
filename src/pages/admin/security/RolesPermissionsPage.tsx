import { useState } from 'react';
import { Shield, Check, Lock } from 'lucide-react';
import { ROLE_PERMISSIONS } from '../../../types/auth';

export default function RolesPermissionsPage() {
  const roles = ['admin', 'management', 'teacher', 'parent', 'student'] as const;

  const permissionCategories = [
    {
      category: 'Student Data',
      permissions: [
        { key: 'students:view', label: 'View Student Directory & Profiles' },
        { key: 'students:create', label: 'Admit & Register Students' },
        { key: 'students:edit', label: 'Modify Demographic Details' },
        { key: 'students:promote', label: 'Promote / Transfer Students' },
      ]
    },
    {
      category: 'Assessment & Marks',
      permissions: [
        { key: 'marks:enter', label: 'Enter & Edit Classroom Marks' },
        { key: 'marks:ocr_upload', label: 'Upload Paper Marksheets for OCR' },
        { key: 'marks:verify', label: 'Verify & Commit Assessment Scores' },
      ]
    },
    {
      category: 'Analytics & Interventions',
      permissions: [
        { key: 'performance:view_school', label: 'View Whole School & Longitudinal Analytics' },
        { key: 'performance:view_class', label: 'View Class / Stream Mastery Metrics' },
        { key: 'interventions:manage', label: 'Design & Log Remedial Plans' },
      ]
    },
    {
      category: 'AI Assistants',
      permissions: [
        { key: 'ai:assistant_mgmt', label: 'Management Executive AI Advisor' },
        { key: 'ai:assistant_teacher', label: 'Teacher Pedagogical AI Advisor' },
        { key: 'ai:assistant_parent', label: 'Parent Home Learning Companion' },
      ]
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Roles & Access Control Matrix
        </h1>
        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
          Role-Based Access Control (RBAC) governing data visibility, modification privileges, and AI assistants.
        </p>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '35%' }}>Permission Capability</th>
                <th style={{ textAlign: 'center' }}>Admin</th>
                <th style={{ textAlign: 'center' }}>Management</th>
                <th style={{ textAlign: 'center' }}>Teacher</th>
                <th style={{ textAlign: 'center' }}>Parent</th>
                <th style={{ textAlign: 'center' }}>Student</th>
              </tr>
            </thead>
            <tbody>
              {permissionCategories.map(cat => (
                <>
                  <tr key={cat.category} style={{ background: 'var(--color-bg-secondary)' }}>
                    <td colSpan={6} style={{ fontWeight: 700, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>
                      {cat.category}
                    </td>
                  </tr>
                  {cat.permissions.map(perm => (
                    <tr key={perm.key}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{perm.label}</div>
                        <code>{perm.key}</code>
                      </td>
                      {roles.map(r => {
                        const hasPerm = (ROLE_PERMISSIONS[r] as readonly string[]).includes(perm.key);
                        return (
                          <td key={r} style={{ textAlign: 'center' }}>
                            {hasPerm ? (
                              <div style={{
                                width: 24, height: 24, borderRadius: '50%', background: '#F0FDF4', color: '#16A34A',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                              }}>
                                <Check size={14} />
                              </div>
                            ) : (
                              <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
