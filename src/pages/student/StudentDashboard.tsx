import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Award, BookOpen, TrendingUp, Brain, 
  Calendar, CheckCircle2, Target, ArrowRight 
} from 'lucide-react';
import { STUDENTS } from '../../mock/students';
import { BRIAN_PERFORMANCE, BRIAN_MATH_TREND } from '../../mock/performance';
import { MetricCard, PerformanceBar } from '../../components/common/index';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const student = STUDENTS.find(s => s.id === 'stu-001') || STUDENTS[0];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #831843 0%, #BE185D 100%)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FBCFE8', marginBottom: '0.25rem' }}>
            Greenfield Academy · Learner Portal
          </div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
            Hello, {student.firstName}! 🚀
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#FCE7F3', fontSize: '0.9375rem' }}>
            Grade 6 East · Great job on your Mathematics recovery this month! Keep up the momentum.
          </p>
        </div>

        <button
          onClick={() => navigate('/student/ai')}
          className="btn btn-secondary"
          style={{ background: '#FFFFFF', color: '#BE185D', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Brain size={16} /> AI Study Buddy
        </button>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <MetricCard
          label="My Overall Grade"
          value="61.5%"
          change={3.2}
          changeLabel="vs Term 2"
          icon={<Award size={22} />}
          iconBg="#FDF2F8"
          iconColor="#DB2777"
        />
        <MetricCard
          label="Attendance Streak"
          value="94%"
          icon={<Calendar size={22} />}
          iconBg="#F0FDF4"
          iconColor="#16A34A"
        />
        <MetricCard
          label="Maths Recovery"
          value="+26 pp"
          icon={<TrendingUp size={22} />}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
          context="Fractions Mastered"
        />
        <MetricCard
          label="Next Goal"
          value="Decimals"
          icon={<Target size={22} />}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          context="Test in 2 weeks"
        />
      </div>

      {/* Main progress cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700 }}>
            My Subject Report Card
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {BRIAN_PERFORMANCE.subjects.map(subj => (
              <div key={subj.subjectId} style={{ padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <span style={{ fontWeight: 600 }}>{subj.subjectName}</span>
                  <strong>{subj.averagePercentage}%</strong>
                </div>
                <PerformanceBar value={subj.averagePercentage} />
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Sparkles size={20} color="#DB2777" />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>AI Study Recommendation</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
              &ldquo;You did awesome on Equivalent Fractions! Today, practice converting simple fractions into decimals, like 1/2 = 0.5 and 1/4 = 0.25.&rdquo;
            </p>
            <div style={{ padding: '0.75rem', background: '#FDF2F8', borderRadius: 'var(--radius-md)', border: '1px solid #FBCFE8', color: '#9D174D', fontSize: '0.8125rem' }}>
              <strong>Practice Quest:</strong> Solve 3 decimal puzzles with your AI Study Buddy!
            </div>
          </div>

          <button
            onClick={() => navigate('/student/ai')}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem', background: '#DB2777', borderColor: '#DB2777', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
          >
            Start Practice Quest <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
