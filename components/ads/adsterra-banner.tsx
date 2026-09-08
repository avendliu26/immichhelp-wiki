'use client';

import { useEffect, useRef, useState } from 'react';

type BannerSize = 'mobile-320x50' | 'desktop-728x90' | 'rectangle-300x250';
const configs: Record<BannerSize, { key: string; width: number; height: number }> = {
  'mobile-320x50': { key: 'e6117858332ac4d2985dca2abdfa1515', width: 320, height: 50 },
  'desktop-728x90': { key: 'f0448e889300e6feed2c15dc719012d9', width: 728, height: 90 },
  'rectangle-300x250': { key: 'd53063b85e893e3fbe35895c6b01ba11', width: 300, height: 250 },
};
let loadQueue = Promise.resolve();

export function AdsterraBanner({ size, mobileSize, className = '' }: { size: BannerSize; mobileSize?: BannerSize; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSize, setActiveSize] = useState<BannerSize | null>(null);
  useEffect(() => {
    if (window.location.hostname !== 'immichhelp.wiki') return;
    const chooseSize = () => setActiveSize(window.matchMedia('(max-width: 767px)').matches ? (mobileSize || null) : size);
    chooseSize();
    window.addEventListener('resize', chooseSize);
    return () => window.removeEventListener('resize', chooseSize);
  }, [size, mobileSize]);
  useEffect(() => {
    if (!activeSize || !containerRef.current) return;
    const config = configs[activeSize];
    const container = containerRef.current;
    container.replaceChildren();
    const slot = document.createElement('div');
    slot.className = 'adsterra-slot';
    slot.style.width = `${config.width}px`;
    slot.style.height = `${config.height}px`;
    const script = document.createElement('script');
    script.src = `https://www.highrevenueformat.com/${config.key}/invoke.js`;
    script.async = true;
    loadQueue = loadQueue.then(() => new Promise<void>((resolve) => {
      (window as Window & { atOptions?: unknown }).atOptions = { key: config.key, format: 'iframe', height: config.height, width: config.width, params: {} };
      script.addEventListener('load', () => resolve(), { once: true });
      script.addEventListener('error', () => resolve(), { once: true });
      slot.appendChild(script);
      container.appendChild(slot);
    }));
  }, [activeSize]);
  const config = activeSize ? configs[activeSize] : configs[size];
  return <div ref={containerRef} className={`adsterra-banner adsterra-${size} ${className}`} style={{ minHeight: activeSize ? config.height : 0 }} aria-label="Advertisement"><span className="ad-label">Advertisement</span></div>;
}
