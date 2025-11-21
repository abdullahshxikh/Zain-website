'use client';

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: number;
  initial?: number;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  height = 420,
  initial = 50,
  className = '',
}: BeforeAfterSliderProps) {
  return (
    <div 
      className={`relative ${className}`} 
      style={{ height: `${height}px` }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeSrc}
            alt={beforeLabel}
            style={{ objectFit: 'cover' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterSrc}
            alt={afterLabel}
            style={{ objectFit: 'cover' }}
          />
        }
        position={initial}
        style={{ height: '100%' }}
      />
      
      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
        <span className="text-white text-xs font-medium">{beforeLabel}</span>
      </div>
      <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
        <span className="text-white text-xs font-medium">{afterLabel}</span>
      </div>
    </div>
  );
} 

