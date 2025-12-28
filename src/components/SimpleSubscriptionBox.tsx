import React, { useState, useEffect, useRef } from 'react';

interface SimpleSubscriptionBoxProps {
  title?: string;
  description?: string;
}

const SimpleSubscriptionBox: React.FC<SimpleSubscriptionBoxProps> = ({
  title = "Weekly Testing Insights",
  description = "Join thousands of professionals getting practical automation tips."
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once visible
          }
        });
      },
      {
        rootMargin: '100px', // Load 100px before entering viewport
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="subscription-box-container" ref={containerRef}>
      <h4 className="subscription-box-title">
        {title}
      </h4>
      <p className="subscription-box-description">
        {description}
      </p>
      
      {isVisible ? (
        <iframe 
          width="100%" 
          height="320" 
          src="https://2daf0ef4.sibforms.com/serve/MUIFAPwOqMKfs4g6YMNkM4TROCaQJWPpM3m_meM7DPzmPrwffSbjh5hUP2k1H3bPQKZUtYUzKx--yH7KqZ0hWcAdo1XwL-4FSlQqUfynSE2MU46VaQnqnJEbDARiZ3H0YF1ssZl8maKfXymbVWkHAdzLtJzfM-ioJ1HHTe82sQwuRHRu-dwV9MFxUJ893S4yemAnN1PtOzWtpuAl" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen 
          className="subscription-box-iframe"
          title="Subscribe to Updates"
          loading="lazy"
        />
      ) : (
        <div 
          style={{ 
            height: '320px', 
            background: 'var(--ifm-color-emphasis-100)', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ifm-color-emphasis-600)'
          }}
        >
          Loading subscription form...
        </div>
      )}
    </div>
  );
};

export default SimpleSubscriptionBox;
