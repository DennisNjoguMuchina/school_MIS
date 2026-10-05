import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ScanLine, FileText, CheckCircle2, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

export default function UploadMarksheet() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stage, setStage] = useState<'idle' | 'uploading' | 'enhancing' | 'detecting' | 'complete'>('idle');

  const handleSimulatedUpload = () => {
    setIsProcessing(true);
    setStage('uploading');

    setTimeout(() => {
      setStage('enhancing');
      setTimeout(() => {
        setStage('detecting');
        setTimeout(() => {
          setStage('complete');
          setIsProcessing(false);
        }, 1200);
      }, 1000);
    }, 800);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Upload Paper Marksheet (OCR Intelligence)
        </h1>
        <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
          Capture physical marksheets via camera or scanner. The automated pipeline detects tabular structures, matches admission numbers, and extracts handwritten scores.
        </p>
      </div>

      {/* Target Class & Subject selectors */}
      <div className="card" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
            Target Class
          </label>
          <select className="input" defaultValue="stream-6e">
            <option value="stream-6e">Grade 6 East (38 Learners)</option>
            <option value="stream-6w">Grade 6 West (36 Learners)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
            Subject
          </label>
          <select className="input" defaultValue="subj-math">
            <option value="subj-math">Mathematics</option>
            <option value="subj-sci">Science & Technology</option>
            <option value="subj-eng">English</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
            Assessment Name
          </label>
          <input className="input" defaultValue="Fractions & Decimals Pop Quiz" />
        </div>
      </div>

      {/* Upload Zone */}
      <div
        className="card"
        style={{
          padding: '3rem 2rem',
          border: '2px dashed var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '1rem',
          background: 'var(--color-bg-secondary)'
        }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: '#EFF6FF', color: 'var(--color-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <ScanLine size={32} />
        </div>

        <div>
          <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.125rem', fontWeight: 700 }}>
            Upload Scanned Marksheet or Photo
          </h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)', maxWidth: 440 }}>
            Supports PNG, JPG, or PDF scans of handwritten score sheets. Automated alignment & perspective correction will apply.
          </p>
        </div>

        {stage === 'idle' && (
          <button
            onClick={handleSimulatedUpload}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
          >
            <Upload size={16} /> Choose File / Simulate Scan
          </button>
        )}

        {isProcessing && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Loader2 size={24} className="animate-spin" color="var(--color-primary)" />
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {stage === 'uploading' && 'Ingesting document...'}
              {stage === 'enhancing' && 'Applying contrast enhancement & de-skewing...'}
              {stage === 'detecting' && 'Running tabular cell recognition & digit extraction...'}
            </div>
          </div>
        )}

        {stage === 'complete' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontWeight: 700 }}>
              <CheckCircle2 size={20} /> Marksheet Processed! 38 Learner Rows Detected.
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              35 confident matches · 3 low-confidence digits flagged for human verification.
            </p>
            <button
              onClick={() => navigate('/teacher/ocr-review')}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Review Detected Scores in OCR Studio <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Pipeline Information */}
      <div style={{
        background: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: '1.25rem',
        fontSize: '0.8125rem',
        color: 'var(--color-text-secondary)'
      }}>
        <strong style={{ color: 'var(--color-text-primary)' }}>OCR Lifecycle Stage:</strong>
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          <span>1. Uploaded</span>
          <span>&rarr;</span>
          <span>2. Perspective Corrected</span>
          <span>&rarr;</span>
          <span>3. Digits Detected</span>
          <span>&rarr;</span>
          <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>4. Teacher Verification (Current)</span>
          <span>&rarr;</span>
          <span>5. Final Commit to Gradebook</span>
        </div>
      </div>
    </div>
  );
}
