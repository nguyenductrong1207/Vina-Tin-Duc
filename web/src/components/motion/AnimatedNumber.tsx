import { useRef, useEffect, useState } from 'react';
import { useInView } from 'motion/react';

interface AnimatedNumberProps {
  value: string;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
  duration?: number;
}

export function AnimatedNumber({
  value,
  suffix,
  className,
  suffixClassName,
  duration = 2000,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const [display, setDisplay] = useState('0');

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric) setDisplay(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(eased * numericValue);
      setDisplay(current.toLocaleString());

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericValue, value, isNumeric, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
}
