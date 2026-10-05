import { useState } from 'react';
import { School, TrendingUp, ArrowLeftRight, Plus, CheckCircle2, Clock } from 'lucide-react';
import { STUDENTS } from '../../../mock/students';
import { StatusBadge } from '../../../components/common/index';

type MovementTab = 'admissions' | 'promotions' | 'transfers';

export default function StudentMovementPage({ initialTab = 'admissions' }: { initialTab?: MovementTab }) {
  const [tab, setTab] = useState<MovementTab>(initialTab);

  const pendingTransfers = [
    { id: 'tr-001', studentName: 'John Muthoni', admissionNumber: 'ADM-2020-016', fromStream: 'Grade 6 West', toSchool: 'Hillcrest International', reason: 'Family Relocation', status: 'pending', date: '2026-09-30' },
  ];

  const recentAdmissions = STUDENTS.slice(10, 16);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Student Movement Workflows
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            New learner admissions, year-end cohort promotions, and school transfer clearance.
          </p>
        </div>

        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Plus size={16} /> New Admission / Request
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setTab('admissions')}
          className={`btn btn-sm ${tab === 'admissions' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <School size={15} /> Admissions
        </button>
        <button
          onClick={() => setTab('promotions')}
          className={`btn btn-sm ${tab === 'promotions' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <TrendingUp size={15} /> Annual Promotions
        </button>
        <button
          onClick={() => setTab('transfers')}
          className={`btn btn-sm ${tab === 'transfers' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <ArrowLeftRight size={15} /> Transfers & Clearances ({pendingTransfers.length})
        </button>
      </div>

      {/* 1. ADMISSIONS TAB */}
      {tab === 'admissions' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Recent 2026 Admissions</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Admission #</th>
                  <th>Student Name</th>
                  <th>Gender</th>
                  <th>Assigned Grade</th>
                  <th>Admission Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAdmissions.map(s => (
                  <tr key={s.id}>
                    <td><code>{s.admissionNumber}</code></td>
                    <td><strong>{s.firstName} {s.lastName}</strong></td>
                    <td style={{ textTransform: 'capitalize' }}>{s.gender}</td>
                    <td>Grade 6 East</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{s.admissionDate}</td>
                    <td><span className="badge badge-success">Admitted</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. PROMOTIONS TAB */}
      {tab === 'promotions' && (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 700 }}>
              End-of-Year Cohort Promotion Engine
            </h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Transitions all students from the active academic year to the subsequent grade level (e.g., Grade 6 to Grade 7 in 2027).
            </p>
          </div>

          <div style={{ background: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-primary)' }}>
            <strong>Current Academic Status:</strong> 2026 Term 3 is currently active. The batch promotion pipeline is unlocked at the close of Term 3 upon completion of all final assessments.
          </div>

          <button className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} disabled>
            Review Promotion Eligibility Matrix (Opens Term 3 Close)
          </button>
        </div>
      )}

      {/* 3. TRANSFERS TAB */}
      {tab === 'transfers' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Pending Transfer Requests</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Current Stream</th>
                  <th>Destination School</th>
                  <th>Reason</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingTransfers.map(tr => (
                  <tr key={tr.id}>
                    <td>
                      <strong>{tr.studentName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{tr.admissionNumber}</div>
                    </td>
                    <td>{tr.fromStream}</td>
                    <td>{tr.toSchool}</td>
                    <td>{tr.reason}</td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{tr.date}</td>
                    <td><span className="badge badge-warning">Pending Review</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.375rem' }}>
                        <button className="btn btn-sm btn-primary">Approve & Issue NEMIS</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
