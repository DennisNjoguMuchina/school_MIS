import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Upload, ClipboardList, CheckCircle2, Calendar, 
  FileText, ArrowRight, X, Sparkles, Filter 
} from 'lucide-react';
import { ASSESSMENTS } from '../../../mock/performance';
import type { Assessment } from '../../../types/performance';

export default function AssessmentsPage() {
  const navigate = useNavigate();
  const [assessmentsList, setAssessmentsList] = useState<Assessment[]>(ASSESSMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New assessment form state
  const [newTitle, setNewTitle] = useState('Continuous Assessment Test 1 (CAT 1)');
  const [newType, setNewType] = useState<'cat' | 'formative' | 'summative' | 'quiz'>('cat');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newStream, setNewStream] = useState('Grade 6 East');
  const [newTopic, setNewTopic] = useState('Fractions & Decimals');
  const [newDate, setNewDate] = useState('2026-10-06');
  const [newTotalMarks, setNewTotalMarks] = useState(30);
  const [newDescription, setNewDescription] = useState('Mid-term Continuous Assessment Test covering fractions, decimals, and problem solving.');

  const handleCreateAssessment = (enterMarksImmediately: boolean) => {
    const createdId = `assess-cat-${Date.now()}`;
    const newRecord: Assessment = {
      id: createdId,
      title: newTitle,
      type: newType as any,
      teacherId: 'teacher-1',
      subjectId: newSubject === 'Mathematics' ? 'subj-math' : newSubject === 'Science' ? 'subj-sci' : 'subj-eng',
      gradeId: 'grade-6',
      streamId: newStream.includes('East') ? 'stream-6e' : 'stream-6w',
      academicYearId: 'ay-2026',
      termId: 'term-2026-3',
      date: newDate,
      totalMarks: Number(newTotalMarks),
      status: 'active',
      description: newDescription,
    };

    setAssessmentsList(prev => [newRecord, ...prev]);
    setIsModalOpen(false);

    if (enterMarksImmediately) {
      navigate(`/teacher/enter-marks?assessmentId=${createdId}&title=${encodeURIComponent(newTitle)}&maxMarks=${newTotalMarks}&subject=${encodeURIComponent(newSubject)}`);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Classroom Assessments & CATs
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Schedule and record marks for Continuous Assessment Tests (CATs), formative quizzes, and end-term exams.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/teacher/upload')}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Upload size={16} /> Upload Marksheet (OCR)
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Plus size={16} /> Create Assessment / CAT
          </button>
        </div>
      </div>

      {/* Assessment Table */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Assessment Type</th>
                <th>Subject & Topic</th>
                <th>Target Class</th>
                <th>Date Conducted</th>
                <th>Max Marks</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessmentsList.map(item => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.title}</strong>
                    {item.description && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{item.description}</div>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${item.type === 'cat' ? 'badge-primary' : item.type === 'summative' ? 'badge-warning' : 'badge-info'}`} style={{ textTransform: 'uppercase' }}>
                      {item.type}
                    </span>
                  </td>
                  <td>
                    <div>Mathematics</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Fractions & Decimals</div>
                  </td>
                  <td>Grade 6 East</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{item.date}</td>
                  <td><strong>{item.totalMarks} marks</strong></td>
                  <td>
                    <span className={`badge ${item.status === 'verified' ? 'badge-success' : 'badge-warning'}`}>
                      {item.status === 'verified' ? 'Verified' : 'Pending Entry'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.375rem' }}>
                      <button
                        onClick={() => navigate(`/teacher/enter-marks?assessmentId=${item.id}&title=${encodeURIComponent(item.title)}&maxMarks=${item.totalMarks}`)}
                        className="btn btn-sm btn-primary"
                      >
                        Enter Marks &rarr;
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create New Assessment (e.g. CAT 1) */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: 580,
            background: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)'
              }}
            >
              <X size={20} />
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="badge badge-primary">New Assessment Form</span>
              </div>
              <h2 style={{ margin: 0, fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                Create Assessment (CAT / Quiz)
              </h2>
              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                Set up a new assessment record, then immediately enter the scores for your students.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                  Assessment Title
                </label>
                <input
                  type="text"
                  className="input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Continuous Assessment Test 1 (CAT 1)"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Assessment Type
                  </label>
                  <select
                    className="input"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                  >
                    <option value="cat">CAT (Continuous Assessment Test)</option>
                    <option value="formative">Formative Quiz</option>
                    <option value="summative">Summative Examination</option>
                    <option value="assignment">Assignment / Project</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Subject
                  </label>
                  <select
                    className="input"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Kiswahili">Kiswahili</option>
                    <option value="Science & Technology">Science & Technology</option>
                    <option value="Social Studies">Social Studies</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Target Class / Stream
                  </label>
                  <select
                    className="input"
                    value={newStream}
                    onChange={(e) => setNewStream(e.target.value)}
                  >
                    <option value="Grade 6 East">Grade 6 East (38 Learners)</option>
                    <option value="Grade 6 West">Grade 6 West (36 Learners)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Maximum Total Marks
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    className="input"
                    value={newTotalMarks}
                    onChange={(e) => setNewTotalMarks(Number(e.target.value))}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Topic / Sub-Strand
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="e.g. Fractions, Geometry, Decimals"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                    Date Conducted
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                  Description / Teacher Remarks
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Optional notes or objectives..."
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCreateAssessment(false)}
                className="btn btn-secondary"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handleCreateAssessment(true)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                Create & Record Marks Now &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
