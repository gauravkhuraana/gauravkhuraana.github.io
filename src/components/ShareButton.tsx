import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, Copy, Share2, X } from 'lucide-react';
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
  const [copyLabel, setCopyLabel] = useState('Copy Link');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const copyResetTimer = useRef<number | null>(null);
  const menuId = useId();

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusableElements || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => () => {
    if (copyResetTimer.current !== null) {
      window.clearTimeout(copyResetTimer.current);
    }
  }, []);

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
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        console.log('Error sharing:', error);
        setCopyLabel('Copy Link');
        setIsOpen(true);
      }
    } else {
      setCopyLabel('Copy Link');
      setIsOpen(true);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setCopyLabel('Copy Link');
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopyLabel('Copied!');
      copyResetTimer.current = window.setTimeout(closeMenu, 1000);
    } catch (error) {
      console.log('Error copying to clipboard:', error);
    }
  };

  return (
    <div className={`${styles.shareContainer} ${className}`}>
      <button 
        ref={triggerRef}
        className={styles.shareButton}
        onClick={handleNativeShare}
        title="Share this page"
        aria-label="Share this page"
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Share2 aria-hidden="true" size={20} strokeWidth={2.25} />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id={menuId}
          className={styles.shareMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Share this page"
        >
          <div className={styles.shareHeader}>
            <span>Share this page</span>
            <button 
              ref={closeButtonRef}
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Close share menu"
            >
              <X aria-hidden="true" size={18} />
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
                onClick={() => setIsOpen(false)}
              >
                <span
                  className={styles.platformIcon}
                  style={{ color: platform.color }}
                  aria-hidden="true"
                >
                  {platform.icon}
                </span>
                <span className={styles.platformName}>{platform.name}</span>
              </a>
            ))}
            
            <button
              className={styles.shareOption}
              onClick={copyToClipboard}
            >
              <span className={styles.platformIcon} aria-hidden="true">
                {copyLabel === 'Copied!' ? <Check size={18} /> : <Copy size={18} />}
              </span>
              <span className={styles.platformName} aria-live="polite">{copyLabel}</span>
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className={styles.shareOverlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ShareButton;
