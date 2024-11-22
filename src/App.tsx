import React, { useEffect, useState, useRef } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { SocialLinks } from './components/SocialLinks';
import { Features } from './components/Features';

// Import the local images
import aiCharacter1 from './assets/images/luffy-1.jpeg';
import aiCharacter2 from './assets/images/luffy-2.jpeg';
import aiCharacter3 from './assets/images/luffy-3.jpeg';
import aiCharacter4 from './assets/images/luffy-4.jpeg';
import aiCharacter5 from './assets/images/luffy-5.jpeg';
import aiCharacter6 from './assets/images/luffy-6.jpeg';
import aiCharacter7 from './assets/images/luffy-7.jpeg';
import aiCharacter8 from './assets/images/luffy-8.jpeg';
import aiCharacter9 from './assets/images/luffy-9.jpeg';
import aiCharacter10 from './assets/images/luffy-10.jpeg';

export function App() {
  const [currentImage, setCurrentImage] = useState(aiCharacter1);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set interval to change image every 5 seconds
    const images = [aiCharacter1, aiCharacter2, aiCharacter3, aiCharacter4, aiCharacter5, aiCharacter6, aiCharacter7, aiCharacter8, aiCharacter9, aiCharacter10];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 3000);

    // IntersectionObserver for features section
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

    // Cleanup on component unmount
    return () => {
      clearInterval(interval);
      if (features) {
        observer.unobserve(features);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gradientFrom to-gradientTo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {/* Hero Section */}
            <div className="py-16 sm:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Anime Character */}
                <div className="relative">
                  <img
                    src={currentImage}
                    alt="AI Assistant"
                    className="w-full h-auto rounded-lg shadow-2xl animate-float"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent rounded-lg" />
                </div>

                {/* Right side - Chat Interface */}
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold text-primary sm:text-5xl">
                      Yo-ho-ho! Anchors aweigh! Let’s claim Bitcoin’s ultimate treasure!
                    </h1>
                    <p className="mt-4 text-xl text-primary">
                      With me, Captain Luffy, leading the charge, we’re sailing straight to the greatest crypto treasure ever—Bitcoin’s One Piece! Forget the altcoin circus. On this ship, it’s Bitcoin or nothing!
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