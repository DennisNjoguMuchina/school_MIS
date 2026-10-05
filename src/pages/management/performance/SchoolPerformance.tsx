import { useState } from 'react';
import { 
  BarChart2, ChevronRight, Layers, BookOpen, Target, 
  TrendingUp, TrendingDown, Users, Sparkles, Filter, 
  ArrowLeft, Brain, Download
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, LineChart, Line, Cell 
} from 'recharts';
import { SCHOOL_PERFORMANCE, GRADE6_MATH_TREND, SCHOOL_TERM_TREND } from '../../../mock/performance';
import { GRADES, SUBJECTS, STRANDS, SUB_STRANDS } from '../../../mock/academic';
import { MetricCard, TrendChip, PerformanceBar, SectionHeader } from '../../../components/common/index';

type DrillLevel = 'school' | 'grade' | 'subject' | 'topic';

export default function SchoolPerformance() {
  const [level, setLevel] = useState<DrillLevel>('school');
  const [selectedGradeId, setSelectedGradeId] = useState<string>('grade-6');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('subj-math');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('ss-fractions');

  const selectedGrade = GRADES.find(g => g.id === selectedGradeId);
  const selectedSubject = SUBJECTS.find(s => s.id === selectedSubjectId);
  const selectedTopic = SUB_STRANDS.find(s => s.id === selectedTopicId);

  // Grade data from mock
  const gradeData = SCHOOL_PERFORMANCE.grades.find(g => g.gradeId === selectedGradeId);
  const subjectData = gradeData?.subjects.find(s => s.subjectId === selectedSubjectId);

  // Chart data for school overview
  const schoolGradesChart = SCHOOL_PERFORMANCE.grades.map(g => ({
    name: g.gradeName,
    current: g.averagePercentage,
    previous: g.previousTermPercentage,
    students: g.studentCount,
  }));

  // Chart data for subjects within selected grade
  const gradeSubjectsChart = (gradeData?.subjects || []).map(s => ({
    name: s.subjectName,
    current: s.averagePercentage,
    previous: s.previousTermPercentage,
    students: s.studentCount,
  }));

  // Topic mastery in Mathematics Grade 6
  const topicMasteryData = [
    { name: 'Fractions', score: 43, benchmark: 60, status: 'critical' },
    { name: 'Decimals', score: 48, benchmark: 60, status: 'warning' },
    { name: 'Percentages', score: 51, benchmark: 60, status: 'moderate' },
    { name: 'Whole Numbers', score: 74, benchmark: 60, status: 'good' },
    { name: 'Angles', score: 68, benchmark: 60, status: 'good' },
    { name: 'Area & Perimeter', score: 58, benchmark: 60, status: 'moderate' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        background: 'var(--color-bg-card)',
        padding: '0.75rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <button
          onClick={() => setLevel('school')}
          style={{
            background: 'none',
            border: 'none',
            fontWeight: level === 'school' ? 700 : 500,
            color: level === 'school' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Greenfield Academy
        </button>

        {(level === 'grade' || level === 'subject' || level === 'topic') && (
          <>
            <ChevronRight size={14} color="var(--color-text-muted)" />
            <button
              onClick={() => setLevel('grade')}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: level === 'grade' ? 700 : 500,
                color: level === 'grade' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {selectedGrade?.name || 'Grade 6'}
            </button>
          </>
        )}

        {(level === 'subject' || level === 'topic') && (
          <>
            <ChevronRight size={14} color="var(--color-text-muted)" />
            <button
              onClick={() => setLevel('subject')}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: level === 'subject' ? 700 : 500,
                color: level === 'subject' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {selectedSubject?.name || 'Mathematics'}
            </button>
          </>
        )}

        {level === 'topic' && (
          <>
            <ChevronRight size={14} color="var(--color-text-muted)" />
            <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
              {selectedTopic?.name || 'Fractions'}
            </span>
          </>
        )}
      </div>

      {/* HEADER SECTION */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {level === 'school' && 'Whole School Academic Performance'}
              {level === 'grade' && `${selectedGrade?.name} Academic Performance`}
              {level === 'subject' && `${selectedGrade?.name} — ${selectedSubject?.name} Breakdown`}
              {level === 'topic' && `${selectedSubject?.name} Topic Diagnostic: ${selectedTopic?.name}`}
            </h1>
            <span className="badge badge-info">Term 3 · 2026</span>
          </div>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            {level === 'school' && 'Cross-grade mastery averages, longitudinal trends, and critical intervention indicators.'}
            {level === 'grade' && 'Subject performance matrix and learning gap diagnostic across streams.'}
            {level === 'subject' && 'Strand mastery, learning gaps, and teacher assignment analysis.'}
            {level === 'topic' && 'Sub-strand question item analysis, error types, and targeted remediation groups.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {level !== 'school' && (
            <button
              onClick={() => {
                if (level === 'topic') setLevel('subject');
                else if (level === 'subject') setLevel('grade');
                else setLevel('school');
              }}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
            >
              <ArrowLeft size={16} /> Up One Level
            </button>
          )}
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Download size={16} /> Export Analysis
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. WHOLE SCHOOL VIEW */}
      {/* ========================================================= */}
      {level === 'school' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <MetricCard
              label="School Aggregate Average"
              value={`${SCHOOL_PERFORMANCE.overallPercentage}%`}
              change={SCHOOL_PERFORMANCE.overallPercentage - SCHOOL_PERFORMANCE.previousTermPercentage}
              changeLabel="vs Term 2"
              icon={<TrendingUp size={22} />}
              iconBg="#EFF6FF"
              iconColor="#2563EB"
              context="Target: 70.0% by end of year"
            />
            <MetricCard
              label="Total Enrolled Learners"
              value={SCHOOL_PERFORMANCE.totalStudents}
              icon={<Users size={22} />}
              iconBg="#F0FDF4"
              iconColor="#16A34A"
              context="Active across Grades 1 to 9"
            />
            <MetricCard
              label="Requiring Support"
              value={SCHOOL_PERFORMANCE.studentsRequiringSupport}
              icon={<Target size={22} />}
              iconBg="#FEF2F2"
              iconColor="#DC2626"
              context="9.0% of cohort below mastery threshold"
            />
            <MetricCard
              label="Active Interventions"
              value="24"
              icon={<Sparkles size={22} />}
              iconBg="#FAF5FF"
              iconColor="#9333EA"
              context="18 small group · 6 one-on-one"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>
            {/* Grade comparison chart */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Mean Score by Grade Level</h3>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Click bar to inspect</span>
              </div>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={schoolGradesChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748B' }} />
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, 'Score']}
                      contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0' }}
                    />
                    <Bar
                      dataKey="current"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                      onClick={(entry) => {
                        const targetGrade = GRADES.find(g => g.name === entry.name);
                        if (targetGrade) {
                          setSelectedGradeId(targetGrade.id);
                          setLevel('grade');
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {schoolGradesChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.current < 65 ? '#F59E0B' : '#3B82F6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.75rem', fontSize: '0.8125rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: '#3B82F6' }} /> On Track (&ge; 65%)
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: '#F59E0B' }} /> Attention Required (&lt; 65%)
                </span>
              </div>
            </div>

            {/* School Trend Line */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 700 }}>Longitudinal Aggregate Trend</h3>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SCHOOL_TERM_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis domain={[50, 80]} tick={{ fontSize: 11, fill: '#64748B' }} />
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, 'Mean Score']}
                      contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                Consistent upward trajectory from 62.0% (T1 2025) to 68.4% (T3 2026).
              </p>
            </div>
          </div>

          {/* Table of Grade performance */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Grade Performance Breakdown</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Grade Level</th>
                    <th>Average Score</th>
                    <th>Previous Term</th>
                    <th>Trajectory</th>
                    <th>Learners</th>
                    <th>Below Standard</th>
                    <th style={{ textAlign: 'right' }}>Drill Down</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHOOL_PERFORMANCE.grades.map(grade => (
                    <tr key={grade.gradeId}>
                      <td style={{ fontWeight: 600 }}>{grade.gradeName}</td>
                      <td>
                        <PerformanceBar value={grade.averagePercentage} />
                      </td>
                      <td style={{ color: 'var(--color-text-secondary)' }}>{grade.previousTermPercentage}%</td>
                      <td>
                        <TrendChip trend={grade.trend} />
                      </td>
                      <td>{grade.studentCount}</td>
                      <td>
                        <span style={{ color: grade.studentsRequiringSupport > 15 ? 'var(--color-danger)' : 'var(--color-text-primary)', fontWeight: 600 }}>
                          {grade.studentsRequiringSupport} ({((grade.studentsRequiringSupport / grade.studentCount) * 100).toFixed(0)}%)
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setSelectedGradeId(grade.gradeId);
                            setLevel('grade');
                          }}
                          className="btn btn-sm btn-secondary"
                        >
                          Explore Subjects <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ========================================================= */}
      {/* 2. GRADE LEVEL DRILLDOWN */}
      {/* ========================================================= */}
      {level === 'grade' && gradeData && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <MetricCard
              label={`${gradeData.gradeName} Average`}
              value={`${gradeData.averagePercentage}%`}
              change={gradeData.averagePercentage - (gradeData.previousTermPercentage ?? gradeData.averagePercentage)}
              changeLabel="vs Term 2"
              icon={<Layers size={22} />}
              iconBg="#EFF6FF"
              iconColor="#2563EB"
              context="School target: 65.0%"
            />
            <MetricCard
              label="Enrolled Students"
              value={gradeData.studentCount}
              icon={<Users size={22} />}
              iconBg="#F0FDF4"
              iconColor="#16A34A"
              context="Stream East: 38 · Stream West: 36"
            />
            <MetricCard
              label="Learning Gaps Detected"
              value={gradeData.studentsRequiringSupport}
              icon={<Target size={22} />}
              iconBg="#FEF2F2"
              iconColor="#DC2626"
              context="Mathematics contains 72% of gap cases"
            />
            <MetricCard
              label="Active Interventions"
              value="8"
              icon={<Sparkles size={22} />}
              iconBg="#FAF5FF"
              iconColor="#9333EA"
              context="Covering 14 targeted students"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 700 }}>
                {gradeData.gradeName} Subject Performance Comparison
              </h3>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeSubjectsChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748B' }} />
                    <Tooltip formatter={(val: any) => [`${val}%`, 'Mean Score']} />
                    <Bar
                      dataKey="current"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                      onClick={(entry) => {
                        const targetSub = SUBJECTS.find(s => s.name === entry.name);
                        if (targetSub) {
                          setSelectedSubjectId(targetSub.id);
                          setLevel('subject');
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {gradeSubjectsChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.current < 55 ? '#EF4444' : entry.current < 65 ? '#F59E0B' : '#3B82F6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Stream Comparison</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <strong>Grade 6 East</strong>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>62.4%</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    38 Learners · Class Teacher: Jane Wanjiku
                  </div>
                  <PerformanceBar value={62.4} />
                </div>

                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <strong>Grade 6 West</strong>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>60.0%</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    36 Learners · Class Teacher: Daniel Otieno
                  </div>
                  <PerformanceBar value={60.0} />
                </div>

                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: '#FEF3C7', color: '#92400E', fontSize: '0.8125rem', marginTop: '0.5rem' }}>
                  <strong>Variance Insight:</strong> West stream lags East by 2.4 pp overall, largely driven by Mathematics (-4.2 pp).
                </div>
              </div>
            </div>
          </div>

          {/* Subjects Table */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Subject Matrix</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Average Score</th>
                    <th>Previous Term</th>
                    <th>Trend</th>
                    <th>Assessments Recorded</th>
                    <th style={{ textAlign: 'right' }}>Diagnostic</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeData.subjects.map(subject => (
                    <tr key={subject.subjectId}>
                      <td style={{ fontWeight: 600 }}>{subject.subjectName}</td>
                      <td>
                        <PerformanceBar value={subject.averagePercentage} />
                      </td>
                      <td style={{ color: 'var(--color-text-secondary)' }}>{subject.previousTermPercentage}%</td>
                      <td>
                        <TrendChip trend={subject.trend} />
                      </td>
                      <td>{subject.assessmentCount} recorded</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setSelectedSubjectId(subject.subjectId);
                            setLevel('subject');
                          }}
                          className="btn btn-sm btn-secondary"
                        >
                          View Strands <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ========================================================= */}
      {/* 3. SUBJECT STRAND DRILLDOWN */}
      {/* ========================================================= */}
      {level === 'subject' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <MetricCard
              label={`${selectedSubject?.name} Mean`}
              value={`${subjectData?.averagePercentage || 52.0}%`}
              change={3.0}
              changeLabel="vs Term 2"
              icon={<BookOpen size={22} />}
              iconBg="#EFF6FF"
              iconColor="#2563EB"
              context="Critical focus area"
            />
            <MetricCard
              label="Assessed Topics"
              value="6 Topics"
              icon={<Target size={22} />}
              iconBg="#F0FDF4"
              iconColor="#16A34A"
              context="Number, Algebra, Geometry"
            />
            <MetricCard
              label="Lowest Topic"
              value="Fractions (43%)"
              icon={<Target size={22} />}
              iconBg="#FEF2F2"
              iconColor="#DC2626"
              context="31 students requiring remediation"
            />
            <MetricCard
              label="Highest Topic"
              value="Whole Numbers (74%)"
              icon={<TrendingUp size={22} />}
              iconBg="#FAF5FF"
              iconColor="#9333EA"
              context="Standard achieved"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
            {/* Topic Mastery Bar Chart */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 700 }}>
                {selectedSubject?.name} Sub-Strand Diagnostic Mastery
              </h3>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topicMasteryData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#334155' }} />
                    <Tooltip formatter={(val: any) => [`${val}%`, 'Score']} />
                    <Bar
                      dataKey="score"
                      radius={[0, 4, 4, 0]}
                      onClick={(entry) => {
                        const targetTopic = SUB_STRANDS.find(s => s.name === entry.name);
                        if (targetTopic) {
                          setSelectedTopicId(targetTopic.id);
                          setLevel('topic');
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {topicMasteryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.score < 50 ? '#EF4444' : entry.score < 60 ? '#F59E0B' : '#10B981'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject Trend Line */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 700 }}>
                Grade 6 Mathematics Multi-Term Trend
              </h3>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={GRADE6_MATH_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis domain={[35, 60]} tick={{ fontSize: 11, fill: '#64748B' }} />
                    <Tooltip formatter={(val: any) => [`${val}%`, 'Mean Score']} />
                    <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Strand list table */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Sub-Strand Analysis</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sub-Strand / Topic</th>
                    <th>Average Score</th>
                    <th>Benchmark (60%)</th>
                    <th>Status</th>
                    <th>Students in Need</th>
                    <th style={{ textAlign: 'right' }}>Topic Action</th>
                  </tr>
                </thead>
                <tbody>
                  {topicMasteryData.map(topic => (
                    <tr key={topic.name}>
                      <td style={{ fontWeight: 600 }}>{topic.name}</td>
                      <td>
                        <PerformanceBar value={topic.score} />
                      </td>
                      <td style={{ color: 'var(--color-text-secondary)' }}>60.0%</td>
                      <td>
                        <span className={`badge ${topic.status === 'critical' ? 'badge-danger' : topic.status === 'warning' ? 'badge-warning' : 'badge-success'}`}>
                          {topic.status === 'critical' ? 'Critical Deficit' : topic.status === 'warning' ? 'Below Target' : 'Adequate'}
                        </span>
                      </td>
                      <td>
                        {topic.score < 50 ? '31 students' : topic.score < 60 ? '20 students' : '6 students'}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            const found = SUB_STRANDS.find(s => s.name === topic.name);
                            if (found) setSelectedTopicId(found.id);
                            setLevel('topic');
                          }}
                          className="btn btn-sm btn-secondary"
                        >
                          Deep Diagnostic <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ========================================================= */}
      {/* 4. TOPIC DEEP DIAGNOSTIC VIEW */}
      {/* ========================================================= */}
      {level === 'topic' && (
        <>
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991B1B', fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>
                <Target size={18} /> Priority Learning Gap Detected: Fractions
              </div>
              <div style={{ color: '#7F1D1D', fontSize: '0.875rem' }}>
                Mean cohort mastery is 43.0%. 31 out of 74 Grade 6 learners are performing below the minimum competency score.
              </div>
            </div>
            <button
              onClick={() => alert('Launching intervention wizard...')}
              className="btn btn-primary"
              style={{ background: '#DC2626', borderColor: '#DC2626' }}
            >
              Configure Batch Remediation
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>Key Misconceptions & Error Types</h3>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Adding Denominators:</strong> 58% of struggling students directly added denominators (e.g., 1/3 + 1/4 = 2/7).
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Unlike Denominators:</strong> Inability to find least common multiple (LCM) before operations.
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Simplification Confusion:</strong> Leaving answers unreduced or dividing numerator and denominator by different numbers.
                </li>
              </ul>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>AI Remediation Strategy</h3>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ margin: 0 }}>
                  Evidence indicates physical fraction bars and area model diagrams yield the fastest recovery in this age group.
                </p>
                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)', borderLeft: '3px solid var(--color-primary)' }}>
                  <strong>Recommended:</strong> 4-session small group cycle focusing on visual equivalence before algorithmic reduction.
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
