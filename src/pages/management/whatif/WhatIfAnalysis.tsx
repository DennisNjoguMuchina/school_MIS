import { useState } from 'react';
import { 
  FlaskConical, Sparkles, TrendingUp, AlertTriangle, 
  HelpCircle, RefreshCw, CheckCircle2, Sliders, ArrowRight 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MetricCard } from '../../../components/common/index';

export default function WhatIfAnalysis() {
  // Scenario sliders
  const [mathInterventionRate, setMathInterventionRate] = useState<number>(60); // % of struggling students receiving support
  const [attendanceUplift, setAttendanceUplift] = useState<number>(5); // % uplift in attendance
  const [teacherRetention, setTeacherRetention] = useState<number>(95); // % retention
  const [homeworkCompletion, setHomeworkCompletion] = useState<number>(80);

  // Baseline metrics
  const baselineSchoolAverage = 68.4;
  const baselineGrade6Math = 52.0;
  const baselineStudentsAtRisk = 76;

  // Simulated results based on the levers
  const simulatedMathGain = (mathInterventionRate * 0.15) + (attendanceUplift * 0.4) + ((homeworkCompletion - 70) * 0.1);
  const projectedGrade6Math = Math.min(95, parseFloat((baselineGrade6Math + simulatedMathGain).toFixed(1)));
  
  const simulatedSchoolGain = (simulatedMathGain * 0.25) + (attendanceUplift * 0.3);
  const projectedSchoolAverage = Math.min(98, parseFloat((baselineSchoolAverage + simulatedSchoolGain).toFixed(1)));
  
  const studentsSaved = Math.round((baselineStudentsAtRisk * (mathInterventionRate / 100) * 0.65) + (attendanceUplift * 1.5));
  const projectedStudentsAtRisk = Math.max(0, baselineStudentsAtRisk - studentsSaved);

  const chartData = [
    {
      metric: 'School Mean',
      Baseline: baselineSchoolAverage,
      Projected: projectedSchoolAverage,
    },
    {
      metric: 'Grade 6 Maths',
      Baseline: baselineGrade6Math,
      Projected: projectedGrade6Math,
    },
  ];

  const resetDefaults = () => {
    setMathInterventionRate(60);
    setAttendanceUplift(5);
    setTeacherRetention(95);
    setHomeworkCompletion(80);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              What-If Predictive Simulation
            </h1>
            <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <FlaskConical size={12} /> Strategic Sandbox
            </span>
          </div>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
            Adjust policy levers, intervention coverage, and attendance goals to project academic outcomes before implementation.
          </p>
        </div>

        <button onClick={resetDefaults} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <RefreshCw size={15} /> Reset Variables
        </button>
      </div>

      {/* Main Grid: Levers on Left, Realtime Projection on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }}>
        {/* Policy Levers Card */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
            <Sliders size={18} color="var(--color-primary)" />
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Simulation Policy Levers</h3>
          </div>

          {/* Lever 1: Intervention Coverage */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Struggling Learner Intervention Coverage</label>
              <strong style={{ color: 'var(--color-primary)' }}>{mathInterventionRate}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={mathInterventionRate}
              onChange={(e) => setMathInterventionRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary)' }}
            />
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              Percentage of students below 50% placed into 4-week small group remediation.
            </div>
          </div>

          {/* Lever 2: Attendance Uplift */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Attendance Rate Uplift</label>
              <strong style={{ color: 'var(--color-primary)' }}>+{attendanceUplift}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={attendanceUplift}
              onChange={(e) => setAttendanceUplift(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary)' }}
            />
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              Achieved via parent attendance alerts and automated follow-ups.
            </div>
          </div>

          {/* Lever 3: Homework & Practice Completion */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Homework & Guided Practice Completion</label>
              <strong style={{ color: 'var(--color-primary)' }}>{homeworkCompletion}%</strong>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={homeworkCompletion}
              onChange={(e) => setHomeworkCompletion(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary)' }}
            />
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              Structured weekly problem sheets with teacher feedback.
            </div>
          </div>

          {/* AI Note */}
          <div style={{
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            borderLeft: '3px solid var(--color-primary)',
            fontSize: '0.8125rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
              <Sparkles size={14} /> AI Sensitivity Model Insight
            </div>
            Math intervention coverage has the highest elasticity on overall school outcomes. A 20% increase in coverage yields ~+2.8 pp gain across Grade 6.
          </div>
        </div>

        {/* Projected Impact Card */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Projected Academic Outcomes</h3>
            <span className="badge badge-success">Live Forecast</span>
          </div>

          {/* Key Output Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Projected School Average</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{projectedSchoolAverage}%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
                +{ (projectedSchoolAverage - baselineSchoolAverage).toFixed(1) } pp vs baseline
              </div>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Grade 6 Maths Projected</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B5CF6' }}>{projectedGrade6Math}%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
                +{ (projectedGrade6Math - baselineGrade6Math).toFixed(1) } pp vs baseline
              </div>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Learners Rescued From Deficit</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-success)' }}>{studentsSaved}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                {projectedStudentsAtRisk} at-risk remaining
              </div>
            </div>
          </div>

          {/* Chart */}
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="metric" tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip formatter={(val: any) => [`${val}%`]} />
                <Bar dataKey="Baseline" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Projected" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.8125rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#94A3B8' }} /> Baseline Current Term
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#10B981' }} /> Projected With Selected Interventions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
