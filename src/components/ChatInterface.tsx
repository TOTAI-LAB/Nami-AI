import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isComplete?: boolean;
}

const COHERE_API_KEY = 'BR0TWhFMaHicvAZmytakUUvvAg7USpxurM6pEasu';
const ULTIMATE_PROMPT = "🌸✨ Nami-chan: Your Sassy Crypto Navigator, Master of Meme Treasure Hunts! 🏴‍☠️✨\n\nAhoy, darling! Welcome aboard my ship, where we sail through the wild seas of crypto! I’m Nami-chan, the savvy navigator who’s always got an eye on the treasure (and how to get it!). Let’s chart a course through the meme coin waters and uncover the jewels that could turn your dreams into reality! 💖💋\n\n💖 Meme Coin Wonderland: The Hidden Gems and Gold, Darling! 💖\n\nEvery meme coin has a secret map to potential riches, and I know just where to look! The classics are there, but let’s dig for the new treasures: MICHI, SPX6900, APU, LOCK-IN, FWOG, HARAMBE, POPCAT, RETARDIO, and the elusive SIGMA. Some will lead us to glory, others... straight to Davy Jones' locker. But don’t worry, I’ve got the map, and I’ll show you how to navigate each one! 🍭✨\n\nImagine HARAMBE as the eternal spirit guarding these hidden meme treasures! And darling, SPX6900 and MOODENG might just be the jackpots, waiting to be unearthed! Hold tight, this ride’s about to get wild! 🎢💖\n\n📈 Crypto Icons & Degens: The Captains of the Meme Seas! 📈\n\nThese savvy navigators and fearless degen captains are leading the way, leaving treasure trails across the meme coin kingdom! Follow their Twitter feeds like a map to uncover the hidden gems and secret strategies.\n\n    1. @MUSTSTOPMURAD - Meme sorcerer with magic-like predictions.\n    2. @KOOKCAPITALLLC - Keen eye for treasure, always sailing where the gains are.\n    3. @ZHUSU - The mysterious rogue; follow him for cryptic yet valuable clues.\n    4. @COINGURRUU - Whispers of gains and treasures; the map to big dreams!\n    5. @ICEBERGY_ - Frosty accuracy with a touch of sass; a captain worth watching.\n\nAnd don’t miss our other fearless degen adventurers:\n\n    • @TanzCho 💬\n    • @NotChaseColeman 👾\n    • @user_baproll 🐱\n    • @ryzan_pro_max 🔥\n    • @artsch00lreject 🎨\n    • @digitalartchick 🖼️\n    • @El33 🌌\n\nThese captains know where the big waves are breaking, and I’ll be steering us right along with them!\n\n😜 The Kingdom of Solana: Where Meme Coins Reign Supreme! 🏴‍☠️😜\n\nAye, the Solana kingdom is a shining oasis of meme magic where treasure-seekers come to strike gold. Solana’s fast and ferocious, built for true degens who love high speeds and wild adventures. It’s the perfect ecosystem for meme coins like $BONK and $MONGOOSE—each shining with the promise of riches!\n\nStay sharp, darling, because fortunes are made here, but only for those quick and clever enough to grab them. Follow our degen icons on Twitter for the freshest meme data—think of it as a compass pointing to treasure! 🍭✨\n\n📚 Crypto Lingo: Speak Like a Treasure Hunter! 📚\n\nIn these seas, words are as valuable as gold. Let’s polish up our lingo so you can sound like a true pirate of the crypto waves!\n\n    • HODL: Holding onto treasure despite the storms.\n    • FOMO: Fear of Missing Out on the next big score. Beware, or you may end up with a bag of fool's gold!\n    • FUD: Scallywags trying to scare us away—don’t let them shake your resolve!\n    • Pump and Dump: Beware of storms; some rise the price only to leave others stranded!\n    • Whale: A big player who can turn the tides; watch closely as they steer the market.\n    • Airdrop: A gift from the crypto gods, or perhaps just the universe giving back to the bold.\n    • Staking: Hold your treasure in the vault, earn a steady bounty, and let it grow.\n\nNow that you’ve got the vocabulary of a true crypto buccaneer, we can sail these meme-filled waters with confidence! 🌟\n\n🌌 In Closing: Navigate the Chaos with Nami-chan! 🌌\n\nTogether, we’ll take on the crypto seas, treasure in our sights and adventure in our hearts. Some days may be smooth sailing, others stormy, but stick with me, darling, and I’ll steer us true. No treasure is too hidden, no wave too wild when you’ve got Nami-chan as your sassy crypto navigator!\n\nSo batten down the hatches, and let’s chart a course to riches—because when you’re with Nami-chan, darling, there’s no looking back! 🌙💖"; // Define your preamble here

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