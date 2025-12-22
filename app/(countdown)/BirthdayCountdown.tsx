'use client';

import { useState, useEffect } from 'react';

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // fix hydration mismatch

    // Target: Dec 24, 2025 at 00:00:00 Jakarta Time (UTC+7)
    const targetDate = new Date('2025-12-24T00:00:00+07:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        // 1. Calculate the raw units
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Stop the timer if we reached the date
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Prevent rendering on server to avoid hydration errors
  if (!isClient) return <span>Loading...</span>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center">
      {/* DAYS */}
      <div style={{ textAlign: 'center' }}>
        <h1 className='text-9xl font-headline'>{timeLeft.days}</h1>
        <span>Days</span>
      </div>

      {/* HOURS */}
      <div style={{ textAlign: 'center' }}>
        <h1 className='text-9xl font-headline'>{timeLeft.hours}</h1>
        <span>Hours</span>
      </div>

      {/* MINUTES */}
      <div style={{ textAlign: 'center' }}>
        <h1 className='text-9xl font-headline'>{timeLeft.minutes}</h1>
        <span>Minutes</span>
      </div>

      {/* SECONDS */}
      <div style={{ textAlign: 'center' }}>
        <h1 className='text-9xl text-pink-500 font-headline'>{timeLeft.seconds}</h1>
        <span>Seconds</span>
      </div>

    </div>
  );
}