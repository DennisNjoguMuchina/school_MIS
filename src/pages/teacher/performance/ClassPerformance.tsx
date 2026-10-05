import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart2, TrendingUp, Users, Target, BookOpen, 
  ArrowLeft, Download, Sparkles, Filter, ChevronRight,
  AlertTriangle, Award, CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Cell } from 'recharts';
import { MetricCard, PerformanceBar, TrendChip } from '../../../components/common/index';

interface SubjectAnalytics {
  id: string;
  name: string;
  code: string;
  mean: number;
  previousTermMean: number;
  trend: 'improving' | 'declining' | 'stable';
  change: number;
  assessmentCount: number;
  atRiskCount: number;
  topPerformingStrand: string;
  lowestStrand: string;
  color: string;
  distribution: { range: string; count: number; label: string }[];
  termTrend: { label: string; value: number }[];
  strands: { name: string; score: number; benchmark: number; status: 'critical' | 'warning' | 'good' }[];
  strugglingLearners: { id: string; name: string; score: number; keyGap: string }[];
}

const SUBJECT_ANALYTICS: Record<string, SubjectAnalytics> = {
  'subj-math': {
    id: 'subj-math',
    name: 'Mathematics',
    code: 'MATH',
    mean: 52.0,
    previousTermMean: 49.0,
    trend: 'improving',
    change: 3.0,
    assessmentCount: 6,
    atRiskCount: 8,
    topPerformingStrand: 'Whole Numbers (74%)',
    lowestStrand: 'Equivalent Fractions (43%)',
    color: '#0D9488',
    distribution: [
      { range: '80-100%', count: 6, label: 'Exceeding' },
      { range: '65-79%', count: 14, label: 'Meeting' },
      { range: '50-64%', count: 10, label: 'Approaching' },
      { range: 'Below 50%', count: 8, label: 'Below Standard' },
    ],
    termTrend: [
      { label: 'T1 2025', value: 44.0 },
      { label: 'T2 2025', value: 42.5 },
      { label: 'T3 2025', value: 47.0 },
      { label: 'T1 2026', value: 49.0 },
      { label: 'T2 2026', value: 50.5 },
      { label: 'T3 2026', value: 52.0 },
    ],
    strands: [
      { name: 'Whole Numbers', score: 74, benchmark: 60, status: 'good' },
      { name: 'Angles & Shapes', score: 68, benchmark: 60, status: 'good' },
      { name: 'Area & Perimeter', score: 58, benchmark: 60, status: 'warning' },
      { name: 'Percentages', score: 51, benchmark: 60, status: 'warning' },
      { name: 'Decimals', score: 48, benchmark: 60, status: 'warning' },
      { name: 'Fractions', score: 43, benchmark: 60, status: 'critical' },
    ],
    strugglingLearners: [
      { id: 'stu-003', name: 'Peter Otieno', score: 35, keyGap: 'Fractions (Unlike Denominators)' },
      { id: 'stu-009', name: 'James Odhiambo', score: 40, keyGap: 'Fractions & Percentages' },
      { id: 'stu-001', name: 'Brian Mwangi', score: 52, keyGap: 'Decimals Transition (Recovered +26 pp)' },
      { id: 'stu-004', name: 'Mary Akinyi', score: 45, keyGap: 'Algebra Word Problems' },
    ],
  },
  'subj-eng': {
    id: 'subj-eng',
    name: 'English',
    code: 'ENG',
    mean: 69.5,
    previousTermMean: 67.0,
    trend: 'improving',
    change: 2.5,
    assessmentCount: 5,
    atRiskCount: 3,
    topPerformingStrand: 'Reading Fluency (78%)',
    lowestStrand: 'Grammar: Complex Sentences (58%)',
    color: '#2563EB',
    distribution: [
      { range: '80-100%', count: 12, label: 'Exceeding' },
      { range: '65-79%', count: 17, label: 'Meeting' },
      { range: '50-64%', count: 6, label: 'Approaching' },
      { range: 'Below 50%', count: 3, label: 'Below Standard' },
    ],
    termTrend: [
      { label: 'T1 2025', value: 64.0 },
      { label: 'T2 2025', value: 65.5 },
      { label: 'T3 2025', value: 66.0 },
      { label: 'T1 2026', value: 66.5 },
      { label: 'T2 2026', value: 67.0 },
      { label: 'T3 2026', value: 69.5 },
    ],
    strands: [
      { name: 'Reading Fluency', score: 78, benchmark: 60, status: 'good' },
      { name: 'Listening & Speaking', score: 75, benchmark: 60, status: 'good' },
      { name: 'Vocabulary', score: 70, benchmark: 60, status: 'good' },
      { name: 'Creative Writing', score: 67, benchmark: 60, status: 'good' },
      { name: 'Grammar: Tenses', score: 58, benchmark: 60, status: 'warning' },
    ],
    strugglingLearners: [
      { id: 'stu-007', name: 'David Kiptoo', score: 46, keyGap: 'Creative Writing Composition' },
      { id: 'stu-005', name: 'Kevin Kamau', score: 48, keyGap: 'Irregular Past Tense Verbs' },
    ],
  },
  'subj-kis': {
    id: 'subj-kis',
    name: 'Kiswahili',
    code: 'KIS',
    mean: 72.0,
    previousTermMean: 71.0,
    trend: 'stable',
    change: 1.0,
    assessmentCount: 5,
    atRiskCount: 2,
    topPerformingStrand: 'Kusikiliza na Kuongea (82%)',
    lowestStrand: 'Insha ya Mawazo (62%)',
    color: '#7C3AED',
    distribution: [
      { range: '80-100%', count: 15, label: 'Exceeding' },
      { range: '65-79%', count: 16, label: 'Meeting' },
      { range: '50-64%', count: 5, label: 'Approaching' },
      { range: 'Below 50%', count: 2, label: 'Below Standard' },
    ],
    termTrend: [
      { label: 'T1 2025', value: 68.0 },
      { label: 'T2 2025', value: 69.0 },
      { label: 'T3 2025', value: 70.0 },
      { label: 'T1 2026', value: 70.5 },
      { label: 'T2 2026', value: 71.0 },
      { label: 'T3 2026', value: 72.0 },
    ],
    strands: [
      { name: 'Kusikiliza na Kuongea', score: 82, benchmark: 60, status: 'good' },
      { name: 'Kusoma kwa Ufahamu', score: 76, benchmark: 60, status: 'good' },
      { name: 'Sarufi (Ngeli)', score: 68, benchmark: 60, status: 'good' },
      { name: 'Insha ya Kubuni', score: 62, benchmark: 60, status: 'good' },
    ],
    strugglingLearners: [
      { id: 'stu-011', name: 'Henry Njoroge', score: 47, keyGap: 'Upatanisho wa Ngeli' },
    ],
  },
  'subj-sci': {
    id: 'subj-sci',
    name: 'Science & Technology',
    code: 'SCI',
    mean: 61.0,
    previousTermMean: 58.0,
    trend: 'improving',
    change: 3.0,
    assessmentCount: 4,
    atRiskCount: 5,
    topPerformingStrand: 'Human Body Systems (71%)',
    lowestStrand: 'Matter & Electrical Circuits (48%)',
    color: '#059669',
    distribution: [
      { range: '80-100%', count: 8, label: 'Exceeding' },
      { range: '65-79%', count: 13, label: 'Meeting' },
      { range: '50-64%', count: 12, label: 'Approaching' },
      { range: 'Below 50%', count: 5, label: 'Below Standard' },
    ],
    termTrend: [
      { label: 'T1 2025', value: 55.0 },
      { label: 'T2 2025', value: 56.0 },
      { label: 'T3 2025', value: 57.5 },
      { label: 'T1 2026', value: 57.0 },
      { label: 'T2 2026', value: 58.0 },
      { label: 'T3 2026', value: 61.0 },
    ],
    strands: [
      { name: 'Human Body Systems', score: 71, benchmark: 60, status: 'good' },
      { name: 'Living Things & Plants', score: 66, benchmark: 60, status: 'good' },
      { name: 'Environment & Soil', score: 59, benchmark: 60, status: 'warning' },
      { name: 'Circuits & Simple Machines', score: 48, benchmark: 60, status: 'critical' },
    ],
    strugglingLearners: [
      { id: 'stu-003', name: 'Peter Otieno', score: 42, keyGap: 'Electrical Circuits Symbols' },
      { id: 'stu-008', name: 'Amina Hassan', score: 47, keyGap: 'Plant Photosynthesis Steps' },
    ],
  },
  'subj-sst': {
    id: 'subj-sst',
    name: 'Social Studies',
    code: 'SST',
    mean: 64.0,
    previousTermMean: 63.0,
    trend: 'stable',
    change: 1.0,
    assessmentCount: 4,
    atRiskCount: 4,
    topPerformingStrand: 'Citizenship & Governance (75%)',
    lowestStrand: 'Map Reading & Grid References (52%)',
    color: '#D97706',
    distribution: [
      { range: '80-100%', count: 9, label: 'Exceeding' },
      { range: '65-79%', count: 15, label: 'Meeting' },
      { range: '50-64%', count: 10, label: 'Approaching' },
      { range: 'Below 50%', count: 4, label: 'Below Standard' },
    ],
    termTrend: [
      { label: 'T1 2025', value: 59.0 },
      { label: 'T2 2025', value: 60.5 },
      { label: 'T3 2025', value: 62.0 },
      { label: 'T1 2026', value: 62.5 },
      { label: 'T2 2026', value: 63.0 },
      { label: 'T3 2026', value: 64.0 },
    ],
    strands: [
      { name: 'Citizenship & National Values', score: 75, benchmark: 60, status: 'good' },
      { name: 'Resources & Economic Activities', score: 67, benchmark: 60, status: 'good' },
      { name: 'Historical Heritage', score: 62, benchmark: 60, status: 'good' },
      { name: 'Map Reading & Coordinates', score: 52, benchmark: 60, status: 'warning' },
    ],
    strugglingLearners: [
      { id: 'stu-005', name: 'Kevin Kamau', score: 45, keyGap: 'Scale & Elevation Contours' },
    ],
  },
};

