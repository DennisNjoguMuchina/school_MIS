import { useState } from 'react';
import { Settings, Save, CheckCircle2, Shield, Bell, Database } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            System Settings & Integrations
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Platform configuration, assessment thresholds, and integration hooks for downstream PostgreSQL & n8n.
          </p>
        </div>

        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <Save size={16} /> {saved ? 'Saved!' : 'Save Preferences'}
        </button>
      </div>

      {saved && (
        <div style={{
          background: '#F0FDF4', border: '1px solid #86EFAC', color: '#166534',
          borderRadius: 'var(--radius-md)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <CheckCircle2 size={18} />
          <span>System configuration parameters committed.</span>
        </div>
      )}

      {/* Assessment Thresholds */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Academic Thresholds</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Minimum Competency Benchmark (%)
            </label>
            <input type="number" className="input" defaultValue={50} />
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              Scores below this trigger automatic intervention flagging.
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Excellence Standard Threshold (%)
            </label>
            <input type="number" className="input" defaultValue={75} />
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              Scores at or above this receive mastery distinction.
            </div>
          </div>
        </div>
      </div>

      {/* Downstream Architecture Hooks */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Downstream Architecture Connection Status</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <span>PostgreSQL Data Layer:</span>
            <span className="badge badge-info">Frontend Phase — Ready for Schema Binding</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <span>n8n OCR & Notification Workflows:</span>
            <span className="badge badge-info">Simulated — API contracts defined</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <span>AI Model Integration:</span>
            <span className="badge badge-info">Interactive Persona Sandboxes Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
