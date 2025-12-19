import React from 'react';
import styles from './SocialIcons.module.css';

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MediumIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const TopmateIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

interface SocialIconsProps {
  showLabels?: boolean;
}

export default function SocialIcons({ showLabels = true }: SocialIconsProps): JSX.Element {
  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@Udzial?sub_confirmation=1',
      icon: <YouTubeIcon />,
      color: '#ff0000',
      hoverColor: '#cc0000',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/gaurav-khurana-899934b/',
      icon: <LinkedInIcon />,
      color: '#0077B5',
      hoverColor: '#005885',
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@gauravkhuraana',
      icon: <MediumIcon />,
      color: '#000000',
      hoverColor: '#333333',
    },
    {
      name: 'Topmate',
      url: 'https://topmate.io/gauravkhurana',
      icon: <TopmateIcon />,
      color: '#6366f1',
      hoverColor: '#4f46e5',
    },
  ];

  return (
    <div className={styles.socialContainer}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialButton}
          style={{ '--brand-color': link.color, '--brand-hover': link.hoverColor } as React.CSSProperties}
          aria-label={`Connect on ${link.name}`}
        >
          <span className={styles.iconWrapper}>{link.icon}</span>
          {showLabels && <span className={styles.label}>{link.name}</span>}
        </a>
      ))}
    </div>
  );
}
