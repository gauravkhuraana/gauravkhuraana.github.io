import React from 'react';

interface SimpleSubscriptionProps {
  className?: string;
}

const SimpleSubscription: React.FC<SimpleSubscriptionProps> = ({
  className = ""
}) => {
  return (
    <div className={`simple-subscription ${className}`}>
      <h3 className="simple-subscription-title">
        Stay Updated with Latest Insights
      </h3>
      
      <p className="simple-subscription-description">
        Get practical testing and automation tips delivered weekly.
      </p>
      
      <iframe 
        width="100%" 
        height="320" 
        src="https://2daf0ef4.sibforms.com/serve/MUIFAPwOqMKfs4g6YMNkM4TROCaQJWPpM3m_meM7DPzmPrwffSbjh5hUP2k1H3bPQKZUtYUzKx--yH7KqZ0hWcAdo1XwL-4FSlQqUfynSE2MU46VaQnqnJEbDARiZ3H0YF1ssZl8maKfXymbVWkHAdzLtJzfM-ioJ1HHTe82sQwuRHRu-dwV9MFxUJ893S4yemAnN1PtOzWtpuAl" 
        frameBorder="0" 
        scrolling="no" 
        allowFullScreen 
        className="simple-subscription-iframe"
        title="Subscribe to Testing & Automation Updates"
      />
    </div>
  );
};

export default SimpleSubscription;
