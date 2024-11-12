import React, { useEffect, useState, useRef } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { SocialLinks } from './components/SocialLinks';
import { Features } from './components/Features';

// Import the local images
import aiCharacter1 from './assets/images/nami.png';
import aiCharacter2 from './assets/images/nami-1.png';
import aiCharacter3 from './assets/images/nami-2.png';
import aiCharacter4 from './assets/images/nami-3.png';
import aiCharacter5 from './assets/images/nami-4.png';
import aiCharacter6 from './assets/images/nami-5.png';

export function App() {
  const [currentImage, setCurrentImage] = useState(aiCharacter1);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set interval to change image every 5 seconds
    const images = [aiCharacter1, aiCharacter2, aiCharacter3, aiCharacter4, aiCharacter5, aiCharacter6];
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-100/50 to-transparent rounded-lg" />
                </div>

                {/* Right side - Chat Interface */}
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold text-pink-600 sm:text-5xl">
                    Welcome to the Grand Line of Riches!
                    </h1>
                    <p className="mt-4 text-xl text-pink-500">
                    With me, Nami, by your side, you’re just one map away from the next big score!
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