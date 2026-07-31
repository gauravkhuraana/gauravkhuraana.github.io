import React from 'react';
import { Coffee } from 'lucide-react';
import styles from './KofiSupport.module.css';

interface KofiSupportProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'button' | 'widget' | 'minimal';
  className?: string;
}

const KofiSupport: React.FC<KofiSupportProps> = ({ 
  size = 'medium', 
  variant = 'button',
  className = ''
}) => {
  const kofiUrl = 'https://ko-fi.com/gauravkhurana';
  
  if (variant === 'widget') {
    return (
      <div className={`${styles.kofiWidget} ${className}`}>
        <div className={styles.widgetContent}>
          <div className={styles.widgetIcon}><Coffee aria-hidden="true" size={42} /></div>
          <div className={styles.widgetText}>
            <h4>Support My Work</h4>
            <p>If you find my content helpful, consider buying me a coffee!</p>
          </div>
          <a 
            href={kofiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.widgetButton}
            data-analytics-event="support_cta_click"
            data-analytics-label="Ko-fi"
            data-analytics-location="support_widget"
          >
            <Coffee aria-hidden="true" size={18} />
            Buy Me a Coffee
          </a>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <a
        href={kofiUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.kofiMinimal} ${className}`}
        title="Support me on Ko-fi"
        data-analytics-event="support_cta_click"
        data-analytics-label="Ko-fi"
        data-analytics-location="support_minimal"
      >
        <Coffee aria-hidden="true" size={16} />
        Support
      </a>
    );
  }

  // Default button variant
  return (
    <a
      href={kofiUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.kofiButton} ${styles[size]} ${className}`}
      title="Support me on Ko-fi"
      aria-label="Support me on Ko-fi"
      data-analytics-event="support_cta_click"
      data-analytics-label="Ko-fi"
      data-analytics-location="floating_actions"
    >
      <span className={styles.kofiIcon}><Coffee aria-hidden="true" size={18} /></span>
      <span className={styles.kofiText}>Buy Me a Coffee</span>
    </a>
  );
};

export default KofiSupport;
