import React from 'react';

const QuickSubscribe: React.FC = () => {
  return (
    <div className="quick-subscribe-container">
      <p className="quick-subscribe-text">
        Never miss testing and automation insights!
      </p>
      <iframe 
        width="100%" 
        height="320" 
        src="https://2daf0ef4.sibforms.com/serve/MUIFAPwOqMKfs4g6YMNkM4TROCaQJWPpM3m_meM7DPzmPrwffSbjh5hUP2k1H3bPQKZUtYUzKx--yH7KqZ0hWcAdo1XwL-4FSlQqUfynSE2MU46VaQnqnJEbDARiZ3H0YF1ssZl8maKfXymbVWkHAdzLtJzfM-ioJ1HHTe82sQwuRHRu-dwV9MFxUJ893S4yemAnN1PtOzWtpuAl" 
        frameBorder="0" 
        scrolling="no" 
        allowFullScreen 
        className="quick-subscribe-iframe"
        title="Quick Subscribe"
      />
    </div>
  );
};

export default QuickSubscribe;
