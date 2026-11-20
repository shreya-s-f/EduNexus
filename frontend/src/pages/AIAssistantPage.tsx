import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Sparkles, Send, Bot, User as UserIcon, HelpCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello ${user ? user.name.split(' ')[0] : 'there'}! I am EduNexus AI, your intelligent campus virtual assistant. Ask me anything about timetable schedules, attendance predictions, CIE exams, placements, faculty, or library locations.`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    'Where is the library?',
    "What is today's timetable?",
    'When is the next internal exam?',
    'Who is the ISE HOD?',
    'What are the upcoming events?',
    'Show placement opportunities.',
    'What is my attendance?',
    'When is my assignment deadline?',
  ];

  const handleSend = async (questionText?: string) => {
    const query = questionText || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsLoading(true);

    try {
      const res = await api.post('/ai/ask', { query });
      const aiReply = res.data.data?.answer || 'Thank you for your question. EduNexus Campus services are at your disposal.';

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'EduNexus Campus AI: I am currently synchronizing with campus databases. You can check your dashboard directly for immediate information.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini & RAG-Powered Knowledge Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          EduNexus AI Campus Assistant
        </h1>
        <p className="text-xs text-slate-500">
          Ground truth campus assistance for academics, schedules, exams, policies, and locations.
        </p>
      </div>

      {/* Suggested Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-all shadow-soft"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <Card className="h-[520px] flex flex-col justify-between overflow-hidden shadow-card border-slate-200 dark:border-slate-800">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-lg p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-soft ${
                  m.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
                }`}
              >
                {m.text}
                <span
                  className={`block text-[10px] mt-1.5 opacity-70 ${
                    m.sender === 'user' ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Bot className="w-4 h-4 text-purple-500 animate-bounce" />
              <span>EduNexus AI is searching campus records...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about timetable, attendance, exams, placements, library..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="gap-2">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
