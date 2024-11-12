import React from 'react';
import { Brain, Zap, Globe, Puzzle } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Street-Smart & Sassy',
    description: 'AIgent Nami is clever, charming, and full of tricks to navigate the unpredictable meme coin seas!',
  },
  {
    icon: Zap,
    title: 'Lightning Quick Insights',
    description: 'Stay one step ahead with Nami’s rapid-fire insights and quick reads on the latest meme trends.',
  },
  {
    icon: Globe,
    title: 'Global Crypto Navigator',
    description: 'Nami knows her way around the whole crypto world—from trending coins to hidden gems!',
  },
  {
    icon: Puzzle,
    title: 'Master of the Meme Coin Maze',
    description: 'Finding meme coin treasures is Nami’s specialty. Let her be your guide to navigating the wildest crypto adventures!',
  },
];

export function Features() {
  return (
    <div className="py-24 bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-pink-600 sm:text-4xl">
            Why You’ll Love AIgent Nami!
          </h2>
          <p className="mt-4 text-xl text-pink-500">
            Your savvy crypto companion with all the charm and cunning of the sea
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-200 to-pink-300 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-6 bg-pink-50 backdrop-blur-md ring-1 ring-pink-200 rounded-2xl leading-none flex items-top justify-start space-x-6">
                  <feature.icon className="w-8 h-8 text-pink-500" />
                  <div className="space-y-2">
                    <p className="text-pink-600 font-medium">{feature.title}</p>
                    <p className="text-pink-500 text-sm">{feature.description}</p>
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