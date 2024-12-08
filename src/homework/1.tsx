import React, { useEffect, useRef } from 'react';

interface Props {
  onContentEndVisible: () => void;
  children: React.ReactNode;
}

export function Observer({ children, onContentEndVisible }: Props) {
  // Правильний тип для useRef
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Використовуємо вбудований тип IntersectionObserverInit
    const options: IntersectionObserverInit = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
