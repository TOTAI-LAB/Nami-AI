import React from 'react';
import { Twitter, MessageCircle, Wallet } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex gap-4 items-center">
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-accent/20 rounded-full transition-colors"
      >
        <Twitter className="text-primary" />
      </a>
      <a
        href="https://t.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-accent/20 rounded-full transition-colors"
      >
        <MessageCircle className="text-primary" />
      </a>
      <a
        href="#"
        className="p-2 hover:bg-accent/20 rounded-full transition-colors"
        onClick={() => navigator.clipboard.writeText('0x1234...5678')}
      >
        <Wallet className="text-primary" />
      </a>
    </div>
  );
}