"use client"
import { useState, useEffect } from 'react';
import SpaceHopper from './components/SpaceHopper';


export default function HomePage() {
  const [text, setText] = useState('');
  const fullText = "Hi, I'm Akon. A Full Stack Developer.";
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText((prev) => fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowSubtext(true), 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <h1 className="text-4xl font-bold text-foreground">{text}</h1>
      {showSubtext && (
        <p className="mt-4 text-lg text-muted-foreground transition-opacity duration-700">
          Creating modern, scalable web applications.
        </p>
      )}
      <SpaceHopper/>
     
    </section>
  );
}
