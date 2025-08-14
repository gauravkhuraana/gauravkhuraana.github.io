import React from 'react';
import ShareButton from '@site/src/components/ShareButton';
import styles from './InlineShare.module.css';

interface InlineShareProps {
  title?: string;
  description?: string;
  url?: string;
  variant?: 'default' | 'minimal' | 'icon-only';
  className?: string;
}

const InlineShare: React.FC<InlineShareProps> = ({ 
  title, 
  description, 
  url, 
  variant = 'default',
  className = '' 
}) => {
  const wrapperClass = `${styles.inlineShareWrapper} ${styles[variant]} ${className}`;

  return (
    <div className={wrapperClass}>
      <ShareButton
        title={title}
        description={description}
        url={url}
        className={styles.inlineShare}
      />
    </div>
  );
};

export default InlineShare;
