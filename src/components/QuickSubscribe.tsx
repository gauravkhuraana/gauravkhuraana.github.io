import React from 'react';

const QuickSubscribe: React.FC = () => {
  return (
    <div style={{
      background: '#4f46e5',
      borderRadius: '6px',
      padding: '1rem',
      margin: '1.5rem 0',
      textAlign: 'center',
      color: 'white'
    }}>
      <p style={{ 
        margin: '0 0 0.5rem 0',
        fontWeight: '600',
        fontSize: '1rem'
      }}>
        💌 Never miss testing & automation insights!
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
          borderRadius: '4px',
          minHeight: '320px',
          maxHeight: '320px',
          overflow: 'hidden',
          display: 'block'
        }}
        title="Quick Subscribe"
      />
    </div>
  );
};

export default QuickSubscribe;
