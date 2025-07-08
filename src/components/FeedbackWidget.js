import React, { useState } from 'react';
import styles from './FeedbackWidget.module.css';

const FeedbackWidget = ({ 
  pageTitle = "",
  compact = true,
  position = "bottom" // "bottom", "sidebar", "inline"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: '',
    comment: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (rating) => {
    setFeedback(prev => ({ ...prev, rating }));
    if (compact) {
      setIsExpanded(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create feedback summary
    const subject = encodeURIComponent(`Quick Feedback: ${pageTitle || 'Website'} - Rating: ${feedback.rating}/5`);
    const body = encodeURIComponent(`
Page: ${pageTitle || window.location.href}
Rating: ${feedback.rating}/5
Comment: ${feedback.comment}
Contact: ${feedback.email}

---
Quick feedback from gauravkhurana.in
    `);

    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  const resetWidget = () => {
    setFeedback({ rating: '', comment: '', email: '' });
    setIsExpanded(false);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className={`${styles.widget} ${styles[position]}`}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>✅</div>
          <h4>Thank You!</h4>
          <p>Your feedback helps improve content for the testing community.</p>
          <button onClick={resetWidget} className={styles.resetBtn}>
            Give More Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.widget} ${styles[position]} ${isExpanded ? styles.expanded : ''}`}>
      {!isExpanded ? (
        <div className={styles.minimized}>
          <h4>Was this helpful?</h4>
          <div className={styles.quickRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className={styles.starBtn}
                aria-label={`Rate ${star} out of 5 stars`}
              >
                ⭐
              </button>
            ))}
          </div>
          <p className={styles.subtitle}>Click a star to share detailed feedback</p>
        </div>
      ) : (
        <div className={styles.expanded}>
          <h4>Quick Feedback {feedback.rating && `(${feedback.rating}/5 ⭐)`}</h4>
          <form onSubmit={handleSubmit} className={styles.feedbackForm}>
            <div className={styles.ratingDisplay}>
              <span>Your Rating: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className={`${styles.starBtn} ${star <= feedback.rating ? styles.active : ''}`}
                  aria-label={`Rate ${star} out of 5 stars`}
                >
                  ⭐
                </button>
              ))}
            </div>
            
            <textarea
              value={feedback.comment}
              onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="What could be improved? Any suggestions for the testing community?"
              className={styles.commentBox}
              rows="3"
              required
            />
            
            <input
              type="email"
              value={feedback.email}
              onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email (optional - for follow-up)"
              className={styles.emailInput}
            />
            
            <div className={styles.actionButtons}>
              <button type="submit" className={styles.submitBtn}>
                Send Feedback
              </button>
              <button 
                type="button" 
                onClick={() => setIsExpanded(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className={styles.socialHint}>
        <small>
          💡 Connect: 
          <a href="https://www.youtube.com/@Udzial/playlists" target="_blank" rel="noopener" aria-label="YouTube">YouTube</a> | 
          <a href="https://www.medium.com/@gauravkhuraana" target="_blank" rel="noopener" aria-label="Medium">Medium</a> | 
          <a href="https://topmate.io/gauravkhurana" target="_blank" rel="noopener" aria-label="Topmate">Topmate</a>
        </small>
      </div>
    </div>
  );
};

export default FeedbackWidget;
