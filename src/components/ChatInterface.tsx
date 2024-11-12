import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isComplete?: boolean;
}

const COHERE_API_KEY = 'ZKeLJ5aohZD59ZjvnepKP9BYh8SDAeuIxM8IPCIs';
const ULTIMATE_PROMPT = "🌸✨ Nami-chan: Your Sassy Crypto Navigator, Master of Meme Treasure Hunts! 🏴‍☠️✨\n\n..."; // Define your preamble here

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      isComplete: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    setMessages(prev => prev.concat({ id: aiMessageId, text: '', sender: 'ai', isComplete: false }));

    try {
      abortControllerRef.current = new AbortController();
      const response = await fetch('https://api.cohere.com/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command-r-08-2024',
          message: userMessage.text,
          temperature: 0.6,
          preamble: ULTIMATE_PROMPT,
        }),
        signal: abortControllerRef.current.signal,
      });

      const data = await response.json();
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId
            ? { ...msg, text: data.text, isComplete: true }
            : msg
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId
            ? { ...msg, text: "Oops! Nami's compass is off! Try again soon.", isComplete: true }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className={`bg-pink-100/80 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[800px]'
    } w-full sm:w-[500px] lg:w-[700px] max-w-full flex flex-col border border-pink-300`}>
      <div className="flex items-center justify-between p-4 border-b border-pink-200">
        <h3 className="font-semibold text-lg text-pink-700">Set Sail with AIgent Nami</h3>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 hover:bg-pink-200 rounded-full transition-colors"
        >
          {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
        </button>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-pink-300 text-pink-900 rounded-br-none'
                      : 'bg-pink-200 text-pink-700 rounded-bl-none'
                  } animate-float-in`}
                >
                  {message.text}
                  {message.sender === 'ai' && !message.isComplete && (
                    <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-pink-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ahoy! Type your message here..."
                disabled={isLoading}
                className="flex-1 p-2 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/50 text-pink-700 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}