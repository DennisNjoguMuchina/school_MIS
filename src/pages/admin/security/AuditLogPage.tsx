import { useState } from 'react';
import { FileText, Shield, Search, Calendar } from 'lucide-react';
import { AUDIT_LOG } from '../../../mock/performance';

export default function AuditLogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = AUDIT_LOG.filter(log => {
    const desc = log.description.toLowerCase();
    const user = log.userName.toLowerCase();
    const action = log.action.toLowerCase();
    const q = searchQuery.toLowerCase();
    return desc.includes(q) || user.includes(q) || action.includes(q);
  });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            System Security & Audit Trail
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Immutable timestamped record of user actions, marks entry submissions, and administrative overrides.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.375rem 0.75rem', minWidth: 280 }}>
          <Search size={16} color="var(--color-text-muted)" style={{ marginRight: '0.5rem' }} />
          <input
            type="text"
            placeholder="Search action, user, or entity..."
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
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Action Type</th>
                <th>Target Entity</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td>
                    <strong>{log.userName}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{log.userRole}</div>
                  </td>
                  <td>
                    <span className="badge badge-info" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {log.action}
                    </span>
                  </td>
                  <td>
                    <code>{log.entity}</code>
                  </td>
                  <td>{log.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
