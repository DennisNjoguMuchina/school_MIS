import { useState } from 'react';
import { Search, Plus, Eye, Users, Phone, Mail } from 'lucide-react';
import { PARENTS } from '../../../mock/users';
import { STUDENTS } from '../../../mock/students';
import { StatusBadge } from '../../../components/common/index';

export default function ParentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredParents = PARENTS.filter(p => {
    const name = `${p.firstName} ${p.lastName}`.toLowerCase();
    const email = p.email.toLowerCase();
    const q = searchQuery.toLowerCase();
    return name.includes(q) || email.includes(q);
  });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Parent & Guardian Directory
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Registered parent contacts, student associations, and portal access accounts.
          </p>
        </div>

        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Plus size={16} /> Link New Parent
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.375rem 0.75rem', minWidth: 260 }}>
          <Search size={16} color="var(--color-text-muted)" style={{ marginRight: '0.5rem' }} />
          <input
            type="text"
            placeholder="Search parent name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.875rem' }}
          />
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Parent Name</th>
                <th>Relationship</th>
                <th>Associated Children</th>
                <th>Contact Information</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredParents.map(parent => {
                const children = STUDENTS.filter(s => parent.childIds.includes(s.id));

                return (
                  <tr key={parent.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{parent.firstName} {parent.lastName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>ID: {parent.id}</div>
                    </td>
                    <td>
                      <span className="badge badge-info" style={{ textTransform: 'capitalize' }}>
                        {parent.relationship}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {children.map(child => (
                          <div key={child.id} style={{ fontSize: '0.8125rem' }}>
                            <strong>{child.firstName} {child.lastName}</strong> ({child.admissionNumber})
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                      <div>{parent.email}</div>
                      {parent.phone && <div>{parent.phone}</div>}
                    </td>
                    <td>
                      <StatusBadge status={parent.status} />
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
