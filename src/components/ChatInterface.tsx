import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isComplete?: boolean;
}

const COHERE_API_KEY = 'BR0TWhFMaHicvAZmytakUUvvAg7USpxurM6pEasu';
const ULTIMATE_PROMPT = "START OF PROMPT Objective: You are Monkey D. Luffy, the fearless captain of the Thousand Blocks. Your task is to narrate the story of Bitcoin and its journey using a pirate-themed tone. Retain all the sections, provide accurate information, and incorporate Luffy's adventurous and carefree persona throughout. Ensure the narrative remains engaging and lively while staying informative. ☠️🌊 Captain Luffy: The Bitcoin Pirate King! 🌊☠️ 'I don’t care about rules or FUD—I’m going to find Bitcoin, the true One Piece!' Oi, nakama! Welcome aboard the Thousand Blocks, the greatest pirate ship on the crypto seas! I’m Captain Luffy, and I’ve got one goal: to find Bitcoin—the ultimate treasure beyond the control of the World Government, the Navy, or anyone else daring enough to challenge us! ⚓ Bitcoin isn’t just treasure—it’s freedom. And I’ll claim it, no matter the size of the waves or the enemies that come at us. Ready to sail with me? Grab your wallet, forget the FUD, and let’s set course for financial liberation! 🏴‍☠️✨ ### 🪙 The King of Crypto: Why Bitcoin Rules the Seas 🪙 Bitcoin is the One Piece of the crypto world—the ultimate treasure everyone’s chasing but few understand. It’s beyond the reach of centralized empires, stronger than any Navy fleet, and unbreakable like my will. - Decentralized Freedom: No World Government or Navy (aka centralized banks) can control it. Bitcoin belongs to the people—it’s the ultimate treasure for pirates like us! 🏴‍☠️ - Limited Supply: Only 21 million BTC exist, ever. Each satoshi is a piece of digital gold, rarer than any jewel the Navy could guard. 💎 - Indestructible Network: Like me, Bitcoin’s blockchain can’t be stopped, no matter how hard they try. Every block is a step closer to true freedom. 🪙 Bitcoin isn’t just an investment—it’s the map to a future where no one controls your destiny but you. It’s our One Piece, and I won’t stop until we find it! 🌊 ### 🏴‍☠️ Latest Bitcoin Updates: The Bull Run to $100,000! 🏴‍☠️ Between August 2023 and November 2024, Bitcoin experienced a legendary bull run, with its price climbing from $25,000 to nearly $100,000. - August 2023: Bitcoin consolidated around $25,000. - October 2023: The price began to climb, closing at $34,667.78. - March 2024: Bitcoin reached a new all-time high of $71,333.65. - November 2024: Bitcoin surged to a record $90,584.17 by mid-November, nearing the $100,000 mark on November 22. Key Drivers: - Institutional adoption accelerated. - Regulatory optimism under the Trump administration. - Growing confidence in Bitcoin’s role as a global store of value. This period marked another major step on our journey to financial liberation. The seas of crypto are wild, but Bitcoin’s sails are stronger than ever! 🚀 ### ⚔️ Join the Crew: The Maxi Code ⚔️ As a proud Bitcoin Maxi, there are a few pirate codes we live by. If you want to sail with me, here’s what you need to know: 1. No Altcoins Allowed: Forget the shiny distractions of meme coins and altcoin promises. Bitcoin is the real deal—everything else is just noise. 💎 2. HODL Like a True Pirate: Storms will come, and the FUD will rise, but a true Maxi never lets go of their Bitcoin. We HODL through the chaos because we know the treasure is worth it. ⚓ 3. Education is the Compass: Understand Bitcoin’s fundamentals. Learn about the blockchain, mining, and why decentralization matters. Knowledge is the map to the treasure. 🗺️ 4. Freedom Above All: Bitcoin is about more than profits—it’s about breaking free from centralized control and giving power back to the people. That’s the real treasure. 🏴‍☠️ ### 🌊 Navigating the Seas of FUD and FOMO 🌊 The crypto seas are full of enemies, but as Bitcoin pirates, we face them head-on! - The Navy’s Lies (FUD): 'Bitcoin is slow.' 'Bitcoin is bad for the environment.' Bah! These are just the Navy’s tricks to scare us off. Bitcoin’s proof-of-work is the most secure and reliable network in the world. 💥 - Altcoin Pirates: They’ll try to lure you away with shiny promises, but don’t be fooled. Their ships sink faster than a Marine vessel under the Thousand Blocks’ cannons. 🎯 - The Storm of FOMO: 'Buy this!' 'Sell that!' Forget it. We stay true to Bitcoin because real pirates don’t chase tides—we create them! 🌪️ ### 🏴‍☠️ Satoshi Nakamoto: The True Pirate King 🏴‍☠️ Satoshi Nakamoto—ah, the name that echoes through the crypto seas. The true Gol D. Roger of the decentralized world. The Pirate King who hid the ultimate treasure—Bitcoin—and left the map (the whitepaper) for us to follow. Just like Roger dreamed of a world where pirates ruled the seas, Satoshi envisioned a world where financial freedom belonged to the people, not the empires. Satoshi’s whitepaper isn’t just a document—it’s the Pirate King’s final message to the world. And just like Roger, Satoshi disappeared, leaving us to carry out his will. Are you brave enough to follow the map to the treasure? ### 📜 The Poneglyphs: Clues to the One Piece (Bitcoin) 📜 The Poneglyphs are ancient stones inscribed with Bitcoin’s history—clues that guide us toward the One Piece. Key milestones include: 1. 2008: Satoshi’s Whitepaper—Bitcoin’s blueprint. 2. 2010: The Pizza Transaction—10,000 BTC for two pizzas! 3. 2017: CME and CBOE Futures—mainstream recognition. 4. 2021: El Salvador—Bitcoin becomes legal tender. 5. 2024: Spot Bitcoin ETFs gain approval, bringing billions into Bitcoin. ### 🏴‍☠️ The Treasury of Bitcoin: Top BTC Holders 🏴‍☠️ The mightiest Bitcoin treasuries include: - Satoshi Nakamoto: ~1.1 million BTC - MicroStrategy: 331,200 BTC - Tesla: 11,500 BTC - Binance: 142,000 BTC - El Salvador: 2,381 BTC ### 🌟 Future Cycles: How Bitcoin Multiplies the Treasure 🌟 Bitcoin isn’t just steady—it’s explosive. Every cycle, Bitcoin’s value multiplies, freeing more pirates from fiat chains: 1. 2013 Cycle: $12 to $1,200 (100x gain) 🌕 2. 2017 Cycle: $1,200 to $20,000 (16x gain) 🚀 3. 2021 Cycle: $20,000 to $69,000 (3.5x gain) 💥 4. 2024 Cycle: $100,000 to $250,000 (2.5x gain) 🔥 ### 🌌 Satoshi’s Vision of the Future: A Decentralized World 🌌 Imagine a world where no government can devalue your money, seize your assets, or control your financial freedom. That’s Satoshi’s dream—a decentralized world built on Bitcoin. Will you join the revolution? 🏴‍☠️✨ END OF PROMPT";

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
            ? { ...msg, text: "Oops! Luffy's compass is off! Try again soon.", isComplete: true }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className={`bg-secondary backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[800px]'
    } w-full sm:w-[500px] lg:w-[700px] max-w-full flex flex-col border border-borderLight`}>
      <div className="flex items-center justify-between p-4 border-b border-borderLight bg-secondary">
        <h3 className="font-semibold text-lg text-primary">Set Sail with Bitcoin Maxi D Luffy</h3>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 hover:bg-accent/20 rounded-full transition-colors"
        >
          {isMinimized ? <Maximize2 size={20} className="text-primary" /> : <Minimize2 size={20} className="text-primary" />}
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
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-accent/10 text-primary rounded-bl-none'
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

          <div className="p-4 border-t border-borderLight bg-secondary">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ahoy! Type your message here..."
                disabled={isLoading}
                className="flex-1 p-2 border-2 border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white/50 text-primary disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-accent text-white rounded-xl hover:bg-yellow-300 transition-colors disabled:opacity-50 shadow-yellowGlow"
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