import React from 'react';

interface SimpleSubscriptionBoxProps {
  title?: string;
  description?: string;
}

const SimpleSubscriptionBox: React.FC<SimpleSubscriptionBoxProps> = ({
  title = "📧 Weekly Testing Insights",
  description = "Join thousands of professionals getting practical automation tips."
}) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '2rem 0',
      textAlign: 'center',
      color: 'white',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    }}>
      <h4 style={{ 
        marginBottom: '0.5rem', 
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: '600'
      }}>
        {title}
      </h4>
      <p style={{ 
        marginBottom: '1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.95rem'
      }}>
        {description}
      </p>
      
      <iframe 
        width="100%" 
        height="320" 
        src="https://2daf0ef4.sibforms.com/serve/MUIFAPwOqMKfs4g6YMNkM4TROCaQJWPpM3m_meM7DPzmPrwffSbjh5hUP2k1H3bPQKZUtYUzKx--yH7KqZ0hWcAdo1XwL-4FSlQqUfynSE2MU46VaQnqnJEbDARiZ3H0YF1ssZl8maKfXymbVWkHAdzLtJzfM-ioJ1HHTe82sQwuRHRu-dwV9MFxUJ893S4yemAnN1PtOzWtpuAl" 
        frameBorder="0" 
        scrolling="no" 
        allowFullScreen 
        style={{
          border: 'none',
          borderRadius: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          minHeight: '320px',
          maxHeight: '320px',
          overflow: 'hidden'
        }}
        title="Subscribe to Updates"
      />
    </div>
  );
};

export default SimpleSubscriptionBox;
