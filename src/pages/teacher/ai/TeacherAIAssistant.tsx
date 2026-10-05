import { useState, useRef, useEffect } from 'react';
import { Brain, Send, Shield, Bot, Sparkles, BookOpen, Lightbulb } from 'lucide-react';
import { DemoLabel } from '../../../components/common/index';
import type { AIMessage } from '../../../types/index';

const INITIAL_MESSAGES: AIMessage[] = [
  {
    id: 'msg-teacher-1',
    role: 'assistant',
    content: "Hello Teacher Jane! I am your Classroom Pedagogical Assistant. I've analyzed your Grade 6 East Mathematics records for Term 3. You can ask me for lesson remediation plans, student error diagnostics, or differentiation exercises.",
    timestamp: '10:00 AM',
    isDemoResponse: true,
    evidence: [
      { label: 'Grade 6 East Mean', value: '52.0%', trend: 'improving' },
      { label: 'Key Learning Deficit', value: 'Equivalent Fractions (43%)', trend: 'declining' },
      { label: 'Struggling Students', value: '3 learners below 40%' },
    ],
    recommendedActions: [
      { label: 'Generate 4-Week Fractions Plan', action: 'plan_fractions' },
      { label: 'View Brian Mwangi Recovery Details', action: 'brian_recovery' },
    ],
  },
];

const SUGGESTED_QUERIES = [
  "How can I differentiate the next Fractions lesson for Brian and Peter?",
  "Generate 5 word problems on real-world fractions for Grade 6 East.",
  "What was the impact of the visual models intervention on Brian's quiz scores?",
  "Which questions on the latest quiz had the lowest success rate?",
];

export default function TeacherAIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDemoResponse: false,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply: AIMessage;

      if (text.toLowerCase().includes('differentiate') || text.toLowerCase().includes('plan')) {
        reply = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: "### Differentiated Fractions Lesson Strategy\n\n1. **Tier 1 (Foundation - Brian, Peter, James):**\n   - Focus on visual fraction bars & circular cutout models.\n   - Task: Group halves, fourths, and eighths to visually verify that 2/4 = 1/2.\n\n2. **Tier 2 (Core Cohort - 28 students):**\n   - Algorithmic reduction via finding greatest common factors (GCF).\n   - Task: Reducing improper fractions to mixed numbers in story context.\n\n3. **Tier 3 (Advanced - Faith, Amina):**\n   - Multi-step fraction word problems involving budgeting and measurement.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDemoResponse: true,
          evidence: [
            { label: 'Foundation Group Size', value: '3 learners' },
            { label: 'Core Target', value: '60% benchmark' },
          ],
          recommendedActions: [
            { label: 'Print Guided Activity Worksheets', action: 'print_worksheets' },
            { label: 'Log Remedial Group Session', action: 'log_session' },
          ],
        };
      } else {
        reply = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: "Based on classroom diagnostic logs for Grade 6 East, Brian Mwangi experienced a **+26 percentage point recovery** (from 38% baseline to 64%) following 4 sessions of visual models.\n\nPeter Otieno scored 35% on the latest check-in and would benefit from 1-on-1 manipulatives practice before introducing mixed fraction addition.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDemoResponse: true,
          evidence: [
            { label: 'Brian Recovery', value: '+26 pp uplift', trend: 'improving' },
            { label: 'Peter Need', value: 'One-on-One Manipulatives' },
          ],
        };
      }

      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius-md)', background: '#F0FDFA', color: '#0D9488',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Brain size={20} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Teacher Pedagogical AI Advisor</h1>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                Scoped to Grade 6 East Mathematics · Evidence-backed pedagogical support
              </div>
            </div>
          </div>
        </div>
        <DemoLabel label="Simulated Teacher AI" />
      </div>

      {/* Chat Area */}
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {msg.role === 'assistant' && (
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: '#F0FDFA', color: '#0D9488',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Bot size={18} />
                </div>
              )}

              <div style={{
                background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                color: msg.role === 'user' ? '#FFFFFF' : 'var(--color-text-primary)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                borderTopRightRadius: msg.role === 'user' ? 4 : undefined,
                borderTopLeftRadius: msg.role === 'assistant' ? 4 : undefined,
                boxShadow: 'var(--shadow-sm)',
                fontSize: '0.9375rem',
                lineHeight: 1.6
              }}>
                <div style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>

                {msg.evidence && msg.evidence.length > 0 && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      Diagnostic Evidence
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {msg.evidence.map((ev, i) => (
                        <div key={i} style={{ fontSize: '0.8125rem' }}>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{ev.label}: </span>
                          <strong>{ev.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: '#F0FDFA', color: '#0D9488',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bot size={18} />
              </div>
              <div style={{ padding: '0.75rem 1rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                Formulating pedagogical recommendation...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested Prompts */}
        <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.5rem', overflowX: 'auto', background: 'var(--color-bg-card)' }}>
          {SUGGESTED_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              style={{
                whiteSpace: 'nowrap',
                padding: '0.35rem 0.75rem',
                borderRadius: 999,
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-secondary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)'
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.75rem', background: 'var(--color-bg-card)' }}
        >
          <input
            type="text"
            placeholder="Ask for lesson differentiation, assessment questions, or remedial strategies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: '0.625rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              outline: 'none',
              fontSize: '0.875rem'
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ background: '#0D9488', borderColor: '#0D9488', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Send size={15} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
