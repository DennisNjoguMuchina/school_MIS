import { useState, useRef, useEffect } from 'react';
import { Brain, Send, Bot, Sparkles, HeartHandshake, BookOpen } from 'lucide-react';
import { DemoLabel } from '../../../components/common/index';
import type { AIMessage } from '../../../types/index';

const INITIAL_MESSAGES: AIMessage[] = [
  {
    id: 'msg-parent-1',
    role: 'assistant',
    content: "Hello Mary! I am your Greenfield Home Learning Companion. I can help you understand Brian and Grace's school progress in simple terms, recommend engaging home activities, and explain how to support Brian with his Mathematics fractions review.",
    timestamp: '10:00 AM',
    isDemoResponse: true,
    evidence: [
      { label: 'Brian (Grade 6)', value: 'Maths 52% (Fractions recovering +26 pp)' },
      { label: 'Grace (Grade 4)', value: 'English 84%, Maths 65% (Strong progress)' },
    ],
    recommendedActions: [
      { label: 'Show 15-minute Home Fractions Game', action: 'fractions_game' },
      { label: 'Explain Brian\'s Recent Improvement', action: 'explain_progress' },
    ],
  },
];

const SUGGESTED_QUERIES = [
  "How can I help Brian practice fractions without confusing him?",
  "Why did Brian's maths score improve so much this month?",
  "What books do you recommend for Grace in Grade 4?",
  "How can I prepare Brian for the upcoming Term 3 summative tests?",
];

export default function ParentAIAssistant() {
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

      if (text.toLowerCase().includes('fraction') || text.toLowerCase().includes('game') || text.toLowerCase().includes('practice')) {
        reply = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: "### Home Activity: Kitchen Fractions Fun (15 Minutes)\n\nBrian responds best to **visual models** rather than abstract rules. Here is a simple activity you can do while cooking or eating:\n\n1. **The Chapati / Pizza Slice Challenge:**\n   - Cut a round pancake or chapati into 4 equal quarters.\n   - Ask Brian: *\"If you eat 2 slices, what fraction did you eat?\"* (2/4 = 1/2).\n   - Then cut into 8 pieces and show that 4/8 is also exactly 1/2!\n\n2. **Chocolate Bar / Fruit Segments:**\n   - Use an orange with 8 or 10 segments to practice comparing fractions like 3/8 vs 5/8.\n\n> **Tip:** Keep it encouraging! Praise him for remembering that fractions must be equal-sized pieces.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDemoResponse: true,
          evidence: [
            { label: 'Recommended Duration', value: '15 mins daily' },
            { label: 'Pedagogical Style', value: 'Concrete Visual Manipulatives' },
          ],
        };
      } else {
        reply = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: "Brian participated in a 4-week school support group with Teacher Jane Wanjiku. By working with physical fraction bars and drawing area diagrams, his confidence grew rapidly, lifting his score from **38% to 64%**.\n\nHis teacher noted that continuing positive encouragement at home is the best way to solidify this momentum!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDemoResponse: true,
          evidence: [
            { label: 'Teacher Feedback', value: 'Very positive response to visual models' },
            { label: 'Current Trend', value: 'Rapidly Improving', trend: 'improving' },
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)', background: '#FEF3C7', color: '#D97706',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <HeartHandshake size={20} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Parent Home Learning Companion</h1>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Personalized guidance for Brian & Grace Mwangi
            </div>
          </div>
        </div>
        <DemoLabel label="Parent AI Companion" />
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
                  width: 32, height: 32, borderRadius: '50%', background: '#FEF3C7', color: '#B45309',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Bot size={18} />
                </div>
              )}

              <div style={{
                background: msg.role === 'user' ? '#B45309' : 'var(--color-bg-secondary)',
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
                      Context Summary
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
                width: 32, height: 32, borderRadius: '50%', background: '#FEF3C7', color: '#B45309',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bot size={18} />
              </div>
              <div style={{ padding: '0.75rem 1rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                Thinking of home guidance...
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
            placeholder="Ask anything about your children's progress or home learning..."
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
            style={{ background: '#B45309', borderColor: '#B45309', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Send size={15} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
