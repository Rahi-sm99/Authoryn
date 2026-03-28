import { useMemo } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const particles = useMemo(() => Array.from({ length: 120 }), []);
  const lines = useMemo(() => Array.from({ length: 25 }), []);

  return (
    <div className="animated-bg">
      {particles.map((_, i) => (
        <div
          key={`p-${i}`}
          className="particle"
          style={{
            left: `${Math.random() * 100}vw`,
            bottom: `-${Math.random() * 20}vh`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 15}s`,
            opacity: 0.1 + Math.random() * 0.4,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
          }}
        />
      ))}
      {lines.map((_, i) => (
        <div
          key={`l-${i}`}
          className="line"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `-${Math.random() * 200}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${20 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
