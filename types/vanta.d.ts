declare module 'vanta/dist/vanta.fog.min' {
  interface VantaEffect {
    destroy: () => void;
  }

  interface VantaOptions {
    el: HTMLElement | null;
    THREE: any;
    mouseControls: boolean;
    touchControls: boolean;
    gyroControls: boolean;
    minHeight: number;
    minWidth: number;
    highlightColor: number;
    midtoneColor: number;
    lowlightColor: number;
    baseColor: number;
    blurFactor: number;
    speed: number;
    zoom: number;
  }

  export default function (options: Partial<VantaOptions>): VantaEffect;
}

declare module 'three' {
  const THREE: any;
  export default THREE;
}

