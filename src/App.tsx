import React, { useEffect, useRef } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { SocialLinks } from './components/SocialLinks';
import { Features } from './components/Features';

export function App() {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const features = featuresRef.current;
    if (features) {
      observer.observe(features);
    }

    return () => {
      if (features) {
        observer.unobserve(features);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-kawaii-pink/20 to-kawaii-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {/* Hero Section */}
            <div className="py-16 sm:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Anime Character */}
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1698778573682-346d219402b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="AI Assistant"
                    className="w-full h-auto rounded-lg shadow-2xl animate-float"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kawaii-purple/30 to-transparent rounded-lg" />
                </div>

                {/* Right side - Chat Interface */}
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
                      Meet Your Kawaii AI Friend
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                      Experience magical conversations with your cute AI companion.
                    </p>
                  </div>

                  <ChatInterface />
                  
                  <div className="flex justify-center">
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div ref={featuresRef} className="opacity-0">
              <Features />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}