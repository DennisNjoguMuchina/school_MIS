import { useState, useRef, useEffect } from 'react';
import { Brain, Send, Shield, Bot } from 'lucide-react';
import { DemoLabel } from '../../components/common/index';
import type { AIMessage, AIEvidence, AIRecommendedAction } from '../../types/index';
import { useNavigate } from 'react-router-dom';

// ============================================================
// AI ASSISTANT — Management / School Intelligence
// All responses are mock demos, clearly labelled.
// Architecture: User → Authorization → PostgreSQL → AI → Response
// (Future). Currently: User → Mock response.
// ============================================================

interface DemoResponse {
  content: string;
  evidence?: AIEvidence[];
  actions?: AIRecommendedAction[];
}

const DEMO_RESPONSES: Record<string, DemoResponse> = {
  'how is the school performing': {
    content: "Greenfield Academy is performing at 68.4% overall this term — an improvement of 3.3 percentage points from Term 2 (65.1%).\n\nThe improvement is driven largely by Grade 5 and Grade 7. Grade 6 remains the area requiring the most attention, particularly in Mathematics.",
    evidence: [
      { label: 'Overall Average', value: '68.4%', trend: 'improving' },
      { label: 'Previous Term', value: '65.1%' },
      { label: 'Improvement', value: '+3.3 pp', trend: 'improving' },
      { label: 'Students Requiring Support', value: '76' },
    ],
    actions: [
      { label: 'View Grade 6', action: '/management/grades' },
      { label: 'View All Gaps', action: '/management/gaps' },
    ],
  },
  'which grade needs the most attention': {
    content: "Grade 6 requires the most attention, currently averaging 61.2% — the lowest of all grades. The primary concern is Mathematics at 52%, particularly in the Fractions topic (43% average).\n\n18 learners in Grade 6 are currently identified as requiring support.",
    evidence: [
      { label: 'Grade 6 Average', value: '61.2%', trend: 'improving' },
      { label: 'Grade 6 Mathematics', value: '52.0%', trend: 'improving' },
      { label: 'Fractions Topic', value: '43.0%', trend: 'declining' },
      { label: 'Learners Requiring Support', value: '18' },
    ],
    actions: [
      { label: 'View Grade 6', action: '/management/grades' },
      { label: 'View Interventions', action: '/management/interventions' },
    ],
  },
  'what are the biggest learning gaps': {
    content: "The largest learning gaps are concentrated in Mathematics — specifically in the Number strand. Fractions (43%), Decimals (48%), and Percentages (51%) are the three weakest topics school-wide.\n\nThese three topics together affect 74 learners in Grade 6 and have a weighted impact on the school's overall average.",
    evidence: [
      { label: 'Fractions', value: '43.0%', trend: 'declining' },
      { label: 'Decimals', value: '48.0%', trend: 'declining' },
      { label: 'Percentages', value: '51.0%', trend: 'stable' },
      { label: 'Basic Algebra', value: '55.0%', trend: 'stable' },
    ],
    actions: [
      { label: 'View Learning Gaps', action: '/management/gaps' },
      { label: 'What-If Analysis', action: '/management/whatif' },
    ],
  },
  'which subjects improved this term': {
    content: "Mathematics (all grades combined) improved by 3.0 pp, led by Grade 6 which rose from 49% to 52%. English improved by 2.5 pp across most grades.\n\nScience remained relatively stable. Social Studies showed a slight decline in Grade 6.",
    evidence: [
      { label: 'Mathematics (improvement)', value: '+3.0 pp', trend: 'improving' },
      { label: 'English (improvement)', value: '+2.5 pp', trend: 'improving' },
      { label: 'Kiswahili', value: '+1.2 pp', trend: 'improving' },
      { label: 'Science', value: '+1.0 pp', trend: 'stable' },
    ],
    actions: [
      { label: 'View Subject Analysis', action: '/management/subjects' },
    ],
  },
  'which learners require support': {
    content: "76 learners across the school are currently identified as requiring support based on recent assessment performance and trend analysis.\n\nGrade 6 has the highest concentration (18 learners), with the majority struggling specifically with fractions and decimals in Mathematics.",
    evidence: [
      { label: 'Total Requiring Support', value: '76' },
      { label: 'Grade 6', value: '18 learners' },
      { label: 'Grade 4', value: '14 learners' },
      { label: 'Grade 7', value: '12 learners' },
    ],
    actions: [
      { label: 'View Learners', action: '/management/learners' },
      { label: 'View Interventions', action: '/management/interventions' },
    ],
  },
  'what happened to grade 6 mathematics': {
    content: "Grade 6 Mathematics has shown a consistent downward trend from 2025 (T1: 44%, T2: 42.5%, T3: 47%) which continued into 2026 (T1: 49%). However, the trend reversed in Term 2 2026 (50.5%) and has continued improving in Term 3 (52%).\n\nThe recovery appears to be linked to targeted interventions on the Fractions topic, including small group support sessions.",
    evidence: [
      { label: 'Current (T3 2026)', value: '52.0%', trend: 'improving' },
      { label: 'Previous (T2 2026)', value: '50.5%', trend: 'improving' },
      { label: 'T3 2025 (low point)', value: '42.5%', trend: 'declining' },
      { label: 'Active Interventions', value: '3' },
    ],
    actions: [
      { label: 'View Math Performance', action: '/management/subjects' },
      { label: 'View Interventions', action: '/management/interventions' },
    ],
  },
};

