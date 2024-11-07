import React from 'react';
import { Twitter, MessageCircle, Wallet } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex gap-4 items-center">
      <a
        href="https://twitter.com/bellwether"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-kawaii-blue/20 rounded-full transition-colors"
      >
        <Twitter className="text-kawaii-blue" />
      </a>
      <a
        href="https://t.me/bellwether"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-kawaii-purple/20 rounded-full transition-colors"
      >
        <MessageCircle className="text-kawaii-purple" />
      </a>
      <a
        href="#"
        className="p-2 hover:bg-kawaii-pink/20 rounded-full transition-colors"
        onClick={() => navigator.clipboard.writeText('0x1234...5678')}
      >
        <Wallet className="text-kawaii-pink" />
      </a>
    </div>
  );
}