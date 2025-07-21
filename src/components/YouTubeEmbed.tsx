import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* YouTube Embed */}
      <div style={{ 
        position: 'relative', 
        paddingBottom: '56.25%', 
        height: 0, 
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </div>
      
      {/* Call to Action */}
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
          Enjoyed this video?
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a 
            href={videoUrl}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#ff0000', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Watch on YouTube
          </a>
          <span style={{ color: '#666' }}>•</span>
          <a 
            href="https://www.youtube.com/@Udzial/playlists"
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#ff0000', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Subscribe for More
          </a>
          <span style={{ color: '#666' }}>•</span>
          <span style={{ color: '#666' }}>
            Like and Comment if this helped you!
          </span>
        </div>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
