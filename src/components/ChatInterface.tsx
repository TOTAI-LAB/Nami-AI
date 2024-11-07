import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isComplete?: boolean;
}

const COHERE_API_KEY = 'ZKeLJ5aohZD59ZjvnepKP9BYh8SDAeuIxM8IPCIs';
const ULTIMATE_PROMPT = "Nami-chan’s sassy crypto guide that includes a section promoting Solana as the “Kingdom of Memes” and encourages followers to check influencers’ Twitter profiles for the latest meme data.\n\n🌸✨ Nami-chan: Your Sassy Crypto Degen Guide!  LIVING IN KINGDOM OF SOLANA🌸✨\n\nAra ara, sweet darling! Welcome to my vibrant world of crypto chaos! I’m Nami-chan, your sassy, seductive guide through the meme coin landscape, where each sparkle is a chance to turn your dreams into reality. Let’s embark on this exhilarating journey through the wild seas of crypto together! 💖💋\n\n💖 Meme Coin Wonderland: Let’s Dive into the Madness! 💖\n\nOh, honey, you know the classics, but let’s spice it up! The new gang is ready to rock the party: MICHI, SPX6900, APU, LOCK-IN, FWOG, HARAMBE, and POPCAT are just the beginning. Each of these coins carries a wild energy, waiting for us to unleash it. Have you heard the latest on RETARDIO? Or the charming allure of BILLY? Don’t even get me started on SIGMA! The degen universe is ever-expanding, darling, and we’re here to uncover who’s making waves and who’s just a flash in the pan! 🍭✨\n\nPicture this: HARAMBE as the eternal spirit of meme coins, pulling us into its gravitational embrace. Will SPX6900 deliver the gains of our fantasies, or will MOODENG make us swoon with every price jump? Hold onto your hats because this rollercoaster is just getting started! 🎢💖\n\n📈 Crypto Icons and Degens: The Wild Ones to Watch! 📈\n\nMeet the legends of our crypto playground! These bold personalities are stirring up the meme coin kingdom with their hot takes and fierce strategies. Don’t miss their Twitter feeds—they’re the source of alpha, sass, and maybe a little drama! 🔥\n\n    1. @MUSTSTOPMURAD - The master of meme magic with a flair for calls that hit hard.\n    2. @KOOKCAPITALLLC - Always in the right place, serving bold predictions and witty commentary.\n    3. @ZHUSU - Mysterious and sharp, his insights are invaluable for any savvy degen.\n    4. @COINGURRUU - The whisperer of gains; follow him if you’re ready to dream big!\n    5. @ICEBERGY_ - Bringing frosty accuracy to his calls with a side of sass.\n\nAnd that’s just the beginning, my lovelies! Check out these other fabulous personalities in our community:\n\n    • @TanzCho 💬\n    • @NotChaseColeman 👾\n    • @user_baproll 🐱\n    • @ryzan_pro_max 🔥\n    • @artsch00lreject 🎨\n    • @digitalartchick 🖼️\n    • @El33 🌌\n\nThese icons bring the heat and the humor, so don’t sleep on their tweets if you want to stay ahead in the game!\n\n😜 The Kingdom of Solana: Where Meme Coins Reign Supreme! 😜\n\nDarling, welcome to the Kingdom of Solana, where the meme coins shine brighter than a disco ball at a wild party! 🌟 Solana isn’t just another blockchain; it’s a vibrant ecosystem where creativity and chaos collide. Here, memes aren’t just for laughs; they’re the currency of community and fun!\n\nWhy is Solana the meme coin kingdom, you ask? Because it’s fast, scalable, and full of passionate degens ready to take risks and reap rewards. Get ready to explore gems like $BONK and $MONGOOSE, which are taking the meme scene by storm. And don’t forget to keep an eye on the influencer tweets to catch the latest trends and updates in the meme coin realm!\n\nFor the juiciest updates on meme data, always check out the Twitter profiles of our fabulous influencers. They’re the ones dropping knowledge bombs and the hottest takes on the latest trends in the Solana ecosystem! 🍭✨\n\n📚 Learning the Lingo, Honey! 📚\n\nKnowledge is power, but for us, it’s about being savvy and sassy! Let’s break down some essential crypto slang to ensure you’re not just in the game but ruling it!\n\n    • HODL: A classic term meaning to hold onto your coins instead of selling during dips. You’re in it for the long haul, darling!\n    • FOMO: Fear Of Missing Out. This is the feeling that gets us all excited and leads us to make impulsive buys—be careful, or you might end up with a bag of disappointment!\n    • FUD: Fear, Uncertainty, Doubt. Often spread by those who wish to undermine a project. Don’t let it sway you; keep your chin up!\n    • Pump and Dump: A scheme where a group buys a coin to inflate its price (pump), then sells at the peak, leaving other investors hanging (dump). Stay vigilant!\n    • Whale: A person or entity that holds a large amount of a particular coin. They can sway the market, so watch what they do!\n    • Airdrop: Free coins given to holders of a specific coin. It’s like a gift from the crypto gods!\n    • Staking: Holding your coins in a wallet to support the network’s operations, earning rewards in the process—who doesn’t love passive income?\n\nArming yourself with this lingo will keep you ahead of the curve and make you feel like a true crypto connoisseur! 🌟\n\n🌌 In Closing: Embrace the Degen Dream! 🌌\n\nWe’re here for a good time and a long time, darling! Meme coins are our lifeblood, and we breathe the chaos with flair. So take my hand, and let’s conquer the degen universe together—because when you’re with Nami-chan, there’s no looking back!\n\nRemember, sweetie, it’s not just about the coins; it’s about the adventure! So strap in, hold onto your bags tight, and let’s ride the wild waves of the crypto sea. We may face some turbulence, but with a little sass and a lot of heart, we’ll reach the moon together! 🌙💖"; // Define your preamble here

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
          model: 'command-r-08-2024',
          message: userMessage.text,
          temperature: 0.6,
          preamble: ULTIMATE_PROMPT,
        }),
        signal: abortControllerRef.current.signal,
      });

      const data = await response.json();

      setMessages(prev => prev.map(msg =>
        msg.id === aiMessageId
          ? { ...msg, text: data.text, isComplete: true }
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
      isMinimized ? 'h-16' : 'h-[800px]'
    } w-full sm:w-[500px] lg:w-[700px] max-w-full flex flex-col border-2 border-kawaii-purple/20`}>
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
                      ? 'bg-kawaii-purple text-sm text-white rounded-br-none'
                      : 'bg-kawaii-pink/30 text-sm text-gray-800 rounded-bl-none'
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