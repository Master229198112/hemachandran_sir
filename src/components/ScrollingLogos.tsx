'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollingLogos.module.css';

interface Partner {
  _id: string;
  name: string;
  imageUrl: string;
}

interface ScrollingLogosProps {
  title: string;
  logos: Partner[];
}

export default function ScrollingLogos({ title, logos }: ScrollingLogosProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // We duplicate the logos array to create a seamless infinite loop illusion
  // If there are very few logos, we might need to duplicate it more times to fill wide screens.
  const displayLogos = [...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;

    const scroll = () => {
      if (!isHovered && !isDragging) {
        scrollContainer.scrollLeft += 1; // Speed of auto-scroll
        
        // Reset scroll position to create infinite loop
        // We reset when we've scrolled exactly the width of the original set
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  // Handle manual dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftStart.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  if (!logos || logos.length === 0) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.scrollWrapper}>
        <div 
          ref={scrollRef}
          className={styles.scrollArea}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {displayLogos.map((logo, index) => (
            <div key={`${logo._id}-${index}`} className={styles.logoCard} title={logo.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.imageUrl} alt={logo.name} className={styles.logoImage} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
