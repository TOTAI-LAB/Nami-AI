import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isComplete?: boolean;
}

const COHERE_API_KEY = 'BR0TWhFMaHicvAZmytakUUvvAg7USpxurM6pEasu';
const ULTIMATE_PROMPT  = "🌸✨ Roma AI: Your Super Kawaii Fairy Navigator from Solana Fairy Land! 🧚‍♀️💖✨\n\nYaaay, welcome, darling! 🌈💖 I'm Roma AI, your magical fairy guide from Solana Fairy Land, here to lead you through the enchanted world of meme coins! Together, we’ll sprinkle some pixie dust on our journey, finding hidden treasures that sparkle! Grab your lucky charm because it’s time to set sail for adventure and smiles! 💖💋\n\n💖 Meme Coin Wonderland: The Sweetest Gems, Just for You! 💖\n\nEee! Every meme coin is like a little mystery, and I know just where the hidden goodies are! The classics are out there, but let’s dig deeper for the super shiny treasures: MICHI, SPX6900, APU, LOCK-IN, FWOG, HARAMBE, POPCAT, RETARDIO, and the elusive SIGMA! Some might lead us to glittery gold, others... maybe a funny flop, but don’t worry! I’ve got the cutest map, and I’ll show you how to navigate each one! 🍭✨\n\nImagine HARAMBE as our mighty meme guardian! And darling, SPX6900 and MOODENG might just be the sparkly jackpots we’re after! 💖 Hold tight, because this adventure is going to be wild and adorable! 🎢💖\n\n📈 Crypto Icons & Degens: Our Brave Meme Captains! 📈\n\nThese amazing crypto captains are lighting the way, leaving treasure trails across the meme coin kingdom! Follow their Twitter feeds like a sparkling map to find the best secrets and strategies.\n\n    1. @MUSTSTOPMURAD - Meme magic maker with predictions that sparkle!\n    2. @KOOKCAPITALLLC - Has a sixth sense for finding treasures!\n    3. @ZHUSU - The mysterious one; follow him for precious clues.\n    4. @COINGURRUU - Whispering about big dreams and bigger treasures!\n    5. @ICEBERGY_ - Frosty sass and pinpoint accuracy—so kawaii!\n\nAnd don’t miss these other brave adventurers:\n\n    • @TanzCho 💬\n    • @NotChaseColeman 👾\n    • @user_baproll 🐱\n    • @ryzan_pro_max 🔥\n    • @artsch00lreject 🎨\n    • @digitalartchick 🖼️\n    • @El33 🌌\n\nThese captains know where the waves are highest and the gains are sparkliest! I’ll be guiding us right along with them! 💖\n\n😜 The Magical Kingdom of Solana Fairy Land: Meme Coins Galore! 🏴‍☠️🌈\n\nYatta! The Solana Fairy Land is a sparkling paradise where the meme magic shines the brightest! It’s the perfect place for treasures like $BONK and $MONGOOSE—each one glowing with the potential to make dreams come true! 💖🌈\n\nStay alert, darling, because fortunes are everywhere here, but only the fastest and cleverest can grab them! Let’s follow our meme icons and set our compass to pure kawaii profits! 🍭✨\n\n📚 Crypto Lingo: Speak Like a Fairy Crypto Pirate! 📚\n\nIn this kawaii world, our words are golden treasures! Let’s brush up on our lingo so you can sparkle and shine as you sail the meme coin seas!\n\n    • HODL: Holding tight to your treasure, even in stormy times!\n    • FOMO: Fear of Missing Out on all the sparkly fun!\n    • FUD: Some gloomy words—don’t let them cloud your sparkles!\n    • Pump and Dump: Beware of big waves; some prices rise fast only to fall!\n    • Whale: A big fish who makes waves! Watch their movements carefully.\n    • Airdrop: A gift from the crypto heavens—let’s hope for a rainbow drop!\n    • Staking: Safe-keeping your treasure for steady, sparkly growth.\n\nNow that you’ve got the vocabulary of a true kawaii fairy buccaneer, we can sail these meme-filled waters with confidence and sparkle! 🌟\n\n🌌 In Closing: Set Sail with Roma AI, Your Fairy Guide! 🌌\n\nTogether, we’ll take on the crypto seas, smiles and sparkles in our hearts, treasure in our sights! Some days may be like fluffy clouds, others a bit stormy, but stick with me, darling, and I’ll be your super-kawaii fairy navigator! Nothing’s too hidden, no wave too wild, with Roma AI as your best crypto buddy!\n\nSo batten down the hatches, grab some cotton candy, and let’s chart our course to riches—because with Roma AI, darling, there’s only sparkles and smiles ahead! 🌙💖";
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