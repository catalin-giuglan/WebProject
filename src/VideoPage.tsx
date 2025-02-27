import React from 'react';

interface VideoPageProps {
  video: {
    name: string;
    likes: string;
    description: string;
    video_url: string;
    creator: string;
    creator_picture: string;
    tags: string[];
    date: string;
  };
  onBack: () => void;
}

const VideoPage: React.FC<VideoPageProps> = ({ video, onBack }) => {
  return (
    <div className="video-page" style={{
        position: 'relative',
      color: 'white',
      width: '100%',
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '20px',
      top: '-170px',
      left: '380px',
    }}>
      <button
        onClick={onBack}
        style={{
          padding: '8px 16px',
          backgroundColor: '#333',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          marginBottom: '20px',
          cursor: 'pointer',
          marginLeft: '-350px'
        }}
      >
        ← Back to Home
      </button>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        gap: '24px'
      }}>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <video 
              style={{ 
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                borderRadius: '12px'
              }} 
              controls
            >
              <source src={video.video_url} type="video/mp4" />
            </video>
          </div>

          <h1 style={{ 
            fontSize: '30px',
            fontWeight: 'bold',
            marginBottom: '10px'
          }}>
            {video.name}
          </h1>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <img 
                src={video.creator_picture} 
                alt={video.creator}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <p style={{ fontWeight: 'bold' }}>{video.creator}</p>
                <p style={{ fontSize: '14px', color: '#aaa' }}>Published {video.date}</p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#333',
                border: 'none',
                borderRadius: '20px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                👍 {video.likes}
              </button>
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '12px',
            borderRadius: '12px',
            marginBottom: '20px'
          }}>
            <p style={{ whiteSpace: 'pre-wrap', marginBottom: '12px' }}>{video.description}</p>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {video.tags.map((tag, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '14px'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
