"use client"; // Required for hooks in Next.js App Router

import { useState, useEffect } from "react";
import BirthdayCountdownView from "./(countdown)/BirthdayCountdownView";
import ForOtterPage from "./(main)/ForOtterPage";

export default function Home() {
  const targetDate = new Date('2025-12-24T00:00:00+07:00').getTime();
  
  // 1. Initialize state based on the current time
  const [isPastTarget, setIsPastTarget] = useState(false);

  useEffect(() => {
    // 2. Create a timer that checks every second
    const timer = setInterval(() => {
      const now = new Date().getTime();
      if (now >= targetDate) {
        setIsPastTarget(true);
        clearInterval(timer); // Stop checking once we've reached the date
      }
    }, 1000);

    // 3. Cleanup the timer if the component unmounts
    return () => clearInterval(timer);
  }, [targetDate]);

  // 4. Render based on the state
  if (!isPastTarget) {
    return <BirthdayCountdownView />;
  }

  return <ForOtterPage />;
}