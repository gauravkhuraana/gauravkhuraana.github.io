import React, { useState, useRef, useEffect } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  
  // Use IntersectionObserver to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px', threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    setIsLoaded(true);
  };

  return (
    <div className="youtube-embed-container" ref={containerRef}>
      {/* YouTube Embed - Facade Pattern for Performance */}
      <div className="youtube-embed-wrapper">
        {!isLoaded ? (
          <button
            type="button"
            className="youtube-facade"
            onClick={handlePlayClick}
            aria-label={`Play ${title}`}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              background: '#000',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            {isVisible && (
              <img
                src={thumbnailUrl}
                alt={title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
            )}
            {/* Play Button Overlay */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '68px',
                height: '48px',
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s',
              }}
            >
              <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                maxWidth: 'calc(100% - 24px)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </span>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube-embed-iframe"
            loading="lazy"
          />
        )}
      </div>
      
      {/* Call to Action */}
      <div className="youtube-embed-cta">
        <p className="youtube-embed-cta-text">
          Enjoyed this video?
        </p>
        <div className="youtube-embed-links">
          <a 
            href={videoUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="youtube-embed-link"
          >
            Watch on YouTube
          </a>
          <span className="youtube-embed-separator">•</span>
          <a 
            href="https://www.youtube.com/@Udzial?sub_confirmation=1"
            target="_blank" 
            rel="noopener noreferrer"
            className="youtube-embed-link"
          >
            Subscribe for More
          </a>
          <span className="youtube-embed-separator">•</span>
          <span className="youtube-embed-encouragement">
            Like and Comment if this helped you!
          </span>
        </div>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
