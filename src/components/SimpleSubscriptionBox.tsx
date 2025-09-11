import React from 'react';

interface SimpleSubscriptionBoxProps {
  title?: string;
  description?: string;
}

const SimpleSubscriptionBox: React.FC<SimpleSubscriptionBoxProps> = ({
  title = "Weekly Testing Insights",
  description = "Join thousands of professionals getting practical automation tips."
}) => {
  return (
    <div className="subscription-box-container">
      <h4 className="subscription-box-title">
        {title}
      </h4>
      <p className="subscription-box-description">
        {description}
      </p>
      
      <iframe 
        width="100%" 
        height="320" 
        src="https://2daf0ef4.sibforms.com/serve/MUIFAPwOqMKfs4g6YMNkM4TROCaQJWPpM3m_meM7DPzmPrwffSbjh5hUP2k1H3bPQKZUtYUzKx--yH7KqZ0hWcAdo1XwL-4FSlQqUfynSE2MU46VaQnqnJEbDARiZ3H0YF1ssZl8maKfXymbVWkHAdzLtJzfM-ioJ1HHTe82sQwuRHRu-dwV9MFxUJ893S4yemAnN1PtOzWtpuAl" 
        frameBorder="0" 
        scrolling="no" 
        allowFullScreen 
        className="subscription-box-iframe"
        title="Subscribe to Updates"
      />
    </div>
  );
};

export default SimpleSubscriptionBox;
