"use client";

import { Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic({
    src
}: {
    src: string
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Playback failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={src} // Place your file in public/music/
        loop
      />
      <button
        onClick={togglePlay}
        className="px-4 py-2 bg-theme-green text-black rounded-full text-sm aspect-square"
      >
        {isPlaying ? <Volume2 /> : <VolumeOff />}
      </button>
    </div>
  );
}