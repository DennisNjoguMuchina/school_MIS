import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, AlertTriangle, ArrowLeft, Check, 
  HelpCircle, Eye, Save, RefreshCw, FileText 
} from 'lucide-react';
import { STUDENTS } from '../../../mock/students';

interface OCRRow {
  studentId: string;
  admissionNumber: string;
  name: string;
  detectedScore: number;
  confidence: number; // 0 to 100
  flagged: boolean;
  manualScore?: number;
}

export default function OCRReview() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<OCRRow[]>([
    { studentId: 'stu-001', admissionNumber: 'ADM-2020-001', name: 'Brian Mwangi', detectedScore: 14, confidence: 96, flagged: false },
    { studentId: 'stu-002', admissionNumber: 'ADM-2020-002', name: 'Faith Chebet', detectedScore: 18, confidence: 98, flagged: false },
    { studentId: 'stu-003', admissionNumber: 'ADM-2020-003', name: 'Peter Otieno', detectedScore: 7, confidence: 64, flagged: true }, // Low confidence (handwritten 7 vs 1)
    { studentId: 'stu-004', admissionNumber: 'ADM-2020-004', name: 'Mercy Wanjiku', detectedScore: 12, confidence: 94, flagged: false },
    { studentId: 'stu-005', admissionNumber: 'ADM-2020-005', name: 'David Kamau', detectedScore: 15, confidence: 91, flagged: false },
    { studentId: 'stu-006', admissionNumber: 'ADM-2020-006', name: 'Grace Muthoni', detectedScore: 16, confidence: 89, flagged: false },
    { studentId: 'stu-007', admissionNumber: 'ADM-2020-007', name: 'Samuel Kiprop', detectedScore: 13, confidence: 58, flagged: true }, // Low confidence
    { studentId: 'stu-008', admissionNumber: 'ADM-2020-008', name: 'Amina Hassan', detectedScore: 17, confidence: 99, flagged: false },
  ]);

  const [committed, setCommitted] = useState(false);

  const handleScoreChange = (index: number, val: string) => {
    const num = parseFloat(val);
    setRows(prev => {
      const updated = [...prev];
      updated[index].detectedScore = isNaN(num) ? 0 : num;
      updated[index].flagged = false; // cleared after manual review
      return updated;
    });
  };

  const handleCommit = () => {
    setCommitted(true);
    setTimeout(() => {
      navigate('/teacher/assessments');
    }, 1500);
  };

  const flaggedCount = rows.filter(r => r.flagged).length;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => navigate(-1)} className="btn btn-sm btn-secondary">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              OCR Marksheet Verification Studio
            </h1>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Review parsed marks before final committing into Greenfield MIS Gradebook.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.375rem' }}>
          {flaggedCount > 0 && (
            <span style={{ fontSize: '0.75rem', color: '#92400E', fontWeight: 600 }}>
              ⚠ Resolve {flaggedCount} flagged {flaggedCount === 1 ? 'row' : 'rows'} before finalizing
            </span>
          )}
          <button
            onClick={handleCommit}
            disabled={flaggedCount > 0 || committed}
            className="btn btn-primary"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              opacity: flaggedCount > 0 ? 0.5 : 1,
              cursor: flaggedCount > 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <CheckCircle2 size={16} /> {committed ? 'Committed!' : 'Approve & Commit All Marks'}
          </button>
        </div>
      </div>

      {/* Flagged Alert Banner */}
      {flaggedCount > 0 ? (
        <div style={{
          background: '#FEF3C7',
          border: '1px solid #FCD34D',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#92400E',
          fontSize: '0.875rem'
        }}>
          <AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Attention Required:</strong> {flaggedCount} scores were flagged with OCR confidence below 70%.
            Please review the highlighted cells against your physical sheet and adjust if necessary.
          </div>
        </div>
      ) : (
        <div style={{
          background: '#F0FDF4',
          border: '1px solid #86EFAC',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#166534',
          fontSize: '0.875rem'
        }}>
          <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
          <div>
            All scores have verified confidence or have been manually reviewed. Ready for final commit!
          </div>
        </div>
      )}

      {/* Verification Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 140 }}>Admission #</th>
                <th>Learner Name</th>
                <th style={{ width: 140 }}>Detected Score</th>
                <th style={{ width: 160 }}>Confidence</th>
                <th>Validation Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const isFlagged = row.flagged;

                return (
                  <tr key={row.studentId} style={{ background: isFlagged ? '#FFFBEB' : 'transparent' }}>
                    <td>
                      <code>{row.admissionNumber}</code>
                    </td>
                    <td>
                      <strong>{row.name}</strong>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={row.detectedScore}
                        onChange={(e) => handleScoreChange(idx, e.target.value)}
                        style={{
                          width: 70,
                          padding: '0.375rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          border: isFlagged ? '2px solid #F59E0B' : '1px solid var(--color-border)',
                          fontWeight: 700,
                          fontSize: '0.9375rem',
                          textAlign: 'center',
                          background: isFlagged ? '#FEF3C7' : '#FFFFFF'
                        }}
                      />
                      <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginLeft: '0.25rem' }}>
                        / 20
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: 60, height: 6, background: '#E2E8F0', borderRadius: 999, overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${row.confidence}%`,
                              height: '100%',
                              background: row.confidence > 80 ? 'var(--color-success)' : 'var(--color-warning)'
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{row.confidence}%</span>
                      </div>
                    </td>
                    <td>
                      {isFlagged ? (
                        <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <AlertTriangle size={12} /> Low Confidence
                        </span>
                      ) : (
                        <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Check size={12} /> Confirmed
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => {
                          setRows(prev => {
                            const u = [...prev];
                            u[idx].flagged = false;
                            return u;
                          });
                        }}
                        className="btn btn-sm btn-secondary"
                        disabled={!isFlagged}
                      >
                        Accept Score
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
