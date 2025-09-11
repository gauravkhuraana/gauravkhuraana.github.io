import React, { useState } from 'react';
import styles from './NewsletterSubscription.module.css';

interface NewsletterSubscriptionProps {
  title?: string;
  description?: string;
  showSocialLinks?: boolean;
  compact?: boolean;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  title = "Subscribe to My Newsletter",
  description = "Get weekly insights on test automation, AI in testing, and career growth tips delivered to your inbox.",
  showSocialLinks = true,
  compact = false
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className={`${styles.newsletterContainer} ${compact ? styles.compact : ''}`}>
      <div className={styles.newsletterHeader}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {!isSubmitted ? (
        <form 
          action="https://formsubmit.co/936d8782d82b2344cb64dec256c6aa49" 
          method="POST" 
          className={styles.newsletterForm}
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="_subject" value="New Newsletter Subscription!" />
          <input type="hidden" name="_next" value="https://gauravkhurana.in/newsletter" />
          <input type="hidden" name="_template" value="table" />
          
          {!compact && (
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.subscribeButton}>
            Subscribe Now
          </button>
        </form>
      ) : (
        <div className={styles.successMessage}>
          <h4>Thank You for Subscribing!</h4>
          <p>Check your email for confirmation.</p>
        </div>
      )}

      {showSocialLinks && (
        <div className={styles.socialLinks}>
          <p>Follow for more insights:</p>
          <div className={styles.linkButtons}>
            <a 
              href="https://www.youtube.com/@Udzial/playlists" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              YouTube
            </a>
            <a 
              href="https://www.linkedin.com/in/gauravkhuraana/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              LinkedIn
            </a>
            <a 
              href="https://www.medium.com/@gauravkhuraana" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              Medium
            </a>
            <a 
              href="https://topmate.io/gauravkhurana" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              Topmate
            </a>
          </div>
        </div>
      )}

      <div className={styles.privacyNote}>
        <p>No spam. Unsubscribe anytime. Your privacy is respected.</p>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
