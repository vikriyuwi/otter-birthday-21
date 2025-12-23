"use client";

import { Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusic({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error("Playback failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center bg-theme-green rounded-full shadow-lg overflow-hidden h-12"
        initial={false}
        animate={{
          width: isHovered ? "160px" : "48px", // Expands width on hover
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Toggle Icon Button */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-black"
        >
          {isPlaying && volume > 0 ? <Volume2 size={20} /> : <VolumeOff size={20} />}
        </button>

        {/* Volume Slider - Only visible when expanded */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="pr-4 flex items-center justify-center"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-1 bg-black/20 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <audio ref={audioRef} src={src} loop />
    </div>
  );
}