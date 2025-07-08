import React from 'react';

interface SimpleSubscriptionProps {
  className?: string;
}

const SimpleSubscription: React.FC<SimpleSubscriptionProps> = ({
  className = ""
}) => {
  return (
    <div className={`simple-subscription ${className}`} style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '2rem 0',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
    }}>
      <h3 style={{ 
        marginBottom: '0.5rem',
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'white'
      }}>
        📧 Stay Updated with Latest Insights
      </h3>
      
      <p style={{ 
        marginBottom: '1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.95rem'
      }}>
        Get practical testing and automation tips delivered weekly.
      </p>
      
      <iframe 
        width="100%" 
        height="320" 
        src="https://2daf0ef4.sibforms.com/serve/MUIFAPwOqMKfs4g6YMNkM4TROCaQJWPpM3m_meM7DPzmPrwffSbjh5hUP2k1H3bPQKZUtYUzKx--yH7KqZ0hWcAdo1XwL-4FSlQqUfynSE2MU46VaQnqnJEbDARiZ3H0YF1ssZl8maKfXymbVWkHAdzLtJzfM-ioJ1HHTe82sQwuRHRu-dwV9MFxUJ893S4yemAnN1PtOzWtpuAl" 
        frameBorder="0" 
        scrolling="no" 
        allowFullScreen 
        style={{
          maxWidth: '100%',
          minHeight: '320px',
          maxHeight: '320px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          display: 'block'
        }}
        title="Subscribe to Testing & Automation Updates"
      />
    </div>
  );
};

export default SimpleSubscription;
