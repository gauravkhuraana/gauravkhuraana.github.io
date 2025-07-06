import React from 'react';
import styles from './FeedbackForm.module.css';

interface FeedbackFormProps {
  title?: string;
  subtitle?: string;
  showSocialLinks?: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  title = "Share Your Feedback", 
  subtitle = "Your insights help improve content quality for the global software testing community",
  showSocialLinks = true 
}) => {
  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackHeader}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      
      <form action="https://formsubmit.co/gaurav.jaz@email.com" method="POST" className={styles.feedbackForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            aria-label="Enter your name"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="your.email@example.com"
            aria-label="Enter your email address"
          />
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          aria-label="Send feedback"
        >
          Send
        </button>
      </form>

      {showSocialLinks && (
        <div className={styles.socialLinksBottom}>
          <p>Prefer other ways to connect?</p>
          <div className={styles.linkButtons}>
            <a 
              href="https://www.youtube.com/@Udzial/playlists" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialButton}
              aria-label="Visit YouTube Channel"
            >
              📺 YouTube
            </a>
            <a 
              href="https://www.medium.com/@gauravkhuraana" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialButton}
              aria-label="Read articles on Medium"
            >
              📝 Medium
            </a>
            <a 
              href="https://topmate.io/gauravkhurana" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialButton}
              aria-label="Book one-on-one consultation"
            >
              💬 Topmate
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
