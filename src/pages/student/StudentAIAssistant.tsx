import { useState, useRef, useEffect } from 'react';
import { Brain, Send, Bot, Sparkles, Star, Lightbulb, Trophy } from 'lucide-react';
import { DemoLabel } from '../../components/common/index';
import type { AIMessage } from '../../types/index';

const INITIAL_MESSAGES: AIMessage[] = [
  {
    id: 'msg-student-1',
    role: 'assistant',
    content: "Hi Brian! 🌟 I'm your AI Study Buddy! I can help you solve tricky maths puzzles, explain confusing questions from class, or test you on decimals and fractions. What would you like to explore today?",
    timestamp: '10:00 AM',
    isDemoResponse: true,
    recommendedActions: [
      { label: 'Try a Decimals Practice Quiz', action: 'decimals_quiz' },
      { label: 'Why does 1/2 equal 0.5?', action: 'explain_half' },
    ],
  },
];

const SUGGESTED_QUERIES = [
  "Why does 1/4 equal 0.25?",
  "Give me a quick 3-question quiz on decimals!",
  "How do I add 0.5 and 0.25?",
  "What is the easiest way to remember fraction rules?",
];

export default function StudentAIAssistant() {
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

      if (text.toLowerCase().includes('quiz')) {
        reply = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: "### 🎯 Quick Decimals Challenge for Brian!\n\n**Question 1:** If you have 1 whole shilling divided into 10 equal parts, each part is 0.1. What decimal is 3 parts?\n\n**Question 2:** Which number is bigger: **0.4** or **0.35**?\n\n**Question 3:** What is **0.5 + 0.5**?\n\nType your answers below and let's check them together! 🚀",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDemoResponse: true,
        };
      } else {
        reply = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: "Think of money or a 100-meter sprint track! 🏃‍♂️\n\n- 1 whole track is **1.00**.\n- Halfway is 50 meters, which is **0.50** (or 0.5).\n- A quarter is 25 meters, which is **0.25**!\n\nSo **1/4 = 0.25** because 4 quarters make 1 whole (0.25 + 0.25 + 0.25 + 0.25 = 1.00). Does that make sense?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDemoResponse: true,
        };
      }

      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)', background: '#FDF2F8', color: '#DB2777',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Trophy size={20} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Brian's AI Study Buddy</h1>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              Interactive CBC Mathematics & Science companion
            </div>
          </div>
        </div>
        <DemoLabel label="Learner AI Buddy" />
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
                  width: 32, height: 32, borderRadius: '50%', background: '#FDF2F8', color: '#DB2777',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Bot size={18} />
                </div>
              )}

              <div style={{
                background: msg.role === 'user' ? '#BE185D' : 'var(--color-bg-secondary)',
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
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: '#FDF2F8', color: '#DB2777',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bot size={18} />
              </div>
              <div style={{ padding: '0.75rem 1rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                Thinking of an explanation...
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
            placeholder="Type your question or answer here..."
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
            style={{ background: '#BE185D', borderColor: '#BE185D', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Send size={15} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
