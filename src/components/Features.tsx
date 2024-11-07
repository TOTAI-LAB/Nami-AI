import React from 'react';
import { Brain, Zap, Globe, Puzzle } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Smart & Friendly AI',
    description: 'Powered by kawaii intelligence for sweet and natural conversations.',
  },
  {
    icon: Zap,
    title: 'Quick as a Bunny',
    description: 'Get instant responses with our magical processing system.',
  },
  {
    icon: Globe,
    title: 'Universal Friend',
    description: 'A knowledgeable companion for all your questions and chats.',
  },
  {
    icon: Puzzle,
    title: 'Easy to Love',
    description: 'Seamlessly fits into your daily digital adventures.',
  },
];

export function Features() {
  return (
    <div className="py-24 bg-gradient-to-b from-kawaii-purple/5 to-kawaii-pink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Why You'll Love Me!
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Your perfect AI companion for magical conversations
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-kawaii-pink to-kawaii-purple rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-6 bg-white/80 backdrop-blur-sm ring-1 ring-kawaii-purple/10 rounded-2xl leading-none flex items-top justify-start space-x-6">
                  <feature.icon className="w-8 h-8 text-kawaii-purple" />
                  <div className="space-y-2">
                    <p className="text-gray-800 font-medium">{feature.title}</p>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
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