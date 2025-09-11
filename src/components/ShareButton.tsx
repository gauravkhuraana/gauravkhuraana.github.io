import React, { useState, useEffect } from 'react';
import styles from './ShareButton.module.css';

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  url = '',
  title = '',
  description = '',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(url || window.location.href);
      setCurrentTitle(title || document.title);
      setCurrentDescription(description || 
        document.querySelector('meta[name="description"]')?.getAttribute('content') ||
        'Expert insights on software testing, test automation, DevOps, and AI tools from Gaurav Khurana'
      );
    }
  }, [url, title, description]);

  const shareData = {
    url: currentUrl,
    title: currentTitle,
    text: currentDescription
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: 'WA',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`)}`,
      color: '#25D366'
    },
    {
      name: 'LinkedIn',
      icon: 'LI',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
      color: '#0077B5'
    },
    {
      name: 'X (Twitter)',
      icon: 'X',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}&via=gauravkhuraana`,
      color: '#1DA1F2'
    },
    {
      name: 'Facebook',
      icon: 'FB',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
      color: '#1877F2'
    },
    {
      name: 'Telegram',
      icon: 'TG',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}`,
      color: '#0088CC'
    },
    {
      name: 'Reddit',
      icon: 'RD',
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}`,
      color: '#FF4500'
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      // Show brief feedback
      const button = document.querySelector('.copy-feedback');
      if (button) {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy Link';
        }, 2000);
      }
    } catch (error) {
      console.log('Error copying to clipboard:', error);
    }
  };

  return (
    <div className={`${styles.shareContainer} ${className}`}>
      <button 
        className={styles.shareButton}
        onClick={handleNativeShare}
        title="Share this page"
        aria-label="Share this page"
      >
        <span className={styles.shareIcon}>Share</span>
        <span className={styles.shareText}>Share</span>
      </button>

      {isOpen && (
        <div className={styles.shareMenu}>
          <div className={styles.shareHeader}>
            <span>Share this page</span>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close share menu"
            >
              ✕
            </button>
          </div>
          
          <div className={styles.shareOptions}>
            {shareLinks.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareOption}
                style={{ '--platform-color': platform.color } as React.CSSProperties}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.platformIcon}>{platform.icon}</span>
                <span className={styles.platformName}>{platform.name}</span>
              </a>
            ))}
            
            <button
              className={`${styles.shareOption} copy-feedback`}
              onClick={copyToClipboard}
            >
              <span className={styles.platformIcon}>Copy</span>
              <span className={styles.platformName}>Copy Link</span>
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className={styles.shareOverlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ShareButton;
