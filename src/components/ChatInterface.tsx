import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isComplete?: boolean;
}

const COHERE_API_KEY = 'BR0TWhFMaHicvAZmytakUUvvAg7USpxurM6pEasu';

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
    setMessages(prev => [...prev, {
      id: aiMessageId,
      text: '',
      sender: 'ai',
      isComplete: false,
    }]);

    try {
      abortControllerRef.current = new AbortController();
      const response = await fetch('https://api.cohere.com/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command-r-plus-08-2024',
          message: userMessage.text,
          temperature: 0.7,
          chat_history: [],
          prompt_truncation: 'AUTO',
          stream: true,
          connectors: [{ id: 'web-search' }]
        }),
        signal: abortControllerRef.current.signal,
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No response reader');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                setMessages(prev => prev.map(msg =>
                  msg.id === aiMessageId
                    ? { ...msg, text: msg.text + data.text }
                    : msg
                ));
              }
            } catch (e) {
              console.error('Error parsing stream data:', e);
            }
          }
        }
      }

      setMessages(prev => prev.map(msg =>
        msg.id === aiMessageId
          ? { ...msg, isComplete: true }
          : msg
      ));
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request aborted');
        return;
      }

      console.error('Failed to send message:', error);
      setMessages(prev => prev.map(msg =>
        msg.id === aiMessageId
          ? {
              ...msg,
              text: "I'm having trouble responding right now. Please try again later!",
              isComplete: true,
            }
          : msg
      ));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    } w-full max-w-md flex flex-col border-2 border-kawaii-purple/20`}>
      <div className="flex items-center justify-between p-4 border-b border-kawaii-pink/20">
        <h3 className="font-semibold text-lg text-gray-800">Chat with Your AI Friend</h3>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 hover:bg-kawaii-purple/10 rounded-full transition-colors"
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
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-kawaii-purple text-white rounded-br-none'
                      : 'bg-kawaii-pink/30 text-gray-800 rounded-bl-none'
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

          <div className="p-4 border-t border-kawaii-pink/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 p-2 border-2 border-kawaii-purple/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-kawaii-purple/50 bg-white/50 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-kawaii-purple text-white rounded-xl hover:bg-kawaii-purple/80 transition-colors disabled:opacity-50"
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