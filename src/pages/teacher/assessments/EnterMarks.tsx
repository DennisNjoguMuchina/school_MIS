import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Save, CheckCircle2, ArrowLeft, AlertCircle, Upload, 
  Plus, Users, Award, TrendingUp, Sparkles, Filter 
} from 'lucide-react';
import { STUDENTS, ENROLMENTS } from '../../../mock/students';
import { ASSESSMENTS, MARKS_ASSESS_001 } from '../../../mock/performance';

export default function EnterMarks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Query params or default
  const paramTitle = searchParams.get('title');
  const paramMaxMarks = searchParams.get('maxMarks');
  const paramSubject = searchParams.get('subject') || 'Mathematics';

  // Selected assessment state
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>(
    searchParams.get('assessmentId') || 'assess-001'
  );

  const [assessmentTitle, setAssessmentTitle] = useState<string>(
    paramTitle || 'Fractions Assessment'
  );

  const [maxScore, setMaxScore] = useState<number>(
    paramMaxMarks ? parseInt(paramMaxMarks) : 20
  );

  // Grade 6 East students roster
  const classEnrolments = ENROLMENTS.filter(e => e.streamId === 'stream-6e' && e.status === 'active');
  const classStudents = useMemo(() => {
    return STUDENTS.filter(s => classEnrolments.some(e => e.studentId === s.id));
  }, [classEnrolments]);

  // Initial marks
  const [marks, setMarks] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    // Seed with existing mock or sensible defaults
    MARKS_ASSESS_001.forEach(m => {
      map[m.studentId] = m.marksObtained;
    });
    classStudents.forEach(s => {
      if (map[s.id] === undefined) {
        map[s.id] = Math.round(maxScore * 0.65); // default ~65%
      }
    });
    return map;
  });

  const [saved, setSaved] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleScoreChange = (studentId: string, val: string) => {
    const num = parseFloat(val);
    setMarks(prev => ({
      ...prev,
      [studentId]: isNaN(num) ? 0 : Math.min(maxScore, Math.max(0, num))
    }));
    setSaved(false);
  };

  const handleAssessmentSelect = (id: string) => {
    setSelectedAssessmentId(id);
    const found = ASSESSMENTS.find(a => a.id === id);
    if (found) {
      setAssessmentTitle(found.title);
      setMaxScore(found.totalMarks);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  // Real-time calculation statistics
  const studentScores = classStudents.map(s => marks[s.id] ?? 0);
  const validScores = studentScores.filter(s => s > 0);
  const averageScore = validScores.length > 0 
    ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1) 
    : '0';
  const averagePercentage = maxScore > 0 ? ((parseFloat(averageScore) / maxScore) * 100).toFixed(1) : '0';
  const passingCount = studentScores.filter(score => (score / maxScore) >= 0.5).length;
  const passRate = classStudents.length > 0 ? Math.round((passingCount / classStudents.length) * 100) : 0;

  const filteredStudents = classStudents.filter(s => {
    const name = `${s.firstName} ${s.lastName}`.toLowerCase();
    const adm = (s.studentNumber || s.admissionNumber || '').toLowerCase();
    return name.includes(searchTerm.toLowerCase()) || adm.includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={() => navigate('/teacher/assessments')} className="btn btn-sm btn-secondary">
            <ArrowLeft size={16} />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {assessmentTitle} — Score Sheet
              </h1>
              <span className="badge badge-primary">Active CAT / Test</span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Grade 6 East · Subject: <strong>{paramSubject}</strong> · Maximum Marks: <strong>{maxScore}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => navigate('/teacher/upload')}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Upload size={16} /> Paper OCR Scan
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Save size={16} /> {saved ? 'Marks Saved!' : 'Save & Commit Scores'}
          </button>
        </div>
      </div>

      {/* Assessment Switcher & Summary Bar */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Switch Assessment:
          </span>
          <select
            value={selectedAssessmentId}
            onChange={(e) => handleAssessmentSelect(e.target.value)}
            className="input"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem', minWidth: 260 }}
          >
            {ASSESSMENTS.map(a => (
              <option key={a.id} value={a.id}>
                {a.title} ({a.totalMarks} marks) · {a.date}
              </option>
            ))}
          </select>
          <button
            onClick={() => navigate('/teacher/assessments')}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <Plus size={14} /> New CAT
          </button>
        </div>

        {/* Live Metrics */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Class Mean</span>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--color-primary)' }}>
              {averageScore} / {maxScore} ({averagePercentage}%)
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Passing Learners (&ge;50%)</span>
            <div style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--color-success)' }}>
              {passingCount} / {classStudents.length} ({passRate}%)
            </div>
          </div>
        </div>
      </div>

      {saved && (
        <div style={{
          background: '#F0FDF4', border: '1px solid #86EFAC', color: '#166534',
          borderRadius: 'var(--radius-md)', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <CheckCircle2 size={18} />
          <span>Marks successfully committed and logged to audit trail. Academic performance recalculated.</span>
        </div>
      )}

      {/* Roster Mark Entry Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
              Learner Marks Roster ({filteredStudents.length} Students)
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Enter or modify scores out of {maxScore}. Percentages and standards update dynamically.
            </div>
          </div>

          <div style={{ width: 240 }}>
            <input
              type="text"
              className="input"
              placeholder="Search learner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem' }}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 140 }}>Admission #</th>
                <th>Learner Name</th>
                <th style={{ width: 180 }}>Score (out of {maxScore})</th>
                <th style={{ width: 140 }}>Calculated %</th>
                <th>Performance Standard</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const score = marks[student.id] ?? 0;
                const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
                const isExceeding = percentage >= 80;
                const isPassing = percentage >= 50;

                return (
                  <tr key={student.id}>
                    <td>
                      <code>{student.studentNumber || student.admissionNumber}</code>
                    </td>
                    <td>
                      <strong>{student.firstName} {student.lastName}</strong>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="number"
                          min="0"
                          max={maxScore}
                          value={score}
                          onChange={(e) => handleScoreChange(student.id, e.target.value)}
                          style={{
                            width: 75,
                            padding: '0.375rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            fontWeight: 700,
                            fontSize: '0.9375rem',
                            textAlign: 'center',
                            background: !isPassing ? '#FEF2F2' : '#FFFFFF'
                          }}
                        />
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                          / {maxScore}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 800, color: isExceeding ? 'var(--color-success)' : isPassing ? 'var(--color-text-primary)' : 'var(--color-danger)' }}>
                        {percentage}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${isExceeding ? 'badge-success' : isPassing ? 'badge-info' : 'badge-danger'}`}>
                        {isExceeding ? 'Exceeding' : isPassing ? 'Meeting Expectation' : 'Needs Remediation'}
                      </span>
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
