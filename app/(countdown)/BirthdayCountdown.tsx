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
    <div className="p-10 grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center">
      {/* DAYS */}
      <div className='flex flex-col text-center gap-5'>
        <h1 className='text-8xl md:text-9xl text-theme-beige font-serif font-black'>{timeLeft.days}</h1>
        <span className="text-2xl">DAYS</span>
      </div>

      {/* HOURS */}
      <div className='flex flex-col text-center gap-5'>
        <h1 className='text-8xl md:text-9xl text-theme-beige font-serif font-black'>{timeLeft.hours}</h1>
        <span className="text-2xl">HOURS</span>
      </div>

      {/* MINUTES */}
      <div className='flex flex-col text-center gap-5'>
        <h1 className='text-8xl md:text-9xl text-theme-beige font-serif font-black'>{timeLeft.minutes}</h1>
        <span className="text-2xl">MINUTES</span>
      </div>

      {/* SECONDS */}
      <div className='flex flex-col text-center gap-5'>
        <h1 className='text-8xl md:text-9xl text-theme-green font-serif font-black'>{timeLeft.seconds}</h1>
        <span className="text-2xl">SECONDS</span>
      </div>
    </div>
  );
}