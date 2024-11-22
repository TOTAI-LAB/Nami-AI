import React from 'react';
import { Brain, Zap, Globe, Puzzle } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Fearless & Bold',
    description: 'Luffy AI is adventurous and daring, guiding you through the uncharted Bitcoin seas with confidence!',
  },
  {
    icon: Zap,
    title: 'Lightning Insights',
    description: 'Stay ahead with Luffy’s sharp insights and instant analysis of Bitcoin trends.',
  },
  {
    icon: Globe,
    title: 'Global Crypto Navigator',
    description: 'Luffy knows his way around the crypto world, always steering toward Bitcoin’s ultimate treasure.',
  },
  {
    icon: Puzzle,
    title: 'BTC Maximalist Expertise',
    description: 'Luffy specializes in Bitcoin, the ultimate treasure, and helps you focus on what truly matters.',
  },
];

export function Features() {
  return (
    <div className="py-24 bg-gradient-to-b from-gradientFrom to-gradientTo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Why You’ll Love BTC Maxi Luffy!
          </h2>
          <p className="mt-4 text-xl text-primary">
            With me, Captain Luffy, leading the charge, we’re sailing straight to the greatest crypto treasure ever—Bitcoin’s One Piece! Forget the altcoin circus. On this ship, it’s Bitcoin or nothing!
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-6 bg-secondary backdrop-blur-md ring-1 ring-borderLight rounded-2xl leading-none flex items-top justify-start space-x-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                  <div className="space-y-2">
                    <p className="text-primary font-medium">{feature.title}</p>
                    <p className="text-textPrimary text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}