export default function ClassPerformance() {
  const navigate = useNavigate();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('subj-math');
  const [selectedStream, setSelectedStream] = useState<'stream-6e' | 'stream-6w'>('stream-6e');

  const activeSubject = SUBJECT_ANALYTICS[selectedSubjectId] || SUBJECT_ANALYTICS['subj-math'];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              Class Performance Analytics
            </h1>
            <span className="badge badge-info">{selectedStream === 'stream-6e' ? 'Grade 6 East' : 'Grade 6 West'}</span>
          </div>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Select any subject below to inspect its grade distribution, longitudinal term trends, sub-strand mastery, and at-risk learners.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select 
            value={selectedStream} 
            onChange={(e) => setSelectedStream(e.target.value as any)}
            className="input"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}
          >
            <option value="stream-6e">Grade 6 East (38 Learners)</option>
            <option value="stream-6w">Grade 6 West (36 Learners)</option>
          </select>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Download size={16} /> Export Analysis
          </button>
        </div>
      </div>

      {/* Interactive Subject Navigation Tabs */}
      <div>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Select Subject to Analyze
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '0.875rem'
        }}>
          {Object.values(SUBJECT_ANALYTICS).map((sub) => {
            const isSelected = sub.id === selectedSubjectId;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                style={{
                  background: isSelected ? 'var(--color-bg-card)' : 'var(--color-bg-card)',
                  border: isSelected ? `2px solid ${sub.color}` : '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem 1.125rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 6px 16px -2px rgba(0,0,0,0.08)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  transition: 'all 150ms ease',
                  position: 'relative'
                }}
              >
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: sub.color
                  }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: sub.color, textTransform: 'uppercase' }}>
                    {sub.code}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {sub.assessmentCount} Tests
                  </span>
                </div>

                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)' }}>
                  {sub.name}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: sub.color }}>
                    {sub.mean}%
                  </span>
                  <TrendChip trend={sub.trend} compact />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Subject Banner & KPI Strip */}
      <div style={{
        background: `linear-gradient(135deg, ${activeSubject.color}15 0%, #FFFFFF 100%)`,
        border: `1px solid ${activeSubject.color}40`,
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            background: activeSubject.color,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpen size={22} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {activeSubject.name} Dashboard
            </h2>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Strongest Topic: <strong>{activeSubject.topPerformingStrand}</strong> · Lowest Mastery: <strong style={{ color: 'var(--color-danger)' }}>{activeSubject.lowestStrand}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => navigate('/teacher/enter-marks')}
            className="btn btn-secondary btn-sm"
          >
            Enter {activeSubject.code} Marks
          </button>
          <button
            onClick={() => navigate('/teacher/interventions')}
            className="btn btn-primary btn-sm"
            style={{ background: activeSubject.color, borderColor: activeSubject.color }}
          >
            Target Remediation ({activeSubject.atRiskCount})
          </button>
        </div>
      </div>

      {/* KPI Cards for Selected Subject */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <MetricCard
          label={`${activeSubject.name} Mean Score`}
          value={`${activeSubject.mean}%`}
          change={activeSubject.change}
          changeLabel="vs Term 2"
          icon={<TrendingUp size={22} />}
          iconBg={`${activeSubject.color}15`}
          iconColor={activeSubject.color}
          context={`Previous: ${activeSubject.previousTermMean}%`}
        />
        <MetricCard
          label="Assessments Recorded"
          value={`${activeSubject.assessmentCount} Assessments`}
          icon={<BarChart2 size={22} />}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
          context="Formative Quizzes & CATs"
        />
        <MetricCard
          label="Learners Below Standard (<50%)"
          value={activeSubject.atRiskCount}
          icon={<Target size={22} />}
          iconBg="#FEF2F2"
          iconColor="#DC2626"
          context="Assigned to teacher remedial cycle"
        />
        <MetricCard
          label="Class Pass Rate"
          value={`${Math.round(((38 - activeSubject.atRiskCount) / 38) * 100)}%`}
          icon={<Award size={22} />}
          iconBg="#F0FDF4"
          iconColor="#16A34A"
          context="38 enrolled learners"
        />
      </div>

      {/* Visualizations for Selected Subject */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        {/* Score Distribution */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
              {activeSubject.name} — Learner Mastery Distribution
            </h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>38 Learners Total</span>
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeSubject.distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip formatter={(val: any) => [`${val} Learners`]} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {activeSubject.distribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.range.includes('Below') ? '#EF4444' : entry.range.includes('50-64') ? '#F59E0B' : entry.range.includes('80-100') ? '#10B981' : activeSubject.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.75rem', fontSize: '0.8125rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#10B981' }} /> Exceeding (&ge;80%)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: activeSubject.color }} /> Meeting (65-79%)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#F59E0B' }} /> Approaching (50-64%)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#EF4444' }} /> Below Standard
            </span>
          </div>
        </div>

        {/* Multi-Term Trend for Selected Subject */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 700 }}>
            {activeSubject.name} — Term Progression Trend
          </h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeSubject.termTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'Mean Score']} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={activeSubject.color}
                  strokeWidth={3}
                  dot={{ r: 4, fill: activeSubject.color }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
            Progressed from <strong>{activeSubject.termTrend[0].value}%</strong> to <strong>{activeSubject.mean}%</strong> (+{(activeSubject.mean - activeSubject.termTrend[0].value).toFixed(1)} pp total)
          </div>
        </div>
      </div>

      {/* Sub-Strand Topic Diagnostics for Selected Subject */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
              {activeSubject.name} Sub-Strand Diagnostic Competency
            </h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Curriculum topic benchmarks and mastery levels for Term 3
            </div>
          </div>
          <span className="badge badge-info">Benchmark: 60.0%</span>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Sub-Strand / Topic</th>
                <th style={{ width: '35%' }}>Class Mastery Level</th>
                <th>Score</th>
                <th>Benchmark</th>
                <th>Diagnostic Status</th>
              </tr>
            </thead>
            <tbody>
              {activeSubject.strands.map(strand => (
                <tr key={strand.name}>
                  <td><strong>{strand.name}</strong></td>
                  <td>
                    <PerformanceBar value={strand.score} />
                  </td>
                  <td>
                    <strong>{strand.score}%</strong>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>
                    {strand.benchmark}%
                  </td>
                  <td>
                    <span className={`badge ${strand.status === 'critical' ? 'badge-danger' : strand.status === 'warning' ? 'badge-warning' : 'badge-success'}`}>
                      {strand.status === 'critical' ? 'Priority Deficit' : strand.status === 'warning' ? 'Approaching' : 'Standard Met'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Identified Struggling Learners for this Subject */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
              Learners Requiring Support in {activeSubject.name}
            </h3>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Identified from recent quiz and CAT diagnostic check-ins
            </div>
          </div>
          <button
            onClick={() => navigate('/teacher/interventions')}
            className="btn btn-secondary btn-sm"
          >
            Manage All Intervention Plans &rarr;
          </button>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Learner</th>
                <th>Subject Score</th>
                <th>Primary Misconception / Gap</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeSubject.strugglingLearners.map(learner => (
                <tr key={learner.id}>
                  <td>
                    <strong>{learner.name}</strong>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: learner.score < 50 ? 'var(--color-danger)' : 'var(--color-warning)' }}>
                      {learner.score}%
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-warning">{learner.keyGap}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate('/teacher/interventions')}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.75rem' }}
                    >
                      Open Remedial Plan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
