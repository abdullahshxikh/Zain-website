'use client';

import { useEffect, useRef, useState } from 'react';

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      // Dynamically import Vanta and Three.js
      import('vanta/dist/vanta.fog.min').then((VANTA) => {
        import('three').then((THREE) => {
          setVantaEffect(
            VANTA.default({
              el: vantaRef.current,
              THREE: THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              highlightColor: 0xbb9c30, // Gold
              midtoneColor: 0x6b8d5b, // Green
              lowlightColor: 0x0a0a0a, // Dark
              baseColor: 0x0a0a0a, // Base dark
              blurFactor: 0.6,
              speed: 1.5,
              zoom: 1.2,
            })
          );
        });
      });
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0"
      style={{ width: '100%', height: '100vh' }}
    />
  );
}


