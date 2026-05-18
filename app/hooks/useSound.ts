"use client";

import { useEffect, useRef } from 'react';

export const useSound = (url: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(url);
    audioRef.current.volume = 0.2; // Keep it subtle
  }, [url]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore autoplay errors or user interaction requirements
      });
    }
  };

  return { play };
};
