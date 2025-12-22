'use client';

import { useEffect, useState } from 'react';
import styles from './../(scss)/Particles.module.scss';

interface Particle {
  id: number;
  size: string;
  hue: number;
  rotate: string;
  x: string;
  y: string;
  delay: string;
}

const TOTAL_PARTICLES = 200;
const TIME_S = 10;

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];

    for (let i = 1; i <= TOTAL_PARTICLES; i++) {
      const sizeVal = Math.floor(Math.random() * 50);
      // Even though rotating a solid circle isn't visible, 
      // we keep these values so the motion path is identical to the original.
      const rotateVal = Math.floor(Math.random() * 360);
      const hueVal = Math.floor(Math.random() * 360);
      const xVal = Math.floor(Math.random() * 1000);
      const yVal = Math.floor(Math.random() * 1000);
      const delayVal = i * -(TIME_S / TOTAL_PARTICLES);

      newParticles.push({
        id: i,
        size: `${sizeVal}px`,
        hue: hueVal,
        rotate: `${rotateVal}deg`,
        x: `${xVal}px`,
        y: `${yVal}px`,
        delay: `${delayVal}s`,
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className={styles.container}>
      {particles.map((p) => (
        <div
          key={p.id}
          // Changed from styles.tri to styles.particle
          className={styles.particle} 
          style={
            {
              '--size': p.size,
              '--hue': p.hue,
              '--rotate': p.rotate,
              '--x': p.x,
              '--y': p.y,
              '--delay': p.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}