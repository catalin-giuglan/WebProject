import './App.css';

function Video({name, likes, description, thumbnail_images, creator, tags, creator_picture, date, onClick}: {
    name: string, 
    likes: string, 
    description: string, 
    thumbnail_images: string[], 
    creator: string, 
    tags: string[], 
    creator_picture: string, 
    date: string,
    onClick?: () => void
  }) {
    return (
      <div 
        className='video-container' 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 20, 
          alignItems: "flex-start", 
          position: "relative", 
          outline: "2px solid black", 
          padding: "10px",
          cursor: "pointer" 
        }}
        onClick={onClick}
      >
        <div className="thumbnail-image">
            {thumbnail_images.map((img, index) => (
                <img key={index} src={img} alt={`Thumbnail ${index + 1}`} style={{width: '300px', height: '150px'}} />
            ))}
        </div>
        <div style={{ fontSize: '20px', fontFamily: 'revert', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '20px' }}>
            <h3 style={{ margin: "10px 0" }}>{name}</h3>
            <p style={{ margin: "10px 0", display: 'flex', alignItems: 'center' }}>
                <img src={creator_picture} alt="Creator" style={{ width: 25, height: 25, marginRight: '10px', borderRadius: '50%'}} />
                By: {creator}
            </p>
            <p style={{ margin: "10px 0" }}>{description}</p>
            <p style={{ margin: "10px 0", display: 'flex', alignItems: 'center' }}>
                <img src="./like.png" alt="Likes" style={{ width: 20, filter: 'invert(1)', marginRight: '10px'}} />
                Likes: {likes}
            </p>
            <p>Date: {date}</p>
            <div>
                {tags.map((tag, index) => (
                    <span key={index} style={{marginRight: "10px"}}>#{tag}</span>
                ))}
            </div>
        </div>
      </div>
    )
  }

export default Video;
