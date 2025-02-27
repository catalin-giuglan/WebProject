import React, { useEffect, useState } from 'react';
import Video from './Video';

interface VideoData {
  name: string;
  likes: string;
  description: string;
  thumbnail_images: string[];
  creator: string;
  creator_picture: string;
  tags: string[];
  date: string;
  video_url: string;
}

interface HistoryPageProps {
  onVideoClick: (video: VideoData) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onVideoClick }) => {
  const [historyVideos, setHistoryVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    setHistoryVideos(history);
  }, []);

  if (historyVideos.length === 0) {
    return (
      <div style={{ 
        color: 'white', 
        padding: '20px',
        textAlign: 'center',
        marginTop: '100px'
      }}>
        <h2 style={{ marginBottom: '16px' }}>No watch history yet</h2>
        <p>Videos you watch will appear here</p>
      </div>
    );
  }

  return (
    <div style={{ 
      color: 'white',
      marginTop: '10px',
      width: '100%',
      overflowX: 'auto'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        padding: '20px',
        minWidth: 'min-content'
      }}>
        {historyVideos.map((video, index) => (
          <div key={`${video.name}-${index}`} style={{ minWidth: '300px' }}>
            <Video
              {...video}
              onClick={() => onVideoClick(video)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
