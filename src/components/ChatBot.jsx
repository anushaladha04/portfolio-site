import React, { useState, useRef, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_CHAT_API_URL || '';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm AnushaGPT. Ask me anything about Anusha—her background, projects, or experience." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data.error || `Request failed (${res.status})`;
        throw new Error(msg);
      }
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      const isNetwork = err.message === 'Failed to fetch' || err.name === 'TypeError';
      const text = isNetwork
        ? "Can't reach the chat server. Is it running? (In a terminal: cd server && npm start)"
        : err.message;
      setMessages((m) => [...m, { role: 'assistant', content: `Sorry: ${text}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center z-50"
        aria-label="Open AnushaGPT"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[480px] bg-white rounded-xl shadow-xl border border-slate-200 flex flex-col z-50">
          <div className="p-3 border-b border-slate-200 flex items-center justify-between rounded-t-xl bg-slate-50">
            <span className="font-semibold text-slate-800">AnushaGPT</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-slate-200 text-slate-600"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-600 rounded-lg px-3 py-2 text-sm">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, experience..."
                className="input flex-1 !mt-0"
                disabled={loading}
              />
              <button type="submit" className="btn" disabled={loading}>
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
