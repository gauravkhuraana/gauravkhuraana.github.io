import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
  return (
    <div className="youtube-embed-container">
      {/* YouTube Embed */}
      <div className="youtube-embed-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="youtube-embed-iframe"
        />
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
            href="https://www.youtube.com/@Udzial/playlists"
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