const SUGGESTIONS = [
  'How is the school performing?',
  'Which grade needs the most attention?',
  'What are the biggest learning gaps?',
  'Which subjects improved this term?',
  'Which learners require support?',
  'What happened to Grade 6 Mathematics?',
];

function getResponse(input: string): DemoResponse {
  const lower = input.toLowerCase().trim();
  for (const [key, response] of Object.entries(DEMO_RESPONSES)) {
    if (lower.includes(key.split(' ').slice(0, 3).join(' ')) || key.includes(lower.slice(0, 20))) {
      return response;
    }
  }
  // Generic fallback
  return {
    content: "That's a great question. In the full platform, this query would be processed by our analytics engine using live PostgreSQL data.\n\nFor now, I can answer questions about:\n• School performance\n• Grade-level performance\n• Learning gaps\n• Subject improvements\n• Learners requiring support\n• Grade 6 Mathematics history",
    actions: [{ label: 'View Dashboard', action: '/management' }],
  };
}

export default function ManagementAIAssistant() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Good day. I'm your School Intelligence Assistant.\n\nI can help you understand school performance, identify learning gaps, and recommend actions. Ask me anything about Greenfield Academy's performance data.",
      timestamp: new Date().toISOString(),
      isDemoResponse: true,
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isThinking) return;

    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      isDemoResponse: false,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const response = getResponse(text);
    const aiMsg: AIMessage = {
      id: `msg-${Date.now()}-ai`,
      role: 'assistant',
      content: response.content,
      timestamp: new Date().toISOString(),
      isDemoResponse: true,
      evidence: response.evidence,
      recommendedActions: response.actions,
    };

    setIsThinking(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div style={{ height: 'calc(100vh - var(--topbar-height))', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid var(--color-border)', background: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, var(--color-navy), var(--color-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={20} color="white" />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>School Intelligence Assistant</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <DemoLabel label="Demo Mode" />
            <span>Data from mock analytics · Real AI connects in Phase 5</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', background: 'var(--color-success-bg)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)' }} />
          Online
        </div>
      </div>

      {/* Messages */}
      <div className="ai-messages" style={{ flex: 1, overflowY: 'auto', background: 'var(--color-surface)' }}>
        {messages.map(msg => (
          <div key={msg.id} className={`ai-message ${msg.role}`} style={{ maxWidth: msg.role === 'assistant' ? '85%' : '70%' }}>
            {msg.role === 'assistant' && (
              <div className="ai-message-avatar assistant">
                <Bot size={16} />
              </div>
            )}
            <div>
              <div className="ai-message-bubble">
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} style={{ margin: i > 0 ? '0.375rem 0 0' : 0 }}>{line}</p>
                ))}

                {/* Evidence block */}
                {msg.evidence && msg.evidence.length > 0 && (
                  <div className="ai-evidence-block">
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>Evidence</div>
                    {msg.evidence.map(ev => (
                      <div key={ev.label} className="ai-evidence-item">
                        <span className="ai-evidence-label">{ev.label}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="ai-evidence-value">{ev.value}</span>
                          {ev.trend && (
                            <span style={{ fontSize: '0.75rem', color: ev.trend === 'improving' ? 'var(--color-success)' : ev.trend === 'declining' ? 'var(--color-danger)' : 'var(--color-text-muted)', fontWeight: 600 }}>
                              {ev.trend === 'improving' ? '↑' : ev.trend === 'declining' ? '↓' : '→'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recommended actions */}
                {msg.recommendedActions && msg.recommendedActions.length > 0 && (
                  <div className="ai-actions">
                    {msg.recommendedActions.map(action => (
                      <button key={action.label} className="ai-action-chip" onClick={() => navigate(action.action)}>
                        {action.label} →
                      </button>
                    ))}
                  </div>
                )}

                {/* Demo notice */}
                {msg.isDemoResponse && (
                  <div className="ai-demo-notice">
                    <Shield size={11} />
                    <span>Demo response using mock school data</span>
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', padding: '0 0.25rem' }}>
                {new Date(msg.timestamp).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="ai-message-avatar user" style={{ alignSelf: 'flex-end' }}>
                U
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="ai-message" style={{ maxWidth: '85%' }}>
            <div className="ai-message-avatar assistant"><Bot size={16} /></div>
            <div className="ai-message-bubble" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '0.875rem 1.25rem' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: '50%', background: 'var(--color-blue)',
                  animation: 'bounce 1.2s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="ai-input-area">
        {messages.length <= 1 && (
          <div className="ai-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="ai-suggestion-chip" onClick={() => sendMessage(s)}>{s}</button>
            ))}
          </div>
        )}
        <form className="ai-input-row" onSubmit={handleSubmit}>
          <input
            id="ai-chat-input"
            className="ai-input-field"
            placeholder="Ask about school performance, grades, subjects, learners…"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isThinking}
            autoComplete="off"
          />
          <button type="submit" className="ai-send-btn" disabled={!input.trim() || isThinking} aria-label="Send message">
            <Send size={16} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.5); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

import React from 'react';
