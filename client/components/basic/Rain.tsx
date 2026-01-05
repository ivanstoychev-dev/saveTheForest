import { useState } from "react";

function Rain() {
  const [drops] = useState(() =>
    Array.from({ length: 80 }).map(() => ({
      left: Math.random() * 100,
      duration: 0.4 + Math.random() * 0.8,
      delay: Math.random() * 1,
      opacity: 0.2 + Math.random() * 0.4,
    }))
  );
  return (
    <div className="rain">
      {drops.map((drop, i) => (
        <div
          key={i}
          className="drop"
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default Rain;
