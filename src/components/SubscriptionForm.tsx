import React, { useEffect, useRef, useState } from 'react';
import styles from './SubscriptionForm.module.css';

/** Lazy-loads an iframe only when it scrolls into view */
function LazyIframe({ src, title, height }: { src: string; title: string; height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.formWrapper} style={{ minHeight: `${height}px` }}>
      {visible ? (
        <iframe
          width="100%"
          height={height}
          src={src}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '100%',
            minHeight: `${height}px`,
            maxHeight: `${height}px`,
            border: 'none',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
          title={title}
        />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: `${height}px`, color: '#888' }}>
          Loading subscription form...
        </div>
      )}
    </div>
  );
}

interface SubscriptionFormProps {
  title?: string;
  description?: string;
  className?: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  title = "Stay Updated with Latest Testing & Automation Tips",
  description = "Get exclusive insights, tutorials, and industry updates delivered to your inbox. Join thousands of testers and automation engineers who trust our content.",
  className = ""
}) => {
  return (
    <div className={`${styles.subscriptionContainer} ${className}`}>
      <div className={styles.subscriptionContent}>
        <h3 className={styles.subscriptionTitle}>{title}</h3>
        <p className={styles.subscriptionDescription}>{description}</p>
        
        <LazyIframe
          src="https://2daf0ef4.sibforms.com/serve/MUIFAPwOqMKfs4g6YMNkM4TROCaQJWPpM3m_meM7DPzmPrwffSbjh5hUP2k1H3bPQKZUtYUzKx--yH7KqZ0hWcAdo1XwL-4FSlQqUfynSE2MU46VaQnqnJEbDARiZ3H0YF1ssZl8maKfXymbVWkHAdzLtJzfM-ioJ1HHTe82sQwuRHRu-dwV9MFxUJ893S4yemAnN1PtOzWtpuAl"
          title="Subscribe to Testing & Automation Updates"
          height={320}
        />
      </div>
    </div>
  );
};

export default SubscriptionForm;
