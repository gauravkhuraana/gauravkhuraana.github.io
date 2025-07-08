import React from 'react';
import styles from './SubscriptionForm.module.css';

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
        
        <div className={styles.formWrapper}>
          <iframe 
            width="100%" 
            height="320" 
            src="https://2daf0ef4.sibforms.com/serve/MUIFAPwOqMKfs4g6YMNkM4TROCaQJWPpM3m_meM7DPzmPrwffSbjh5hUP2k1H3bPQKZUtYUzKx--yH7KqZ0hWcAdo1XwL-4FSlQqUfynSE2MU46VaQnqnJEbDARiZ3H0YF1ssZl8maKfXymbVWkHAdzLtJzfM-ioJ1HHTe82sQwuRHRu-dwV9MFxUJ893S4yemAnN1PtOzWtpuAl" 
            frameBorder="0" 
            scrolling="no" 
            allowFullScreen 
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '100%',
              minHeight: '320px',
              maxHeight: '320px',
              border: 'none',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
            title="Subscribe to Testing & Automation Updates"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
