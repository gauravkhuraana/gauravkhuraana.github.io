import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './newsletter.module.css';

export default function Newsletter(): JSX.Element {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form will be handled by FormSubmit
    setIsSubmitted(true);
  };

  return (
    <Layout
      title="Newsletter Subscription"
      description="Subscribe to receive the latest insights on software testing, automation, and DevOps. Join our global community of testing professionals."
    >
      <div className={styles.pageContainer}>
        <div className={styles.heroSection}>
          <div className="container">
            <Heading as="h1" className={styles.heroTitle}>
              Stay Updated with Testing & Automation Insights
            </Heading>
            <p className={styles.heroSubtitle}>
              Join thousands of testing professionals who receive practical tips, automation strategies, and DevOps insights delivered straight to their inbox.
            </p>
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className="container">
            <div className={styles.mainContent}>
              <div className={styles.connectSection}>
                <Heading as="h2" className={styles.connectTitle}>
                  Connect with Me
                </Heading>
                <p className={styles.connectDescription}>
                  Follow me on various platforms for different types of content and community engagement. After exploring my content, don't forget to subscribe to my newsletter below for exclusive insights!
                </p>

                <div className={styles.socialGrid}>
                  <a 
                    href="https://www.youtube.com/@Udzial/playlists" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                  >
                    <div className={styles.socialIcon}>📺</div>
                    <h3>YouTube</h3>
                    <p>Video tutorials, live sessions, and in-depth automation courses</p>
                    <span className={styles.followButton}>Subscribe</span>
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/gauravkhuraana/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                  >
                    <div className={styles.socialIcon}>💼</div>
                    <h3>LinkedIn</h3>
                    <p>Professional insights, industry updates, and networking opportunities</p>
                    <span className={styles.followButton}>Follow</span>
                  </a>

                  <a 
                    href="https://www.medium.com/@gauravkhuraana" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                  >
                    <div className={styles.socialIcon}>📝</div>
                    <h3>Medium</h3>
                    <p>Detailed articles on testing practices, automation, and career guidance</p>
                    <span className={styles.followButton}>Read</span>
                  </a>

                  <a 
                    href="https://topmate.io/gauravkhurana" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                  >
                    <div className={styles.socialIcon}>💬</div>
                    <h3>Topmate</h3>
                    <p>Book one-on-one consultations for personalized career and technical guidance</p>
                    <span className={styles.followButton}>Book Session</span>
                  </a>
                </div>
              </div>

              <div className={styles.subscriptionSection}>
                <div className={styles.subscriptionCard}>
                  <Heading as="h2" className={styles.cardTitle}>
                    🚀 Subscribe to My Newsletter
                  </Heading>
                  <p className={styles.cardDescription}>
                    Now that you've seen the value I provide across platforms, get weekly insights on test automation, AI in testing, DevOps practices, and career growth tips delivered directly to your inbox!
                  </p>

                  {!isSubmitted ? (
                    <form 
                      action="https://formsubmit.co/936d8782d82b2344cb64dec256c6aa49" 
                      method="POST" 
                      className={styles.subscriptionForm}
                      onSubmit={handleSubmit}
                    >
                      <input type="hidden" name="_subject" value="New Newsletter Subscription!" />
                      <input type="hidden" name="_next" value="https://gauravkhurana.in/newsletter" />
                      <input type="hidden" name="_template" value="table" />
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>



                      <button type="submit" className={styles.subscribeButton}>
                        📧 Subscribe Now
                      </button>
                    </form>
                  ) : (
                    <div className={styles.successMessage}>
                      <h3>🎉 Thank You for Subscribing!</h3>
                      <p>You'll receive valuable testing and automation insights soon. Check your email for confirmation.</p>
                    </div>
                  )}

                  <div className={styles.privacyNote}>
                    <p>
                      🔒 Your privacy matters. No spam, unsubscribe anytime. 
                      I respect your inbox and only send valuable content.
                    </p>
                  </div>
                </div>

                <div className={styles.benefitsCard}>
                  <Heading as="h3" className={styles.benefitsTitle}>
                    What You'll Get
                  </Heading>
                  <ul className={styles.benefitsList}>
                    <li>🎯 Weekly practical testing/automation tips</li>
                    <li>🛠️ Tools & Frameworks recommendations and tutorials</li>
                    <li>📈 Career advancement insights</li>
                    <li>📈 Your Questions Answered</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
