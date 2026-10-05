import { useState } from 'react';
import { Building2, Save, CheckCircle2, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { SCHOOL } from '../../mock/academic';

export default function SchoolDetailsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            School Profile & Details
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Institution registration information, contact details, and accreditation records.
          </p>
        </div>

        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {saved && (
        <div style={{
          background: '#F0FDF4', border: '1px solid #86EFAC', color: '#166534',
          borderRadius: 'var(--radius-md)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <CheckCircle2 size={18} />
          <span>School institution details updated successfully.</span>
        </div>
      )}

      <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Institution Name
            </label>
            <input className="input" defaultValue={SCHOOL.name} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Registration Number (MOE)
            </label>
            <input className="input" defaultValue={SCHOOL.registrationNumber} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              School Motto
            </label>
            <input className="input" defaultValue={SCHOOL.motto} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              County / Region
            </label>
            <input className="input" defaultValue={SCHOOL.county} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Official Email
            </label>
            <input className="input" defaultValue={SCHOOL.email} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Official Phone
            </label>
            <input className="input" defaultValue={SCHOOL.phone} />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
              Physical Address
            </label>
            <input className="input" defaultValue={SCHOOL.address} />
          </div>
        </div>
      </div>
    </div>
  );
}
